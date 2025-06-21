'use client';
// import Skeleton from "@/components/common/Skeleton";
// import { Suspense } from "react";

function VerifyEmailPage() {
  // TODO: Verify email    
  return (
    <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 items-center justify-center flex flex-col text-green-dark font-semibold">
      <div className="border rounded-lg shadow-xl w-2/5 p-14 flex flex-col justify-center items-center gap-6">
        <h1 className="text-2xl text-center">Verificación de Email</h1>
        <p className="text-center text-gray-500">Verificando tu dirección e-mail, por favor espera...</p>
      </div>
    </div>
  );
}

function Page() {
  return (
    // <Suspense fallback={<Skeleton />}>
    <div>
      <VerifyEmailPage />

    </div>

  );
}

export default Page;