/*
 * <license header>
 */

import { EXTENSION_ID } from '@actions/constants'
import { RuntimeAction, HttpMethod, RuntimeActionResponse } from '@adobe-commerce/aio-toolkit'

export const main = RuntimeAction.execute(
  'admin-ui-sdk-registration-action',
  [HttpMethod.GET, HttpMethod.POST],
  [],
  [],
  async () => {
    return RuntimeActionResponse.success({
      registration: {
        menuItems: [
          {
            id: `${EXTENSION_ID}::first`,
            title: 'Adobe Commerce First App on App Builder',
            parent: `${EXTENSION_ID}::apps`,
            sortOrder: 1
          },
          {
            id: `${EXTENSION_ID}::apps`,
            title: 'Apps',
            isSection: true,
            sortOrder: 100
          }
        ],
        page: {
          title: 'Adobe Commerce First App on App Builder'
        }
      }
    })
  }
)
