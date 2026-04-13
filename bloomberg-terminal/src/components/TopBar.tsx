import { useRef, useEffect } from 'react';
import { useClock } from '../hooks/useClock';
import type { TabName } from '../types/market';

interface TopBarProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  onTickerSelect: (ticker: string) => void;
}

const tabs: TabName[] = ['Markets', 'Watchlist', 'News', 'Macro'];

export function TopBar({ activeTab, onTabChange, searchRef, onTickerSelect }: TopBarProps) {
  const time = useClock();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchRef) {
      (searchRef as React.MutableRefObject<HTMLInputElement | null>).current = inputRef.current;
    }
  }, [searchRef]);

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' });
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value.trim().toUpperCase();
      if (value) {
        onTickerSelect(value);
        (e.target as HTMLInputElement).value = '';
        (e.target as HTMLInputElement).blur();
      }
    }
  };

  return (
    <div className="border-b border-bb-border bg-bb-black shrink-0">
      {/* Row 1: Logo, Clock, Search, Status */}
      <div className="flex items-center h-[32px] px-2 gap-2 md:gap-3">
        {/* Bloomberg Logo */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <span className="text-bb-amber font-bold text-[11px] md:text-[13px] tracking-wider">BLOOMBERG</span>
          <span className="text-bb-dim text-[9px] md:text-[10px] hidden sm:inline">TERMINAL</span>
        </div>

        {/* Separator */}
        <div className="w-px h-4 bg-bb-border hidden sm:block" />

        {/* Clock */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          <span className="text-bb-green text-[10px] md:text-[11px] font-bold tabular-nums">{formatTime(time)}</span>
          <span className="text-bb-dim text-[9px] md:text-[10px] hidden md:inline">{formatDate(time)}</span>
        </div>

        {/* Separator */}
        <div className="w-px h-4 bg-bb-border" />

        {/* Search */}
        <div className="flex items-center gap-1 flex-1 max-w-[200px] md:max-w-[300px]">
          <span className="text-bb-amber text-[10px]">/</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search ticker..."
            className="bg-transparent text-bb-white text-[11px] outline-none border-none w-full placeholder:text-bb-dim font-mono"
            onKeyDown={handleSearch}
          />
        </div>

        {/* Right side status — desktop only */}
        <div className="ml-auto flex items-center gap-2 md:gap-3 shrink-0">
          <span className="text-bb-green text-[9px] md:text-[10px]">● LIVE</span>
          <span className="text-[10px] text-bb-dim hidden lg:inline">
            <kbd className="text-bb-amber">/</kbd> Search
            <span className="mx-1">|</span>
            <kbd className="text-bb-amber">1-4</kbd> Panel
            <span className="mx-1">|</span>
            <kbd className="text-bb-amber">ESC</kbd> Close
          </span>
        </div>
      </div>

      {/* Row 2: Navigation Tabs — scrollable on mobile */}
      <div className="flex items-center h-[28px] px-2 border-t border-[#1a1a1a] overflow-x-auto">
        <div className="flex items-center gap-0 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-3 py-1 text-[10px] uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'text-bb-amber bg-[#1a1200]'
                  : 'text-bb-dim hover:text-bb-white active:text-bb-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <span className="ml-auto text-[9px] text-bb-dim hidden sm:inline shrink-0">NYT</span>
      </div>
    </div>
  );
}
