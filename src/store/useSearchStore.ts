import { ZUS_DEVTOOLS_CFG } from "@/lib/utils";
import { SearchType } from "@/types/search";
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

export interface SearchState {
  // query: string;
  searchType: SearchType;
  history: Array<{ query: string; searchType: SearchType }>;

}

interface SearchActions {
  // setQuery: (query: string) => void;
  setSearchType: (type: SearchType) => void;
  addToHistory: (query: string, searchType: SearchType) => void;
}

// This is the complete type of our Zustand store
export type SearchStore = SearchState & SearchActions;

// Factory function to allow passing initial values
export function createSearchStore() {
  return create<SearchStore>()(
    devtools(
      persist(
        (set) => ({
          searchType: "name",
          setSearchType: (type) => set({ searchType: type }, false, 'setSearchType'),
          history: [],
          addToHistory: (query, searchType) => {
            set((state) => ({
              history: [
                { query, searchType },
                ...state.history.filter(h => h.query !== query || h.searchType !== searchType)
              ].slice(0, 10) // keep only last 10
            }), false, 'addToHistory');
          },
        }),
        {
          name: 'search-storage', // Unique key for your store in localStorage
          storage: createJSONStorage(() => localStorage),
          partialize: (state) => ({ searchType: state.searchType }),
        }
      ),
      
      { ...ZUS_DEVTOOLS_CFG, store: 'search' }
    )
  );
}

// Default export for standard usage
export const useSearchStore = createSearchStore();
