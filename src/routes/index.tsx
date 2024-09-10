import { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';
import App from '../App';

const Home = lazy(() => import('../components/Home'));
const Sources = lazy(() => import('../components/Source'));

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'sources',
        element: <Sources />
      }
    ]
  }
]);

export { router };
