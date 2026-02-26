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

  // ✅ 기존 이미지(수정 화면에서 서버에서 내려온 이미지) 지원
  existingImages?: string[]; // post.image 원본 조각들(콤마 split 결과)
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

  // ✅ 기존 이미지(문자열) -> 브라우저에서 열 수 있는 URL로 변환
  const existingPreviewUrls = useMemo(() => {
    return imageUrls(existingImages.join(','));
  }, [existingImages]);

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

          {/* ✅ 기존 이미지 미리보기 */}
          {existingPreviewUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {existingPreviewUrls.map((url, idx) => (
                <div key={`${url}-${idx}`} className="relative overflow-hidden rounded-xl border">
                  <img
                    src={url}
                    alt={`existing-${idx}`}
                    className="aspect-square w-full object-cover"
                  />
                  {onRemoveExistingImage && (
                    <button
                      type="button"
                      onClick={() => onRemoveExistingImage(idx)}
                      className="absolute top-1 right-1 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white"
                      aria-label="기존 이미지 제거"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ✅ 새로 추가한 이미지 미리보기 */}
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {previews.map((p) => (
                <div key={p.key} className="relative overflow-hidden rounded-xl border">
                  <img
                    src={p.url}
                    alt={p.file.name}
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(p.key)}
                    className="absolute top-1 right-1 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white"
                    aria-label="이미지 제거"
                  >
                    <X className="h-4 w-4" />
                  </button>
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
