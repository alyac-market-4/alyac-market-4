import { create } from 'zustand';

import type { ConfirmDialogStore } from './types';

export const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
  confirmDialog: null,
  openConfirm: (props) => set({ confirmDialog: props }),
  closeConfirm: () => set({ confirmDialog: null }),
}));
