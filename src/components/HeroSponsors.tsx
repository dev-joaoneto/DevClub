import { Sparkle } from 'lucide-react'
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
const WORDMARK_ONLY = new Set(['Uber'])

function SponsorIcon({ name }: { name: string }) {
  const icon = SPONSOR_ICONS[name.toLowerCase()]
  const isWordmark = WORDMARK_ONLY.has(name)
  const className = isWordmark
    ? 'h-[24px] sm:h-[30px] md:h-[36px] w-auto shrink-0'
    : 'w-6 h-6 sm:w-8 sm:h-8 shrink-0'

  if (!icon) {
    return <Sparkle className={className} strokeWidth={1.6} />
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  )
}

export default function HeroSponsors() {
  return (
    <div
      className="relative overflow-hidden group"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div className="hero-marquee-track flex items-center gap-x-12 sm:gap-x-16 w-max group-hover:[animation-play-state:paused]">
        {[...SPONSORS, ...SPONSORS].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="flex items-center gap-3 sm:gap-4 text-white/40 hover:text-[#6ee7a0] transition-colors duration-300 cursor-default"
          >
            <SponsorIcon name={name} />
            {!WORDMARK_ONLY.has(name) && (
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
