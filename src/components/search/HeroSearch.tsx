'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowUpRight, GraduationCap, X } from 'lucide-react';
import { getAutocomplete } from '@/lib/api';
import { AutocompleteResult } from '@/types/scholarship';

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AutocompleteResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await getAutocomplete(query.trim());
        setResults(res.results || []);
        setIsOpen(true);
      } catch {
        setResults([]);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/scholarships?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    router.push(`/scholarships/${slug}`);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: '640px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '2px solid var(--color-border)',
            padding: '8px 12px',
            boxShadow: 'var(--shadow-md)',
            transition: 'border-color 0.15s ease',
          }}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
        >
          <Search size={22} color="var(--color-primary)" style={{ marginLeft: '4px', marginRight: '10px' }} />
          <input
            type="text"
            placeholder="Search scholarships, universities, countries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '1.02rem',
              color: 'var(--color-text)',
              background: 'transparent',
            }}
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              style={{ color: '#94a3b8', padding: '4px', marginRight: '4px' }}
            >
              <X size={16} />
            </button>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              fontSize: '0.92rem',
            }}
          >
            <span>Search</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </form>

      {/* Instant Autocomplete Dropdown */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-hover)',
            overflow: 'hidden',
            zIndex: 100,
          }}
        >
          <div
            style={{
              padding: '10px 16px',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--color-muted)',
              borderBottom: '1px solid var(--color-border-subtle)',
              backgroundColor: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Search size={14} />
            <span>TOP MATCHES FOR &quot;{query}&quot;</span>
          </div>

          {results.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    cursor: 'pointer',
                    transition: 'background 0.1s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.2rem' }}>{item.flag}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--color-primary-dark)' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                        {item.country}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: item.funding === 'full' ? '#dcfce7' : '#eff6ff',
                      color: item.funding === 'full' ? '#15803d' : '#1d4ed8',
                    }}
                  >
                    {item.funding === 'full' ? 'Full' : 'Partial'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.88rem' }}>
              No instant matches found. Press Enter to search all scholarships.
            </div>
          )}

          <div
            style={{
              padding: '10px 16px',
              backgroundColor: '#f8fafc',
              textAlign: 'center',
            }}
          >
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'var(--color-primary)',
              }}
            >
              View all results for &quot;{query}&quot; →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
