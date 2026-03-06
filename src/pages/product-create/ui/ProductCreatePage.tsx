import { useState } from 'react';

import { useCreateProduct } from '@/entities/product';
import { PRODUCT_FORM_ID, ProductCreateForm } from '@/features/product-create';
import { BackButton, Button } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const ProductCreatePage = () => {
  const { mutate: productCreate, isPending: isProductCreatePending } = useCreateProduct();
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <Button
            variant="alyac"
            type="submit"
            form={PRODUCT_FORM_ID}
            disabled={isProductCreatePending || !isFormValid}
          >
            {isProductCreatePending ? '저장 중...' : '저장'}
          </Button>
        }
      />
      <main className="bg-background flex-1 px-4 py-6">
        <ProductCreateForm
          onValidChange={setIsFormValid}
          productCreate={productCreate}
          isProductCreatePending={isProductCreatePending}
        />
      </main>
    </>
  );
};
