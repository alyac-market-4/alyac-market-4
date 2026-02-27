import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

import { productCreateSchema } from '@/features/product-create/model/schemas';
import { ProductFormFieldsBase } from '@/shared/ui/ProductFormFieldsBase';

type ProductFormInput = z.input<typeof productCreateSchema>;

interface ProductFormFieldsProps {
  register: UseFormRegister<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
}

export const ProductFormFields = ({ register, errors }: ProductFormFieldsProps) => {
  return <ProductFormFieldsBase register={register} errors={errors} />;
};
