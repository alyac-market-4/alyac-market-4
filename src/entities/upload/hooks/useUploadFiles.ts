// 이미지 다중 업로드 API(uploadFiles)를 react-query mutation 훅으로 제공하는 모듈
import { useMutation } from '@tanstack/react-query';

import { uploadFiles } from '../api/uploadFiles';

export const useUploadFiles = () => {
  return useMutation({
    mutationFn: uploadFiles,
  });
};
