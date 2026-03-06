import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from './button';

export const BackButton = ({ onClick }: { onClick?: () => void }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClick) return onClick();

    const isInternalNavigation = document.referrer.includes(window.location.host);

    if (!isInternalNavigation || window.history.length <= 1) {
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
