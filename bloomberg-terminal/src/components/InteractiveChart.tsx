import { useEffect, useRef } from 'react';
import { createChart, type IChartApi, type ISeriesApi, CandlestickSeries, HistogramSeries } from 'lightweight-charts';
import type { CandlestickData, Timeframe } from '../types/market';

interface InteractiveChartProps {
  data: CandlestickData[];
  ticker: string;
  timeframe: Timeframe;
  onTimeframeChange: (tf: Timeframe) => void;
  loading: boolean;
  focused: boolean;
}

const timeframes: Timeframe[] = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

export function InteractiveChart({
  data,
  ticker,
  timeframe,
  onTimeframeChange,
  loading,
  focused,
}: InteractiveChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const isMobile = window.innerWidth < 768;
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#000000' },
        textColor: '#888888',
        fontFamily: 'JetBrains Mono, SF Mono, monospace',
        fontSize: isMobile ? 8 : 10,
      },
      grid: {
        vertLines: { color: '#1a1a1a' },
        horzLines: { color: '#1a1a1a' },
      },
      crosshair: {
        vertLine: { color: '#FF9500', width: 1, style: 2 },
        horzLine: { color: '#FF9500', width: 1, style: 2 },
      },
      rightPriceScale: {
        borderColor: '#333333',
        scaleMargins: { top: 0.1, bottom: 0.25 },
      },
      timeScale: {
        borderColor: '#333333',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#00FF00',
      downColor: '#FF3B30',
      borderUpColor: '#00FF00',
      borderDownColor: '#FF3B30',
      wickUpColor: '#00FF00',
      wickDownColor: '#FF3B30',
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
    });

    chart.priceScale('volume').applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(chartContainerRef.current);
    handleResize();

    return () => {
      observer.disconnect();
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!candleSeriesRef.current || !volumeSeriesRef.current || !data.length) return;

    const candleData = data.map(d => ({
      time: d.time as string,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));

    const volumeData = data.map(d => ({
      time: d.time as string,
      value: d.volume,
      color: d.close >= d.open ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 59, 48, 0.3)',
    }));

    candleSeriesRef.current.setData(candleData);
    volumeSeriesRef.current.setData(volumeData);
    chartRef.current?.timeScale().fitContent();
  }, [data]);

  const lastCandle = data[data.length - 1];
  const isUp = lastCandle ? lastCandle.close >= lastCandle.open : true;

  return (
    <div className={`h-full flex flex-col border border-bb-border bg-bb-black overflow-hidden ${focused ? 'panel-focus' : ''}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between px-2 md:px-3 py-1 border-b border-bb-border bg-[#0a0a0a] gap-1">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-bb-amber text-[11px] font-bold uppercase tracking-wider">{ticker}</span>
          {lastCandle && (
            <>
              <span className={`text-[11px] md:text-[12px] font-bold tabular-nums ${isUp ? 'text-bb-green' : 'text-bb-red'}`}>
                {lastCandle.close.toFixed(2)}
              </span>
              <span className={`text-[9px] md:text-[10px] tabular-nums ${isUp ? 'text-bb-green' : 'text-bb-red'}`}>
                {isUp ? '▲' : '▼'} {Math.abs(lastCandle.close - lastCandle.open).toFixed(2)} ({((lastCandle.close - lastCandle.open) / lastCandle.open * 100).toFixed(2)}%)
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-0">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-[6px] md:px-2 py-[2px] text-[9px] md:text-[10px] transition-colors ${
                timeframe === tf
                  ? 'text-bb-black bg-bb-amber font-bold'
                  : 'text-bb-dim hover:text-bb-white active:text-bb-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-bb-black/80 z-10">
            <span className="text-bb-amber text-[11px] blink-cursor">Loading {ticker}</span>
          </div>
        )}
        <div ref={chartContainerRef} className="w-full h-full" />
      </div>

      {/* Footer */}
      {lastCandle && (
        <div className="flex items-center gap-2 md:gap-4 px-2 md:px-3 py-1 border-t border-bb-border bg-[#0a0a0a] text-[8px] md:text-[9px] text-bb-dim overflow-x-auto">
          <span className="shrink-0">O: <span className="text-bb-white">{lastCandle.open.toFixed(2)}</span></span>
          <span className="shrink-0">H: <span className="text-bb-white">{lastCandle.high.toFixed(2)}</span></span>
          <span className="shrink-0">L: <span className="text-bb-white">{lastCandle.low.toFixed(2)}</span></span>
          <span className="shrink-0">C: <span className={isUp ? 'text-bb-green' : 'text-bb-red'}>{lastCandle.close.toFixed(2)}</span></span>
          <span className="shrink-0">V: <span className="text-bb-white">{(lastCandle.volume / 1e6).toFixed(1)}M</span></span>
        </div>
      )}
    </div>
  );
}
