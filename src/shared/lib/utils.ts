import { type ClassValue, clsx } from 'clsx';
import { type NavigateOptions, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number): string => {
  return `${new Intl.NumberFormat('ko-KR').format(value)}원`;
};

export const useReplaceNavigate = () => {
  const navigate = useNavigate();

  const replaceNavigate = (fallbackPath: string, options?: NavigateOptions) => {
    navigate(fallbackPath, { replace: true, ...options });
  };

  return { replaceNavigate };
};

export function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds}초 전`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}분 전`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;

  return `${new Date(date).toLocaleDateString()}`;
}
