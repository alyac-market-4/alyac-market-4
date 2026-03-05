import { useState } from 'react';

import { useProductCreate } from '@/entities/product';
import { PRODUCT_FORM_ID, ProductCreateForm } from '@/features/product-create';
import { BackButton, Button } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const ProductCreatePage = () => {
  const { mutate: productCreate, isPending: isProductCreatePending } = useProductCreate();
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <Button
            type="submit"
            form={PRODUCT_FORM_ID}
            disabled={isProductCreatePending || !isFormValid}
            className={`h-10 rounded-full px-6 py-1 text-sm font-medium whitespace-nowrap text-white transition-colors ${
              isFormValid
                ? 'cursor-pointer bg-[#6FCA3C]/50 hover:bg-[#5CB32A]'
                : 'pointer-events-none cursor-not-allowed bg-gray-300'
            }`}
          >
            {isProductCreatePending ? '저장 중...' : '저장'}
          </Button>
        }
      />
      <main className="bg-background flex-1 px-4 py-6">
        <ProductCreateForm onValidChange={setIsFormValid} />
      </main>
    </>
  );
};
