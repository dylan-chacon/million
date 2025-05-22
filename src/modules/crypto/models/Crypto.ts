export interface Crypto {
  id: string;
  symbol: string;
  name: string;
  rank: number;
  price_usd: string;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
  market_cap_usd: string;
  volume24: number;
  csupply: string;
  tsupply: string;
  msupply: string | null;
}
