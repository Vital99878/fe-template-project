import { assertNever } from './assertNever'
import { invalidTransition } from './invalidTransition'

// Production-friendly FSM template:
// - Discriminated unions for State/Event
// - Exhaustive switch on state.type
// - Invalid transitions are logged in dev, ignored in prod (returns same state)

export type ConfirmState =
  | { type: 'closed' }
  | { type: 'confirming'; id: string }
  | { type: 'loading'; id: string }
  | { type: 'error'; id: string; message: string }

export type ConfirmEvent =
  | { type: 'OPEN'; id: string }
  | { type: 'CLOSE' }
  | { type: 'CONFIRM' } // first attempt
  | { type: 'RETRY' } // retry from error
  | { type: 'SUCCESS' }
  | { type: 'FAIL'; message: string }

export function confirmReducer(state: ConfirmState, event: ConfirmEvent): ConfirmState {
  switch (state.type) {
    case 'closed': {
      if (event.type === 'OPEN') return { type: 'confirming', id: event.id }
      // You can ignore CLOSE etc.
      return invalidTransition(state, event)
    }

    case 'confirming': {
      if (event.type === 'CLOSE') return { type: 'closed' }
      if (event.type === 'CONFIRM') return { type: 'loading', id: state.id }
      // Treat RETRY same as CONFIRM if you want, but usually RETRY shouldn't happen here.
      return invalidTransition(state, event)
    }

    case 'loading': {
      // Optional: allow CLOSE to "dismiss" UI while request is running.
      // Whether you want this depends on UX.
      if (event.type === 'CLOSE') return { type: 'closed' }

      if (event.type === 'SUCCESS') return { type: 'closed' }
      if (event.type === 'FAIL') return { type: 'error', id: state.id, message: event.message }
      return invalidTransition(state, event)
    }

    case 'error': {
      if (event.type === 'CLOSE') return { type: 'closed' }
      if (event.type === 'RETRY') return { type: 'loading', id: state.id }
      // If you prefer a single event, you can also accept CONFIRM here as retry:
      // if (event.type === 'CONFIRM') return { type: 'loading', id: state.id };
      return invalidTransition(state, event)
    }

    default:
      return assertNever(state)
  }
}
