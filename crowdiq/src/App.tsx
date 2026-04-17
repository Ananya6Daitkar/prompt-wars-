import Nav from './components/common/Nav'
import Hero from './components/sections/Hero'
import IntelligenceScreen from './components/intelligence/IntelligenceScreen'
import FanJourney from './components/sections/FanJourney'
import Features from './components/sections/Features'
import VenueMap from './components/sections/VenueMap'
import CommandCenter from './components/sections/CommandCenter'
import MobileShowcase from './components/sections/MobileShowcase'
import Metrics from './components/sections/Metrics'
import FinalCTA from './components/sections/FinalCTA'

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <IntelligenceScreen />
        <FanJourney />
        <Features />
        <VenueMap />
        <CommandCenter />
        <MobileShowcase />
        <Metrics />
        <FinalCTA />
      </main>
      <footer style={{
        background: '#0a0e27', borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '32px', textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, background: 'rgba(0,217,255,0.1)', border: '1px solid rgba(0,217,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00d9ff' }} />
          </div>
          <span style={{ color: '#00d9ff', fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em' }}>CrowdIQ</span>
        </div>
        <p style={{ color: 'rgba(240,244,255,0.2)', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
          © 2025 CrowdIQ · AI-Powered Venue Intelligence
        </p>
      </footer>
    </>
  )
}
