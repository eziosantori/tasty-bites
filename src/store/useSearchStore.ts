import { ZUS_DEVTOOLS_CFG } from "@/lib/utils";
import { SearchType } from "@/types/search";
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

interface SearchState {
  query: string;
  searchType: SearchType;
}

interface SearchActions {
  setQuery: (query: string) => void;
  setSearchType: (type: SearchType) => void;
}

// This is the complete type of our Zustand store
type SearchStore = SearchState & SearchActions;

// Factory function to allow passing initial values
export function createSearchStore(initValues?: Partial<SearchState>) {
  return create<SearchStore>()(
    devtools(
      persist(
        (set) => ({
          query: initValues?.query ?? "",
          setQuery: (query) => set({ query }, false, 'setQuery'),
          searchType: initValues?.searchType ?? "name",
          setSearchType: (type) => set({ searchType: type }, false, 'setSearchType'),
        }),
        {
          name: 'search-storage', // Unique key for your store in localStorage
          storage: createJSONStorage(() => sessionStorage),
          partialize: (state) => ({ searchType: state.searchType }),
        }
      ),
      
      { ...ZUS_DEVTOOLS_CFG, store: 'search' }
    )
  );
}

// Default export for standard usage
export const useSearchStore = createSearchStore();
