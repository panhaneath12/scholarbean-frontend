import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, Globe, Users, Coffee, AlertTriangle } from 'lucide-react';

export default function AboutPage() {
  const bmcUsername = process.env.NEXT_PUBLIC_BUY_ME_COFFEE_USERNAME || 'scholarbean';

  return (
    <div className="container" style={{ paddingTop: '44px', paddingBottom: '88px', maxWidth: '820px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <div
          style={{
            display: 'inline-block',
            fontSize: '0.8rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-primary)',
            backgroundColor: 'var(--color-primary-light)',
            padding: '4px 12px',
            borderRadius: '9999px',
            marginBottom: '12px',
          }}
        >
          SOUTHEAST ASIAN STUDENT INITIATIVE
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '12px', color: 'var(--color-primary-dark)' }}>
          About ScholarBean
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
          A modern scholarship-discovery platform designed to make higher education opportunities transparent and accessible for ASEAN students.
        </p>
      </div>

      {/* Mission */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid var(--color-border)',
          padding: '32px',
          boxShadow: 'var(--shadow-xs)',
          marginBottom: '28px',
          lineHeight: '1.7',
          color: '#334155',
        }}
      >
        <h2 style={{ fontSize: '1.4rem', marginBottom: '14px', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>💡 Why ScholarBean?</span>
        </h2>
        <p style={{ marginBottom: '14px' }}>
          Every year, thousands of fully funded government and university scholarships go underutilized or unnoticed by high-potential students in Southeast Asia.
        </p>
        <p>
          Information is often buried inside complex embassy websites, outdated portals, or gatekept by paid agencies. ScholarBean is built like modern consumer software—Google Flights meets Notion—so any student can <strong>discover, understand, track, and apply</strong> within minutes.
        </p>
      </div>

      {/* Pillars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div className="card-base" style={{ padding: '20px' }}>
          <div style={{ color: '#16a34a', marginBottom: '10px' }}>
            <Heart size={24} />
          </div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>100% Free</h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', lineHeight: '1.5' }}>
            No subscriptions or paywalls. No account creation required to bookmark and track opportunities.
          </p>
        </div>

        <div className="card-base" style={{ padding: '20px' }}>
          <div style={{ color: 'var(--color-primary)', marginBottom: '10px' }}>
            <ShieldCheck size={24} />
          </div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>Direct Official Portals</h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', lineHeight: '1.5' }}>
            We link directly to official embassies and accredited universities (.gov, .edu, .ac.uk, .go.jp).
          </p>
        </div>

        <div className="card-base" style={{ padding: '20px' }}>
          <div style={{ color: '#d97706', marginBottom: '10px' }}>
            <Globe size={24} />
          </div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>ASEAN Focused</h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', lineHeight: '1.5' }}>
            Dedicated eligibility filters for Cambodia, Vietnam, Thailand, Indonesia, Philippines, and partner states.
          </p>
        </div>
      </div>

      {/* Transparency & Disclaimer */}
      <div
        id="disclaimer"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid var(--color-border)',
          padding: '32px',
          boxShadow: 'var(--shadow-xs)',
          marginBottom: '36px',
          lineHeight: '1.7',
          color: '#334155',
        }}
      >
        <h2 style={{ fontSize: '1.35rem', marginBottom: '14px', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={20} color="#d97706" /> Transparency & Disclaimer
        </h2>
        <p style={{ marginBottom: '12px', fontSize: '0.9rem' }}>
          ScholarBean is an independent educational discovery index. We are not an official branch of MEXT, Chevening, Fulbright, or DAAD.
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--color-muted)' }}>
          <li style={{ marginBottom: '6px' }}>
            All scholarship program names, trademarks, and logos belong to their respective institutions.
          </li>
          <li style={{ marginBottom: '6px' }}>
            Requirements and dates change periodically. Always verify guidelines on official authority application portals.
          </li>
          <li>
            <strong>Scam Warning:</strong> Legitimate government awards never charge applicants application fees or processing deposits. Never pay third parties for guaranteed admission.
          </li>
        </ul>
      </div>

      {/* Support Banner */}
      <div
        style={{
          backgroundColor: '#fffbeb',
          borderRadius: '16px',
          border: '1px solid #fde68a',
          padding: '28px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ fontSize: '1.25rem', color: '#92400e', marginBottom: '8px' }}>
          Support Our Mission
        </h3>
        <p style={{ color: '#b45309', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 16px auto', lineHeight: '1.5' }}>
          ScholarBean is community supported. If this directory helped your education journey, consider buying us a coffee!
        </p>
        <a
          href={`https://buymeacoffee.com/${bmcUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-accent"
          style={{ padding: '9px 20px' }}
        >
          <Coffee size={16} /> Buy a Coffee ($3)
        </a>
      </div>
    </div>
  );
}
