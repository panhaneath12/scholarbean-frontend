'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { submitScholarship } from '@/lib/api';
import { LevelType, FundingType } from '@/types/scholarship';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';

export default function SubmitScholarshipPage() {
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    country: 'Japan',
    level: ['masters'] as LevelType[],
    field: ['STEM'],
    funding: 'full' as FundingType,
    deadline: '',
    official_link: '',
    description: '',
    submitter_email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleLevel = (lvl: LevelType) => {
    setFormData((prev) => {
      const exists = prev.level.includes(lvl);
      if (exists) {
        if (prev.level.length === 1) return prev;
        return { ...prev, level: prev.level.filter((l) => l !== lvl) };
      } else {
        return { ...prev, level: [...prev.level, lvl] };
      }
    });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.name || formData.name.trim().length < 5) {
      errs.name = 'Scholarship title must be at least 5 characters long';
    }
    if (!formData.provider || formData.provider.trim().length < 3) {
      errs.provider = 'Organization must be at least 3 characters long';
    }
    if (!formData.official_link) {
      errs.official_link = 'Official URL is required';
    } else if (!formData.official_link.startsWith('https://')) {
      errs.official_link = 'Link must be a secure URL starting with https://';
    }
    if (!formData.submitter_email) {
      errs.submitter_email = 'Contact email is required for review confirmation';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.submitter_email)) {
      errs.submitter_email = 'Please provide a valid email format';
    }
    if (!formData.deadline) {
      errs.deadline = 'Please pick a deadline';
    } else {
      const selected = new Date(formData.deadline).getTime();
      const today = new Date().getTime();
      if (selected <= today) {
        errs.deadline = 'Deadline must be a future date';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await submitScholarship(formData);
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container" style={{ padding: '80px 20px', maxWidth: '560px', textAlign: 'center' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid var(--color-border)',
            padding: '48px 28px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
            }}
          >
            <CheckCircle2 size={36} />
          </div>
          <h2 style={{ fontSize: '1.7rem', color: 'var(--color-primary-dark)', marginBottom: '10px' }}>
            Thank you!
          </h2>
          <p style={{ color: 'var(--color-muted)', lineHeight: '1.6', marginBottom: '28px', fontSize: '0.94rem' }}>
            Your scholarship has been submitted for review.
            We&apos;ll review it and publish it within 48 hours.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <Link href="/scholarships" className="btn btn-primary" style={{ padding: '10px 22px' }}>
              Back to Scholarships
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '640px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.1rem', marginBottom: '8px', color: 'var(--color-primary-dark)' }}>
          Submit a Scholarship
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.96rem' }}>
          Know a scholarship we&apos;re missing? Help other students discover it.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid var(--color-border)',
          padding: '32px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Scholarship Name */}
        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
            Scholarship Name *
          </label>
          <input
            type="text"
            placeholder="e.g. MEXT Japanese Government Scholarship"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: errors.name ? '1px solid #ef4444' : '1px solid var(--color-border)',
              fontSize: '0.92rem',
              outline: 'none',
            }}
          />
          {errors.name && (
            <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>
              {errors.name}
            </div>
          )}
        </div>

        {/* Organization */}
        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
            Organization *
          </label>
          <input
            type="text"
            placeholder="e.g. Japanese Ministry of Education (MEXT)"
            value={formData.provider}
            onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: errors.provider ? '1px solid #ef4444' : '1px solid var(--color-border)',
              fontSize: '0.92rem',
              outline: 'none',
            }}
          />
          {errors.provider && (
            <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>
              {errors.provider}
            </div>
          )}
        </div>

        {/* Host Country */}
        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
            Host Country *
          </label>
          <select
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              fontSize: '0.92rem',
              outline: 'none',
              backgroundColor: '#ffffff',
            }}
          >
            <option value="Japan">Japan 🇯🇵</option>
            <option value="United Kingdom">United Kingdom 🇬🇧</option>
            <option value="USA">USA 🇺🇸</option>
            <option value="Germany">Germany 🇩🇪</option>
            <option value="South Korea">South Korea 🇰🇷</option>
            <option value="Singapore">Singapore 🇸🇬</option>
            <option value="Australia">Australia 🇦🇺</option>
            <option value="Thailand">Thailand 🇹🇭</option>
            <option value="European Union">European Union 🇪🇺</option>
          </select>
        </div>

        {/* Degree Level */}
        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
            Degree Level
          </label>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { id: 'masters' as LevelType, label: 'Masters' },
              { id: 'phd' as LevelType, label: 'PhD' },
              { id: 'undergraduate' as LevelType, label: 'Undergraduate' },
            ].map((lvl) => (
              <label
                key={lvl.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.level.includes(lvl.id)}
                  onChange={() => toggleLevel(lvl.id)}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                {lvl.label}
              </label>
            ))}
          </div>
        </div>

        {/* Funding */}
        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
            Funding
          </label>
          <div style={{ display: 'flex', gap: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="funding"
                checked={formData.funding === 'full'}
                onChange={() => setFormData({ ...formData, funding: 'full' })}
                style={{ accentColor: 'var(--color-primary)' }}
              />
              🟢 Fully Funded
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="funding"
                checked={formData.funding === 'partial'}
                onChange={() => setFormData({ ...formData, funding: 'partial' })}
                style={{ accentColor: 'var(--color-primary)' }}
              />
              🔵 Partial
            </label>
          </div>
        </div>

        {/* Official Application URL */}
        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
            Official Application URL *
          </label>
          <input
            type="url"
            placeholder="https://..."
            value={formData.official_link}
            onChange={(e) => setFormData({ ...formData, official_link: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: errors.official_link ? '1px solid #ef4444' : '1px solid var(--color-border)',
              fontSize: '0.92rem',
              outline: 'none',
            }}
          />
          {errors.official_link && (
            <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>
              {errors.official_link}
            </div>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
            Deadline *
          </label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: errors.deadline ? '1px solid #ef4444' : '1px solid var(--color-border)',
              fontSize: '0.92rem',
              outline: 'none',
              backgroundColor: '#ffffff',
            }}
          />
          {errors.deadline && (
            <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>
              {errors.deadline}
            </div>
          )}
        </div>

        {/* Submitter Email */}
        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
            Your Email *
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            value={formData.submitter_email}
            onChange={(e) => setFormData({ ...formData, submitter_email: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: errors.submitter_email ? '1px solid #ef4444' : '1px solid var(--color-border)',
              fontSize: '0.92rem',
              outline: 'none',
            }}
          />
          {errors.submitter_email && (
            <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>
              {errors.submitter_email}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
          style={{ width: '100%', padding: '12px', fontSize: '1rem', marginTop: '8px' }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Scholarship'}
        </button>
      </form>
    </div>
  );
}
