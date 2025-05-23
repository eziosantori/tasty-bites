import { SearchType } from "@/types/search";
import { create } from "zustand";



interface SearchStore {
  query: string;
  setQuery: (query: string) => void;
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
  searchType: "name",
  setSearchType: (type) => set({ searchType: type }),
}));
