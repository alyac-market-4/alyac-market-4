import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from './button';

export const BackButton = ({ onClick }: { onClick?: () => void }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onClick) return onClick();
    navigate(-1);
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleBack}>
      <ArrowLeft className="size-6" />
    </Button>
  );
};
