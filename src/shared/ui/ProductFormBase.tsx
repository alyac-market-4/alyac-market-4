import { type FieldValues, type SubmitHandler, type UseFormHandleSubmit } from 'react-hook-form';

import { Button } from '@/shared/ui/button';

interface ProductFormBaseProps<T extends FieldValues> {
  formId: string;
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: SubmitHandler<T>;
  isPending: boolean;
  showSubmitButton?: boolean;
  isFormValid?: boolean;
  imageUploadSlot: React.ReactNode;
  formFieldsSlot: React.ReactNode;
}

export const ProductFormBase = <T extends FieldValues>({
  formId,
  handleSubmit,
  onSubmit,
  isPending,
  showSubmitButton = false,
  isFormValid = false,
  imageUploadSlot,
  formFieldsSlot,
}: ProductFormBaseProps<T>) => {
  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 이미지 업로드 영역 (create/update 각자 주입) */}
      {imageUploadSlot}

      {/* 폼 필드 영역 (create/update 각자 주입) */}
      {formFieldsSlot}

      {showSubmitButton && (
        <Button variant="alyac" type="submit" disabled={isPending || !isFormValid}>
          {isPending ? '저장 중...' : '저장'}
        </Button>
      )}
    </form>
  );
};
