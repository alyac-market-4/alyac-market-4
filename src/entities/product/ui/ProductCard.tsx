import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useProductMutation } from '@/entities/product';
import { formatCurrency, useConfirmDialogStore } from '@/shared/lib';
import type { ProductDetail } from '@/shared/model';
import { IconButton } from '@/shared/ui';

interface ProductCardProps {
  product: ProductDetail;
  to: string;
}

export const ProductCard = ({ product, to }: ProductCardProps) => {
  const { openConfirm } = useConfirmDialogStore();
  const { deleteMutation } = useProductMutation();

  return (
    <div className="group relative flex w-32 shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg">
      <img alt={product.itemName} className="h-32 w-full object-cover" src={product.itemImage} />
      <div className="mt-2">
        <p className="text-foreground text-sm font-medium">{product.itemName}</p>
        <p className="text-sm font-bold text-green-600">{formatCurrency(product.price)}</p>
      </div>

      <Link to={to} className="absolute inset-0" />

      <IconButton
        aria-label="제품 삭제"
        className="absolute top-1 right-1 cursor-pointer opacity-0 transition-colors group-hover:opacity-100"
        onClick={() =>
          openConfirm({
            title: '제품 삭제',
            description: '해당 제품을 삭제하시겠습니까?',
            onConfirm: () => {
              deleteMutation.mutate(product.id);
            },
            actionText: '삭제',
          })
        }
      >
        <X />
      </IconButton>
    </div>
  );
};
