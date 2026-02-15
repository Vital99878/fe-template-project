import { RouterProvider } from '@tanstack/react-router'
import { ThemeProvider } from './providers/theme'
import { router } from '@/app/router/router'

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
