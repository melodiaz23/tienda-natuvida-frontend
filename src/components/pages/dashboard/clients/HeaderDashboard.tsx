'use client';
import Image from 'next/image';
import logoNatuvida from '../../../../public/natuvida-logo.png';
import { signOutAction } from '@/app/actions';

interface propsUser {
  userName: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}
export default function HeaderDashboard(props: propsUser) {
  return (
    <>
      <div className="flex items-center justify-between p-2 lg:p-4 relative bg-slate-100">
        <a
          href="/"
          className="">
          <Image
            src={logoNatuvida}
            alt="logo"
            width={130}
            height={130}
            className="w-2/3 lg:w-full h-auto m-auto align-center"
            priority
          />
        </a>
        <div className="flex gap-3 items-center">
          <Image
            src={props.image ?? ''}
            alt="profile"
            width={40}
            height={40}
            className="h-12 w-12 rounded-full"
          />
          <div className="justify-self-end text-xs py-4">
            <p className="font-bold">{props.userName}</p>
            <p className="font-sm">{props.email}</p>
            <button onClick={() => signOutAction()}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}
