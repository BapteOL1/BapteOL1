import Link from 'next/link'

export default function LoginPage() {
  return (
    <main
      className="min-h-dvh flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div
        className="w-full max-w-sm p-8 rounded-2xl border"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          borderRadius: 'var(--radius-card)',
        }}
      >
        <h1
          className="mb-6 text-2xl"
          style={{ fontFamily: 'var(--font-title)', fontWeight: 800, color: 'var(--color-text)' }}
        >
          Connexion
        </h1>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="h-11 px-3 rounded-xl border bg-transparent outline-none focus:border-amber-400 text-sm"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-body)',
                borderRadius: 'var(--radius-button)',
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="h-11 px-3 rounded-xl border bg-transparent outline-none focus:border-amber-400 text-sm"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-body)',
                borderRadius: 'var(--radius-button)',
              }}
            />
          </div>

          <button
            type="submit"
            className="h-12 mt-2 font-semibold text-sm transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#000',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              borderRadius: 'var(--radius-button)',
            }}
          >
            Se connecter
          </button>
        </form>

        <p
          className="mt-6 text-center text-sm"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}
        >
          Pas encore de compte ?{' '}
          <Link href="/signup" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </main>
  )
}
