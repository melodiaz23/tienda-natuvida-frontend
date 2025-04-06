'use client';

import OrdersInfo from "@/components/user/OrdersInfo";

// import { signOutAction } from '@/app/actions';
// import { useSession } from 'next-auth/react';
// import HeaderDashboard from '@/app/dashboard/components/HeaderDashboard';
// import dynamic from 'next/dynamic';
// import SignIn from '@/components/SignIn';
// import OrdersInfo from './components/OrdersInfo';

// Dynamic imports for components
// const HeaderDashboard = dynamic(
//   () => import('@/app/dashboard/components/HeaderDashboard'),
//   {
//     ssr: false,
//   }
// );
// const SignIn = dynamic(() => import('@/components/SignIn'), {
//   ssr: false,
// });
// const OrdersInfo = dynamic(() => import('./components/OrdersInfo'), {
//   ssr: false,
// });

export default function Dashboard() {
  // const { data: session } = useSession();
  // const userName = session?.user?.name;
  // const email = session?.user?.email;
  // const image = session?.user?.image;

  return (
    // <>
    //   {session ? (
    <div>
      {/* <HeaderDashboard
            userName={userName}
            email={email}
            image={image}
          /> */}
      <div className="w-full justify-center p-3">
        <h1 className="text-3xl font-bold p-4 text-center">Orders</h1>
        <div className="p-3 lg:p-12">
          <OrdersInfo />
        </div>
      </div>
    </div>
    //   ) : (
    //     <SignIn />
    //   )}
    // </>
  );
}
