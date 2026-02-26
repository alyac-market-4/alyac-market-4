import type { ConfirmDialogProps } from '@/shared/ui';

export interface ConfirmDialogStore {
  confirmDialog: ConfirmDialogProps | null;
  openConfirm: (props: ConfirmDialogProps) => void;
  closeConfirm: () => void;
}
