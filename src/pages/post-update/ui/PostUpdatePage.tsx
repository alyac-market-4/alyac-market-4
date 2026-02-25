import { BackButton } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const PostUpdatePage = () => {
  return (
    <>
      <Header left={<BackButton />} right={<Button variant="alyac">수정</Button>} />
      <div>PostUpdate</div>
    </>
  );
};
