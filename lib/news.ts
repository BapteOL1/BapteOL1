import Parser from "rss-parser";
import { SOURCES, type Category, type Source } from "./sources";

export type NewsItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  category: Category;
  publishedAt: string | null; // ISO
  excerpt: string | null;
  score?: number; // for reddit posts
};

const parser = new Parser({
  timeout: 8000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (compatible; invest-news/0.1; +https://example.local)",
  },
});

const UA =
  "Mozilla/5.0 (compatible; invest-news/0.1; +https://example.local)";

// Module-level cache so the dev server doesn't refetch every render.
type CacheEntry = { at: number; items: NewsItem[] };
const CACHE_TTL_MS = 5 * 60 * 1000;
let CACHE: CacheEntry | null = null;

function stripHtml(s: string | undefined | null): string | null {
  if (!s) return null;
  const text = s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.length ? text.slice(0, 240) : null;
}

async function fetchRss(src: Extract<Source, { kind: "rss" }>): Promise<NewsItem[]> {
  const feed = await parser.parseURL(src.url);
  return (feed.items ?? []).slice(0, 15).map((item, idx) => ({
    id: `${src.name}-${item.guid ?? item.link ?? idx}`,
    title: item.title?.trim() ?? "(sans titre)",
    url: item.link ?? src.url,
    source: src.name,
    category: src.category,
    publishedAt: item.isoDate ?? item.pubDate ?? null,
    excerpt: stripHtml(item.contentSnippet ?? item.content ?? item.summary),
  }));
}

type RedditChild = {
  data: {
    id: string;
    title: string;
    permalink: string;
    url_overridden_by_dest?: string;
    url?: string;
    selftext?: string;
    created_utc: number;
    score: number;
    stickied?: boolean;
  };
};

async function fetchReddit(
  src: Extract<Source, { kind: "reddit" }>,
): Promise<NewsItem[]> {
  const res = await fetch(
    `https://www.reddit.com/r/${src.subreddit}/hot.json?limit=15`,
    {
      headers: { "User-Agent": UA },
      // Skip Next caching — we cache manually.
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error(`reddit ${src.subreddit}: ${res.status}`);
  const json = (await res.json()) as { data: { children: RedditChild[] } };
  return json.data.children
    .filter((c) => !c.data.stickied)
    .slice(0, 12)
    .map((c) => {
      const d = c.data;
      return {
        id: `reddit-${d.id}`,
        title: d.title,
        url: `https://www.reddit.com${d.permalink}`,
        source: src.name,
        category: src.category,
        publishedAt: new Date(d.created_utc * 1000).toISOString(),
        excerpt: stripHtml(d.selftext) ?? null,
        score: d.score,
      };
    });
}

async function fetchSource(src: Source): Promise<NewsItem[]> {
  if (src.kind === "rss") return fetchRss(src);
  return fetchReddit(src);
}

export type FetchResult = {
  items: NewsItem[];
  fetchedAt: string;
  failed: { source: string; error: string }[];
};

export async function fetchAllNews(): Promise<FetchResult> {
  const now = Date.now();
  if (CACHE && now - CACHE.at < CACHE_TTL_MS) {
    return {
      items: CACHE.items,
      fetchedAt: new Date(CACHE.at).toISOString(),
      failed: [],
    };
  }

  const results = await Promise.allSettled(SOURCES.map(fetchSource));
  const items: NewsItem[] = [];
  const failed: { source: string; error: string }[] = [];

  results.forEach((r, idx) => {
    const src = SOURCES[idx];
    if (r.status === "fulfilled") {
      items.push(...r.value);
    } else {
      failed.push({
        source: src.name,
        error: r.reason instanceof Error ? r.reason.message : String(r.reason),
      });
    }
  });

  // Deduplicate by URL.
  const seen = new Set<string>();
  const deduped = items.filter((i) => {
    if (seen.has(i.url)) return false;
    seen.add(i.url);
    return true;
  });

  // Sort newest first; items without a date go last.
  deduped.sort((a, b) => {
    const ta = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const tb = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return tb - ta;
  });

  CACHE = { at: now, items: deduped };
  return { items: deduped, fetchedAt: new Date(now).toISOString(), failed };
}
