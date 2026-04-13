import { useState, useEffect, useCallback } from 'react';
import type { MarketIndex, CandlestickData, NewsItem, WatchlistItem, Timeframe } from '../types/market';
import {
  generateMarketIndices,
  generateCandlestickData,
  generateNews,
  generateWatchlist,
  generateTopMovers,
} from '../services/mockData';

export function useMarketIndices(refreshInterval: number = 15000) {
  const [indices, setIndices] = useState<MarketIndex[]>(() => generateMarketIndices());

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(generateMarketIndices());
    }, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return indices;
}

export function useCandlestickData(ticker: string, timeframe: Timeframe) {
  const [data, setData] = useState<CandlestickData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(generateCandlestickData(timeframe, ticker));
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [ticker, timeframe]);

  return { data, loading };
}

export function useNewsFeed() {
  const [news, setNews] = useState<NewsItem[]>(() => generateNews());

  useEffect(() => {
    const interval = setInterval(() => {
      setNews(generateNews());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return news;
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => generateWatchlist());

  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlist(prev =>
        prev.map(item => {
          const delta = item.last * (Math.random() - 0.5) * 0.002;
          const newChange = Number((item.change + delta).toFixed(2));
          return {
            ...item,
            last: Number((item.last + delta).toFixed(2)),
            change: newChange,
            changePercent: Number(((newChange / item.last) * 100).toFixed(2)),
          };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addTicker = useCallback((ticker: string) => {
    setWatchlist(prev => {
      if (prev.find(i => i.symbol === ticker.toUpperCase())) return prev;
      const base = Math.random() * 500 + 20;
      const change = Number((base * (Math.random() - 0.5) * 0.04).toFixed(2));
      return [
        ...prev,
        {
          symbol: ticker.toUpperCase(),
          last: Number(base.toFixed(2)),
          change,
          changePercent: Number(((change / base) * 100).toFixed(2)),
          volume: `${Math.floor(Math.random() * 50 + 1)}M`,
          marketCap: `${Math.floor(Math.random() * 300 + 10)}B`,
        },
      ];
    });
  }, []);

  const removeTicker = useCallback((symbol: string) => {
    setWatchlist(prev => prev.filter(i => i.symbol !== symbol));
  }, []);

  return { watchlist, addTicker, removeTicker };
}

export function useTopMovers() {
  const [movers, setMovers] = useState<WatchlistItem[]>(() => generateTopMovers());

  useEffect(() => {
    const interval = setInterval(() => {
      setMovers(generateTopMovers());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return movers;
}
