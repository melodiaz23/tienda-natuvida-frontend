import Image from "next/image";

export default function AdminNavbar() {
  return (
    <header className="bg-white shadow-sm fixed top-0 right-0 left-0 h-20 z-10">
      <div className="px-6 py-4 h-full">
        <div className="flex justify-between items-center h-full">
          <div>
            <Image
              src="/natuvida-logo.png"
              alt="logo"
              width={100}
              height={100}
              className="cursor-pointer h-12 w-auto"
              priority
            />
          </div>
          <div>
            <span className="text-sm text-gray-600">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
}
