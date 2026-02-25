import { BackButton, Button } from '@/shared/ui';
import { Header } from '@/widgets/header';

export const ProfileUpdatePage = () => {
  return (
    <>
      <Header left={<BackButton />} right={<Button>저장</Button>} />
      <main>ProfileUpdate</main>
    </>
  );
};
