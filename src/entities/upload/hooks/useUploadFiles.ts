// entities/upload/hooks/useUploadFiles.ts
import { useMutation } from '@tanstack/react-query';

import { uploadFiles } from '../api/uploadFiles';

export const useUploadFiles = () => {
  return useMutation({
    mutationFn: uploadFiles,
  });
};
