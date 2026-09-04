/*
 * <license header>
 */

import type { AdobeIntegrationProps } from '../../types'

export type MainPageProps = AdobeIntegrationProps & {
  /** Whether to render the ActionsForm view instead of the main navigation container */
  useActionsForm?: boolean
}
