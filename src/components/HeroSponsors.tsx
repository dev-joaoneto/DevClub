import { SPONSOR_ICONS } from '../lib/sponsorIcons'

const SPONSORS = [
  'Claude',
  'ChatGPT',
  'Grok',
  'Kimi',
  'Facebook',
  'Instagram',
  'WhatsApp',
  'iFood',
  'Uber',
]

// Uber's simple-icons mark is the wordmark itself ("Uber" spelled out),
// not a standalone glyph — pairing it with a text label would read as "Uber Uber".
// Its glyph only fills the middle third of the 24x24 viewBox, so it's cropped
// tight and sized to match the text height of its neighbors, not icon height.
const WORDMARK: Record<string, { viewBox: string }> = {
  Uber: { viewBox: '0 7.9 24 8.2' },
}

// Kimi's mark has a small accent dot top-right and its main swoosh sitting low
// in the box — geometric centering reads as "floating" above the text baseline.
const ICON_NUDGE: Record<string, string> = {
  Kimi: 'translate-y-[3px] sm:translate-y-[4px]',
}

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'%3E%3C/feTurbulence%3E%3CfeColorMatrix type='saturate' values='0'%3E%3C/feColorMatrix%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'%3E%3C/rect%3E%3C/svg%3E\")"

function SponsorIcon({ name }: { name: string }) {
  const icon = SPONSOR_ICONS[name.toLowerCase()]
  if (!icon) return null

  const wordmark = WORDMARK[name]
  const className = [
    wordmark
      ? 'h-[26px] sm:h-[34px] md:h-[40px] w-auto shrink-0'
      : 'w-6 h-6 sm:w-8 sm:h-8 shrink-0',
    ICON_NUDGE[name] ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <svg
      viewBox={wordmark?.viewBox ?? '0 0 24 24'}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  )
}

export default function HeroSponsors() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      {/* Grain texture — gives the sponsor row a worn, less "flat vector" feel */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URL, backgroundSize: '180px 180px' }}
      />

      <div className="hero-marquee-track flex items-center gap-x-12 sm:gap-x-16 w-max">
        {[...SPONSORS, ...SPONSORS].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="flex items-center gap-3 sm:gap-4 text-white/40 hover:text-[#6ee7a0] transition-colors duration-300 cursor-default"
          >
            <SponsorIcon name={name} />
            {!WORDMARK[name] && (
              <span className="text-[26px] sm:text-[34px] md:text-[40px] font-semibold tracking-tight whitespace-nowrap">
                {name}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
