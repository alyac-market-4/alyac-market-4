// 게시물 작성/수정 공통 폼
import { PostContentInput } from '@/entities/post';
import { useUserProfile } from '@/entities/profile';
import { getTokenUserInfo } from '@/shared/lib';
import { ProfileAvatar } from '@/shared/ui';

import { PostImageField } from './PostImageField';

type Props = {
  content: string;
  onChangeContent: (next: string) => void;
  files: File[];
  onChangeFiles: (next: File[]) => void;
  existingImages?: string[];
  onRemoveExistingImage?: (index: number) => void;
};

export function PostForm({
  content,
  onChangeContent,
  files,
  onChangeFiles,
  existingImages = [],
  onRemoveExistingImage,
}: Props) {
  // 현재 로그인한 사용자 프로필 정보 조회
  const { data: me } = useUserProfile(getTokenUserInfo().accountname);

  return (
    <div className="relative">
      <div className="flex items-start gap-3">
        {/* 현재 사용자 프로필 이미지 표시 */}
        <ProfileAvatar size="lg" alt={me?.username ?? 'me'} src={me?.image} />

        <div className="flex-1 space-y-3">
          {/* 게시글 내용 입력창 */}
          <PostContentInput value={content} onChangeValue={onChangeContent} />

          {/* 이미지 업로드/미리보기/삭제 영역 */}
          <PostImageField
            files={files}
            onChangeFiles={onChangeFiles}
            existingImages={existingImages}
            onRemoveExistingImage={onRemoveExistingImage}
          />
        </div>
      </div>
    </div>
  );
}

export default PostForm;
