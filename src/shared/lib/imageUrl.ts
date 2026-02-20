// shared/lib/imageUrl.ts
export const imageUrl = (path: string | undefined): string => {
  if (!path) return '/default-image.png';

  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
  return `${baseUrl}${path}`;
};
