'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X, PlusCircle, Compass, Globe, BookOpen, Info } from 'lucide-react';
import { getStoredBookmarks } from '@/components/scholarship/BookmarkButton';

export function Navbar() {
  const pathname = usePathname();
  const [savedCount, setSavedCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const items = getStoredBookmarks();
      setSavedCount(items.length);
    };

    updateCount();
    window.addEventListener('scholarbean_bookmarks_changed', updateCount);
    return () => window.removeEventListener('scholarbean_bookmarks_changed', updateCount);
  }, []);

  const navLinks = [
    { label: 'Scholarships', href: '/scholarships' },
    { label: 'Countries', href: '/scholarships#countries' },
    { label: 'Guides', href: '/#asean-guide' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
        }}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>🫘</span>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              fontWeight: 800,
              color: 'var(--color-primary-dark)',
              letterSpacing: '-0.02em',
            }}
          >
            Scholar<span style={{ color: 'var(--color-accent)' }}>Bean</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: pathname === link.href ? 'var(--color-primary)' : 'var(--color-muted)',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  pathname === link.href ? 'var(--color-primary)' : 'var(--color-muted)';
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions: Saved Count & Submit button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
          className="desktop-actions"
        >
          <Link
            href="/bookmarks"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.92rem',
              fontWeight: 600,
              color: savedCount > 0 ? '#dc2626' : 'var(--color-muted)',
              padding: '6px 10px',
              borderRadius: '8px',
              transition: 'background 0.15s ease',
            }}
            title="Saved Scholarships"
          >
            <Heart size={18} fill={savedCount > 0 ? '#dc2626' : 'transparent'} />
            <span>{savedCount}</span>
          </Link>

          <Link
            href="/submit"
            className="btn btn-primary"
            style={{
              padding: '8px 16px',
              fontSize: '0.88rem',
              borderRadius: 'var(--radius-md)',
            }}
          >
            Submit
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            padding: '8px',
            color: 'var(--color-primary-dark)',
          }}
          className="mobile-menu-btn"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            backgroundColor: '#ffffff',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
          className="mobile-drawer"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                padding: '8px 0',
              }}
            >
              {link.label}
            </Link>
          ))}

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)' }} />

          <Link
            href="/bookmarks"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 0',
              fontWeight: 600,
              color: 'var(--color-text)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={18} fill={savedCount > 0 ? '#dc2626' : 'transparent'} color="#dc2626" />
              <span>Saved Scholarships</span>
            </div>
            {savedCount > 0 && (
              <span
                style={{
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                }}
              >
                {savedCount}
              </span>
            )}
          </Link>

          <Link
            href="/submit"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '6px' }}
          >
            Submit Scholarship
          </Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-actions {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
