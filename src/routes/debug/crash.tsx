import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/debug/crash')({
  component: Crash,
})

function Crash() {
  throw new Error('RouteErrorBoundary check')
}
