import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Loading from './components/Loading'
import './index.css'

const LazyComponent = lazy(() => import('./App'));

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Loading />}>
    <StrictMode>
      <LazyComponent />
    </StrictMode>
  </Suspense>
)
