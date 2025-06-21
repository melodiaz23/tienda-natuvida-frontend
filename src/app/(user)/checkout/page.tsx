import { Suspense } from 'react';

import Skeleton from '@/components/common/Skeleton';
import CheckoutContainer from '@/components/user/order/CheckoutContainer';


export const metadata = {
  title: 'Checkout - Natuvida',
  description: 'Finaliza tu compra en Natuvida',
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-dark mb-8 text-center">Finalizar Compra</h1>
      <Suspense fallback={<Skeleton />}>
        <CheckoutContainer />
      </Suspense>
    </div>
  );
}