import { LayoutGrid, StretchHorizontal } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@/shared/ui';

import type { ViewMode } from '../model/types';

interface LayoutControllerProps {
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
}

export const LayoutController = ({ viewMode, setViewMode }: LayoutControllerProps) => {
  return (
    <ToggleGroup
      type="single"
      size="sm"
      variant="outline"
      value={viewMode}
      onValueChange={(value) => {
        if (value) setViewMode(value as ViewMode);
      }}
    >
      <ToggleGroupItem value="list" aria-label="Toggle list view">
        <StretchHorizontal className="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem value="grid" aria-label="Toggle grid view">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
