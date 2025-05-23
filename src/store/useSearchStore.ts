import { SearchType } from "@/types/search";
import { create } from "zustand";



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

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
  searchType: "name",
  setSearchType: (type) => set({ searchType: type }),
}));
