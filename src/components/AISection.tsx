import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, ChevronLeft, ChevronRight, Smartphone } from 'lucide-react'

interface Stack {
  title: string
  desc: string
  hex: string
  render: (hex: string) => JSX.Element
}

// Official brand marks via the simple-icons package (fill="currentColor", 24x24 viewBox)
const REACT_PATH =
  'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z'
const NODE_PATH =
  'M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z'
const JS_PATH =
  'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z'
const CLAUDE_PATH =
  'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z'
const N8N_PATH =
  'M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632'

const BrandIcon = ({ path, hex, size = 26 }: { path: string; hex: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={hex}>
    <path d={path} />
  </svg>
)

// No official Power BI mark ships in simple-icons — a minimal ascending-bars
// glyph in the real Power BI gold reads as the product without faking a logo.
const PowerBiIcon = ({ hex, size = 26 }: { hex: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <rect x="3" y="13" width="4.2" height="8" rx="1.1" fill={hex} opacity="0.5" />
    <rect x="9.9" y="8" width="4.2" height="13" rx="1.1" fill={hex} opacity="0.78" />
    <rect x="16.8" y="3" width="4.2" height="18" rx="1.1" fill={hex} />
  </svg>
)

const STACKS: Stack[] = [
  {
    title: 'Programação Front End',
    desc: 'Construa interfaces modernas e responsivas com HTML, CSS, JavaScript e React — do zero até aplicações completas.',
    hex: '#61dafb',
    render: (hex) => <BrandIcon path={REACT_PATH} hex={hex} />,
  },
  {
    title: 'Programação Back End',
    desc: 'Modele bancos de dados, crie APIs seguras e domine a lógica de servidor com Node.js e as ferramentas do mercado.',
    hex: '#5fa04e',
    render: (hex) => <BrandIcon path={NODE_PATH} hex={hex} />,
  },
  {
    title: 'Programação Full Stack',
    desc: 'Una front-end e back-end em um único fluxo: do design da interface à entrega do sistema em produção.',
    hex: '#f7df1e',
    render: (hex) => <BrandIcon path={JS_PATH} hex={hex} size={24} />,
  },
  {
    title: 'Programação Mobile',
    desc: 'Crie aplicativos nativos e multiplataforma para iOS e Android com React Native, do protótipo à loja.',
    hex: '#f472b6',
    render: (hex) => <Smartphone size={26} color={hex} strokeWidth={1.8} />,
  },
  {
    title: 'Claude & Claude Code',
    desc: 'Domine o Claude e o Claude Code para programar, revisar e shippar com um copiloto de IA de ponta.',
    hex: '#d97757',
    render: (hex) => <BrandIcon path={CLAUDE_PATH} hex={hex} />,
  },
  {
    title: 'Trilha N8N',
    desc: 'Construa automações visuais conectando ferramentas, APIs e IA sem escrever código complexo.',
    hex: '#ea4b71',
    render: (hex) => <BrandIcon path={N8N_PATH} hex={hex} />,
  },
  {
    title: 'Análise de Dados',
    desc: 'Transforme dados brutos em decisões: estatística, visualização e storytelling com dados na prática.',
    hex: '#2dd4bf',
    render: (hex) => <BarChart3 size={26} color={hex} strokeWidth={1.8} />,
  },
  {
    title: 'Power BI',
    desc: 'Crie dashboards profissionais e relatórios interativos, do modelo de dados à publicação com Power BI.',
    hex: '#f2c811',
    render: (hex) => <PowerBiIcon hex={hex} />,
  },
]

interface SlideProps {
  stack: Stack
  distance: number
  cardWidth: number
  step: number
}

function Slide({ stack, distance, cardWidth, step }: SlideProps) {
  const isCurrent = distance === 0
  const visible = Math.abs(distance) <= 1

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{ width: cardWidth, marginLeft: -cardWidth / 2 }}
      initial={false}
      animate={{
        x: distance * step,
        y: '-50%',
        scale: isCurrent ? 1 : 0.86,
        opacity: visible ? (isCurrent ? 1 : 0.38) : 0,
        filter: isCurrent ? 'blur(0px)' : 'blur(1.5px)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 32 }}
    >
      <div
        className="pointer-events-none flex flex-col items-start gap-5 rounded-2xl border p-8 sm:p-9"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderColor: isCurrent ? `${stack.hex}40` : 'rgba(255,255,255,0.1)',
        }}
      >
        <span
          className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${stack.hex}1a`, border: `1px solid ${stack.hex}40` }}
        >
          {stack.render(stack.hex)}
        </span>
        <h3 className="text-white text-[19px] sm:text-[21px] font-semibold tracking-tight">
          {stack.title}
        </h3>
        <p className="text-white/50 text-[13.5px] sm:text-[14.5px] leading-relaxed">
          {stack.desc}
        </p>
      </div>
    </motion.div>
  )
}

const SWIPE_VELOCITY_THRESHOLD = 400
const WHEEL_LOCK_MS = 550
const WHEEL_THRESHOLD = 10

export default function AISection() {
  const [index, setIndex] = useState(0)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const measure = () => setContainerWidth(el.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const cardWidth = Math.min(containerWidth * 0.72, 440)
  const step = cardWidth * 0.58

  const goTo = (next: number) => setIndex(Math.max(0, Math.min(STACKS.length - 1, next)))

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = cardWidth * 0.18
    if (info.offset.x < -threshold || info.velocity.x < -SWIPE_VELOCITY_THRESHOLD) goTo(index + 1)
    else if (info.offset.x > threshold || info.velocity.x > SWIPE_VELOCITY_THRESHOLD) goTo(index - 1)
  }

  // Desktop only: hovering the carousel and scrolling (wheel/trackpad) glides
  // to the next/previous card instead of scrolling the page. Needs a native
  // (non-passive) listener since React's onWheel can't preventDefault.
  useEffect(() => {
    const el = viewportRef.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    let locked = false
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (Math.abs(delta) < WHEEL_THRESHOLD) return
      e.preventDefault()
      if (locked) return
      locked = true
      setIndex((i) => Math.max(0, Math.min(STACKS.length - 1, i + (delta > 0 ? 1 : -1))))
      setTimeout(() => {
        locked = false
      }, WHEEL_LOCK_MS)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <section id="about" className="relative bg-black py-24 sm:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="text-center text-white font-medium text-[clamp(24px,4vw,44px)] leading-[1.2] tracking-[-0.02em] max-w-3xl mx-auto"
        >
          Escolha sua <span className="text-[#6ee7a0]">trilha</span> entre as tecnologias que o
          mercado mais procura
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.15 }}
          className="relative mt-16"
        >
          <motion.div
            ref={viewportRef}
            className="relative h-[300px] sm:h-[320px] overflow-hidden cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
          >
            {cardWidth > 0 &&
              STACKS.map((stack, i) => (
                <Slide
                  key={stack.title}
                  stack={stack}
                  distance={i - index}
                  cardWidth={cardWidth}
                  step={step}
                />
              ))}
          </motion.div>

          <div className="relative mt-8 flex items-center justify-center gap-5">
            <motion.button
              aria-label="Anterior"
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.94 }}
              onClick={() => goTo(index - 1)}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/80"
            >
              <ChevronLeft size={17} />
            </motion.button>

            <div className="flex items-center gap-2">
              {STACKS.map((stack, i) => (
                <button
                  key={stack.title}
                  aria-label={`Ir para ${stack.title}`}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-[#6ee7a0]' : 'w-2 bg-white/20 hover:bg-white/35'
                  }`}
                />
              ))}
            </div>

            <motion.button
              aria-label="Próximo"
              whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.94 }}
              onClick={() => goTo(index + 1)}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/80"
            >
              <ChevronRight size={17} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
