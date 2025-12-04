import type React from 'react';
import { useNavigate } from 'react-router';

import { AxiosError } from 'axios';
import { toast } from 'sonner';

import {
  QueryCache,
  QueryClient,
  type QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ROUTES } from '../../configs/Routes';
import { handleServerError } from '../../utils/handle-server-error';

export const TanstackProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const navigate = useNavigate();

  const queryClientConfig: QueryClientConfig = {
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          if (import.meta.env.DEV) console.log({ failureCount, error });

          if (failureCount >= 0 && import.meta.env.DEV) return false; // In development, do not retry
          if (failureCount > 3 && import.meta.env.PROD) return false; // In production, do not retry after 3 failures

          return !(error instanceof AxiosError && [401, 403].includes(error.response?.status ?? 0));
        },
        refetchOnWindowFocus: import.meta.env.PROD, // Refetch on window focus in production
        staleTime: 10 * 1000, // 10 seconds stale time
      },
      mutations: {
        onError: error => handleServerError(error),
      },
    },
    queryCache: new QueryCache({
      onError: error => {
        if (error instanceof AxiosError) {
          const status = error.response?.status ?? 0;

          if (status === 401) {
            toast.error('Session expired!');
          }

          if (status === 500) {
            toast.error('Internal Server Error!');
            void navigate(ROUTES.ERROR.INTERNAL_SERVER_ERROR);
          }
        }
      },
    }),
  };

  const queryClient = new QueryClient(queryClientConfig);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};