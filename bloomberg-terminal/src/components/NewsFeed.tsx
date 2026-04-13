import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { NewsItem } from '../types/market';

interface NewsFeedProps {
  news: NewsItem[];
  focused: boolean;
}

const sentimentConfig = {
  bullish: { color: 'text-bb-green', bg: 'bg-[#002200]', label: 'BULL' },
  bearish: { color: 'text-bb-red', bg: 'bg-[#220000]', label: 'BEAR' },
  neutral: { color: 'text-bb-gray', bg: 'bg-[#1a1a1a]', label: 'NTRL' },
};

export function NewsFeed({ news, focused }: NewsFeedProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className={`h-full flex flex-col border border-bb-border bg-bb-black overflow-hidden ${focused ? 'panel-focus' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1 border-b border-bb-border bg-[#0a0a0a]">
        <span className="text-bb-amber text-[11px] font-bold uppercase tracking-wider">News Feed</span>
        <div className="flex items-center gap-2 text-[9px]">
          <span className="text-bb-green">● {news.filter(n => n.sentiment === 'bullish').length} BULL</span>
          <span className="text-bb-red">● {news.filter(n => n.sentiment === 'bearish').length} BEAR</span>
          <span className="text-bb-gray">● {news.filter(n => n.sentiment === 'neutral').length} NTRL</span>
        </div>
      </div>

      {/* News List */}
      <div className="flex-1 overflow-y-auto">
        {news.map((item) => {
          const sentiment = sentimentConfig[item.sentiment];
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="border-b border-[#1a1a1a] cursor-pointer hover:bg-[#111] transition-colors"
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
            >
              <div className="px-3 py-[6px]">
                {/* Top line: timestamp + source + sentiment */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] text-bb-dim tabular-nums">
                    {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                  </span>
                  <span className="text-[9px] text-bb-blue">{item.source}</span>
                  <span className={`text-[8px] px-1 py-[1px] ${sentiment.color} ${sentiment.bg}`}>
                    {sentiment.label}
                  </span>
                </div>

                {/* Headline */}
                <div className="text-[11px] text-bb-white leading-tight">
                  {item.title}
                </div>

                {/* Expanded Summary */}
                {isExpanded && (
                  <div className="mt-2 text-[10px] text-bb-dim leading-relaxed border-l-2 border-bb-amber pl-2">
                    {item.summary}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-3 py-1 border-t border-bb-border bg-[#0a0a0a]">
        <span className="text-[9px] text-bb-dim">{news.length} headlines • Click to expand</span>
      </div>
    </div>
  );
}
