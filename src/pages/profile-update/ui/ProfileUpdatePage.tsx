import { Button } from '@/shared/ui';
import { BackButton } from '@/shared/ui/BackButton';
import { Header } from '@/widgets/header';

export const ProfileUpdatePage = () => {
  return (
    <>
      <Header left={<BackButton />} right={<Button>저장</Button>} />
      <main>ProfileUpdate</main>
    </>
  );
};
