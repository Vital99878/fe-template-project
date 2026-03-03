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
