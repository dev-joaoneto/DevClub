import { useEffect, useState } from 'react'

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'

interface ScrambleTextProps {
  text: string
  isHovered: boolean
  className?: string
}

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)]

export default function ScrambleText({ text, isHovered, className = '' }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!isHovered) {
      setDisplay(text)
      return
    }

    let frame = 0
    const interval = setInterval(() => {
      frame++
      const revealed = Math.floor(frame / 4)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          out += ' '
        } else if (i < revealed) {
          out += text[i]
        } else {
          out += randomChar()
        }
      }
      setDisplay(out)
      if (revealed >= text.length) {
        setDisplay(text)
        clearInterval(interval)
      }
    }, 25)

    return () => clearInterval(interval)
  }, [isHovered, text])

  return <span className={className}>{display}</span>
}
