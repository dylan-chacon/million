import axios, { AxiosInstance } from 'axios';
import { Crypto } from '../models/Crypto';

export class CryptoApiService {
  private apiClient: AxiosInstance;
  private baseUrl: string;

  constructor(baseUrl: string = 'https://api.coinlore.net/api') {
    this.baseUrl = baseUrl;
    this.apiClient = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
    });
  }

  async fetchCryptos(pageParam: number): Promise<Crypto[]> {
    const response = await this.apiClient.get(
      `/tickers/?start=${pageParam}&limit=${pageParam + 20}`
    );
    return response.data.data;
  }

  async fetchCryptoById(id: string): Promise<Crypto> {
    const response = await this.apiClient.get(`/ticker/?id=${id}`);
    return response.data[0];
  }

  async fetchGlobalStats(): Promise<any> {
    const response = await this.apiClient.get('/global/');
    return response.data[0];
  }
}

export const cryptoApiService = new CryptoApiService();

export const fetchCryptos = async (pageParam: number): Promise<Crypto[]> => {
  return cryptoApiService.fetchCryptos(pageParam);
};
