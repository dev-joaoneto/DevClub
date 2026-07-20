export default function SocialProof() {
  return (
    <section id="about" className="relative bg-black py-24 sm:py-28 scroll-mt-20">
      {/* Ambient glow bridging the Hero → SocialProof seam, echoes the green
          accent used across the rest of the page instead of a flat cut */}
      <div
        className="pointer-events-none absolute left-1/2 -top-40 sm:-top-56 h-72 sm:h-96 w-[90%] max-w-4xl -translate-x-1/2 rounded-full opacity-20 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse, rgba(110,231,160,0.35), transparent 70%)' }}
      />
    </section>
  )
}
