import { type ChangeEvent, useEffect, useMemo, useRef } from 'react';

import { X } from 'lucide-react';
import { toast } from 'sonner';

import { useUserProfileQuery } from '@/entities/profile';
import { getTokenUserInfo } from '@/shared/lib';
import { ImageFileButton, ProfileAvatar } from '@/shared/ui';

import PostContentInput from './PostContentInput';

export type PostCreateFormProps = {
  content: string;
  onChangeContent: (next: string) => void;
  files: File[];
  onChangeFiles: (next: File[]) => void;
};

export default function PostCreateForm({
  content,
  onChangeContent,
  files,
  onChangeFiles,
}: PostCreateFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data: me } = useUserProfileQuery(getTokenUserInfo().accountname);

  const previews = useMemo(() => {
    return files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      key: `${file.name}-${file.size}-${file.lastModified}`,
    }));
  }, [files]);

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  const onPickImages = () => {
    fileInputRef.current?.click();
  };

  const MAX_FILES = 3;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length === 0) return;

    // 남은 슬롯 체크 (이미 3장 꽉 찼으면 바로 안내)
    const remaining = MAX_FILES - files.length;
    if (remaining <= 0) {
      toast.warning(`이미지는 최대 ${MAX_FILES}장까지 업로드할 수 있어요.`);
      e.target.value = '';
      return;
    }

    // 같은 파일 중복 방지 (name/size/lastModified 기준)
    const deduped = picked.filter((f) => {
      return !files.some(
        (prev) =>
          prev.name === f.name && prev.size === f.size && prev.lastModified === f.lastModified,
      );
    });

    const dupCount = picked.length - deduped.length;
    if (dupCount > 0) {
      toast.info(`이미 추가된 파일 ${dupCount}장은 제외했어요.`);
    }

    let invalidTypeCount = 0;
    let tooLargeCount = 0;

    // 타입/용량 필터
    const valid = deduped.filter((f) => {
      const isImage = f.type?.startsWith('image/');
      if (!isImage) {
        invalidTypeCount += 1;
        return false;
      }
      if (f.size > MAX_FILE_SIZE) {
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

    // 최대 3장 제한 적용 (초과분 자동 제외)
    if (valid.length > remaining) {
      const ignored = valid.length - remaining;
      toast.warning(`이미지는 최대 ${MAX_FILES}장까지예요. ${ignored}장은 제외했어요.`);
    }

    const toAdd = valid.slice(0, remaining);
    onChangeFiles([...files, ...toAdd]);

    // 같은 파일 다시 선택 가능하도록 초기화
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
        {/* ✅ ProfileAvatar: src가 없거나 깨지면 기본 알약으로 자동 fallback */}
        <ProfileAvatar size="lg" alt={me?.username ?? 'me'} src={me?.image} />

        <div className="flex-1 space-y-3">
          <PostContentInput value={content} onChangeValue={onChangeContent} />

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

      {/* 이미지 선택 버튼 */}
      <ImageFileButton
        onClick={onPickImages}
        className="fixed right-6 bottom-24 z-50 h-14 w-14 bg-[#8BD56A] text-white shadow-md hover:bg-[#7CCF5A]"
      />
    </div>
  );
}
