import SearchInput from '@/features/account-search/ui/SearchInput';
import { Header } from '@/widgets/header';

export const AccountSearchPage = () => {
  return (
    <>
      <Header left={<SearchInput />} />

      <main className="px-4 py-8">
        <div className="text-center text-sm opacity-60">계정을 검색해보세요.</div>
      </main>
    </>
  );
};
