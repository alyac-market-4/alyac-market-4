import { useMutation } from '@tanstack/react-query';

import { uploadFile } from '../api/uploadFile';

export const useUploadFile = () => {
  return useMutation({
    mutationFn: uploadFile,
  });
};
