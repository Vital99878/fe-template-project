import { RouterProvider } from '@tanstack/react-router'

import { AppErrorBoundary } from '@/app/providers/errorBoundary/AppErrorBoundary'
import { QueryProvider } from '@/app/providers/QueryProvider'
import { router } from '@/app/router/router'

import { ThemeProvider } from './providers/theme'

export function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AppErrorBoundary>
          <RouterProvider router={router} />
        </AppErrorBoundary>
      </QueryProvider>
    </ThemeProvider>
  )
}
