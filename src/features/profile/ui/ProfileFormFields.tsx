import { type Control } from 'react-hook-form';

import { type ProfileFormData } from '@/entities/profile';
import { ProfileImageUpload } from '@/features/profile';
import { FormInputField } from '@/shared/ui';

interface ProfileFormFieldsProps {
  control: Control<ProfileFormData>;
  initialImage?: string;
  username?: string;
  onUploadComplete: (filename: string) => void;
  isAccountnameDisabled?: boolean;
}

export const ProfileFormFields = ({
  control,
  initialImage,
  username,
  onUploadComplete,
  isAccountnameDisabled = false,
}: ProfileFormFieldsProps) => {
  return (
    <>
      <div className="flex justify-center">
        <ProfileImageUpload
          initialImage={initialImage}
          alt={username ?? '프로필 이미지'}
          onUploadComplete={onUploadComplete}
        />
      </div>

      <FormInputField
        control={control}
        name="username"
        label="사용자 이름"
        placeholder="이름을 입력하세요."
        type="text"
      />

      <div className="flex flex-col gap-1">
        <FormInputField
          control={control}
          name="accountname"
          label="계정 ID"
          placeholder="계정 아이디를 입력하세요."
          type="text"
          disabled={isAccountnameDisabled}
        />
        {isAccountnameDisabled && (
          <p className="text-muted-foreground text-xs">계정 ID는 변경할 수 없습니다.</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <FormInputField
          control={control}
          name="intro"
          label="소개"
          placeholder="간단한 자기 소개를 입력하세요."
          type="text"
        />
        <p className="text-muted-foreground text-xs">최대 60자</p>
      </div>
    </>
  );
};
