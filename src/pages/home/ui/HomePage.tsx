import { useEffect, useState } from 'react';

import { SplashView } from '@/features/splash';
import { AuthSection } from '@/widgets/auth';

export const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="relative h-screen w-full overflow-hidden bg-[#6FCA3C]">
        {/* 1. 스플래시 화면 */}
        <SplashView show={showSplash} />

        {/* 2. 로그인 전환 섹션 */}
        <AuthSection isVisible={!showSplash} />
      </div>
    </div>
  );
};
