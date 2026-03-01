import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { App } from '@/app/App'
import { initApi } from '@/app/providers/initApi'

import { startMsw } from '@/shared/api/msw'
import reportWebVitals from '@/shared/lib/reportWebVitals'

import '@/app/styles/index.css'

async function bootstrap() {
  initApi()
  await startMsw()

  const rootElement = document.getElementById('app')
  if (rootElement && !rootElement.innerHTML) {
    ReactDOM.createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  }

  reportWebVitals()
}

bootstrap()
  .then(() => console.log('Project is started'))
  .catch((e) => {
    console.error('Bootstrap failed:', e)
  })
