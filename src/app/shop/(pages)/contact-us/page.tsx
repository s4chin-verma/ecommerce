import { BackButton } from '@/components/BackButton';
import ContactForm from '@/components/ContactForm';
import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <main className="page-style">
      <section className="bg-theme py-20">
        <div className="max-w-6xl mx-auto px-3">
          <div className="md:w-2/5">
            <BackButton />
            <h1 className="my-6 text-4xl font-bold">Contact Us</h1>
            <p className="text-sm">
              With that in mind, we strive to deliver accurate, trustworthy, and
              engaging content to our users. Our team of experts, researchers,
              and writers work tirelessly to curate high-quality articles,
              guides, and resources that cover various domains such as
              technology, science, health, business, and more.
            </p>
          </div>
        </div>
      </section>
      <section className="pt-10 md:pt-20">
        <div className="max-w-6xl mx-auto px-3">
          <div className="w-full flex flex-col md:flex-row">
            <div className="flex flex-wrap w-2/5">
              <div className="flex-1">
                <div>
                  <h4 className="font-bold text-lg">CALL US</h4>
                  <h5 className="mt-1 text-sm">+91 XYZ980220D</h5>
                </div>
                <div className="mt-4">
                  <h4 className="font-bold text-lg">EMAIL:</h4>
                  <h5 className="mt-1 text-sm">shop@company.com</h5>
                </div>
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <h4 className="font-bold text-lg">ADDRESS:</h4>
                <h5 className="mt-1 text-sm">
                  1093 Marigold Lane, Coral Way, Miami, Florida, 33169
                </h5>
              </div>
            </div>
            <div className="w-full md:w-[57%] mt-6 md:-mt-64 md:ml-10">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                Contact Form
              </h1>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
