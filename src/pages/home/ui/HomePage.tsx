import { useEffect, useState } from 'react';

import { SplashView } from '@/features/splash';
import { useThemeStore } from '@/shared/lib';
import { AuthSection } from '@/widgets/auth';

export const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { initThemeByLocalStorage } = useThemeStore();

  useEffect(() => {
    initThemeByLocalStorage();
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="relative h-screen w-full overflow-hidden bg-[#6FCA3C]">
        <SplashView show={showSplash} />
        <AuthSection isVisible={!showSplash} />
      </div>
    </div>
  );
};
