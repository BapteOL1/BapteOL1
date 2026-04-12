'use client'

import Link from 'next/link'

export default function TopBar() {
  return (
    <header
      className="sticky top-0 z-50 h-14 flex items-center justify-between px-4 border-b"
      style={{
        backgroundColor: 'var(--color-tab-bar)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2">
        <span
          style={{
            fontFamily: 'var(--font-title)',
            fontWeight: 800,
            fontSize: '1.25rem',
            color: 'var(--color-accent)',
            letterSpacing: '-0.02em',
          }}
        >
          Settle
        </span>
        <span
          style={{
            fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-dim)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}
        >
          NYC
        </span>
      </Link>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notification dot */}
        <button
          aria-label="Notifications"
          className="relative w-8 h-8 flex items-center justify-center rounded-full"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-text-muted)' }}>
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {/* Unread badge */}
          <span
            className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
        </button>

        {/* Avatar */}
        <Link
          href="/dashboard/settings"
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: 'var(--color-surface-elevated)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          B
        </Link>
      </div>
    </header>
  )
}
