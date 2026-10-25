'use client';

import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface BookmarkButtonProps {
  scholarshipId: string;
  size?: number;
  className?: string;
  showText?: boolean;
}

const STORAGE_KEY = 'scholarbean_bookmarks';

export function getStoredBookmarks(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function BookmarkButton({
  scholarshipId,
  size = 18,
  className = '',
  showText = false,
}: BookmarkButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const bookmarks = getStoredBookmarks();
    setIsSaved(bookmarks.includes(scholarshipId));

    const handleUpdate = () => {
      const updated = getStoredBookmarks();
      setIsSaved(updated.includes(scholarshipId));
    };

    window.addEventListener('scholarbean_bookmarks_changed', handleUpdate);
    return () => window.removeEventListener('scholarbean_bookmarks_changed', handleUpdate);
  }, [scholarshipId]);

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const bookmarks = getStoredBookmarks();
    let next: string[];
    if (bookmarks.includes(scholarshipId)) {
      next = bookmarks.filter((id) => id !== scholarshipId);
    } else {
      next = [...bookmarks, scholarshipId];
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setIsSaved(next.includes(scholarshipId));
      window.dispatchEvent(new CustomEvent('scholarbean_bookmarks_changed', { detail: next }));
    } catch {
      // quota or local storage unavailable
    }
  };

  return (
    <button
      type="button"
      onClick={toggleBookmark}
      aria-label={isSaved ? 'Remove from saved' : 'Save scholarship'}
      title={isSaved ? 'Saved to your favorites' : 'Save scholarship'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 8px',
        borderRadius: '8px',
        background: isSaved ? '#fef2f2' : 'transparent',
        color: isSaved ? '#dc2626' : '#94a3b8',
        border: isSaved ? '1px solid #fecaca' : '1px solid transparent',
        transition: 'all 0.15s ease',
        cursor: 'pointer',
      }}
      className={className}
    >
      <Heart
        size={size}
        fill={isSaved ? '#dc2626' : 'transparent'}
        stroke={isSaved ? '#dc2626' : 'currentColor'}
      />
      {showText && (
        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
          {isSaved ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
}
