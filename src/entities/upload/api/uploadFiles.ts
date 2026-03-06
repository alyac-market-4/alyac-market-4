// 여러 이미지 파일을 FormData로 묶어 /api/image/uploadfiles로 업로드하고 파일명을 반환하는 API 함수
import { uploadApi } from '@/shared/api';

export interface UploadResponse {
  filename: string;
}

export const uploadFiles = async (files: File[]): Promise<UploadResponse[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('image', file);
  });

  const response = await uploadApi.post('/api/image/uploadfiles', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
