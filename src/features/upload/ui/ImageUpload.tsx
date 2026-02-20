// features/upload/ui/ImageUpload.tsx
import { useState } from 'react';

import { useUploadFiles } from '@/entities/upload';

interface ImageUploadProps {
  onUploadComplete: (urls: string[]) => void;
  maxFiles?: number;
}

export function ImageUpload({ onUploadComplete, maxFiles = 3 }: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const uploadMutation = useUploadFiles();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > maxFiles) {
      alert(`최대 ${maxFiles}개까지 업로드 가능합니다.`);
      return;
    }

    // 미리보기 생성
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);

    // 서버 업로드
    uploadMutation.mutate(files, {
      onSuccess: (data) => {
        const urls = data.map((item) => item.filename);
        onUploadComplete(urls);
      },
      onError: (error) => {
        alert('업로드 실패: ' + error.message);
        setPreviews([]);
      },
    });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        disabled={uploadMutation.isPending}
      />

      {uploadMutation.isPending && <div>업로드 중...</div>}

      <div className="preview-container">
        {previews.map((url, index) => (
          <img key={index} src={url} alt={`Preview ${index}`} />
        ))}
      </div>
    </div>
  );
}
