import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './app/routes'
import { QueryProvider } from './shared/providers/QueryProvider'
import { ToastProvider } from './shared/providers/ToastProvider'
import { ErrorBoundary } from './shared/providers/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </QueryProvider>
    </ErrorBoundary>
  </StrictMode>,
)
