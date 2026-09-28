import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollFluid from '@/components/ScrollFluid'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollFluid />
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Hero — photo city underlay like CryptoByt */}
        <section className="eh-hero">
          <div className="eh-hero-photo" aria-hidden>
            <Image
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80"
              alt=""
              fill
              priority
              sizes="100vw"
              className="eh-hero-img"
            />
          </div>
          <div className="eh-hero-bg" aria-hidden />
          <div className="eh-hero-grid" data-parallax="0.1" aria-hidden />
          <div className="eh-hero-glow" data-parallax="0.3" aria-hidden />
          <div className="eh-container">
            <div className="eh-hero-inner" data-fluid>
              <div className="eh-eyebrow">
                <span className="dot" />
                🍁 Canadian rooftop greening
              </div>
              <h1>
                Turn rooftops into{' '}
                <em>living</em> climate solutions.
              </h1>
              <p className="eh-hero-text">
                Elios Hydroponics designs and builds practical and efficient green hydroponic
                 systems for rooftops providing climate control and produce - simple, green, lightweight
                 and efficient solutions to complex problems.
              </p>
              <div className="eh-hero-actions">
                <Link href="/chat" className="eh-btn eh-btn-primary eh-btn-lg">
                  Open chat →
                </Link>
                <a href="#story" className="eh-btn eh-btn-ghost eh-btn-lg">
                  Watch the story ↓
                </a>
              </div>
              <div className="eh-hero-proof">
                <div>
                  <strong>Canada</strong>
                  <span>Climate-ready design</span>
                </div>
                <div>
                  <strong>Rooftops</strong>
                  <span>Climate · Grow · Eat</span>
                </div>
                <div>
                  <strong>Care</strong>
                  <span>Maintenance Support</span>
                </div>
              </div>
            </div>
          </div>
          <div className="eh-scroll-hint" aria-hidden>
            <span>Scroll</span>
            <span className="eh-scroll-line" />
          </div>
        </section>

        {/* Bridge headline */}
        <section className="eh-bridge">
          <div className="eh-container" data-fluid>
            <p className="eh-bridge-kicker">The Elios platform</p>
            <h2>
              Everything rooftop.{' '}
              <em>In one place.</em>
            </h2>
            <p className="eh-muted" style={{ maxWidth: 480, margin: '16px auto 0', textAlign: 'center' }}>
              Assess, design, build, and care for living roof systems — with guidance built for
              Canadian climate.
            </p>
          </div>
        </section>

        {/* Fluid feature cards */}
        <section className="eh-fluid-stack" id="solutions">
          <article className="eh-glow-card" data-fluid>
            <span className="eh-card-num">01</span>
            <div className="eh-card-orb" aria-hidden />
            <span className="eh-card-tag">Shade</span>
            <h3>Cooler roofs under Canadian sun.</h3>
            <p>
              Vegetation shades roof surfaces and moderates heat in warm summers — reducing radiant
              load on the structure below.
            </p>
          </article>

          <article className="eh-glow-card" data-fluid>
            <span className="eh-card-num">02</span>
            <div className="eh-card-orb eh-card-orb-2" aria-hidden />
            <span className="eh-card-tag">Plant</span>
            <h3>Living infrastructure, not decoration.</h3>
            <p>
              Purpose-designed planting systems turn unused roof area into green infrastructure that
              works season after season.
            </p>
          </article>

          <article className="eh-glow-card" data-fluid>
            <span className="eh-card-num">03</span>
            <div className="eh-card-orb eh-card-orb-3" aria-hidden />
            <span className="eh-card-tag">Cool</span>
            <h3>Lower cooling demand where it counts.</h3>
            <p>
              Green roof systems help reduce heat flow and cooling requirements when paired with solid
              building practices.
            </p>
          </article>
        </section>

        {/* Why band */}
        <section className="eh-section" id="why">
          <div className="eh-container">
            <div data-fluid style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 40px' }}>
              <span className="eh-kicker">Why Elios</span>
              <h2>
                Green roofs should feel simple,{' '}
                <em>not complicated.</em>
              </h2>
              <p className="eh-muted" style={{ margin: '16px auto 0' }}>
                Clear systems planned around structure, exposure, freeze–thaw, and how Canadian
                buildings are actually maintained.
              </p>
            </div>

            <div className="eh-feature-grid">
              <div className="eh-feature-card" data-fluid>
                <div className="icon">✓</div>
                <h3>Built for Canada</h3>
                <p>Local climate, roof conditions, and practical maintenance — not imported templates.</p>
              </div>
              <div className="eh-feature-card" data-fluid>
                <div className="icon">🏙</div>
                <h3>City-ready</h3>
                <p>Low-slope commercial decks to residential flat roofs — sized for real constraints.</p>
              </div>
              <div className="eh-feature-card" data-fluid>
                <div className="icon">💧</div>
                <h3>Hydroponic options</h3>
                <p>Efficient water use where traditional soil systems are not ideal.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky story frames */}
        <section className="eh-story" id="story">
          <div className="eh-story-track">
            <div className="eh-story-sticky">
              <div className="eh-story-label">The story</div>
              <div className="eh-story-frames">
                <article className="eh-frame" data-frame>
                  <span className="eh-frame-num">01</span>
                  <h2>Empty roofs are wasted climate space.</h2>
                  <p>
                    Across Canadian cities, flat and low-slope roofs sit idle under sun and snow.
                    Elios turns that surface into living infrastructure.
                  </p>
                </article>
                <article className="eh-frame" data-frame>
                  <span className="eh-frame-num">02</span>
                  <h2>Shade. Plant. Cool.</h2>
                  <p>
                    Vegetation softens heat, adds greenery to the skyline, and helps buildings breathe
                    through warm summers — designed for freeze–thaw winters too.
                  </p>
                </article>
                <article className="eh-frame" data-frame>
                  <span className="eh-frame-num">03</span>
                  <h2>Systems built for real Canadian roofs.</h2>
                  <p>
                    From assessment to care: structure, exposure, waterproofing, and seasonal
                    maintenance — not one-size-fits-all landscaping.
                  </p>
                </article>
                <article className="eh-frame" data-frame>
                  <span className="eh-frame-num">04</span>
                  <h2>Greener rooftops. Cooler futures.</h2>
                  <p>
                    One roof at a time — practical greening that works for people, buildings, and
                    cities.
                  </p>
                  <Link href="/chat" className="eh-btn eh-btn-primary" style={{ marginTop: 20 }}>
                    Start a conversation →
                  </Link>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="eh-section eh-process" id="approach">
          <div className="eh-container">
            <div data-fluid>
              <span className="eh-kicker">How it works</span>
              <h2>
                From empty roof to <em>living</em> layer.
              </h2>
              <p className="eh-muted">
                A clear path from assessment to ongoing care — so your rooftop performs season after
                season.
              </p>
            </div>
            <div className="eh-steps">
              <div className="eh-step" data-fluid>
                <span>01</span>
                <div className="eh-step-line" />
                <h3>Assess</h3>
                <p>Roof, structure, exposure, access, and your goals.</p>
              </div>
              <div className="eh-step" data-fluid>
                <span>02</span>
                <div className="eh-step-line" />
                <h3>Design</h3>
                <p>Planting plan and system specification for Canadian conditions.</p>
              </div>
              <div className="eh-step" data-fluid>
                <span>03</span>
                <div className="eh-step-line" />
                <h3>Build</h3>
                <p>Professional installation with attention to waterproofing and load.</p>
              </div>
              <div className="eh-step" data-fluid>
                <span>04</span>
                <div className="eh-step-line" />
                <h3>Care</h3>
                <p>Maintenance guidance and seasonal support when you need it.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="eh-container" style={{ padding: 0 }}>
          <div className="eh-stats" data-fluid>
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
              <span>Chat access</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="eh-cta" data-fluid>
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
              Open chat →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
