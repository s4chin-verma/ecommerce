import { SideNav } from '@/components/admin/SideNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
