import { Suspense } from 'react';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

interface AsyncBoundaryProps {
  children: React.ReactNode;
  loadingFallback: React.ReactNode;
  errorFallback: (props: FallbackProps) => React.ReactNode;
}

/**
 * 비동기 컴포넌트를 위한 Suspense 및 ErrorBoundary 래퍼
 * @example
 * <AsyncBoundary
 *   loadingFallback={<MyLoadingComponent />}
 *   errorFallback={({ error, resetErrorBoundary }) => (
 *     <div>
 *       <p>에러 발생: {getErrorMessage(error)}</p>
 *       <Button onClick={resetErrorBoundary}>다시 시도</Button>
 *     </div>
 *   )}
 * >
 *   <MyComponent />
 * </AsyncBoundary>
 */
export const AsyncBoundary = ({ children, loadingFallback, errorFallback }: AsyncBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} fallbackRender={errorFallback}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};
