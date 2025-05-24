import { useEffect, useRef, useState } from 'react';

type SearchType = 'name' | 'ingredient';

export const useSearchType = (defaultType: SearchType = 'name') => {
  const searchTypeRef = useRef<SearchType>(defaultType);

  const [searchType, setSearchType] = useState<SearchType>();
  useEffect(() => {
    const stored = sessionStorage.getItem('searchType');
    if (stored === 'name' || stored === 'ingredient') {
      setSearchType(stored);
    } else {
      setSearchType(defaultType);
    }
  }, [defaultType]);

  useEffect(() => {
    sessionStorage.setItem('searchType', searchType as string);
  }, [searchType]);

  return [searchTypeRef.current, setSearchType] as const;
}
