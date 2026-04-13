import type { WatchlistItem } from '../types/market';

interface TickerTapeProps {
  movers: WatchlistItem[];
}

export function TickerTape({ movers }: TickerTapeProps) {
  const items = [...movers, ...movers];

  return (
    <div className="h-[22px] border-t border-bb-border bg-[#050505] overflow-hidden flex items-center shrink-0">
      <div className="flex items-center whitespace-nowrap ticker-scroll">
        {items.map((item, idx) => {
          const isUp = item.changePercent >= 0;
          return (
            <span key={`${item.symbol}-${idx}`} className="inline-flex items-center gap-1 mx-4 text-[10px]">
              <span className="text-bb-white font-bold">{item.symbol}</span>
              <span className="text-bb-dim">{item.last.toFixed(2)}</span>
              <span className={isUp ? 'text-bb-green' : 'text-bb-red'}>
                {isUp ? '▲' : '▼'} {isUp ? '+' : ''}{item.changePercent.toFixed(2)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
