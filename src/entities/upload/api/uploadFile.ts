import { axiosInstance } from '@/shared/api/axios';

import type { UploadResponse } from '../model/types';

// 단일 이미지 업로드 - 프로필 등에서 사용
export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post('/image/uploadfile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};
