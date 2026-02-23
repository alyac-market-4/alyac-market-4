import { Link } from 'react-router-dom';

import type { ProductDetail } from '@/shared/model';

interface ProductCardProps {
  product: ProductDetail;
  to: string;
}

export const ProductCard = ({ product, to }: ProductCardProps) => {
  return (
    <Link
      to={to}
      className="relative flex w-32 shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg"
    >
      <img alt={product.itemName} className="h-32 w-full object-cover" src={product.itemImage} />
      <div className="mt-2">
        <p className="text-foreground text-sm font-medium">{product.itemName}</p>
        <p className="text-sm font-bold text-green-600">{product.price}</p>
      </div>
    </Link>
  );
};
