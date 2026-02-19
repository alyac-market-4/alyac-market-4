import { Search } from 'lucide-react';

import { IconButton } from '@/shared/ui/IconButton';
import { Header } from '@/widgets/header';

export const ProductPage = () => {
  return (
    <>
      <Header
        left="알약마켓 상품 등록"
        right={
          <IconButton>
            <Search />
          </IconButton>
        }
      />
      <div>상품 등록 페이지</div>
    </>
  );
};
