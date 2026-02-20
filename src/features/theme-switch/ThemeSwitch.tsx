import type { ThemeMode } from '@/app/providers/theme/index'
import { useTheme } from '@/app/providers/theme/index'

const modes: Array<{ mode: ThemeMode; label: string }> = [
  { mode: 'system', label: 'System' },
  { mode: 'light', label: 'Light' },
  { mode: 'dark', label: 'Dark' },
]

export function ThemeSwitch() {
  const { mode, setMode } = useTheme()

  return (
    <div className="border-border bg-card inline-flex rounded-md border p-1 shadow-sm">
      {modes.map((m) => {
        const active = m.mode === mode
        return (
          <button
            key={m.mode}
            type="button"
            onClick={() => setMode(m.mode)}
            className={[
              'rounded-sm px-3 py-1.5 text-sm transition',
              active ? 'bg-primary text-primary-fg' : 'text-fg hover:bg-border/70',
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
