import type { ThemeMode } from '@/app/providers/theme'
import { useTheme } from '@/app/providers/theme'

const modes: Array<{ mode: ThemeMode; label: string }> = [
  { mode: 'system', label: 'System' },
  { mode: 'light', label: 'Light' },
  { mode: 'dark', label: 'Dark' },
]

export function ThemeSwitch() {
  const { mode, setMode } = useTheme()

  return (
    <div className="inline-flex rounded-[var(--radius-md)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))] p-1 shadow-[var(--shadow-sm)]">
      {modes.map((m) => {
        const active = m.mode === mode
        return (
          <button
            key={m.mode}
            type="button"
            onClick={() => setMode(m.mode)}
            className={[
              'rounded-[var(--radius-sm)] px-3 py-1.5 text-sm transition',
              active
                ? 'bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-fg))]'
                : 'text-[rgb(var(--color-fg))] hover:bg-[rgb(var(--color-border)/0.35)]',
            ].join(' ')}
            aria-pressed={active}
          >
            {m.label}
          </button>
        )
      })}
    </div>
  )
}
