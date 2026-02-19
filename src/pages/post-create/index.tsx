import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/button';
import { Header } from '@/widgets/header';

export const PostCreatePage = () => {
  return (
    <>
      <Header
        left={<BackButton />}
        right={
          <Button variant="default" size="lg" disabled>
            업로드
          </Button>
        }
      />
      <div>PostCreate</div>
    </>
  );
};
