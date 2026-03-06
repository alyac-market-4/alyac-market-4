import { type FieldErrors, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';
import { z } from 'zod';

import { productSchema } from '@/features/product/model/schemas';
import { ProductFormFieldsBase } from '@/shared/ui/ProductFormFieldsBase';

type ProductFormInput = z.input<typeof productSchema>;

interface ProductFormFieldsProps {
  register: UseFormRegister<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
  setValue: UseFormSetValue<ProductFormInput>;
}

export const ProductFormFields = ({ register, errors, setValue }: ProductFormFieldsProps) => {
  return <ProductFormFieldsBase register={register} errors={errors} setValue={setValue} />;
};
