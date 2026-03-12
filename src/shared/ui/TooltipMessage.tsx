import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

interface TooltipMessageProps {
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  message: string;
}

export function TooltipMessage({ children, side = 'bottom', message }: TooltipMessageProps) {
  return (
    <Tooltip key={side}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
  );
}
