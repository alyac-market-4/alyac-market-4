import { QueryCache, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
    },
    mutations: {
      retry: 1,
      networkMode: 'always',
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (!error.response?.status) {
          toast.error(error.message);
        } else if (error.response?.status >= 500) {
          toast.error('서버 오류');
        }
      }
    },
  }),
});
