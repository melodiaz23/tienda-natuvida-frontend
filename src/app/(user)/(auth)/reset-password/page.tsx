'use client';

import Skeleton from '@/components/common/Skeleton';
import { Suspense } from 'react';

function ResetPasswordPage() {
  return (
    <div>
      {/* TODO: Implement password form */}
    </div>

  );
}


function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ResetPasswordPage />
    </Suspense>
  );
}

export default Page;