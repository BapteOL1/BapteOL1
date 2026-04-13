import { useEffect } from 'react';

interface KeyboardShortcutHandlers {
  onSearch: () => void;
  onPanelFocus: (panel: number) => void;
  onEscape: () => void;
}

export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      if (e.key === 'Escape') {
        handlers.onEscape();
        if (isInput) (target as HTMLInputElement).blur();
        return;
      }

      if (isInput) return;

      if (e.key === '/') {
        e.preventDefault();
        handlers.onSearch();
        return;
      }

      const num = parseInt(e.key);
      if (num >= 1 && num <= 4) {
        e.preventDefault();
        handlers.onPanelFocus(num);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}
