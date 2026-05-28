/*
 * <license header>
 */

import type { SuccessResponse, ErrorResponse } from '@adobe-commerce/aio-toolkit'
import { main as exampleAction } from '../../../actions/example/generic/index'

type ActionParams = Record<string, unknown>

const mockUserManagerGet = jest.fn()

jest.mock('@lib/user-manager', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    get: mockUserManagerGet
  }))
}))

beforeEach(() => {
  jest.clearAllMocks()
})

const baseParams: ActionParams = {
  __ow_headers: {},
  __ow_method: 'get'
}

describe('example/generic action', () => {
  it('should be defined', () => {
    expect(exampleAction).toBeInstanceOf(Function)
  })

  it('should return success response with default Guest user', async () => {
    mockUserManagerGet.mockReturnValue({ name: 'Guest' })

    const response = (await exampleAction(baseParams)) as SuccessResponse
    const body = response.body as Record<string, unknown>

    expect(response.statusCode).toBe(200)
    expect(body.message).toBe('Hello, Guest!')
    expect(mockUserManagerGet).toHaveBeenCalledWith('Guest')
  })

  it('should return success response with custom name parameter', async () => {
    mockUserManagerGet.mockReturnValue({ name: 'John' })

    const response = (await exampleAction({
      ...baseParams,
      name: 'John'
    })) as SuccessResponse
    const body = response.body as Record<string, unknown>

    expect(response.statusCode).toBe(200)
    expect(body.message).toBe('Hello, John!')
    expect(mockUserManagerGet).toHaveBeenCalledWith('John')
  })

  it('should default to Guest when name parameter is empty string', async () => {
    mockUserManagerGet.mockReturnValue({ name: 'Guest' })

    const response = (await exampleAction({
      ...baseParams,
      name: ''
    })) as SuccessResponse

    expect(response.statusCode).toBe(200)
    expect(mockUserManagerGet).toHaveBeenCalledWith('Guest')
  })

  it('should pass whitespace name to UserManager', async () => {
    mockUserManagerGet.mockReturnValue({ name: 'Alice' })

    await exampleAction({
      ...baseParams,
      name: '  Alice  '
    })

    expect(mockUserManagerGet).toHaveBeenCalledWith('  Alice  ')
  })

  it('should support POST requests', async () => {
    mockUserManagerGet.mockReturnValue({ name: 'Guest' })

    const response = (await exampleAction({
      ...baseParams,
      __ow_method: 'post'
    })) as SuccessResponse

    expect(response.statusCode).toBe(200)
  })

  it('should return 405 for unsupported HTTP method', async () => {
    const response = await exampleAction({
      ...baseParams,
      __ow_method: 'delete'
    })

    expect(response).toHaveProperty('error')
    const errorResponse = response as { error: { statusCode: number; body: { error: string } } }
    expect(errorResponse.error.statusCode).toBe(405)
    expect(errorResponse.error.body.error).toContain('Invalid HTTP method')
  })

  it('should return 500 when unexpected error occurs', async () => {
    mockUserManagerGet.mockImplementation(() => {
      throw new Error('Database connection failed')
    })

    const response = (await exampleAction(baseParams)) as ErrorResponse

    expect(response).toEqual({
      error: {
        statusCode: 500,
        body: {
          error: 'server error'
        }
      }
    })
  })

  it('should handle non-Error exceptions', async () => {
    mockUserManagerGet.mockImplementation(() => {
      // eslint-disable-next-line no-throw-literal
      throw 'String error'
    })

    const response = (await exampleAction(baseParams)) as ErrorResponse

    expect(response.error.statusCode).toBe(500)
    expect(response.error.body.error).toBe('server error')
  })
})
