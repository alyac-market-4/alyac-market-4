import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useProductMutation } from '@/entities/product';
import { PRODUCT_UPDATE_FORM_ID, ProductUpdateForm } from '@/features/product-update';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/button';
import { Header } from '@/widgets/header';

export const ProductUpdatePage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { updateMutation } = useProductMutation();
  const [isFormValid, setIsFormValid] = useState(false);

  if (!productId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-red-500">잘못된 접근입니다.</p>
      </div>
    );
  }

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <Button
            type="submit"
            form={PRODUCT_UPDATE_FORM_ID}
            disabled={updateMutation.isPending || !isFormValid}
            className={`h-10 rounded-full px-6 py-1 text-sm font-medium whitespace-nowrap text-white transition-colors ${
              isFormValid
                ? 'cursor-pointer bg-[#6FCA3C]/50 hover:bg-[#5CB32A]'
                : 'pointer-events-none cursor-not-allowed bg-gray-300'
            }`}
          >
            {updateMutation.isPending ? '저장 중...' : '저장'}
          </Button>
        }
      />
      <main className="bg-background flex-1 px-4 py-6">
        <ProductUpdateForm productId={productId} onValidChange={setIsFormValid} />
      </main>
    </>
  );
};
