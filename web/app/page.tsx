import Link from 'next/link'

export default function WelcomePage() {
  return (
    <main
      className="min-h-dvh flex flex-col"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 pt-8 pb-4">
        <span
          style={{
            fontFamily: 'var(--font-title)',
            fontWeight: 800,
            fontSize: '1.5rem',
            color: 'var(--color-accent)',
            letterSpacing: '-0.02em',
          }}
        >
          Settle
        </span>
        <Link
          href="/login"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
          }}
        >
          Connexion
        </Link>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6 py-16">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
          style={{
            backgroundColor: 'var(--color-accent-dim)',
            borderColor: 'rgba(200, 169, 122, 0.3)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '9999px',
              backgroundColor: 'var(--color-accent)',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-accent)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            NYC Relocation
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-title)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
          }}
        >
          Votre déménagement
          <br />
          <span style={{ color: 'var(--color-accent)' }}>à New York</span>
          <br />
          simplifié.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            lineHeight: 1.6,
            color: 'var(--color-text-muted)',
            maxWidth: '420px',
          }}
        >
          Services, documents, timeline — Settle coordonne tout votre projet de
          relocation depuis la France jusqu&apos;à votre premier jour à NYC.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-sm">
          <Link
            href="/signup"
            className="flex-1 flex items-center justify-center h-12 font-semibold text-sm transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#000',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              borderRadius: 'var(--radius-button)',
            }}
          >
            Commencer gratuitement
          </Link>
          <Link
            href="/login"
            className="flex-1 flex items-center justify-center h-12 font-semibold text-sm border transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              borderRadius: 'var(--radius-button)',
            }}
          >
            Se connecter
          </Link>
        </div>
      </section>

      {/* Feature strip */}
      <section
        className="px-6 pb-12 pt-4"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-8">
          {[
            { label: 'Services', desc: 'Électricité, internet, assurance en 1 clic', icon: '⚡' },
            { label: 'Timeline', desc: 'Toutes vos étapes organisées', icon: '📋' },
            { label: 'Documents', desc: 'Dossier locataire sécurisé', icon: '🗂️' },
          ].map((f) => (
            <div key={f.label} className="flex flex-col items-center text-center gap-2">
              <span style={{ fontSize: '1.5rem' }}>{f.icon}</span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  color: 'var(--color-text)',
                }}
              >
                {f.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-dim)',
                  lineHeight: 1.4,
                }}
              >
                {f.desc}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
