'use client';

import React from 'react';
import Link from 'next/link';
import { ScholarshipCard as ScholarshipCardType } from '@/types/scholarship';
import { FundingBadge } from './FundingBadge';
import { DeadlineBadge } from './DeadlineBadge';
import { BookmarkButton } from './BookmarkButton';
import { ArrowRight, DollarSign, GraduationCap } from 'lucide-react';

interface ScholarshipCardProps {
  scholarship: ScholarshipCardType;
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const detailHref = `/scholarships/${scholarship.slug || scholarship.id}`;

  const formattedLevels = scholarship.level
    .map((lvl) => lvl.charAt(0).toUpperCase() + lvl.slice(1))
    .join(' · ');

  return (
    <article
      className="card-base"
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        height: '100%',
      }}
    >
      <div>
        {/* Top Header: Flag + Country Name & Bookmark Heart */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
            <span style={{ fontSize: '1.15rem' }}>{scholarship.flag}</span>
            <span>{scholarship.country}</span>
          </div>

          <BookmarkButton scholarshipId={scholarship.id} />
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            lineHeight: '1.35',
            marginBottom: '4px',
            color: 'var(--color-primary-dark)',
          }}
        >
          <Link
            href={detailHref}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {scholarship.name}
          </Link>
        </h3>

        {/* Provider */}
        <div
          style={{
            fontSize: '0.82rem',
            color: 'var(--color-muted)',
            marginBottom: '10px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {scholarship.provider}
        </div>

        {/* Short Description */}
        <p
          style={{
            fontSize: '0.86rem',
            color: '#475569',
            lineHeight: '1.45',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '14px',
          }}
        >
          {scholarship.short_description}
        </p>

        {/* Funding Badge */}
        <div style={{ marginBottom: '14px' }}>
          <FundingBadge funding={scholarship.funding} />
        </div>

        {/* Quick Stats: Coverage & Degree */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px', fontSize: '0.84rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontWeight: 600 }}>
            <span>💰</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={scholarship.amount}>
              {scholarship.amount}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-muted)' }}>
            <span>🎓</span>
            <span>{formattedLevels}</span>
          </div>
        </div>
      </div>

      {/* Divider & Bottom Row */}
      <div>
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <DeadlineBadge deadline={scholarship.deadline} />

          <Link
            href={detailHref}
            className="btn btn-ghost"
            style={{
              padding: '6px 10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Apply <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
