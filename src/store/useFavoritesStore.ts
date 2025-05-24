// stores/useFavoritesStore.ts
import { ZUS_DEVTOOLS_CFG } from '@/lib/utils';
import { create } from 'zustand';
import { persist, createJSONStorage, devtools  } from 'zustand/middleware';

// 1. Define Types for the State
interface FavoritesState {
  favorites: string[];
}

// 2. Define Types for the Actions
// This type includes all functions that can modify the state
interface FavoritesActions {
  addFavorite: (newFavorite: string) => void;
  removeFavorite: (favoriteToRemove: string) => void;
  isFavorite: (item: string) => boolean;
  clearFavorites: () => void;
}

// 3. Combine State and Action Types
// This is the complete type of our Zustand store
type FavoritesStore = FavoritesState & FavoritesActions;

export const useFavoritesStore = create<FavoritesStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        favorites: [],

        /**
         * Adds a string to the favorites array if it's not already present.
         * @param {string} newFavorite - The string to add to favorites.
         */
        addFavorite: (newFavorite: string) => {
          set((state) => {
            // Check if the string is already in favorites to prevent duplicates
            if (!state.favorites.includes(newFavorite)) {
              return { favorites: [...state.favorites, newFavorite] };
            }
            return state; // No change if already present
          }, false, 'addFavorite');
        },

        /**
         * Removes a string from the favorites array.
         * @param {string} favoriteToRemove - The string to remove from favorites.
         */
        removeFavorite: (favoriteToRemove: string) => {
          set((state) => ({
            favorites: state.favorites.filter((fav) => fav !== favoriteToRemove),
          }), false, 'removeFavorite');
        },

        /**
         * Checks if a specific string is in favorites.
         * Useful for UI to indicate if an item is already favored.
         * @param {string} item - The string to check.
         * @returns {boolean} - True if it's in favorites, false otherwise.
         */
        isFavorite: (item: string) => get().favorites.includes(item),

        /**
         * (Optional) A function to clear all favorites.
         */
        clearFavorites: () => set({ favorites: [] }, false, 'clearFavorites'),
      }),
      {
        // Persistence configuration
        name: 'favorites-storage', // Unique key for your store in localStorage
        storage: createJSONStorage(() => localStorage), // Specifies using localStorage and handles JSON.stringify/parse
        // (Optional) partialize: (state) => ({ favorites: state.favorites }),
        // Not strictly necessary here, as `favorites` is the only property in the state.
      }
    ), {...ZUS_DEVTOOLS_CFG, store: "favorites"}
  )
);