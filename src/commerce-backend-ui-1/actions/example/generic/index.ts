/*
 * <license header>
 */

import { RuntimeAction, HttpMethod, RuntimeActionResponse } from '@adobe-commerce/aio-toolkit'
import UserManager from '@lib/user-manager';

export const main = RuntimeAction.execute(
  'example-generic-action',
  [HttpMethod.GET, HttpMethod.POST],
  [],
  [],
  async (params, ctx) => {
    const { logger } = ctx;
    
    logger.info('example-generic-action called', { params });

    const userManager = new UserManager();
    const user = userManager.get(params.name || 'Guest');

    return RuntimeActionResponse.success({
      message: `Hello, ${user.name}!`
    })
  }
)
