import { createRouter } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Регистрация для type-safety (оставляем рядом с router)
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
