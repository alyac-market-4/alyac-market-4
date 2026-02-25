import { LayoutGrid, StretchHorizontal } from 'lucide-react';

import { IconButton } from '@/shared/ui';

import type { ViewMode } from '../model/types';

interface LayoutControllerProps {
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
}

export const LayoutController = ({ viewMode, setViewMode }: LayoutControllerProps) => {
  return (
    <div className="flex gap-1">
      <IconButton
        onClick={() => setViewMode('list')}
        className={viewMode === 'list' ? 'text-foreground' : 'text-muted-foreground'}
      >
        <StretchHorizontal />
      </IconButton>
      <IconButton
        onClick={() => setViewMode('grid')}
        className={viewMode === 'grid' ? 'text-foreground' : 'text-muted-foreground'}
      >
        <LayoutGrid />
      </IconButton>
    </div>
  );
};
