import { type FallbackProps, getErrorMessage } from 'react-error-boundary';

import { Button } from './button';

export const ErrorView = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className="py-4 text-center">
    <p className="text-sm text-red-500">에러 발생: {getErrorMessage(error)}</p>
    <Button onClick={resetErrorBoundary} size="sm">
      재시도
    </Button>
  </div>
);
