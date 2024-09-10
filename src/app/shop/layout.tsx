import { Footer } from '@/components/Layouts/Footer';
import { NavBar } from '@/components/Layouts/NavBar';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>;
      <Footer />
    </>
  );
}
