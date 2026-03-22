import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  history: string[];
  addToHistory: (id: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) => 
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter(favId => favId !== id)
            : [...state.favorites, id]
        })),
      isFavorite: (id) => get().favorites.includes(id),
      history: [],
      addToHistory: (id) =>
        set((state) => ({
          history: [id, ...state.history.filter(hId => hId !== id)].slice(0, 10)
        }))
    }),
    {
      name: 'playbook-storage', // name of the item in the storage (must be unique)
    }
  )
);
