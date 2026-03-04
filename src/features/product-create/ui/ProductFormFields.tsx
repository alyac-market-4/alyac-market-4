import { type FieldErrors, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';
import { z } from 'zod';

import { productCreateSchema } from '@/features/product-create/model/schemas';
import { ProductFormFieldsBase } from '@/shared/ui/ProductFormFieldsBase';

type ProductFormInput = z.input<typeof productCreateSchema>;

interface ProductFormFieldsProps {
  register: UseFormRegister<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
  setValue: UseFormSetValue<ProductFormInput>;
}

export const ProductFormFields = ({ register, errors, setValue }: ProductFormFieldsProps) => {
  return <ProductFormFieldsBase register={register} errors={errors} setValue={setValue} />;
};
