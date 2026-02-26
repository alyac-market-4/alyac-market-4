import { create } from 'zustand';

interface SignUpState {
  isValidated: boolean;
  setValidated: () => void;
  reset: () => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
  isValidated: false,
  setValidated: () => set({ isValidated: true }),
  reset: () => set({ isValidated: false }),
}));
