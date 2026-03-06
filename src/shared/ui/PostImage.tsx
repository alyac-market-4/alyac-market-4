import { imageUrl } from '@/shared/lib/imageUrl';

type Props = {
  src?: string | null;
  alt?: string;
};

export function PostImage({ src, alt = 'Post image' }: Props) {
  const url = imageUrl(src);
  if (!url) return null;

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border bg-white dark:bg-zinc-900">
      <div className="flex w-full items-center justify-center p-6">
        <img
          src={url}
          alt={alt}
          className="max-h-[480px] w-full max-w-[720px] object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
}
