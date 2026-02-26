import { useProductMutation } from '@/entities/product';
import { PRODUCT_FORM_ID, ProductCreateForm } from '@/features/product-create';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/button';
import { Header } from '@/widgets/header';

export const ProductCreatePage = () => {
  // Header 저장 버튼의 isPending 상태를 위해 mutation 상태만 가져옴
  const { createMutation } = useProductMutation();

  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <Button
            type="submit"
            form={PRODUCT_FORM_ID}
            disabled={createMutation.isPending}
            className="h-10 cursor-pointer rounded-full bg-[#6FCA3C]/50 px-6 py-1 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-[#5CB32A]"
          >
            {createMutation.isPending ? '저장 중...' : '저장'}
          </Button>
        }
      />

      <main className="bg-background flex-1 px-4 py-6">
        <ProductCreateForm />
      </main>
    </>
  );
};
