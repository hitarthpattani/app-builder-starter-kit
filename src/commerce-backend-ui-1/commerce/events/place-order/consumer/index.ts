/*
 * <license header>
 */

import { EventConsumerAction, RuntimeActionResponse } from '@adobe-commerce/aio-toolkit';

export const main = EventConsumerAction.execute(
  'commerce-events-place-order-consumer',
  [],
  [],
  async (params, ctx) => {
    const { logger } = ctx;
    logger.info('Commerce events place order consumer invoked');
    return RuntimeActionResponse.success({
      success: true,
      params,
    });
  }
);
