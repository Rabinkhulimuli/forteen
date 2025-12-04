import { Outlet } from 'react-router';

import { Toaster } from 'sonner';
import { TanstackProvider } from '../components/providers/tanstack-provider';



export default function App() {
  return (
        <TanstackProvider>
              {/* Render child routes */}
              <Outlet />

              {/* Toaster for notifications */}
              <Toaster position='top-right'/>

              {/* Scroll to top on route change */}
        </TanstackProvider>
  );
}