import { axiosInstance } from '@/shared/api/axios';

export interface UploadResponse {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

// 단일 이미지 업로드 - 프로필 등에서 사용
export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post('/api/image/uploadfile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
