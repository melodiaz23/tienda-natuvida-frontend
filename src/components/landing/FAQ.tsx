import { questions } from '../../app/(user)/data/faq';
export default function FAQ() {
  return (
    <div className="relative w-full bg-white px-6 pt-10 pb-8 mt-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10">
      <div className="mx-auto px-5">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center text-green-dark">
            Preguntas frecuentes
          </h2>
        </div>
        <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
          {questions.map((question) => (
            <div
              className="py-5"
              key={question.id}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                  <span>{question.title}</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <ul className="group-open:animate-fadeIn mt-3 text-neutral-600 w-[90%]">
                  {Array.isArray(question.answer) ? (
                    question.answer.map((answer, index) => (
                      <li
                        key={index}
                        className="list-disc p-3 pr-2 ml-4">
                        {answer}
                      </li>
                    ))
                  ) : (
                    <p className="p-3">{question.answer}</p>
                  )}
                </ul>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
