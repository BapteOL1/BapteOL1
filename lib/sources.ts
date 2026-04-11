export type Category = "stocks" | "crypto" | "vc" | "alt";

export const CATEGORY_LABELS: Record<Category, string> = {
  stocks: "Actions & ETF",
  crypto: "Crypto & DeFi",
  vc: "VC / Startups",
  alt: "Niches alternatives",
};

export const CATEGORY_ACCENT: Record<Category, string> = {
  stocks: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  crypto: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  vc: "bg-violet-500/15 text-violet-300 ring-violet-500/30",
  alt: "bg-sky-500/15 text-sky-300 ring-sky-500/30",
};

export type RssSource = {
  kind: "rss";
  name: string;
  url: string;
  category: Category;
};

export type RedditSource = {
  kind: "reddit";
  name: string;
  subreddit: string;
  category: Category;
};

export type Source = RssSource | RedditSource;

// RSS feeds — public, no auth required.
export const SOURCES: Source[] = [
  // Stocks & ETF
  { kind: "rss", name: "MarketWatch — Top Stories", url: "https://feeds.content.dowjones.io/public/rss/mw_topstories", category: "stocks" },
  { kind: "rss", name: "Investing.com — News", url: "https://www.investing.com/rss/news.rss", category: "stocks" },
  { kind: "rss", name: "Seeking Alpha", url: "https://seekingalpha.com/feed.xml", category: "stocks" },
  { kind: "rss", name: "Yahoo Finance — Headlines", url: "https://finance.yahoo.com/news/rssindex", category: "stocks" },
  { kind: "reddit", name: "r/investing", subreddit: "investing", category: "stocks" },
  { kind: "reddit", name: "r/ValueInvesting", subreddit: "ValueInvesting", category: "stocks" },

  // Crypto & DeFi
  { kind: "rss", name: "CoinDesk", url: "https://www.coindesk.com/arc/outboundfeeds/rss/", category: "crypto" },
  { kind: "rss", name: "Cointelegraph", url: "https://cointelegraph.com/rss", category: "crypto" },
  { kind: "rss", name: "Decrypt", url: "https://decrypt.co/feed", category: "crypto" },
  { kind: "rss", name: "The Defiant", url: "https://thedefiant.io/api/feed", category: "crypto" },
  { kind: "reddit", name: "r/CryptoCurrency", subreddit: "CryptoCurrency", category: "crypto" },

  // VC / startups
  { kind: "rss", name: "TechCrunch — Venture", url: "https://techcrunch.com/category/venture/feed/", category: "vc" },
  { kind: "rss", name: "Crunchbase News", url: "https://news.crunchbase.com/feed/", category: "vc" },
  { kind: "rss", name: "Sifted", url: "https://sifted.eu/feed", category: "vc" },
  { kind: "reddit", name: "r/startups", subreddit: "startups", category: "vc" },

  // Niches alternatives
  { kind: "rss", name: "Wine Spectator — Auction News", url: "https://www.winespectator.com/rss/news", category: "alt" },
  { kind: "rss", name: "ArtNews — Market", url: "https://www.artnews.com/c/art-news/market/feed/", category: "alt" },
  { kind: "reddit", name: "r/AlternativeInvesting", subreddit: "AlternativeInvesting", category: "alt" },
  { kind: "reddit", name: "r/fatFIRE", subreddit: "fatFIRE", category: "alt" },
];
