import { useState, useRef, useCallback } from 'react';

import { TopBar } from './components/TopBar';
import { MarketOverview } from './components/MarketOverview';
import { InteractiveChart } from './components/InteractiveChart';
import { NewsFeed } from './components/NewsFeed';
import { Watchlist } from './components/Watchlist';
import { TickerTape } from './components/TickerTape';

import { useMarketIndices, useCandlestickData, useNewsFeed, useWatchlist, useTopMovers } from './hooks/useMarketData';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import type { TabName, Timeframe } from './types/market';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>('Markets');
  const [selectedTicker, setSelectedTicker] = useState('SPY');
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [focusedPanel, setFocusedPanel] = useState<number | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const indices = useMarketIndices(15000);
  const { data: candleData, loading: chartLoading } = useCandlestickData(selectedTicker, timeframe);
  const news = useNewsFeed();
  const { watchlist, addTicker, removeTicker } = useWatchlist();
  const movers = useTopMovers();

  const handleTickerSelect = useCallback((ticker: string) => {
    setSelectedTicker(ticker.toUpperCase());
  }, []);

  const handlers = useCallback(() => ({
    onSearch: () => searchRef.current?.focus(),
    onPanelFocus: (panel: number) => setFocusedPanel(prev => (prev === panel ? null : panel)),
    onEscape: () => setFocusedPanel(null),
  }), []);

  useKeyboardShortcuts(handlers());

  return (
    <div className="h-screen w-screen flex flex-col bg-bb-black overflow-hidden md:overflow-hidden">
      {/* Top Bar */}
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchRef={searchRef}
        onTickerSelect={handleTickerSelect}
      />

      {/* Main 4-panel Grid — desktop: 2x2, mobile: stacked scroll */}
      <div className="flex-1 overflow-hidden max-md:overflow-y-auto">
        <div
          className="h-full p-[2px] gap-[2px] grid grid-cols-1 max-md:h-auto md:grid-cols-[2fr_3fr] md:grid-rows-2"
        >
          <div className="min-h-[280px] md:min-h-0 min-w-0">
            <MarketOverview
              indices={indices}
              focused={focusedPanel === 1}
              onTickerSelect={handleTickerSelect}
            />
          </div>
          <div className="min-h-[320px] md:min-h-0 min-w-0">
            <InteractiveChart
              data={candleData}
              ticker={selectedTicker}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
              loading={chartLoading}
              focused={focusedPanel === 2}
            />
          </div>
          <div className="min-h-[300px] md:min-h-0 min-w-0">
            <NewsFeed
              news={news}
              focused={focusedPanel === 3}
            />
          </div>
          <div className="min-h-[300px] md:min-h-0 min-w-0">
            <Watchlist
              watchlist={watchlist}
              onAddTicker={addTicker}
              onRemoveTicker={removeTicker}
              onTickerSelect={handleTickerSelect}
              focused={focusedPanel === 4}
            />
          </div>
        </div>
      </div>

      {/* Bottom Ticker Tape */}
      <TickerTape movers={movers} />
    </div>
  );
}
