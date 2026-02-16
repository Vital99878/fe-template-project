import { RouterProvider } from '@tanstack/react-router'
import { ThemeProvider } from './providers/theme'
import { router } from '@/app/router/router'
import { AppErrorBoundary } from '@/app/providers/errorBoundary/AppErrorBoundary'
import { QueryProvider } from '@/app/providers/QueryProvider'

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
