import { useInfiniteQuery } from '@tanstack/react-query';
import { useCryptoStore } from '../store/useCryptoStore';
import { Crypto } from '../models/Crypto';
import { fetchCryptos } from '../services/cryptoApi';



export const useFetchCryptos = () => {
  const setCryptos = useCryptoStore((state) => state.setCryptos);

  return useInfiniteQuery<Crypto[], Error, Crypto[], ['cryptos'], number>({
    queryKey: ['cryptos'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetchCryptos(pageParam);
      // Suponiendo que fetchCryptos devuelve un array de Crypto
      const data = Array.isArray(response) ? response : [];

      if (data) {
        setCryptos(data);
      }

      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: Crypto[], allPages: Crypto[][]) => {
      const totalLoaded = allPages.flat().length;
      return lastPage.length === 20 ? totalLoaded : undefined;
    },
  });
};
