// 게시물 작성/수정 공통 폼
import { type ChangeEvent, useEffect, useMemo, useRef } from 'react';

import { X } from 'lucide-react';
import { toast } from 'sonner';

import { PostContentInput } from '@/entities/post';
import { useUserProfile } from '@/entities/profile';
import { getTokenUserInfo, imageUrls } from '@/shared/lib';
import { ImageFileButton, ProfileAvatar } from '@/shared/ui';

type Props = {
  content: string;
  onChangeContent: (next: string) => void;
  files: File[];
  onChangeFiles: (next: File[]) => void;
  existingImages?: string[];
  onRemoveExistingImage?: (index: number) => void;
};

// 업로드 가능한 최대 이미지 개수
const MAX_FILES = 3;

// 이미지 1장당 최대 용량(5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function PostForm({
  content,
  onChangeContent,
  files,
  onChangeFiles,
  existingImages = [],
  onRemoveExistingImage,
}: Props) {
  // 숨겨진 파일 input을 버튼 클릭으로 열기 위한 ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 현재 로그인한 사용자 프로필 정보 조회
  const { data: me } = useUserProfile(getTokenUserInfo().accountname);

  // 새로 선택한 파일들을 브라우저 미리보기 URL로 변환
  const previews = useMemo(() => {
    return files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      key: `${file.name}-${file.size}-${file.lastModified}`,
    }));
  }, [files]);

  // 컴포넌트가 바뀌거나 사라질 때 생성한 미리보기 URL 정리
  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  // 서버에 저장된 기존 이미지 경로를 실제 표시 가능한 URL 배열로 변환
  const existingPreviewUrls = useMemo(() => {
    return existingImages.flatMap((segment) => imageUrls(segment));
  }, [existingImages]);

  // 기존 이미지 + 새 이미지 미리보기를 하나의 배열로 합쳐서 화면에 표시
  const mergedPreviews = useMemo(() => {
    const existing = existingPreviewUrls.map((url, index) => ({
      type: 'existing' as const,
      url,
      index,
      key: `existing-${index}`,
    }));

    const nextFiles = previews.map((preview) => ({
      type: 'new' as const,
      url: preview.url,
      key: preview.key,
    }));

    return [...existing, ...nextFiles];
  }, [existingPreviewUrls, previews]);

  // 이미지 추가 버튼 클릭 시 숨겨진 파일 선택창 열기
  const onPickImages = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 시 실행되는 이미지 검증/추가 로직
  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length === 0) return;

    // 현재 남은 업로드 가능 개수 계산
    const currentTotal = existingImages.length + files.length;
    const remaining = MAX_FILES - currentTotal;

    // 이미 최대 개수라면 추가 업로드 차단
    if (remaining <= 0) {
      toast.warning(`이미지는 최대 ${MAX_FILES}장까지 업로드할 수 있어요.`);
      e.target.value = '';
      return;
    }

    // 이미 선택된 파일과 중복되는 파일 제거
    const deduped = picked.filter((file) => {
      return !files.some(
        (prev) =>
          prev.name === file.name &&
          prev.size === file.size &&
          prev.lastModified === file.lastModified,
      );
    });

    const duplicateCount = picked.length - deduped.length;

    // 중복 파일이 있으면 제외했다는 안내 표시
    if (duplicateCount > 0) {
      toast.info(`이미 추가된 파일 ${duplicateCount}장은 제외했어요.`);
    }

    let invalidTypeCount = 0;
    let tooLargeCount = 0;

    // 이미지 타입/용량 조건을 만족하는 파일만 남김
    const valid = deduped.filter((file) => {
      const isImage = file.type?.startsWith('image/');
      if (!isImage) {
        invalidTypeCount += 1;
        return false;
      }

      if (file.size > MAX_FILE_SIZE) {
        tooLargeCount += 1;
        return false;
      }

      return true;
    });

    // 이미지 파일이 아닌 경우 에러 안내
    if (invalidTypeCount > 0) {
      toast.error('이미지 파일만 업로드할 수 있어요.');
    }

    // 용량 초과 파일이 있는 경우 에러 안내
    if (tooLargeCount > 0) {
      toast.error('이미지는 1장당 5MB 이하만 업로드 가능해요.');
    }

    // 조건을 통과한 파일이 하나도 없으면 종료
    if (valid.length === 0) {
      e.target.value = '';
      return;
    }

    // 남은 개수보다 많이 선택했으면 초과분 제외
    if (valid.length > remaining) {
      const ignoredCount = valid.length - remaining;
      toast.warning(`이미지는 최대 ${MAX_FILES}장까지예요. ${ignoredCount}장은 제외했어요.`);
    }

    // 최종적으로 추가 가능한 파일만 상태에 반영
    const toAdd = valid.slice(0, remaining);
    onChangeFiles([...files, ...toAdd]);

    // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
    e.target.value = '';
  };

  // 새로 선택한 이미지 미리보기 중 하나를 제거
  const removeNewFile = (key: string) => {
    onChangeFiles(files.filter((file) => `${file.name}-${file.size}-${file.lastModified}` !== key));
  };

  return (
    <div className="relative">
      {/* 실제 파일 선택을 담당하는 숨겨진 input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onChangeFileInput}
      />

      <div className="flex items-start gap-3">
        {/* 현재 사용자 프로필 이미지 표시 */}
        <ProfileAvatar size="lg" alt={me?.username ?? 'me'} src={me?.image} />

        <div className="flex-1 space-y-3">
          {/* 게시글 내용 입력창 */}
          <PostContentInput value={content} onChangeValue={onChangeContent} />

          {/* 기존 이미지와 새 이미지 미리보기 목록 표시 */}
          {mergedPreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {mergedPreviews.map((item) => (
                <div key={item.key} className="relative overflow-hidden rounded-xl border">
                  <img
                    src={item.url}
                    alt="preview"
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />

                  {/* 기존 이미지는 수정 페이지에서만 삭제 가능 */}
                  {item.type === 'existing' && onRemoveExistingImage && (
                    <button
                      type="button"
                      onClick={() => onRemoveExistingImage(item.index)}
                      className="absolute top-1 right-1 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white"
                      aria-label="기존 이미지 제거"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}

                  {/* 새로 선택한 이미지는 즉시 목록에서 제거 가능 */}
                  {item.type === 'new' && (
                    <button
                      type="button"
                      onClick={() => removeNewFile(item.key)}
                      className="absolute top-1 right-1 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white"
                      aria-label="이미지 제거"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 이미지 추가 버튼 */}
      <ImageFileButton
        onClick={onPickImages}
        className="fixed right-6 bottom-24 z-50 h-14 w-14 bg-[#8BD56A] text-white shadow-md hover:bg-[#7CCF5A]"
      />
    </div>
  );
}

export default PostForm;
