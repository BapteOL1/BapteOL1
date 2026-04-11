"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_ACCENT,
  CATEGORY_LABELS,
  type Category,
} from "@/lib/sources";
import type { NewsItem } from "@/lib/news";

const CATEGORIES: Category[] = ["stocks", "crypto", "vc", "alt"];

function timeAgo(iso: string | null): string {
  if (!iso) return "—";
  const diff = Date.now() - Date.parse(iso);
  if (Number.isNaN(diff)) return "—";
  const min = Math.round(diff / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const d = Math.round(h / 24);
  if (d < 30) return `il y a ${d} j`;
  return new Date(iso).toLocaleDateString("fr-FR");
}

export default function Dashboard({
  items,
  fetchedAt,
  failed,
}: {
  items: NewsItem[];
  fetchedAt: string;
  failed: { source: string; error: string }[];
}) {
  const [active, setActive] = useState<Set<Category>>(
    new Set<Category>(CATEGORIES),
  );
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (!active.has(item.category)) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        (item.excerpt?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [items, active, query]);

  function toggle(cat: Category) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      // never let the user end up with zero categories selected
      if (next.size === 0) return new Set<Category>(CATEGORIES);
      return next;
    });
  }

  const counts = useMemo(() => {
    const c: Record<Category, number> = { stocks: 0, crypto: 0, vc: 0, alt: 0 };
    items.forEach((i) => {
      c[i.category]++;
    });
    return c;
  }, [items]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800/70 bg-zinc-950/90 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                invest<span className="text-emerald-400">.news</span>
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Veille agrégée — actions, crypto, VC et niches alternatives
              </p>
            </div>
            <div className="text-xs text-zinc-500">
              {items.length} articles • mis à jour {timeAgo(fetchedAt)}
              {failed.length > 0 && (
                <span className="ml-2 text-amber-400">
                  • {failed.length} source{failed.length > 1 ? "s" : ""} en échec
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = active.has(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggle(cat)}
                  className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${
                    isActive
                      ? CATEGORY_ACCENT[cat]
                      : "bg-zinc-900 text-zinc-500 ring-zinc-800 hover:text-zinc-300"
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                  <span className="ml-1.5 opacity-60">{counts[cat]}</span>
                </button>
              );
            })}
            <div className="ml-auto">
              <input
                type="search"
                placeholder="Rechercher un titre, une source…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-64 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-10 text-center text-sm text-zinc-500">
            Aucun article ne correspond à ces filtres.
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 transition hover:border-zinc-700 hover:bg-zinc-900"
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span
                      className={`rounded-full px-2 py-0.5 font-medium ring-1 ${CATEGORY_ACCENT[item.category]}`}
                    >
                      {CATEGORY_LABELS[item.category]}
                    </span>
                    <span className="text-zinc-500">
                      {timeAgo(item.publishedAt)}
                    </span>
                  </div>
                  <h2 className="mt-3 text-[15px] font-medium leading-snug text-zinc-100 group-hover:text-emerald-300">
                    {item.title}
                  </h2>
                  {item.excerpt && (
                    <p className="mt-2 text-sm text-zinc-400 line-clamp-3">
                      {item.excerpt}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                    <span className="truncate">{item.source}</span>
                    {typeof item.score === "number" && (
                      <span className="ml-2 shrink-0">▲ {item.score}</span>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}

        {failed.length > 0 && (
          <details className="mt-10 rounded-lg border border-amber-900/40 bg-amber-950/20 p-4 text-xs text-amber-200/80">
            <summary className="cursor-pointer font-medium">
              Sources en échec ({failed.length})
            </summary>
            <ul className="mt-2 space-y-1">
              {failed.map((f) => (
                <li key={f.source}>
                  <span className="font-medium">{f.source}</span> —{" "}
                  <span className="opacity-80">{f.error}</span>
                </li>
              ))}
            </ul>
          </details>
        )}
      </main>

      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-600">
        Données agrégées depuis des flux RSS publics et l&apos;API publique de
        Reddit. Aucun conseil d&apos;investissement.
      </footer>
    </div>
  );
}
