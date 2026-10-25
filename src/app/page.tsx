import React from 'react';
import Link from 'next/link';
import { getMeta, getFeaturedScholarships } from '@/lib/api';
import { ScholarshipCard } from '@/components/scholarship/ScholarshipCard';
import { HeroSearch } from '@/components/search/HeroSearch';
import {
  ArrowRight,
  Sparkles,
  Check,
  Coffee,
  Globe,
  Compass,
  Calendar,
  Award,
} from 'lucide-react';

export default async function HomePage() {
  const [meta, featured] = await Promise.all([getMeta(), getFeaturedScholarships()]);

  const quickPills = [
    { label: '🟢 Fully Funded', query: 'funded=full' },
    { label: '🌏 ASEAN Eligible', query: 'asean=true' },
    { label: '🎓 Masters', query: 'level=masters' },
    { label: '🔬 STEM', query: 'field=STEM' },
    { label: '📚 Undergraduate', query: 'level=undergraduate' },
  ];

  const aseanCountries = [
    { name: 'Cambodia', flag: '🇰🇭' },
    { name: 'Vietnam', flag: '🇻🇳' },
    { name: 'Thailand', flag: '🇹🇭' },
    { name: 'Indonesia', flag: '🇮🇩' },
    { name: 'Philippines', flag: '🇵🇭' },
    { name: 'Malaysia', flag: '🇲🇾' },
    { name: 'Laos', flag: '🇱🇦' },
    { name: 'Myanmar', flag: '🇲🇲' },
    { name: 'Brunei', flag: '🇧🇳' },
    { name: 'Singapore', flag: '🇸🇬' },
  ];

  const bmcUsername = process.env.NEXT_PUBLIC_BUY_ME_COFFEE_USERNAME || 'scholarbean';

  return (
    <div style={{ paddingBottom: '70px' }}>
      {/* ============================================================== */}
      {/* 1. HERO SECTION + SEARCH                                      */}
      {/* ============================================================== */}
      <section
        style={{
          padding: '72px 0 48px 0',
          textAlign: 'center',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ maxWidth: '820px' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              marginBottom: '14px',
              backgroundColor: 'var(--color-primary-light)',
              padding: '6px 14px',
              borderRadius: '9999px',
            }}
          >
            Find Your Next Opportunity
          </div>

          {/* Heading */}
          <h1 className="title-hero" style={{ marginBottom: '16px' }}>
            Fully funded scholarships for ASEAN students
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'var(--color-muted)',
              lineHeight: '1.6',
              marginBottom: '32px',
              maxWidth: '620px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Discover scholarships from universities and governments around the world — in one place.
          </p>

          {/* Search Component with Instant Autocomplete */}
          <div style={{ marginBottom: '20px' }}>
            <HeroSearch />
          </div>

          {/* Quick Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '40px',
            }}
          >
            {quickPills.map((pill) => (
              <Link
                key={pill.query}
                href={`/scholarships?${pill.query}`}
                style={{
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-border)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  transition: 'all 0.15s ease',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                {pill.label}
              </Link>
            ))}
          </div>

          {/* Live Stats Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              maxWidth: '560px',
              margin: '0 auto',
              paddingTop: '20px',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                {meta.total_scholarships}+
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)', fontWeight: 500 }}>
                Scholarships
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                {meta.total_countries}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)', fontWeight: 500 }}>
                Countries
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#16a34a' }}>
                120+
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)', fontWeight: 500 }}>
                Fully Funded
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. FEATURED SCHOLARSHIPS                                      */}
      {/* ============================================================== */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '28px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h2 className="title-section" style={{ marginBottom: '4px' }}>
                Featured Opportunities
              </h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.94rem' }}>
                Top scholarships worth checking right now
              </p>
            </div>

            <Link
              href="/scholarships"
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              View all →
            </Link>
          </div>

          <div className="grid-cards">
            {featured.slice(0, 6).map((item) => (
              <ScholarshipCard key={item.id} scholarship={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. BROWSE BY CATEGORY                                         */}
      {/* ============================================================== */}
      <section style={{ padding: '40px 0 60px 0', backgroundColor: '#ffffff', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ marginBottom: '32px' }}>
            <h2 className="title-section" style={{ marginBottom: '4px' }}>
              Explore Scholarships
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.94rem' }}>
              Find opportunities based on what you&apos;re looking for.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '16px',
            }}
          >
            {meta.categories.map((cat) => {
              let filterQuery = `q=${encodeURIComponent(cat.name)}`;
              if (cat.name === 'Fully Funded') filterQuery = 'funded=full';
              if (cat.name === 'ASEAN Eligible') filterQuery = 'asean=true';
              if (cat.name === 'Undergraduate') filterQuery = 'level=undergraduate';
              if (cat.name === 'Masters') filterQuery = 'level=masters';
              if (cat.name === 'PhD') filterQuery = 'level=phd';
              if (cat.name === 'STEM') filterQuery = 'field=STEM';

              return (
                <Link
                  key={cat.name}
                  href={`/scholarships?${filterQuery}`}
                  className="card-base"
                  style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '130px',
                  }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{cat.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-primary-dark)' }}>
                      {cat.name}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginBottom: '8px' }}>
                      {cat.count} scholarships
                    </div>
                    <div
                      style={{
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        color: 'var(--color-primary)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      Explore →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. EXPLORE BY COUNTRY (HORIZONTAL SCROLL ON MOBILE)           */}
      {/* ============================================================== */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ marginBottom: '28px' }}>
            <h2 className="title-section" style={{ marginBottom: '4px' }}>
              Explore by Destination
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.94rem' }}>
              Popular study destinations
            </p>
          </div>

          <div className="horizontal-scroll-mobile">
            {meta.popular_countries.map((c) => (
              <Link
                key={c.name}
                href={`/scholarships?country=${encodeURIComponent(c.name)}`}
                className="card-base"
                style={{
                  padding: '20px',
                  minWidth: '170px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>{c.flag}</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-primary-dark)' }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginBottom: '12px' }}>
                    {c.count} scholarships
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  Explore →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. 🌏 BUILT FOR ASEAN STUDENTS (FEATURE HIGHLIGHT)             */}
      {/* ============================================================== */}
      <section id="asean-guide" style={{ padding: '64px 0', backgroundColor: '#ffffff', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.4rem', marginBottom: '12px' }}>🌏</div>
          <h2 className="title-section" style={{ marginBottom: '10px' }}>
            Built for ASEAN Students
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
            Scholarship information can be confusing. ScholarBean makes it easier.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              textAlign: 'left',
              maxWidth: '520px',
              margin: '0 auto 36px auto',
              backgroundColor: '#f8fafc',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
            }}
          >
            {[
              'Find scholarships accepting ASEAN applicants',
              'See funding coverage clearly',
              'Track upcoming deadlines with live urgency',
              'Understand eligibility requirements without confusion',
              'Save opportunities without creating an account',
            ].map((text, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                <span style={{ color: '#16a34a', fontWeight: 800 }}>✓</span>
                <span style={{ color: 'var(--color-text)', fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>

          {/* ASEAN Country Filter Quick Selector */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Explore by ASEAN Passport
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {aseanCountries.map((c) => (
                <Link
                  key={c.name}
                  href={`/scholarships?eligible=${encodeURIComponent(c.name)}&asean=true`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#ffffff',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/scholarships?asean=true" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '1rem' }}>
            Explore ASEAN Scholarships
          </Link>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. APPLICATION TIMELINE                                       */}
      {/* ============================================================== */}
      <section style={{ padding: '64px 0' }}>
        <div className="container" style={{ maxWidth: '960px', textAlign: 'center' }}>
          <h2 className="title-section" style={{ marginBottom: '8px' }}>
            Your Scholarship Journey
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.94rem', marginBottom: '40px' }}>
            Start preparing early to build a winning application dossier.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              textAlign: 'left',
            }}
          >
            {[
              { num: '01', icon: '🔍', title: 'Find', desc: 'Discover opportunities matching your study goals.' },
              { num: '02', icon: '📋', title: 'Prepare', desc: 'Gather transcripts, IELTS/TOEFL scores, and references.' },
              { num: '03', icon: '✍️', title: 'Apply', desc: 'Draft statement of purpose essays and submit before deadlines.' },
              { num: '04', icon: '🎉', title: 'Results', desc: 'Interview with embassies and prepare for departure.' },
            ].map((step) => (
              <div
                key={step.num}
                className="card-base"
                style={{ padding: '24px', position: 'relative' }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--color-primary)',
                    backgroundColor: 'var(--color-primary-light)',
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    marginBottom: '12px',
                  }}
                >
                  STEP {step.num}
                </div>
                <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{step.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '6px', color: 'var(--color-primary-dark)' }}>
                  {step.title}
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--color-muted)', lineHeight: '1.5' }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. SUPPORT SCHOLARBEAN BANNER                                 */}
      {/* ============================================================== */}
      <section style={{ padding: '20px 0 0 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div
            style={{
              backgroundColor: '#fffbeb',
              borderRadius: '20px',
              border: '1px solid #fde68a',
              padding: '36px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>☕</div>
            <h3 style={{ fontSize: '1.3rem', color: '#92400e', marginBottom: '8px' }}>
              Support ScholarBean
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#b45309', lineHeight: '1.5', maxWidth: '520px', margin: '0 auto 20px auto' }}>
              ScholarBean is 100% free and open for all students. If this platform helped you find an opportunity,
              consider buying us a coffee to support database hosting!
            </p>
            <a
              href={`https://buymeacoffee.com/${bmcUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
              style={{ padding: '10px 22px', fontSize: '0.92rem' }}
            >
              <Coffee size={16} /> Buy a Coffee ($3)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
