import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from './button';

export const BackButton = ({ onClick }: { onClick?: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (onClick) return onClick();

    if (location.key === 'default') {
      navigate('/feed');
    } else {
      navigate(-1);
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleBack}>
      <ArrowLeft className="size-6" />
    </Button>
  );
};
