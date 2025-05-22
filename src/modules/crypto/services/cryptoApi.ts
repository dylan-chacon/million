import axios from 'axios';
import { Crypto } from '../models/Crypto';

export const fetchCryptos = async (pageParam: number): Promise<Crypto[]> => {
  const res = await axios.get(`https://api.coinlore.net/api/tickers/?start=${pageParam}&limit=${pageParam + 20}`);
  return res.data.data;
};
