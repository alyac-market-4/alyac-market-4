import { createContext, useState } from 'react';

import { ConfirmDialog, type ConfirmDialogProps } from '@/shared/ui';

import type { ConfirmDialogContextType } from './types';

export const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);

export function ConfirmDialogProvider({ children }: { children: React.ReactNode }) {
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogProps | null>(null);

  const openConfirm = (confirmDialogProps: ConfirmDialogProps) =>
    setConfirmDialog(confirmDialogProps);
  const closeConfirm = () => setConfirmDialog(null);

  return (
    <ConfirmDialogContext.Provider value={{ confirmDialog, openConfirm, closeConfirm }}>
      {children}
      {confirmDialog && (
        <ConfirmDialog
          {...confirmDialog}
          open={true}
          onOpenChange={(open) => {
            if (!open) closeConfirm();
          }}
          onConfirm={() => {
            confirmDialog.onConfirm();
            closeConfirm();
          }}
        />
      )}
    </ConfirmDialogContext.Provider>
  );
}
