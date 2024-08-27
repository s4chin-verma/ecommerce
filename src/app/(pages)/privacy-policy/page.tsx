import { cn } from '@/lib/utils';
import { NextPage } from 'next';
import { BackButton } from '@/components/BackButton';

const Page: NextPage = () => {
  const h2 = `text-black text-2xl font-bold my-4`;
  const p = `text-base text-justify my-2`;

  return (
    <main className="py-36 pb-20">
      <section className="bg-theme py-20">
        <div className="max-w-6xl mx-auto px-3">
          <div className="w-1/2">
            <BackButton />
            <h1 className="text-4xl font-bold my-6">Privacy Policy</h1>
            <p className="text-base">
              We value the diverse perspectives and experiences of our users,
              and we encourage collaboration and community engagement. Our
              platform provides opportunities for users to contribute their
              knowledge, share their opinions, and engage in discussions with
              like-minded individuals.
            </p>
          </div>
        </div>
      </section>
      <section className="pt-28">
        <div className="max-w-6xl mx-auto px-3">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className={cn('font-bold', p)}>
            When you visit the Site, we automatically collect certain
            information about your device, including information about your web
            browser, IP address, time zone, and some of the cookies that are
            installed on your device. Additionally, as you browse the Site, we
            collect information about the individual web pages or products that
            you view, what websites or search terms referred you to the Site,
            and information about how you interact with the Site. We refer to
            this automatically-collected information as “Device Information”.
          </p>
          <p className={p}>
            Additionally when you make a purchase or attempt to make a purchase
            through the Site, we collect certain information from you, including
            your name, billing address, shipping address, payment information,
            email address, and phone number. We refer to this information as
            “Order Information”.When we talk about “Personal Information” in
            this Privacy Policy, we are talking both about Device Information
            and Order Information.
          </p>
          <h2 className={h2}>How do we use your personal information?</h2>
          <p className={p}>
            We use the Order Information that we collect generally to fulfill
            any orders placed through the Site (including processing your
            payment information, arranging for shipping, and providing you with
            invoices and/or order confirmations). Additionally, we use this
            Order Information to:
          </p>
          <ul className="list-disc px-5 gap-4">
            <li className="mb-2">Communicate with you.</li>
            <li className="mb-2">
              Screen our orders for potential risk or fraud.
            </li>
            <li className="mb-2">
              When in line with the preferences you have shared with us.
            </li>
            <li className="mb-2">
              provide you with information or advertising relating to our
              products or services.
            </li>
          </ul>
          <p className={p}>
            We use the Device Information that we collect to help us screen for
            potential risk and fraud (in particular, your IP address), and more
            generally to improve and optimize our Site (for example, by
            generating analytics about how our customers browse and interact
            with the Site, and to assess the success of our marketing and
            advertising campaigns).
          </p>
        </div>
      </section>
    </main>
  );
};

export default Page;
