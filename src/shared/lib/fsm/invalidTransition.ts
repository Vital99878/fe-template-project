import type { ConfirmEvent, ConfirmState } from './confirmFsm.types'

export function invalidTransition(state: ConfirmState, event: ConfirmEvent): ConfirmState {
  // In production, we keep UI stable.
  // In dev, we want visibility.
  if (process.env.NODE_ENV !== 'production') {
    console.error('[ConfirmFSM] Invalid transition', { state, event })
  }
  return state
}
