import { StrictMode, Suspense } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function render(_url: string) {
  const html = renderToString(
    <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback="loading..">
        <App />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
  )
  return { html }
}