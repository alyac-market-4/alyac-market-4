import { useEffect, useMemo, useRef } from 'react';

import { X } from 'lucide-react';

import { useUserProfileQuery } from '@/entities/profile';
import PostContentInput from '@/features/post-create/ui/PostContentInput';
import { getTokenUserInfo, imageUrls } from '@/shared/lib';
import { ImageFileButton, ProfileAvatar } from '@/shared/ui';

export type PostEditFormProps = {
  content: string;
  onChangeContent: (next: string) => void;

  // 새로 선택한 파일들
  files: File[];
  onChangeFiles: (next: File[]) => void;

  // 기존 이미지(수정 화면에서 서버에서 내려온 이미지)
  existingImages?: string[]; // post.image를 split한 조각들
  onRemoveExistingImage?: (index: number) => void;
};

export const PostEditForm = ({
  content,
  onChangeContent,
  files,
  onChangeFiles,
  existingImages = [],
  onRemoveExistingImage,
}: PostEditFormProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: me } = useUserProfileQuery(getTokenUserInfo().accountname);

  // ✅ 새로 선택한 파일 preview
  const previews = useMemo(() => {
    return files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      key: `${file.name}-${file.size}-${file.lastModified}`,
    }));
  }, [files]);

  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  // ✅ 기존 이미지(문자열 segment) -> 실제 이미지 URL로 변환
  const existingPreviewUrls = useMemo(() => {
    // existingImages 각각이 "uploadFiles/xxx.jpg" 같은 단일 segment라고 가정
    // imageUrls는 콤마 문자열도 처리하므로 segment 하나 넣어도 OK
    return existingImages.flatMap((seg) => imageUrls(seg));
  }, [existingImages]);

  // ✅ 기존 + 새 이미지를 하나의 grid에서 보여주기 위한 합친 목록
  const mergedPreviews = useMemo(() => {
    const existing = existingPreviewUrls.map((url, idx) => ({
      type: 'existing' as const,
      url,
      index: idx, // existingImages의 인덱스와 동일하게 유지(삭제용)
      key: `existing-${idx}`,
    }));

    const news = previews.map((p) => ({
      type: 'new' as const,
      url: p.url,
      key: p.key,
    }));

    return [...existing, ...news];
  }, [existingPreviewUrls, previews]);

  const onPickImages = () => fileInputRef.current?.click();

  const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length === 0) return;

    const nextUnique = picked.filter(
      (f) =>
        !files.some(
          (prev) =>
            prev.name === f.name && prev.size === f.size && prev.lastModified === f.lastModified,
        ),
    );

    onChangeFiles([...files, ...nextUnique]);
    e.target.value = '';
  };

  const removeFile = (key: string) => {
    onChangeFiles(files.filter((f) => `${f.name}-${f.size}-${f.lastModified}` !== key));
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onChangeFileInput}
      />

      <div className="flex items-start gap-3">
        <ProfileAvatar size="lg" alt={me?.username ?? 'me'} src={me?.image} />

        <div className="flex-1 space-y-3">
          <PostContentInput value={content} onChangeValue={onChangeContent} />

          {/* ✅ 기존 + 새 이미지를 한 grid에서 렌더링 */}
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

                  {item.type === 'new' && (
                    <button
                      type="button"
                      onClick={() => removeFile(item.key)}
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

      <ImageFileButton
        onClick={onPickImages}
        className="fixed right-6 bottom-24 z-50 h-14 w-14 bg-[#8BD56A] text-white shadow-md hover:bg-[#7CCF5A]"
      />
    </div>
  );
};
