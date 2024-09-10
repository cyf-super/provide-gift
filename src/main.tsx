import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import Loading from './components/Loading';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Loading />}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Suspense>
);
