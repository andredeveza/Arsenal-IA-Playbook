import { create } from 'zustand';

interface UserStore {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  history: string[];
  addToHistory: (id: string) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
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
}));
