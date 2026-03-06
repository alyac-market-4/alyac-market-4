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

const MAX_FILES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function PostForm({
  content,
  onChangeContent,
  files,
  onChangeFiles,
  existingImages = [],
  onRemoveExistingImage,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: me } = useUserProfile(getTokenUserInfo().accountname);

  const previews = useMemo(() => {
    return files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      key: `${file.name}-${file.size}-${file.lastModified}`,
    }));
  }, [files]);

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  const existingPreviewUrls = useMemo(() => {
    return existingImages.flatMap((segment) => imageUrls(segment));
  }, [existingImages]);

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

  const onPickImages = () => {
    fileInputRef.current?.click();
  };

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length === 0) return;

    const currentTotal = existingImages.length + files.length;
    const remaining = MAX_FILES - currentTotal;

    if (remaining <= 0) {
      toast.warning(`이미지는 최대 ${MAX_FILES}장까지 업로드할 수 있어요.`);
      e.target.value = '';
      return;
    }

    const deduped = picked.filter((file) => {
      return !files.some(
        (prev) =>
          prev.name === file.name &&
          prev.size === file.size &&
          prev.lastModified === file.lastModified,
      );
    });

    const duplicateCount = picked.length - deduped.length;
    if (duplicateCount > 0) {
      toast.info(`이미 추가된 파일 ${duplicateCount}장은 제외했어요.`);
    }

    let invalidTypeCount = 0;
    let tooLargeCount = 0;

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

    if (invalidTypeCount > 0) {
      toast.error('이미지 파일만 업로드할 수 있어요.');
    }

    if (tooLargeCount > 0) {
      toast.error('이미지는 1장당 5MB 이하만 업로드 가능해요.');
    }

    if (valid.length === 0) {
      e.target.value = '';
      return;
    }

    if (valid.length > remaining) {
      const ignoredCount = valid.length - remaining;
      toast.warning(`이미지는 최대 ${MAX_FILES}장까지예요. ${ignoredCount}장은 제외했어요.`);
    }

    const toAdd = valid.slice(0, remaining);
    onChangeFiles([...files, ...toAdd]);

    e.target.value = '';
  };

  const removeNewFile = (key: string) => {
    onChangeFiles(files.filter((file) => `${file.name}-${file.size}-${file.lastModified}` !== key));
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

      <ImageFileButton
        onClick={onPickImages}
        className="fixed right-6 bottom-24 z-50 h-14 w-14 bg-[#8BD56A] text-white shadow-md hover:bg-[#7CCF5A]"
      />
    </div>
  );
}

export default PostForm;
