'use client';

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

export default function AdminNavbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm fixed top-0 right-0 left-0 h-20 z-10">
      <div className="px-6 py-4 h-full">
        <div className="flex justify-between items-center h-full">
          <Link href="/">
            <Image
              src="/natuvida-logo.png"
              alt="logo"
              width={100}
              height={100}
              className="cursor-pointer h-12 w-auto"
              priority
            />
          </Link>
          <div>
            <span className="text-sm text-gray-600 flex gap-1 items-center">Hola<span className="font-bold">{user ? user.name : 'Admin User'}</span>👩🏻‍💻</span>
          </div>
        </div>
      </div>
    </header>
  );
}
