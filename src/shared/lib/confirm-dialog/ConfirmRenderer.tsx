import { ConfirmDialog } from '@/shared/ui';

import { useConfirmDialogStore } from './confirmDialogStore';

export const ConfirmRenderer = () => {
  const { confirmDialog, closeConfirm } = useConfirmDialogStore();

  if (!confirmDialog) return null;

  return (
    <ConfirmDialog
      onCancel={closeConfirm}
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
  );
};
