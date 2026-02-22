import { useRef } from 'react';

import PostContentInput from '@/features/post-create/ui/PostContentInput';

type Props = {
  content: string;
  onChangeContent: (next: string) => void;

  files: File[];
  onChangeFiles: (next: File[]) => void;
};

export default function PostCreateForm({ content, onChangeContent, files, onChangeFiles }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onPickFiles = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextFiles = e.target.files ? Array.from(e.target.files) : [];
    onChangeFiles(nextFiles);
  };

  return (
    <div className="flex gap-3">
      {/* 왼쪽 프로필 자리 (일단 틀) */}
      <div className="bg-muted h-10 w-10 shrink-0 rounded-full" />

      {/* 입력 영역 */}
      <div className="relative flex-1">
        <PostContentInput value={content} onChangeValue={onChangeContent} />

        {/* 숨겨진 파일 인풋 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onFileChange}
        />

        {/* 우하단 이미지 버튼(틀) */}
        <button
          type="button"
          onClick={onPickFiles}
          className="fixed right-6 bottom-24 grid h-14 w-14 place-items-center rounded-full bg-[#A7D676] shadow-md"
          aria-label="이미지 선택"
        >
          <span className="text-xl">🖼️</span>
        </button>

        {/* 선택된 파일 개수 표시(디버그/임시) */}
        {files.length > 0 && (
          <div className="mt-2 text-xs opacity-60">선택된 이미지: {files.length}개</div>
        )}
      </div>
    </div>
  );
}
