import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Hero */}
        <section className="eh-hero">
          <div className="eh-hero-grid" aria-hidden />
          <div className="eh-hero-glow" aria-hidden />
          <div className="eh-container">
            <div className="eh-hero-inner">
              <div className="eh-eyebrow">
                <span className="dot" />
                🍁 Canadian rooftop greening
              </div>
              <h1>
                Turn rooftops into <em>living</em> climate solutions.
              </h1>
              <p className="eh-hero-text">
                Elios Hydroponics designs and builds rooftop greenery systems that bring shade,
                planting, and cooler surfaces to Canadian buildings — practical systems for real
                roofs and real winters.
              </p>
              <div className="eh-hero-actions">
                <Link href="/chat" className="eh-btn eh-btn-primary">
                  Open admin chat →
                </Link>
                <a href="#solutions" className="eh-btn eh-btn-ghost">
                  Explore solutions
                </a>
              </div>
              <div className="eh-hero-proof">
                <div>
                  <strong>Canada</strong>
                  <span>Climate-ready design</span>
                </div>
                <div>
                  <strong>Rooftops</strong>
                  <span>Shade · plant · cool</span>
                </div>
                <div>
                  <strong>Care</strong>
                  <span>Seasonal support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="eh-section" id="solutions">
          <div className="eh-container">
            <div className="eh-mission">
              <div className="eh-mission-inner">
                <span className="eh-kicker">Our mission</span>
                <h2 style={{ marginTop: 10 }}>
                  Greener rooftops. <em>Cooler</em> futures.
                </h2>
                <p className="eh-muted" style={{ margin: 0 }}>
                  We make underused roof space work harder for people, buildings, and cities — with
                  systems planned around structure, exposure, and Canadian seasons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="eh-section" id="why" style={{ paddingTop: 24 }}>
          <div className="eh-container">
            <span className="eh-kicker">Why Elios</span>
            <h2>
              Green infrastructure with a <em>clear</em> purpose.
            </h2>
            <p className="eh-muted">
              Purpose-built planting layers that moderate heat, add life to the skyline, and fit how
              Canadian buildings are actually maintained.
            </p>

            <div className="eh-feature-grid">
              <div className="eh-feature-card large">
                <div className="icon">☀</div>
                <h3>Cooler roofs</h3>
                <p>
                  Vegetation shades roof surfaces and helps moderate heat during warm Canadian
                  summers — reducing radiant load on the structure below.
                </p>
              </div>
              <div className="eh-feature-card">
                <div className="icon">🌿</div>
                <h3>Smarter greenery</h3>
                <p>
                  Purpose-designed planting systems turn unused roof area into living infrastructure,
                  not just decoration.
                </p>
              </div>
              <div className="eh-feature-card">
                <div className="icon">⚡</div>
                <h3>Lower cooling demand</h3>
                <p>
                  Green roof systems can help reduce heat flow and cooling requirements when paired
                  with solid building practices.
                </p>
              </div>
            </div>

            <div className="eh-feature-grid" style={{ marginTop: 12 }}>
              <div className="eh-feature-card">
                <div className="icon">✓</div>
                <h3>Built for Canada</h3>
                <p>
                  Solutions planned around local climate, roof conditions, freeze–thaw, and practical
                  maintenance.
                </p>
              </div>
              <div className="eh-feature-card">
                <div className="icon">🏙</div>
                <h3>City-ready</h3>
                <p>
                  From low-slope commercial decks to residential flat roofs — systems sized for real
                  urban constraints.
                </p>
              </div>
              <div className="eh-feature-card">
                <div className="icon">💧</div>
                <h3>Hydroponic options</h3>
                <p>
                  Efficient water use and controlled planting environments where traditional soil
                  systems are not ideal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="eh-section eh-process" id="approach">
          <div className="eh-container">
            <span className="eh-kicker">The Elios approach</span>
            <h2>
              From empty roof to <em>living</em> layer.
            </h2>
            <p className="eh-muted">
              A clear path from assessment to ongoing care — so your rooftop performs season after
              season.
            </p>
            <div className="eh-steps">
              <div className="eh-step">
                <span>01</span>
                <div className="eh-step-line" />
                <h3>Assess</h3>
                <p>Roof, structure, exposure, access, and your goals.</p>
              </div>
              <div className="eh-step">
                <span>02</span>
                <div className="eh-step-line" />
                <h3>Design</h3>
                <p>Planting plan and system specification for Canadian conditions.</p>
              </div>
              <div className="eh-step">
                <span>03</span>
                <div className="eh-step-line" />
                <h3>Build</h3>
                <p>Professional installation with attention to waterproofing and load.</p>
              </div>
              <div className="eh-step">
                <span>04</span>
                <div className="eh-step-line" />
                <h3>Care</h3>
                <p>Maintenance guidance and seasonal support when you need it.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="eh-container" style={{ padding: '0' }}>
          <div className="eh-stats">
            <div className="eh-stat">
              <strong>🍁</strong>
              <span>Canadian focus</span>
            </div>
            <div className="eh-stat">
              <strong>4</strong>
              <span>Step delivery path</span>
            </div>
            <div className="eh-stat">
              <strong>24/7</strong>
              <span>Admin chat access</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="eh-cta">
          <div className="eh-container">
            <span className="eh-kicker" style={{ color: '#43531f' }}>
              Ready to start?
            </span>
            <h2>Have a rooftop in mind?</h2>
            <p>
              Tell our team what you are working with — location, roof type, and goals — and get
              practical next-step guidance.
            </p>
            <Link href="/chat" className="eh-btn">
              Start a conversation →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
