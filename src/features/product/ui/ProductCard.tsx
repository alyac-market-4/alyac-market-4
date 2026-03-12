import { forwardRef } from 'react';

import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useDeleteProduct } from '@/entities/product';
import { formatCurrency, imageUrl, useConfirmDialogStore } from '@/shared/lib';
import type { ProductDetail } from '@/shared/model';
import { IconButton } from '@/shared/ui';

interface ProductCardProps {
  isMe: boolean;
  product: ProductDetail;
  to: string;
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ isMe, product, to }: ProductCardProps, ref) => {
    const { openConfirm } = useConfirmDialogStore();
    const { mutate: productDeleteMutate } = useDeleteProduct();

    return (
      <div
        ref={ref}
        className="hover:bg-accent group relative flex shrink-0 flex-col rounded-lg p-3"
      >
        <img
          alt={product.itemName}
          className="h-32 w-full rounded-lg object-cover"
          src={imageUrl(product.itemImage)}
        />
        <div className="mt-2">
          <p className="text-foreground text-sm font-medium">{product.itemName}</p>
          <p className="text-main-alyac-color text-sm font-bold">{formatCurrency(product.price)}</p>
        </div>

        {isMe && <Link to={to} className="absolute inset-0" />}

        {isMe && (
          <IconButton
            aria-label="상품 삭제"
            className="absolute top-1 right-1 cursor-pointer opacity-0 transition-colors group-hover:opacity-100"
            onClick={() =>
              openConfirm({
                title: '상품 삭제',
                description: '해당 상품을 삭제하시겠습니까?',
                onConfirm: () => {
                  productDeleteMutate(product.id, {
                    onSuccess: () => {
                      toast.success('상품을 삭제했습니다.');
                    },
                    onError: () => {
                      toast.error('상품 삭제에 실패했습니다.');
                    },
                  });
                },
                actionText: '삭제',
              })
            }
          >
            <X />
          </IconButton>
        )}
      </div>
    );
  },
);
