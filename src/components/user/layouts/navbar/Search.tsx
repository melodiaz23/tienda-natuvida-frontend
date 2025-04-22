'use client';
import { RiSearchLine } from "react-icons/ri";
// import { createUrl } from '@/lib/utils';
// import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, useRef, useEffect } from 'react';

function SearchForm() {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: Implement search functionality
    // const val = e.target as HTMLFormElement;
    // const search = val.search as HTMLInputElement;
    // const newParams = new URLSearchParams(searchParams.toString());

    // if (search.value) {
    //   newParams.set('q', search.value);
    // } else {
    //   newParams.delete('q');
    // }

    // router.push(createUrl('/search', newParams));
  }

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-end" ref={searchRef}>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-60 md:w-80 mr-2' : 'w-0 mr-0'}`}>
        <form onSubmit={onSubmit} className="w-full">
          <input
            // key={searchParams?.get('q')}
            type="text"
            name="search"
            placeholder="Busca tú producto..."
            autoComplete="off"
            autoFocus={isSearchOpen}
            // defaultValue={searchParams?.get('q') || ''}
            className="w-full rounded-lg border border-green-dark bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm focus:outline-nv-green-light"
          />
        </form>
      </div>
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="flex items-center justify-center"
      >
        <RiSearchLine size={24} className="text-green-dark font-extrabold" />
      </button>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchForm />
    </Suspense>
  );
}

export function SearchSkeleton() {
  return (
    <div className="flex items-center">
      <RiSearchLine size={24} className="text-green-dark" />
    </div>
  );
}