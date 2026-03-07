import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (callback: () => void, hasMore?: boolean) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || !observerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [callback, hasMore]);

  return observerRef;
};
