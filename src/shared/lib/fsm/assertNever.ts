// Ensures we don't forget to handle a new state variant.
export function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${JSON.stringify(x)}`)
}
