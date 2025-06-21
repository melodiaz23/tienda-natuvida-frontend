'use client'
import Skeleton from "@/components/common/Skeleton";
import EditInfoProfileForm from "../../../../components/user/forms/EditInfoProfileForm";
import { Suspense } from "react";

function EditarInfoPage() {

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white  lg:gap-8 ">
        <Suspense fallback={<Skeleton />}>
          <EditInfoProfileForm />
        </Suspense>
      </div>
    </div>
  )
}



function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <EditarInfoPage />
    </Suspense>
  );
}

export default Page;