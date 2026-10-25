'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredBookmarks } from '@/components/scholarship/BookmarkButton';
import { getScholarships } from '@/lib/api';
import { ScholarshipCard as ScholarshipCardType } from '@/types/scholarship';
import { ScholarshipCard } from '@/components/scholarship/ScholarshipCard';
import { Heart, Trash2, Compass } from 'lucide-react';

export default function BookmarksPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedScholarships, setSavedScholarships] = useState<ScholarshipCardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSaved = async () => {
    setIsLoading(true);
    const ids = getStoredBookmarks();
    setSavedIds(ids);

    if (ids.length === 0) {
      setSavedScholarships([]);
      setIsLoading(false);
      return;
    }

    try {
      const res = await getScholarships({ limit: 100 });
      const matched = res.data.filter((s) => ids.includes(s.id) || ids.includes(s.slug));
      setSavedScholarships(matched);
    } catch (err) {
      console.error('Error fetching bookmarked scholarships', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSaved();

    const handleUpdate = () => {
      loadSaved();
    };

    window.addEventListener('scholarbean_bookmarks_changed', handleUpdate);
    return () => window.removeEventListener('scholarbean_bookmarks_changed', handleUpdate);
  }, []);

  const handleClearAll = () => {
    if (confirm('Clear all your saved scholarships?')) {
      localStorage.removeItem('scholarbean_bookmarks');
      window.dispatchEvent(new CustomEvent('scholarbean_bookmarks_changed', { detail: [] }));
      setSavedIds([]);
      setSavedScholarships([]);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '80px', maxWidth: '1000px' }}>
      {/* Page Header */}
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
          <h1 style={{ fontSize: '2rem', marginBottom: '4px', color: 'var(--color-primary-dark)' }}>
            Saved Scholarships
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.94rem' }}>
            {savedScholarships.length} scholarship{savedScholarships.length !== 1 ? 's' : ''} saved in your browser
          </p>
        </div>

        {savedScholarships.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="btn btn-secondary"
            style={{ color: 'var(--color-danger)', borderColor: '#fecaca', fontSize: '0.84rem' }}
          >
            <Trash2 size={15} /> Clear All
          </button>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-muted)' }}>
          Loading your saved scholarships...
        </div>
      ) : savedScholarships.length === 0 ? (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid var(--color-border)',
            padding: '64px 20px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
            }}
          >
            <Heart size={28} />
          </div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--color-primary-dark)' }}>
            No saved scholarships yet
          </h3>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.92rem', maxWidth: '380px', margin: '0 auto 24px auto', lineHeight: '1.5' }}>
            Save scholarships while browsing and come back to them later to compare and track deadlines.
          </p>
          <Link href="/scholarships" className="btn btn-primary" style={{ padding: '10px 24px' }}>
            <Compass size={16} /> Explore Scholarships
          </Link>
        </div>
      ) : (
        <div className="grid-cards">
          {savedScholarships.map((s) => (
            <ScholarshipCard key={s.id} scholarship={s} />
          ))}
        </div>
      )}
    </div>
  );
}
