import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useUpdateProduct } from '@/entities/product';
import { PRODUCT_UPDATE_FORM_ID, ProductUpdateForm } from '@/features/product-update';
import { BackButton, Button } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const ProductUpdatePage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { mutate: productUpdate, isPending: isProductUpdatePending } = useUpdateProduct();
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
            variant="alyac"
            type="submit"
            form={PRODUCT_UPDATE_FORM_ID}
            disabled={isProductUpdatePending || !isFormValid}
          >
            {isProductUpdatePending ? '저장 중...' : '저장'}
          </Button>
        }
      />
      <main className="bg-background flex-1 px-4 py-6">
        <ProductUpdateForm productId={productId} onValidChange={setIsFormValid} />
      </main>
    </>
  );
};
