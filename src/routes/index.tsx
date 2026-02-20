import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import { AppLink } from '../shared/ui'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <header className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-[calc(10px+2vmin)] text-white">
        <img
          src={logo}
          className="pointer-events-none h-[40vmin] animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <AppLink
          variant={'muted'}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </AppLink>
        <AppLink href="https://tanstack.com" target="_blank" rel="noopener noreferrer">
          Learn TanStack
        </AppLink>
        <AppLink variant={'danger'} to={`/profile/me`}>
          Profile
        </AppLink>
      </header>
    </div>
  )
}
