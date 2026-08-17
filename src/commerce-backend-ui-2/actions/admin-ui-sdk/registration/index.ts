/*
 * <license header>
 */

import { EXTENSION_ID } from '@actions/constants'
import { RuntimeAction, HttpMethod, RuntimeActionResponse } from '@adobe-commerce/aio-toolkit'

/**
 * Admin UI SDK registration action that returns the registration configuration for the extension.
 */
export const main = RuntimeAction.execute(
  'admin-ui-sdk-registration-action',
  [HttpMethod.GET],
  [],
  [],
  async () => {
    return RuntimeActionResponse.success({
      registration: {
        menuItems: [
          {
            id: `${EXTENSION_ID}::application`,
            title: 'Application',
            parent: `${EXTENSION_ID}::first`,
            sortOrder: 1,
            sandbox: 'allow-downloads allow-popups'
          },
          {
            id: `${EXTENSION_ID}::first`,
            title: 'Adobe Commerce First App on App Builder',
            parent: 'Magento_Backend::system',
            isSection: true,
            sortOrder: 100,
            sandbox: 'allow-downloads allow-popups'
          }
        ],
        page: {
          title: 'Adobe Commerce First App on App Builder'
        }
      }
    })
  }
)
