import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import BackToTop from './components/layout/BackToTop'
import Background from './components/layout/Background'
import CursorGlow from './components/layout/CursorGlow'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Preloader from './components/layout/Preloader'
import About from './components/sections/About'
import Certifications from './components/sections/Certifications'
import Contact from './components/sections/Contact'
import Education from './components/sections/Education'
import Hero from './components/sections/Hero'
import Interests from './components/sections/Interests'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Vision from './components/sections/Vision'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onDone={() => setReady(true)} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-xl focus:bg-fg focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>
      <Background />
      <CursorGlow />
      <Navbar />
      <main id="main" tabIndex={-1} className="relative outline-none">
        <Hero ready={ready} />
        <About />
        <Interests />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Vision />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  )
}
