import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


export default function SocialLogin() {

  // const onClick = (event: React.MouseEvent<HTMLButtonElement>, provider: 'google' | 'facebook') => {
  //   event.preventDefault();
  //   // signIn(provider, { callbackUrl: '/mi-cuenta' });
  // }

  return (
    <div className="w-full flex items-center gap-2">
      <button className="w-1/2 border border-green-dark text-green-dark px-4 py-1 rounded-lg"
      // onClick={(event) => { onClick(event, 'google') }}
      >
        <span className="flex items-center justify-center gap-2">
          <FcGoogle size={20} /> Google
        </span>
      </button>
      <button className="w-1/2 border border-green-dark text-green-dark px-4 py-1 rounded-lg"
      // onClick={(event) => { onClick(event, 'facebook') }}
      >
        <span className="flex items-center justify-center gap-2">
          <FaFacebook size={20} /> Facebook
        </span></button>
    </div>
  )
} 