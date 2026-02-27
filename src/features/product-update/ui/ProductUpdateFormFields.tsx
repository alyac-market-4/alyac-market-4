import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

import { productUpdateSchema } from '@/features/product-update/model/schemas';
import { ProductFormFieldsBase } from '@/shared/ui/ProductFormFieldsBase';

type ProductUpdateFormInput = z.input<typeof productUpdateSchema>;

interface ProductUpdateFormFieldsProps {
  register: UseFormRegister<ProductUpdateFormInput>;
  errors: FieldErrors<ProductUpdateFormInput>;
}

export const ProductUpdateFormFields = ({ register, errors }: ProductUpdateFormFieldsProps) => {
  return <ProductFormFieldsBase register={register} errors={errors} />;
};
