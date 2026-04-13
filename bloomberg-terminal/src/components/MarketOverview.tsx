import { LineChart, Line, ResponsiveContainer } from 'recharts';
import type { MarketIndex } from '../types/market';

interface MarketOverviewProps {
  indices: MarketIndex[];
  focused: boolean;
  onTickerSelect: (ticker: string) => void;
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const chartData = data.map((v, i) => ({ v, i }));
  return (
    <ResponsiveContainer width={80} height={24}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function MarketOverview({ indices, focused, onTickerSelect }: MarketOverviewProps) {
  return (
    <div className={`h-full flex flex-col border border-bb-border bg-bb-black overflow-hidden ${focused ? 'panel-focus' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1 border-b border-bb-border bg-[#0a0a0a]">
        <span className="text-bb-amber text-[11px] font-bold uppercase tracking-wider">Market Overview</span>
        <span className="text-[9px] text-bb-dim">AUTO-REFRESH 15s</span>
      </div>

      {/* Index List */}
      <div className="flex-1 overflow-y-auto">
        {indices.map((idx) => {
          const isUp = idx.change >= 0;
          const color = isUp ? '#00FF00' : '#FF3B30';

          return (
            <div
              key={idx.symbol}
              className="flex items-center px-3 py-[6px] border-b border-[#1a1a1a] hover:bg-[#111] cursor-pointer transition-colors"
              onClick={() => onTickerSelect(idx.symbol)}
            >
              {/* Symbol & Name */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-bb-white text-[11px] font-bold">{idx.symbol}</span>
                  <span className="text-bb-dim text-[9px] truncate">{idx.name}</span>
                </div>
              </div>

              {/* Sparkline — hidden on mobile */}
              <div className="mx-3 shrink-0 hidden md:block">
                <Sparkline data={idx.sparklineData} color={color} />
              </div>

              {/* Price */}
              <div className="text-right shrink-0 w-[70px] md:w-[90px]">
                <div className="text-bb-white text-[10px] md:text-[11px] font-bold tabular-nums">
                  {idx.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              {/* Change */}
              <div className="text-right shrink-0 w-[60px] md:w-[100px]">
                <div className={`text-[10px] md:text-[11px] tabular-nums ${isUp ? 'text-bb-green' : 'text-bb-red'}`}>
                  <span className="hidden md:inline">{isUp ? '+' : ''}{idx.change.toFixed(2)} </span>
                  <span>({isUp ? '+' : ''}{idx.changePercent.toFixed(2)}%)</span>
                </div>
              </div>

              {/* Arrow */}
              <div className={`ml-1 md:ml-2 text-[10px] ${isUp ? 'text-bb-green' : 'text-bb-red'}`}>
                {isUp ? '▲' : '▼'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-3 py-1 border-t border-bb-border bg-[#0a0a0a]">
        <span className="text-[9px] text-bb-dim">Click index to chart • Data simulated</span>
      </div>
    </div>
  );
}
