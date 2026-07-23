import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToId } from '../lib/scrollTo'
import './reader.css'

interface NavbarProps {
  entranceComplete: boolean
}

const SECTIONS = [
  { id: 'about', label: 'Formação' },
  { id: 'platform', label: 'Plataforma' },
  { id: 'certifications', label: 'Certificados' },
  { id: 'metrics', label: 'Mercado' },
  { id: 'guarantee', label: 'Garantia' },
]

export default function Navbar({ entranceComplete }: NavbarProps) {
  const readerRef = useRef<HTMLElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const logoLinkRef = useRef<HTMLAnchorElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const megaBtnRef = useRef<HTMLButtonElement>(null)

  const [isReading, setIsReading] = useState(false)
  const [isPeek, setIsPeek] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [navOpen, setNavOpen] = useState(false)
  const [lockMsg, setLockMsg] = useState<{ text: string; visible: boolean }>({ text: '', visible: false })

  const isReadingRef = useRef(false)
  const navPinnedRef = useRef(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lockMsgTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ---------- Scroll: progress hairline + wake (nunca esconde, só min<->desperto) ----------
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
      setProgress(p * 100)
      const reading = y > 60
      isReadingRef.current = reading
      setIsReading(reading)
      if (reading) setIsPeek(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ---------- Seção atual (IntersectionObserver) ----------
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    if (!els.length || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setCurrentId(en.target.id)
        })
      },
      { rootMargin: '-30% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // ---------- Mensagem de trava/destrava ----------
  const showLockMsg = useCallback((text: string, persist?: boolean) => {
    if (lockMsgTimerRef.current) clearTimeout(lockMsgTimerRef.current)
    setLockMsg({ text, visible: true })
    if (!persist) {
      lockMsgTimerRef.current = setTimeout(() => setLockMsg((m) => ({ ...m, visible: false })), 1400)
    }
  }, [])
  const hideLockMsg = useCallback(() => {
    if (lockMsgTimerRef.current) clearTimeout(lockMsgTimerRef.current)
    setLockMsg((m) => ({ ...m, visible: false }))
  }, [])

  // ---------- Dropdown único (nav-da-página): hover-intent + click-to-pin ----------
  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const closeNav = useCallback(() => {
    navPinnedRef.current = false
    setNavOpen(false)
    hideLockMsg()
  }, [hideLockMsg])

  const openNav = useCallback(
    (pin: boolean) => {
      cancelClose()
      navPinnedRef.current = pin
      setNavOpen(true)
    },
    [cancelClose],
  )

  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null
      if (!navPinnedRef.current) closeNav()
    }, 450)
  }, [cancelClose, closeNav])

  const handleTriggerClick = useCallback(() => {
    if (navOpen && navPinnedRef.current) {
      closeNav()
      showLockMsg('Navegação destravada')
    } else {
      openNav(true)
      showLockMsg('Navegação travada', true)
    }
  }, [navOpen, closeNav, openNav, showLockMsg])

  const handleTriggerPointerEnter = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      cancelClose()
      if (!navOpen) openNav(false)
    },
    [cancelClose, navOpen, openNav],
  )

  const handlePanelPointerEnter = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse') cancelClose()
    },
    [cancelClose],
  )

  const closePeek = useCallback(() => {
    setIsPeek(false)
    if (!isReadingRef.current) closeNav()
  }, [closeNav])

  // ---------- Peek: click no fundo vazio da pílula (compacta) abre a nav sem fixar ----------
  const handlePillClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (isReadingRef.current) return
    setIsPeek((v) => !v)
  }, [])

  const handleReaderPointerEnter = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse') cancelClose()
    },
    [cancelClose],
  )
  const handleReaderPointerLeave = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (navOpen && !navPinnedRef.current) scheduleClose()
    },
    [navOpen, scheduleClose],
  )

  // ---------- Fechar por clique fora / Escape ----------
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      const reader = readerRef.current
      if (reader && !reader.contains(target)) {
        closePeek()
        closeNav()
        return
      }
      if (navOpen) {
        const openers = [megaBtnRef.current].filter(Boolean) as HTMLElement[]
        const insideOpener = openers.some((b) => b.contains(target))
        const insidePanel = panelRef.current?.contains(target)
        if (!insideOpener && !insidePanel) closeNav()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [navOpen, closeNav, closePeek])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeNav()
        closePeek()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [closeNav, closePeek])

  // ---------- Tilt 3D na logo (só pointer:fine, respeita reduced-motion) ----------
  useEffect(() => {
    const pill = pillRef.current
    const logoLink = logoLinkRef.current
    if (!pill || !logoLink) return
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reducedMotion) return

    const onPointerMove = (e: PointerEvent) => {
      const r = pill.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      logoLink.style.setProperty('--ry', `${(nx * 18).toFixed(2)}deg`)
      logoLink.style.setProperty('--rx', `${(-ny * 18).toFixed(2)}deg`)
    }
    const onPointerLeave = () => {
      logoLink.style.setProperty('--rx', '0deg')
      logoLink.style.setProperty('--ry', '0deg')
    }
    pill.addEventListener('pointermove', onPointerMove)
    pill.addEventListener('pointerleave', onPointerLeave)
    return () => {
      pill.removeEventListener('pointermove', onPointerMove)
      pill.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  const handleLinkClick = (id: string) => {
    closeNav()
    scrollToId(id)
  }

  const stateClass = isReading ? 'is-reading' : isPeek ? 'is-peek' : ''

  return (
    <header
      ref={readerRef}
      className={`reader ${stateClass}`}
      style={{ opacity: entranceComplete ? 1 : 0, transition: 'opacity 0.8s ease' }}
      onPointerEnter={handleReaderPointerEnter}
      onPointerLeave={handleReaderPointerLeave}
    >
      <div ref={pillRef} className="reader-pill" onClick={handlePillClick}>
        <div className="reader-logo-group">
          <a
            ref={logoLinkRef}
            className="reader-logo-link"
            href="#hero"
            aria-label="Dev Club — voltar ao início"
            onClick={(e) => {
              e.preventDefault()
              handleLinkClick('hero')
            }}
          >
            <img src="/devclub-logo.png" alt="Dev Club" className="reader-logo-img" />
          </a>
          <span className="reader-logo-text" aria-hidden="true">
            Dev Club
          </span>
        </div>

        <button
          ref={megaBtnRef}
          className="reader-nav-btn"
          type="button"
          aria-expanded={navOpen}
          aria-controls="reader-pop"
          aria-label="Abrir navegação desta página"
          onClick={handleTriggerClick}
          onPointerEnter={handleTriggerPointerEnter}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <span className={`reader-lock-msg ${lockMsg.visible ? 'is-visible' : ''}`} aria-live="polite">
          {lockMsg.text}
        </span>

        <nav className="reader-inline-nav" aria-label="Seções desta página">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={currentId === s.id ? 'is-current' : ''}
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick(s.id)
              }}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <a
          className="reader-cta"
          href="https://w.app/crtgeh" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Quero Ser Aluno ↗
        </a>

        <div
          ref={panelRef}
          id="reader-pop"
          className={`reader-pop ${navOpen ? 'is-open' : ''}`}
          aria-label="Seções"
          onPointerEnter={handlePanelPointerEnter}
        >
          <p className="reader-pop-title">Nesta página</p>
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{ '--i': i } as React.CSSProperties}
              className={currentId === s.id ? 'is-current' : ''}
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick(s.id)
              }}
            >
              {s.label}
            </a>
          ))}
        </div>

        <span className="reader-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </span>
      </div>
    </header>
  )
}
