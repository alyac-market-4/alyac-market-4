import { EllipsisVertical } from 'lucide-react';

import { IconButton } from './IconButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './dropdown-menu';

interface KebabMenuProps {
  items: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }[];
  align?: 'center' | 'end' | 'start';
}

export const KebabMenu = ({ items, align = 'end' }: KebabMenuProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton>
            <EllipsisVertical />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          <DropdownMenuGroup>
            {items.map((item, index) => {
              const key = `${item.label}-${index}`;

              return item.icon ? (
                <DropdownMenuLabel key={key} className="flex flex-row items-center">
                  {item.label}
                  <IconButton onClick={item.onClick}>{item.icon}</IconButton>
                </DropdownMenuLabel>
              ) : (
                <DropdownMenuItem key={key} onClick={item.onClick}>
                  {item.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
