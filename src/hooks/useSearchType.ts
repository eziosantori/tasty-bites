import { useEffect, useRef, useState } from 'react';

type SearchType = 'name' | 'ingredient';

export function useSearchType(defaultType: SearchType = 'name') {
const searchTypeRef = useRef<SearchType>(defaultType);

  const [searchType, setSearchType] = useState<SearchType>();
  useEffect(() => {
    const stored = sessionStorage.getItem('searchType');
    if (stored === 'name' || stored === 'ingredient') {
      setSearchType(stored);
    } else {
      setSearchType(defaultType);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('searchType', searchType as string);
  }, [searchType]);
  // const setSearchType = (searchType: SearchType) => {
  //     sessionStorage.setItem('searchType', searchType);
  //     searchTypeRef.current = searchType;
  // }

  // useEffect(() => {
  //   searchTypeRef.current = sessionStorage.getItem('searchType') as SearchType;
  // },[])

  return [searchTypeRef.current, setSearchType] as const;
}
