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
  Kimi: 'translate-y-[4px] sm:translate-y-[5px]',
}

function SponsorIcon({ name }: { name: string }) {
  const icon = SPONSOR_ICONS[name.toLowerCase()]
  if (!icon) return null

  const wordmark = WORDMARK[name]
  const className = [
    wordmark
      ? 'h-[33px] sm:h-[43px] md:h-[50px] w-auto shrink-0'
      : 'w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] shrink-0',
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
      className="relative overflow-hidden py-6 sm:py-8"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      {/* Blurs the video behind the row so the robot's legs don't compete with the marquee */}
      <div
        className="pointer-events-none absolute inset-0 backdrop-blur-2xl"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }}
      />

      <div className="hero-marquee-track relative flex items-center gap-x-[60px] sm:gap-x-[80px] w-max">
        {[...SPONSORS, ...SPONSORS].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="flex items-center gap-[15px] sm:gap-[20px] text-white/40 hover:text-[#6ee7a0] transition-colors duration-300 cursor-default"
          >
            <SponsorIcon name={name} />
            {!WORDMARK[name] && (
              <span className="text-[33px] sm:text-[43px] md:text-[50px] font-semibold tracking-tight whitespace-nowrap">
                {name}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
