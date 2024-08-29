import { NextPage } from 'next';
import { BackButton } from '@/components/BackButton';

const Page: NextPage = () => {
  return (
    <main className="page-style">
      <section className="bg-theme py-20">
        <div className="max-w-6xl mx-auto px-3">
          <div className="md:w-1/2">
            <BackButton />
            <h1 className="heading-primary">Faq's</h1>
            <p className="text-base">
              People will always seek help and advice. They are unwilling to
              pick up the phone, walk into a store, or wait hours (even minutes)
              for that information or insight to become accessible.
            </p>
          </div>
        </div>
      </section>
      <section className="pt-28">
        <div className="max-w-6xl mx-auto px-3"></div>
      </section>
    </main>
  );
};

export default Page;
