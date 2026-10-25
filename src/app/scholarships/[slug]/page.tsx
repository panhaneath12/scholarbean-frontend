'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getScholarshipById } from '@/lib/api';
import { ScholarshipDetail } from '@/types/scholarship';
import { FundingBadge } from '@/components/scholarship/FundingBadge';
import { BookmarkButton } from '@/components/scholarship/BookmarkButton';
import { DocumentsChecklist } from '@/components/scholarship/DocumentsChecklist';
import { ApplicationSteps } from '@/components/scholarship/ApplicationSteps';
import {
  ExternalLink,
  Calendar,
  Clock,
  DollarSign,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  ArrowLeft,
  Share2,
  Building,
  Info,
  Send,
  MessageCircle,
} from 'lucide-react';

export default function ScholarshipDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [scholarship, setScholarship] = useState<ScholarshipDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    async function fetchDetail() {
      if (!slug) return;
      setIsLoading(true);
      try {
        const data = await getScholarshipById(slug);
        setScholarship(data);
      } catch (err) {
        console.error('Failed to load scholarship detail', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDetail();
  }, [slug]);

  useEffect(() => {
    if (!scholarship?.deadline) return;

    const calculate = () => {
      const target = new Date(scholarship.deadline).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [scholarship?.deadline]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center', color: 'var(--color-muted)' }}>
        Loading scholarship details...
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '12px' }}>Scholarship Not Found</h2>
        <p style={{ color: 'var(--color-muted)', marginBottom: '20px' }}>
          This opportunity may have concluded or moved.
        </p>
        <Link href="/scholarships" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Directory
        </Link>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(`Explore ${scholarship.name} on ScholarBean!`);
  const deadlineDate = new Date(scholarship.deadline).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* ============================================================== */}
      {/* 1. HERO SECTION                                               */}
      {/* ============================================================== */}
      <section
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--color-border)',
          padding: '36px 0 28px 0',
        }}
      >
        <div className="container">
          {/* Back button */}
          <Link
            href="/scholarships"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.86rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
              marginBottom: '16px',
            }}
          >
            <ArrowLeft size={16} /> Back to Scholarships
          </Link>

          {/* Country Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>{scholarship.flag}</span>
            <span>{scholarship.country}</span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              lineHeight: '1.2',
              color: 'var(--color-primary-dark)',
              marginBottom: '8px',
            }}
          >
            {scholarship.name}
          </h1>

          {/* Provider */}
          <div style={{ fontSize: '1rem', color: 'var(--color-muted)', marginBottom: '16px' }}>
            {scholarship.provider}
          </div>

          {/* Short description */}
          <p style={{ fontSize: '0.96rem', color: '#475569', lineHeight: '1.5', maxWidth: '720px', marginBottom: '20px' }}>
            {scholarship.short_description}
          </p>

          {/* Badges & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
            <FundingBadge funding={scholarship.funding} />

            {scholarship.is_asean_friendly && (
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  border: '1px solid #fde68a',
                }}
              >
                🌏 ASEAN Eligible
              </span>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 700, color: timeLeft.isExpired ? '#64748b' : '#b45309' }}>
              <Clock size={16} />
              {timeLeft.isExpired
                ? 'Application closed'
                : `⏳ ${timeLeft.days} days, ${timeLeft.hours} hours left`}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <a
              href={scholarship.official_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '12px 22px', fontSize: '0.96rem' }}
            >
              Apply on Official Website <ExternalLink size={16} />
            </a>

            <BookmarkButton scholarshipId={scholarship.id} showText size={18} />
          </div>

          {/* Social Share Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.84rem', color: 'var(--color-muted)' }}>
            <span>Share:</span>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#0088cc', fontWeight: 600 }}
            >
              <Send size={13} /> Telegram
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#16a34a', fontWeight: 600 }}
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)', fontWeight: 600 }}
            >
              {copiedLink ? <Check size={13} color="#16a34a" /> : <Copy size={13} />}
              <span>{copiedLink ? 'Copied link!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. QUICK INFORMATION BAR                                      */}
      {/* ============================================================== */}
      <div className="container" style={{ marginTop: '24px', marginBottom: '32px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid var(--color-border)',
            padding: '20px 24px',
            boxShadow: 'var(--shadow-sm)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Funding */}
          <div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginBottom: '4px' }}>
              💰 Funding
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#166534' }}>
              {scholarship.funding === 'full' ? 'Fully Funded' : 'Partial Funded'}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
              {scholarship.amount}
            </div>
          </div>

          {/* Degree */}
          <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '16px' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginBottom: '4px' }}>
              🎓 Degree Level
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.98rem', textTransform: 'capitalize' }}>
              {scholarship.level.join(', ')}
            </div>
          </div>

          {/* Duration */}
          <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '16px' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginBottom: '4px' }}>
              ⏳ Duration
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>
              {scholarship.duration || '2–4 Years'}
            </div>
          </div>

          {/* Deadline */}
          <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '16px' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)', marginBottom: '4px' }}>
              🗓 Deadline
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#b91c1c' }}>
              {deadlineDate}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. DETAIL CONTENT LAYOUT (WITH STICKY APPLY CARD)             */}
      {/* ============================================================== */}
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '32px',
            alignItems: 'start',
          }}
          className="detail-grid"
        >
          {/* Left Column: Structured Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* About */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                padding: '28px',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <h2 style={{ fontSize: '1.3rem', marginBottom: '14px', color: 'var(--color-primary-dark)' }}>
                About the Scholarship
              </h2>
              <div style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#334155', whiteSpace: 'pre-line' }}>
                {scholarship.description}
              </div>
            </div>

            {/* Benefits */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                padding: '28px',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <h2 style={{ fontSize: '1.3rem', marginBottom: '16px', color: 'var(--color-primary-dark)' }}>
                Benefits & Financial Coverage
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {scholarship.benefits.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem' }}>
                    <span style={{ color: '#16a34a', fontWeight: 800 }}>✓</span>
                    <span style={{ color: '#1e293b' }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                padding: '28px',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <h2 style={{ fontSize: '1.3rem', marginBottom: '16px', color: 'var(--color-primary-dark)' }}>
                Eligibility & Requirements
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {scholarship.requirements.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem' }}>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 800 }}>•</span>
                    <span style={{ color: '#1e293b' }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Documents Checklist with Progress Bar */}
            <DocumentsChecklist documents={scholarship.documents_required} />

            {/* How to Apply Steps */}
            <ApplicationSteps steps={scholarship.how_to_apply} />
          </div>

          {/* Right Column: Sticky Apply Card */}
          <aside
            style={{
              position: 'sticky',
              top: '84px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                padding: '24px',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-muted)', marginBottom: '8px' }}>
                APPLY DIRECTLY
              </div>

              <div style={{ marginBottom: '14px' }}>
                <FundingBadge funding={scholarship.funding} />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Official Deadline</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
                  {deadlineDate}
                </div>
              </div>

              <a
                href={scholarship.official_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '0.98rem',
                  marginBottom: '10px',
                }}
              >
                Apply Officially <ExternalLink size={16} />
              </a>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BookmarkButton scholarshipId={scholarship.id} showText size={18} />
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '18px 0' }} />

              <div style={{ fontSize: '0.76rem', color: '#64748b', lineHeight: '1.45' }}>
                <div style={{ fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} color="#16a34a" /> Verified Official Portal
                </div>
                ScholarBean directs you directly to the governing university or government portal. Legitimate scholarships never charge application submission fees.
              </div>
            </div>

            {/* Related Scholarships Card */}
            {scholarship.related_scholarships && scholarship.related_scholarships.length > 0 && (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                  padding: '20px',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '12px', color: 'var(--color-primary-dark)' }}>
                  Similar Opportunities
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {scholarship.related_scholarships.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/scholarships/${rel.id}`}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid var(--color-border)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>{rel.flag}</span>
                        <span>{rel.country}</span>
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--color-primary-dark)', marginTop: '2px' }}>
                        {rel.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
