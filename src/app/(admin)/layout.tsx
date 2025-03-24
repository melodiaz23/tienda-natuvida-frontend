// app/(admin)/layout.tsx
import AdminNavbar from '@/components/admin/AdminNavbar';
import Sidebar from '@/components/admin/Sidebar';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="pt-20 pl-64 min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="p-6">
          {children}
        </div>
      </main>
    </>
  );
}