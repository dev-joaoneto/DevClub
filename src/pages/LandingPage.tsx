import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AISection from '../components/AISection'
import Benefits from '../components/Benefits'
import BeyondCode from '../components/BeyondCode'
import Platform from '../components/Platform'
import Projects from '../components/Projects'
import Testimonials from '../components/Testimonials'
import Instructors from '../components/Instructors'
import Certifications from '../components/Certifications'
import Market from '../components/Market'
import Guarantee from '../components/Guarantee'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

export default function LandingPage() {
  const [entranceComplete, setEntranceComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setEntranceComplete(true), 800)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="bg-black text-white">
      <Navbar entranceComplete={entranceComplete} />
      <Hero entranceComplete={entranceComplete} />
      <AISection />
      <Benefits />
      <BeyondCode />
      <Platform />
      <Projects />
      <Testimonials />
      <Instructors />
      <Certifications />
      <Market />
      <Guarantee />
      <FAQ />
      <Footer />
    </div>
  )
}
