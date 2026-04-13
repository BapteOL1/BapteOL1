import type { MarketIndex, CandlestickData, NewsItem, WatchlistItem } from '../types/market';

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randInt(min: number, max: number): number {
  return Math.floor(rand(min, max));
}

function generateSparkline(base: number, points: number = 20): number[] {
  const data: number[] = [];
  let current = base;
  for (let i = 0; i < points; i++) {
    current += rand(-base * 0.005, base * 0.005);
    data.push(Number(current.toFixed(2)));
  }
  return data;
}

export function generateMarketIndices(): MarketIndex[] {
  const indices = [
    { symbol: 'SPX', name: 'S&P 500', base: 5280 },
    { symbol: 'IXIC', name: 'NASDAQ', base: 16720 },
    { symbol: 'DJI', name: 'DOW JONES', base: 39150 },
    { symbol: 'FTSE', name: 'FTSE 100', base: 8250 },
    { symbol: 'FCHI', name: 'CAC 40', base: 8050 },
    { symbol: 'N225', name: 'NIKKEI 225', base: 38900 },
  ];

  return indices.map(idx => {
    const change = rand(-idx.base * 0.02, idx.base * 0.02);
    const price = idx.base + change;
    return {
      symbol: idx.symbol,
      name: idx.name,
      price: Number(price.toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(((change / idx.base) * 100).toFixed(2)),
      sparklineData: generateSparkline(price),
    };
  });
}

export function generateCandlestickData(timeframe: string, ticker: string): CandlestickData[] {
  const now = new Date();
  const data: CandlestickData[] = [];
  let points: number;
  let intervalMs: number;

  const basePrice = ticker === 'SPY' ? 528 : ticker === 'AAPL' ? 195 : ticker === 'MSFT' ? 420 : ticker === 'GOOGL' ? 175 : ticker === 'AMZN' ? 185 : ticker === 'NVDA' ? 880 : ticker === 'TSLA' ? 175 : ticker === 'META' ? 505 : 100;

  switch (timeframe) {
    case '1D': points = 78; intervalMs = 5 * 60 * 1000; break;
    case '1W': points = 35; intervalMs = 4 * 60 * 60 * 1000; break;
    case '1M': points = 22; intervalMs = 24 * 60 * 60 * 1000; break;
    case '3M': points = 65; intervalMs = 24 * 60 * 60 * 1000; break;
    case '1Y': points = 252; intervalMs = 24 * 60 * 60 * 1000; break;
    case '5Y': points = 260; intervalMs = 7 * 24 * 60 * 60 * 1000; break;
    default: points = 78; intervalMs = 5 * 60 * 1000;
  }

  let current = basePrice * rand(0.9, 1.0);

  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - i * intervalMs);
    const volatility = basePrice * 0.008;
    const open = current;
    const close = open + rand(-volatility, volatility);
    const high = Math.max(open, close) + rand(0, volatility * 0.5);
    const low = Math.min(open, close) - rand(0, volatility * 0.5);
    const volume = randInt(1000000, 50000000);

    data.push({
      time: time.toISOString().split('T')[0],
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    });

    current = close;
  }

  return data;
}

const newsTitles: { title: string; source: string; sentiment: 'bullish' | 'bearish' | 'neutral' }[] = [
  { title: 'Fed Signals Potential Rate Cut in September Meeting Minutes', source: 'Reuters', sentiment: 'bullish' },
  { title: 'NVIDIA Surpasses $3T Market Cap on AI Demand Surge', source: 'Bloomberg', sentiment: 'bullish' },
  { title: 'US Treasury Yields Rise as Inflation Data Exceeds Expectations', source: 'CNBC', sentiment: 'bearish' },
  { title: 'Apple Announces Record Services Revenue in Q3 Earnings', source: 'WSJ', sentiment: 'bullish' },
  { title: 'Oil Prices Slide on Weak Chinese Economic Data', source: 'FT', sentiment: 'bearish' },
  { title: 'European Markets Mixed Ahead of ECB Policy Decision', source: 'Reuters', sentiment: 'neutral' },
  { title: 'Bitcoin ETFs See $2.4B Weekly Inflows, Highest Since Launch', source: 'CoinDesk', sentiment: 'bullish' },
  { title: 'Retail Sales Data Shows Consumer Spending Resilience', source: 'Bloomberg', sentiment: 'bullish' },
  { title: 'China Tech Stocks Rally on Government Stimulus Pledges', source: 'SCMP', sentiment: 'bullish' },
  { title: 'Commercial Real Estate Defaults Rise to Decade High', source: 'WSJ', sentiment: 'bearish' },
  { title: 'Tesla Cuts Prices Across All Models by 5-8%', source: 'Reuters', sentiment: 'bearish' },
  { title: 'Microsoft Azure Revenue Growth Accelerates to 31% YoY', source: 'Bloomberg', sentiment: 'bullish' },
  { title: 'BOJ Holds Rates Steady, Yen Weakens to 155/$', source: 'Nikkei', sentiment: 'neutral' },
  { title: 'US Jobless Claims Fall Below 200K, Labor Market Tight', source: 'CNBC', sentiment: 'neutral' },
  { title: 'Amazon Web Services Launches New AI Chip Partnership', source: 'TechCrunch', sentiment: 'bullish' },
  { title: 'Gold Hits Record High Above $2,450 on Geopolitical Risks', source: 'FT', sentiment: 'neutral' },
  { title: 'Semiconductor Sector Faces New Export Restrictions to China', source: 'WSJ', sentiment: 'bearish' },
  { title: 'S&P 500 Closes at New All-Time High on Earnings Optimism', source: 'Bloomberg', sentiment: 'bullish' },
  { title: 'Meta Platforms Increases AI Capital Expenditure by 40%', source: 'Reuters', sentiment: 'neutral' },
  { title: 'Regional Banks Report Improving Loan Quality in Q2', source: 'FT', sentiment: 'bullish' },
];

export function generateNews(): NewsItem[] {
  const now = new Date();
  return newsTitles.map((item, idx) => ({
    id: `news-${idx}`,
    title: item.title,
    source: item.source,
    timestamp: new Date(now.getTime() - idx * randInt(300000, 3600000)),
    sentiment: item.sentiment,
    summary: `${item.title} — Analysts are closely watching developments as market participants assess the implications for broader economic conditions and portfolio positioning strategies.`,
  }));
}

export function generateWatchlist(): WatchlistItem[] {
  const stocks = [
    { symbol: 'AAPL', last: 195.20, vol: '52.3M', cap: '3.01T' },
    { symbol: 'MSFT', last: 420.50, vol: '22.1M', cap: '3.12T' },
    { symbol: 'GOOGL', last: 175.80, vol: '24.5M', cap: '2.18T' },
    { symbol: 'AMZN', last: 185.60, vol: '42.8M', cap: '1.93T' },
    { symbol: 'NVDA', last: 880.40, vol: '48.2M', cap: '2.17T' },
    { symbol: 'TSLA', last: 175.30, vol: '92.4M', cap: '558B' },
    { symbol: 'META', last: 505.20, vol: '16.7M', cap: '1.28T' },
    { symbol: 'JPM', last: 198.40, vol: '8.9M', cap: '571B' },
    { symbol: 'V', last: 278.90, vol: '5.6M', cap: '573B' },
    { symbol: 'JNJ', last: 152.30, vol: '7.2M', cap: '367B' },
  ];

  return stocks.map(s => {
    const change = Number(rand(-s.last * 0.03, s.last * 0.03).toFixed(2));
    return {
      symbol: s.symbol,
      last: Number((s.last + change).toFixed(2)),
      change,
      changePercent: Number(((change / s.last) * 100).toFixed(2)),
      volume: s.vol,
      marketCap: s.cap,
    };
  });
}

export function generateTopMovers(): WatchlistItem[] {
  const movers = [
    { symbol: 'SMCI', base: 820 },
    { symbol: 'ARM', base: 165 },
    { symbol: 'PLTR', base: 24 },
    { symbol: 'COIN', base: 235 },
    { symbol: 'SNOW', base: 145 },
    { symbol: 'CRWD', base: 345 },
    { symbol: 'MSTR', base: 1580 },
    { symbol: 'AMD', base: 168 },
    { symbol: 'AVGO', base: 1650 },
    { symbol: 'CRM', base: 265 },
    { symbol: 'UBER', base: 72 },
    { symbol: 'SQ', base: 75 },
    { symbol: 'SHOP', base: 68 },
    { symbol: 'DDOG', base: 128 },
    { symbol: 'NET', base: 85 },
  ];

  return movers.map(m => {
    const changePct = rand(-6, 6);
    const change = Number((m.base * changePct / 100).toFixed(2));
    return {
      symbol: m.symbol,
      last: Number((m.base + change).toFixed(2)),
      change,
      changePercent: Number(changePct.toFixed(2)),
      volume: `${randInt(5, 80)}M`,
      marketCap: `${randInt(20, 500)}B`,
    };
  });
}
