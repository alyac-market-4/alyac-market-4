import { useContext } from 'react';

import { ConfirmDialogContext } from './ConfirmDialogProvider';

export const useConfirmDialog = () => {
  const context = useContext(ConfirmDialogContext);
  if (context === undefined) {
    throw new Error('useConfirmDialog must be used within a ConfirmDialogProvider');
  }
  return context;
};
