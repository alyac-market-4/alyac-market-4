import { useMemo, useState } from 'react';

import PostCreateForm from '@/features/post-create/ui/PostCreateForm';
import PostSubmitButton from '@/features/post-create/ui/PostSubmitButton';
import { BackButton } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const PostCreatePage = () => {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const canUpload = useMemo(() => {
    return content.trim().length > 0 || files.length > 0;
  }, [content, files.length]);

  const onClickUpload = () => {
    // TODO: 나중에 실제 업로드 API 연결
    // 지금은 틀만 잡아두는 단계
    console.log('upload', { content, files });
  };

  return (
    <>
      {/* ✅ 화살표 크기/스타일은 shared/ui/BackButton 그대로 사용 */}
      <Header
        left={<BackButton />}
        right={<PostSubmitButton disabled={!canUpload} onClick={onClickUpload} />}
      />

      <main className="px-4 py-6">
        <PostCreateForm
          content={content}
          onChangeContent={setContent}
          files={files}
          onChangeFiles={setFiles}
        />
      </main>
    </>
  );
};
