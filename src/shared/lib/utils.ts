import { type ClassValue, clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number): string => {
  return `${new Intl.NumberFormat('ko-KR').format(value)}원`;
};

export const useReplaceNavigate = () => {
  const navigate = useNavigate();

  const replaceNavigate = (fallbackPath: string) => {
    navigate(fallbackPath, { replace: true });
  };

  return { replaceNavigate };
};
