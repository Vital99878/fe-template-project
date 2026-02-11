import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { App } from '@/app/App'

import '@/app/styles/index.css'
import reportWebVitals from '@/shared/lib/reportWebVitals'
import { initApi } from '@/app/providers/initApi'

initApi()

const rootElement = document.getElementById('app')

if (rootElement && !rootElement.innerHTML) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

reportWebVitals()
