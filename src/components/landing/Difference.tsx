import Image from 'next/image';
import check from '../../../public/icons/check.svg';
import xMark from '../../../public/icons/x-mark.svg';

const elementsToCompare = [
  'Colágeno 100% Puro',
  'Sin azucares',
  'Sin sabores artificiales',
  'Sin colorantes',
  'Apto para diabéticos',
  'Apto para hipertensos',
  'Con registro INVIMA',
  'Enriquecido con Citrato de Magnesio',
];

export default function Difference() {
  return (
    <div>
      <div className="border-gray-300 shadow-xl rounded-xl p-4 text-sm lg:text-base">
        <div>
          <div className="grid grid-cols-3 gap-4 text-center my-4">
            <div className="font-bold text-green-dark"></div>
            <div>Colágeno con citrato de magnesio</div>
            <div>Otros colágenos</div>
          </div>
        </div>
        <div className="grid grid-cols-1">
          {elementsToCompare.map((element, index) => (
            <div
              key={element}
              className="grid grid-cols-3 border-t py-4 align-text-center items-center">
              <div>{element}</div>
              <div className="">
                <Image
                  src={check}
                  alt="leaf-icon"
                  width={30}
                  height={30}
                  className="m-auto"
                />
              </div>
              <div>
                <Image
                  src={index === 1 || index === 6 ? check : xMark}
                  alt="leaf-icon"
                  width={30}
                  height={30}
                  className="m-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
