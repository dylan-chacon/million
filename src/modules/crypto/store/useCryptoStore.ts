import { create } from 'zustand';
import { Crypto } from '../models/Crypto';

interface CryptoState {
  cryptos: Crypto[];
  filtered: Crypto[];
  search: string;
  loading: boolean;
  setSearch: (text: string) => void;
  setCryptos: (cryptos: Crypto[]) => void;
}

export const useCryptoStore = create<CryptoState>((set, get) => ({
  cryptos: [],
  filtered: [],
  search: '',
  loading: false,
  setCryptos: (cryptos: Crypto[]) => {
    set({ cryptos, filtered: cryptos });
  },

  setSearch: (text) => {
    const all = get().cryptos;
    const filtered = all.filter(c =>
      c.name.toLowerCase().includes(text.toLowerCase())
    );
    set({ search: text, filtered });
  },
}));
