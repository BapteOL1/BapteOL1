import { useState } from 'react';
import type { WatchlistItem, SortField, SortDirection } from '../types/market';

interface WatchlistProps {
  watchlist: WatchlistItem[];
  onAddTicker: (ticker: string) => void;
  onRemoveTicker: (symbol: string) => void;
  onTickerSelect: (ticker: string) => void;
  focused: boolean;
}

export function Watchlist({ watchlist, onAddTicker, onRemoveTicker, onTickerSelect, focused }: WatchlistProps) {
  const [sortField, setSortField] = useState<SortField>('symbol');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');
  const [addInput, setAddInput] = useState('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const sorted = [...watchlist].sort((a, b) => {
    let cmp: number;
    switch (sortField) {
      case 'symbol': cmp = a.symbol.localeCompare(b.symbol); break;
      case 'last': cmp = a.last - b.last; break;
      case 'change': cmp = a.change - b.change; break;
      case 'changePercent': cmp = a.changePercent - b.changePercent; break;
      case 'volume': cmp = a.volume.localeCompare(b.volume); break;
      case 'marketCap': cmp = a.marketCap.localeCompare(b.marketCap); break;
      default: cmp = 0;
    }
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && addInput.trim()) {
      onAddTicker(addInput.trim());
      setAddInput('');
    }
  };

  const SortHeader = ({ field, label, align = 'left' }: { field: SortField; label: string; align?: string }) => (
    <th
      className={`px-2 py-1 text-[9px] text-bb-amber uppercase tracking-wider cursor-pointer hover:text-bb-white select-none ${align === 'right' ? 'text-right' : 'text-left'}`}
      onClick={() => handleSort(field)}
    >
      {label}
      {sortField === field && (
        <span className="ml-1 text-[8px]">{sortDir === 'asc' ? '▲' : '▼'}</span>
      )}
    </th>
  );

  return (
    <div className={`h-full flex flex-col border border-bb-border bg-bb-black overflow-hidden ${focused ? 'panel-focus' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1 border-b border-bb-border bg-[#0a0a0a]">
        <span className="text-bb-amber text-[11px] font-bold uppercase tracking-wider">Watchlist</span>
        <span className="text-[9px] text-bb-dim">{watchlist.length} tickers</span>
      </div>

      {/* Add Ticker */}
      <div className="flex items-center px-3 py-1 border-b border-bb-border bg-[#050505]">
        <span className="text-bb-amber text-[10px] mr-2">+</span>
        <input
          type="text"
          placeholder="Add ticker..."
          value={addInput}
          onChange={e => setAddInput(e.target.value.toUpperCase())}
          onKeyDown={handleAdd}
          className="bg-transparent text-bb-white text-[10px] outline-none border-none w-full placeholder:text-bb-dim font-mono"
        />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-[#0a0a0a]">
            <tr className="border-b border-bb-border">
              <SortHeader field="symbol" label="Ticker" />
              <SortHeader field="last" label="Last" align="right" />
              <SortHeader field="change" label="Chg" align="right" />
              <SortHeader field="changePercent" label="Chg%" align="right" />
              <th className="px-2 py-1 text-[9px] text-bb-amber uppercase tracking-wider cursor-pointer hover:text-bb-white select-none text-right hidden md:table-cell" onClick={() => handleSort('volume')}>
                Vol{sortField === 'volume' && <span className="ml-1 text-[8px]">{sortDir === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th className="px-2 py-1 text-[9px] text-bb-amber uppercase tracking-wider cursor-pointer hover:text-bb-white select-none text-right hidden md:table-cell" onClick={() => handleSort('marketCap')}>
                MCap{sortField === 'marketCap' && <span className="ml-1 text-[8px]">{sortDir === 'asc' ? '▲' : '▼'}</span>}
              </th>
              <th className="w-6"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item) => {
              const isUp = item.change >= 0;
              return (
                <tr
                  key={item.symbol}
                  className="border-b border-[#1a1a1a] hover:bg-[#111] cursor-pointer transition-colors"
                  onClick={() => onTickerSelect(item.symbol)}
                >
                  <td className="px-2 py-[5px] text-[11px] text-bb-white font-bold">{item.symbol}</td>
                  <td className="px-2 py-[5px] text-[11px] text-bb-white text-right tabular-nums">{item.last.toFixed(2)}</td>
                  <td className={`px-2 py-[5px] text-[11px] text-right tabular-nums ${isUp ? 'text-bb-green' : 'text-bb-red'}`}>
                    {isUp ? '+' : ''}{item.change.toFixed(2)}
                  </td>
                  <td className={`px-2 py-[5px] text-[11px] text-right tabular-nums ${isUp ? 'text-bb-green' : 'text-bb-red'}`}>
                    {isUp ? '+' : ''}{item.changePercent.toFixed(2)}%
                  </td>
                  <td className="px-2 py-[5px] text-[10px] text-bb-dim text-right hidden md:table-cell">{item.volume}</td>
                  <td className="px-2 py-[5px] text-[10px] text-bb-dim text-right hidden md:table-cell">{item.marketCap}</td>
                  <td className="px-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveTicker(item.symbol);
                      }}
                      className="text-[10px] text-bb-dim hover:text-bb-red active:text-bb-red transition-colors"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-3 py-1 border-t border-bb-border bg-[#0a0a0a]">
        <span className="text-[9px] text-bb-dim">Click row to chart • Sortable columns</span>
      </div>
    </div>
  );
}
