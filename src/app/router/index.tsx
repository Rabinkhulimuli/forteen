import { createBrowserRouter} from 'react-router';

import { ErrorFallback } from '../error-fallback';
import App from '..';
import { ROUTES } from '../../configs/Routes';
import { NotFound } from '../not-found';
import Dashboard from '../../feature/home';



export const router = createBrowserRouter([
  {
    // Root route
    Component: App,
    ErrorBoundary: ErrorFallback,

    children: [
      // Site routes ( Public / Unprotected )
      { path: ROUTES.HOME, element:<Dashboard/>},


      // Catch-all route for unmatched routes
      { path: '*', element: <NotFound className='min-h-screen' /> },
    ],
  },
]);