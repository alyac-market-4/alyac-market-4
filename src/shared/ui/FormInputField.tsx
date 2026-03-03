import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputGroup,
  InputGroupInput,
} from './index';

interface FormInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

export const FormInputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  disabled,
}: FormInputFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputGroup variant="auth" size="auth">
              <InputGroupInput
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                {...field}
              />
            </InputGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
