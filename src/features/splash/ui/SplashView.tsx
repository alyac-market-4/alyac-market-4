import { fullLogoAlyac } from '@/shared/assets';

interface SplashViewProps {
  show: boolean;
}

export const SplashView = ({ show }: SplashViewProps) => (
  <div
    className={`bg-background absolute inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
      show ? 'opacity-100' : 'pointer-events-none opacity-0'
    }`}
  >
    <div className="flex flex-col items-center gap-8">
      <img src={fullLogoAlyac} alt="alyac-logo" />
    </div>
  </div>
);
