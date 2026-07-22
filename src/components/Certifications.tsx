import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, BadgeCheck } from 'lucide-react'

interface Certificate {
  course: string
  student: string
  hours: number
  tail: string
  hex: string
  iconPath: string
}

// Official brand marks (simple-icons paths, fill="currentColor", 24x24 viewBox)
// — same paths used for these tracks in AISection, so both sections match.
const REACT_PATH =
  'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z'
const NODE_PATH =
  'M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z'
const JS_PATH =
  'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z'
const CLAUDE_PATH =
  'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z'

const BrandIcon = ({ path, hex, size = 24 }: { path: string; hex: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={hex} style={{ transition: 'fill 0.5s ease' }}>
    <path d={path} />
  </svg>
)

// Real students from Testimonials sign these certs too, so the same faces
// tie together across the page — one new name (Lucas) fills the Full Stack
// track, which has no matching testimonial.
const CERTIFICATES: Certificate[] = [
  {
    course: 'Front-End',
    student: 'Rafael Nogueira',
    hours: 160,
    tail: 'para o desenvolvimento de interfaces profissionais',
    hex: '#61dafb',
    iconPath: REACT_PATH,
  },
  {
    course: 'Back-End',
    student: 'Camila Duarte',
    hours: 160,
    tail: 'para o desenvolvimento de sistemas profissionais',
    hex: '#5fa04e',
    iconPath: NODE_PATH,
  },
  {
    course: 'Full Stack',
    student: 'Lucas Andrade',
    hours: 220,
    tail: 'para o desenvolvimento de aplicações completas',
    hex: '#f7df1e',
    iconPath: JS_PATH,
  },
  {
    course: 'Claude Code',
    student: 'Beatriz Lopes',
    hours: 80,
    tail: 'para o desenvolvimento assistido por IA',
    hex: '#d97757',
    iconPath: CLAUDE_PATH,
  },
]

const INSTRUCTOR = 'Rodolfo Mori'

// A small signature-style flourish that draws itself in and erases in an
// endless loop — a live, hand-drawn touch instead of a static image, so the
// certificate stays real text/markup that's easy to edit later.
function SignatureDoodle({ hex }: { hex: string }) {
  return (
    <svg viewBox="0 0 90 36" width="64" height="26" fill="none">
      <motion.path
        d="M2 26 C 8 6, 18 6, 24 18 C 29 28, 38 8, 45 13 C 52 18, 56 30, 64 22 C 70 16, 74 24, 82 19"
        stroke={hex}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.9 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.45, 0.55, 1], repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}

// Little ruler-tick strip flanking the signature, echoing the reference's
// dashed dividers.
function RulerTicks() {
  return (
    <div
      className="hidden sm:block flex-1 h-3 self-center"
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 1px, transparent 1px, transparent 6px)',
      }}
    />
  )
}

// Fixed-size slot (64px) that never changes — only a `scale` transform
// grows/shrinks it, so switching the active course never nudges the other
// icons in the row. Width/height animations would resize the flex item
// itself and cascade into every sibling's position; scale is purely visual.
function CourseDockIcon({ hex, iconPath, active }: { hex: string; iconPath: string; active: boolean }) {
  return (
    <motion.span
      animate={{ scale: active ? 1 : 0.8 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: '#0f1216' }}
    >
      <motion.span
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute inset-[2px] rounded-[10px]"
        style={{ background: hex }}
      />
      <span className="relative">
        <BrandIcon path={iconPath} hex={active ? '#0a0a0a' : '#ffffff'} size={24} />
      </span>
    </motion.span>
  )
}

export default function Certifications() {
  const [active, setActive] = useState(0)
  const cert = CERTIFICATES[active]

  return (
    <section id="certifications" className="relative bg-black py-24 sm:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
        >
          <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[#6ee7a0]">
            <BadgeCheck size={15} /> Reconhecimento real para quem conclui e evolui
          </span>
          <h2 className="mt-5 text-white font-medium text-[clamp(26px,4.5vw,48px)] leading-[1.2] tracking-[-0.02em] max-w-3xl mx-auto">
            Escola Reconhecida pelo MEC e com Diplomas Oficiais
          </h2>
        </motion.div>

        {/* The active certificate — same frame proportions measured off the
            reference (28px/20px radius pair, 8px mat, ~1.4991:1 ratio). */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-14 max-w-4xl mx-auto border border-white/10 bg-white/[0.03] rounded-[28px] p-2"
        >
          <div
            className="relative rounded-[20px] overflow-hidden border min-h-[460px] sm:min-h-0 sm:aspect-[1.874]"
            style={{ borderColor: `${cert.hex}33` }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={cert.course}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute inset-0"
                style={{ background: `linear-gradient(150deg, ${cert.hex}26, #05070a 85%)` }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 80% at 100% 0%, ${cert.hex}22, transparent 60%)`,
                  }}
                />
                <div className="relative h-full p-6 sm:p-10 flex flex-col justify-between text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="/devclub-logo.png" alt="Dev Club" className="h-5 w-auto" />
                      <span className="text-white/70 text-[13px] font-medium tracking-tight">
                        Dev Club
                      </span>
                    </div>
                    <Award size={22} style={{ color: cert.hex }} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8 sm:gap-10 items-start">
                    <h3 className="text-white text-[24px] sm:text-[32px] font-light leading-[1.2]">
                      Certificado de Conclusão do <span style={{ color: cert.hex }}>{cert.course}</span>
                    </h3>
                    <div>
                      <p className="text-white text-[18px] sm:text-[20px] font-medium leading-snug">
                        {cert.student}
                      </p>
                      <p className="mt-3 text-white/50 text-[12.5px] sm:text-[13.5px] leading-relaxed">
                        Participou e concluiu com êxito o curso{' '}
                        <span className="text-white/80 font-medium">{cert.course}</span> com uma carga
                        horária de <span className="text-white/80 font-medium">{cert.hours} horas</span>.
                        Este curso ofereceu conhecimentos teóricos e práticos essenciais {cert.tail},
                        seguindo as melhores práticas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <RulerTicks />
                      <div className="text-center shrink-0">
                        <SignatureDoodle hex={cert.hex} />
                        <p className="mt-1 text-white/60 text-[11px]">{INSTRUCTOR}</p>
                      </div>
                      <RulerTicks />
                    </div>
                    <span className="text-[10px] text-white/30 tracking-wide shrink-0">
                      MEC · Nº 0{active + 1}482
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Course dock — hover (or tap, for touch devices) sends that
            certificate to the center. */}
        <div className="mt-16 flex items-start justify-center gap-4 sm:gap-6">
          {CERTIFICATES.map((c, i) => {
            const isActive = i === active
            return (
              <button
                key={c.course}
                type="button"
                aria-label={`Ver certificado de ${c.course}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="relative flex flex-col items-center w-16"
              >
                {/* Absolutely positioned so its width (which varies with the
                    course name) never changes the button's own box — that's
                    what kept nudging every other icon in the row sideways. */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="px-3 py-1 rounded-full bg-white/10 text-white text-[11px] whitespace-nowrap"
                      >
                        {c.course}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <CourseDockIcon hex={c.hex} iconPath={c.iconPath} active={isActive} />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
