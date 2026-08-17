module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src/commerce-backend-ui-2'],
  testMatch: ['**/test/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  testPathIgnorePatterns: ['/node_modules/', '/hooks/', '/web-src/'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json'
      }
    ]
  },
  collectCoverageFrom: [
    'src/commerce-backend-ui-2/actions/**/*.{js,ts}',
    'src/commerce-backend-ui-2/lib/**/*.{js,ts}',
    '!src/commerce-backend-ui-2/**/*.d.ts',
    '!src/commerce-backend-ui-2/**/types.ts'
  ],
  moduleNameMapper: {
    '^@actions/(.*)$': '<rootDir>/src/commerce-backend-ui-2/actions/$1',
    '^@lib/(.*)$': '<rootDir>/src/commerce-backend-ui-2/lib/$1',
    '^@web/(.*)$': '<rootDir>/src/commerce-backend-ui-2/web-src/src/$1',
    '^@components/(.*)$': '<rootDir>/src/commerce-backend-ui-2/web-src/src/components/$1',
    '^@types/(.*)$': '<rootDir>/src/commerce-backend-ui-2/web-src/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/commerce-backend-ui-2/web-src/src/utils/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testTimeout: 30000
}
