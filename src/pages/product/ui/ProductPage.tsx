import { useState } from 'react';

import { ImagePlus } from 'lucide-react';

import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/button';
import { Header } from '@/widgets/header';

export const ProductPage = () => {
  return (
    <>
      {/* 헤더 */}
      <Header
        left={<BackButton />}
        right={
          <Button className="rounded-full bg-green-600 px-6 text-white hover:bg-green-700">
            저장
          </Button>
        }
      />
      <div>상품 등록 페이지</div>
    </>
  );
};
