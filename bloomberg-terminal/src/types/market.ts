export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sparklineData: number[];
}

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  high: number;
  low: number;
  open: number;
}

export interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  timestamp: Date;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  summary: string;
  url?: string;
}

export interface WatchlistItem {
  symbol: string;
  last: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
}

export type Timeframe = '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';
export type TabName = 'Markets' | 'Watchlist' | 'News' | 'Macro';
export type SortField = 'symbol' | 'last' | 'change' | 'changePercent' | 'volume' | 'marketCap';
export type SortDirection = 'asc' | 'desc';
