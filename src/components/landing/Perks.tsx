import Image from 'next/image';
import leaf from '../../../public/icons/leaf.svg';
import { perks } from '../../app/(user)/(landing)/colageno-hidrolizado/data/perks';

interface PropsPerks {
  interest: string;
}

export default function Perks(props: PropsPerks) {
  const interest: string = props.interest || 'default';

  return (
    <ul className="flex flex-col gap-6 mt-5 lg:w-2/3 2xl:w-1/2">
      {perks[interest].map((perk, index) => (
        <li
          className="flex items-start gap-2"
          key={index}>
          <Image
            src={leaf}
            alt="leaf-icon"
            width={20}
            height={20}
            className="mt-1"
          />
          <span className="flex-1 text-green-dark">{perk}</span>
        </li>
      ))}
    </ul>
  );
}
