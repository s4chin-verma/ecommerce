import { SideNav } from '@/components/admin/SideNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-gray-100 min-h-screen">
      <SideNav />
      <section className="p-6 ml-64 ">{children}</section>
    </main>
  );
}
