import type { ConfirmDialogProps } from '@/shared/ui';

export interface ConfirmDialogContextType {
  confirmDialog: ConfirmDialogProps | null;
  openConfirm: (config: ConfirmDialogProps) => void;
  closeConfirm: () => void;
}
