import { useEffect, useState } from 'react'

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'

interface ScrambleInProps {
  text: string
  delay: number
  triggered: boolean
}

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)]

export default function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [display, setDisplay] = useState<string | null>(null)

  useEffect(() => {
    if (!triggered) return

    let interval: ReturnType<typeof setInterval> | undefined
    const timeout = setTimeout(() => {
      let revealed = 0
      interval = setInterval(() => {
        revealed += 0.5
        const cursor = Math.floor(revealed)
        let out = ''
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            out += ' '
          } else if (i < cursor) {
            out += text[i]
          } else if (i < cursor + 3) {
            out += randomChar()
          } else {
            out += ''
          }
        }
        setDisplay(out)
        if (cursor >= text.length) {
          setDisplay(text)
          if (interval) clearInterval(interval)
        }
      }, 25)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [triggered, text, delay])

  if (!triggered || display === null) return <span>&nbsp;</span>
  return <span>{display}</span>
}
