import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="eh-footer">
      <div className="eh-container">
        <div className="eh-footer-top">
          <div>
            <div className="eh-footer-brand">
              <span style={{ color: 'var(--accent)' }}>E</span> Elios Hydroponics
            </div>
            <p>Canadian rooftop greening — cooler buildings, greener cities. 🍁</p>
          </div>

          <div className="eh-footer-links">
            <div>
              <h4>Explore</h4>
              <ul>
                <li><Link href="/#solutions">Solutions</Link></li>
                <li><Link href="/#why">Why green roofs</Link></li>
                <li><Link href="/#approach">Approach</Link></li>
                <li><Link href="/chat">Admin chat</Link></li>
              </ul>
            </div>
            <div>
              <h4>Account</h4>
              <ul>
                <li><Link href="/login">Sign in</Link></li>
                <li><Link href="/register">Create account</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="eh-footer-bottom">
          <span>© {new Date().getFullYear()} Elios Hydroponics · Canada</span>
          <span>Built for greener cities</span>
        </div>
      </div>
    </footer>
  )
}
