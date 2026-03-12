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
        if (error.code === 'ECONNABORTED') {
          toast.error('요청 시간이 초과되었습니다.');
        } else if (error.response) {
          toast.error(`서버 오류 ${error.response.status}`);
        } else {
          toast.error('네트워크 오류');
        }
      }
    },
  }),
});
