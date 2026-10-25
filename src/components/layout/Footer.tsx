import React from 'react';
import Link from 'next/link';
import { Coffee, Heart } from 'lucide-react';

export function Footer() {
  const bmcUsername = process.env.NEXT_PUBLIC_BUY_ME_COFFEE_USERNAME || 'scholarbean';

  return (
    <footer
      style={{
        backgroundColor: '#0d2235',
        color: '#94a3b8',
        borderTop: '1px solid #1e3a5f',
        marginTop: 'auto',
        paddingTop: '56px',
        paddingBottom: '36px',
        fontSize: '0.9rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '36px',
            marginBottom: '44px',
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: '320px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#ffffff',
                marginBottom: '14px',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>🫘</span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                }}
              >
                Scholar<span style={{ color: '#F2B84B' }}>Bean</span>
              </span>
            </div>
            <p style={{ lineHeight: '1.6', marginBottom: '18px', fontSize: '0.86rem', color: '#cbd5e1' }}>
              The modern scholarship discovery platform built specifically for students in Southeast Asia.
              Discover, track, and apply for fully funded opportunities worldwide.
            </p>
            <a
              href={`https://buymeacoffee.com/${bmcUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
              style={{ fontSize: '0.82rem', padding: '8px 14px' }}
            >
              <Coffee size={15} /> Support ScholarBean
            </a>
          </div>

          {/* Explore */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.92rem', marginBottom: '16px' }}>
              Explore Scholarships
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <Link href="/scholarships?funded=full" style={{ color: '#cbd5e1' }}>
                  🟢 Fully Funded
                </Link>
              </li>
              <li>
                <Link href="/scholarships?asean=true" style={{ color: '#cbd5e1' }}>
                  🌏 ASEAN Eligible
                </Link>
              </li>
              <li>
                <Link href="/scholarships?level=masters" style={{ color: '#cbd5e1' }}>
                  🎓 Masters Degree
                </Link>
              </li>
              <li>
                <Link href="/scholarships?level=undergraduate" style={{ color: '#cbd5e1' }}>
                  📚 Undergraduate
                </Link>
              </li>
              <li>
                <Link href="/scholarships?field=STEM" style={{ color: '#cbd5e1' }}>
                  🔬 STEM Fields
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Countries */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.92rem', marginBottom: '16px' }}>
              Study Destinations
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <Link href="/scholarships?country=Japan" style={{ color: '#cbd5e1' }}>
                  🇯🇵 Japan (MEXT)
                </Link>
              </li>
              <li>
                <Link href="/scholarships?country=United%20Kingdom" style={{ color: '#cbd5e1' }}>
                  🇬🇧 United Kingdom (Chevening)
                </Link>
              </li>
              <li>
                <Link href="/scholarships?country=USA" style={{ color: '#cbd5e1' }}>
                  🇺🇸 United States (Fulbright)
                </Link>
              </li>
              <li>
                <Link href="/scholarships?country=Germany" style={{ color: '#cbd5e1' }}>
                  🇩🇪 Germany (DAAD)
                </Link>
              </li>
              <li>
                <Link href="/scholarships?country=South%20Korea" style={{ color: '#cbd5e1' }}>
                  🇰🇷 South Korea (GKS)
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.92rem', marginBottom: '16px' }}>
              Community & Safety
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>
                <Link href="/submit" style={{ color: '#cbd5e1' }}>
                  ✍️ Submit Scholarship
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" style={{ color: '#cbd5e1' }}>
                  ♡ Saved Bookmarks
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: '#cbd5e1' }}>
                  🛡️ Mission & Transparency
                </Link>
              </li>
              <li style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px' }}>
                All scholarships point directly to official government and university websites.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #1e3a5f',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            fontSize: '0.82rem',
          }}
        >
          <div>
            © {new Date().getFullYear()} ScholarBean. Built for ambitious ASEAN students.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/about#disclaimer" style={{ color: '#94a3b8' }}>
              Disclaimer
            </Link>
            <Link href="/about" style={{ color: '#94a3b8' }}>
              Privacy & Ethics
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
