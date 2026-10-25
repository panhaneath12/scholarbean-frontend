'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getScholarships } from '@/lib/api';
import { ScholarshipCard as ScholarshipCardType, PaginationMeta } from '@/types/scholarship';
import { ScholarshipCard } from '@/components/scholarship/ScholarshipCard';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Globe,
  BookOpen,
  Filter,
} from 'lucide-react';

const COUNTRIES = [
  'All Countries',
  'Japan',
  'United Kingdom',
  'USA',
  'Germany',
  'South Korea',
  'Singapore',
  'Australia',
  'Thailand',
  'European Union',
];

const FIELDS = [
  'All Fields',
  'STEM',
  'Economics & Business',
  'Social Sciences',
  'Agriculture',
  'Humanities',
  'Public Policy',
];

const ASEAN_NATIONALITIES = [
  { name: 'All Nationalities', flag: '' },
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

function DirectoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [isAseanOnly, setIsAseanOnly] = useState(searchParams.get('asean') === 'true');
  const [selectedFunding, setSelectedFunding] = useState(searchParams.get('funded') || '');
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || '');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || '');
  const [selectedField, setSelectedField] = useState(searchParams.get('field') || '');
  const [selectedNationality, setSelectedNationality] = useState(searchParams.get('eligible') || '');
  const [sortBy, setSortBy] = useState<'deadline' | 'newest' | 'popular'>(
    (searchParams.get('sort') as any) || 'deadline'
  );
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);

  const [scholarships, setScholarships] = useState<ScholarshipCardType[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 12,
    total_pages: 1,
    has_next: false,
    has_prev: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
    setIsAseanOnly(searchParams.get('asean') === 'true');
    setSelectedFunding(searchParams.get('funded') || '');
    setSelectedLevel(searchParams.get('level') || '');
    setSelectedCountry(searchParams.get('country') || '');
    setSelectedField(searchParams.get('field') || '');
    setSelectedNationality(searchParams.get('eligible') || '');
    setSortBy((searchParams.get('sort') as any) || 'deadline');
    setCurrentPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await getScholarships({
          page: currentPage,
          limit: 12,
          q: searchTerm || undefined,
          asean: isAseanOnly ? true : undefined,
          funded: selectedFunding || undefined,
          level: selectedLevel || undefined,
          country: selectedCountry && selectedCountry !== 'All Countries' ? selectedCountry : undefined,
          field: selectedField && selectedField !== 'All Fields' ? selectedField : undefined,
          eligible:
            selectedNationality && selectedNationality !== 'All Nationalities'
              ? selectedNationality
              : undefined,
          sort: sortBy,
        });

        if (!cancelled) {
          setScholarships(res.data);
          setPagination(res.pagination);
        }
      } catch (err) {
        console.error('Failed to load scholarships', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [
    searchTerm,
    isAseanOnly,
    selectedFunding,
    selectedLevel,
    selectedCountry,
    selectedField,
    selectedNationality,
    sortBy,
    currentPage,
  ]);

  const updateFilters = (updates: Record<string, string | boolean | number | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, val]) => {
      if (val === undefined || val === '' || val === false || val === 'All Countries' || val === 'All Fields' || val === 'All Nationalities') {
        params.delete(key);
      } else {
        params.set(key, String(val));
      }
    });

    if (!('page' in updates)) {
      params.delete('page');
      setCurrentPage(1);
    }

    router.push(`/scholarships?${params.toString()}`);
  };

  const handleClearAll = () => {
    setSearchTerm('');
    setIsAseanOnly(false);
    setSelectedFunding('');
    setSelectedLevel('');
    setSelectedCountry('');
    setSelectedField('');
    setSelectedNationality('');
    setSortBy('deadline');
    setCurrentPage(1);
    router.push('/scholarships');
  };

  // Active filter chips
  const activeChips: { label: string; onRemove: () => void }[] = [];
  if (searchTerm) {
    activeChips.push({
      label: `"${searchTerm}"`,
      onRemove: () => updateFilters({ q: undefined }),
    });
  }
  if (isAseanOnly) {
    activeChips.push({
      label: '🌏 ASEAN Eligible',
      onRemove: () => updateFilters({ asean: undefined }),
    });
  }
  if (selectedFunding) {
    activeChips.push({
      label: selectedFunding === 'full' ? '🟢 Fully Funded' : '🔵 Partial',
      onRemove: () => updateFilters({ funded: undefined }),
    });
  }
  if (selectedLevel) {
    activeChips.push({
      label: `🎓 ${selectedLevel.toUpperCase()}`,
      onRemove: () => updateFilters({ level: undefined }),
    });
  }
  if (selectedCountry && selectedCountry !== 'All Countries') {
    activeChips.push({
      label: `📍 ${selectedCountry}`,
      onRemove: () => updateFilters({ country: undefined }),
    });
  }
  if (selectedNationality && selectedNationality !== 'All Nationalities') {
    activeChips.push({
      label: `Passport: ${selectedNationality}`,
      onRemove: () => updateFilters({ eligible: undefined }),
    });
  }
  if (selectedField && selectedField !== 'All Fields') {
    activeChips.push({
      label: `Field: ${selectedField}`,
      onRemove: () => updateFilters({ field: undefined }),
    });
  }

  // Sidebar filter component
  const FilterContent = (
    <div>
      {/* 1. ASEAN Eligible Toggle */}
      <div
        style={{
          padding: '14px',
          borderRadius: '12px',
          backgroundColor: isAseanOnly ? '#fefce8' : '#f8fafc',
          border: isAseanOnly ? '1px solid #fde047' : '1px solid var(--color-border)',
          marginBottom: '20px',
          cursor: 'pointer',
        }}
        onClick={() => updateFilters({ asean: !isAseanOnly })}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>🌏</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: isAseanOnly ? '#854d0e' : 'var(--color-primary-dark)' }}>
                ASEAN Eligible
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-muted)' }}>
                Accepts Southeast Asian applicants
              </div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={isAseanOnly}
            onChange={() => {}}
            style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
          />
        </div>
      </div>

      {/* 2. Applicant Nationality (Passport) */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
          Your Passport Nationality
        </label>
        <select
          value={selectedNationality}
          onChange={(e) => updateFilters({ eligible: e.target.value })}
          style={{
            width: '100%',
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            backgroundColor: '#ffffff',
            fontSize: '0.86rem',
            color: 'var(--color-text)',
            outline: 'none',
          }}
        >
          {ASEAN_NATIONALITIES.map((c) => (
            <option key={c.name} value={c.name === 'All Nationalities' ? '' : c.name}>
              {c.flag ? `${c.flag} ` : ''}{c.name}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Degree Level */}
      <div style={{ marginBottom: '22px' }}>
        <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '8px' }}>
          Degree Level
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'All Levels', val: '' },
            { label: 'Undergraduate', val: 'undergraduate' },
            { label: 'Masters', val: 'masters' },
            { label: 'PhD', val: 'phd' },
          ].map((opt) => (
            <label
              key={opt.val}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.86rem',
                cursor: 'pointer',
                color: selectedLevel === opt.val ? 'var(--color-primary)' : 'var(--color-text)',
                fontWeight: selectedLevel === opt.val ? 600 : 400,
              }}
            >
              <input
                type="radio"
                name="level"
                checked={selectedLevel === opt.val}
                onChange={() => updateFilters({ level: opt.val })}
                style={{ accentColor: 'var(--color-primary)' }}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* 4. Funding Coverage */}
      <div style={{ marginBottom: '22px' }}>
        <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '8px' }}>
          Funding
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'All Funding Types', val: '' },
            { label: '🟢 Fully Funded', val: 'full' },
            { label: '🔵 Partial Funded', val: 'partial' },
          ].map((opt) => (
            <label
              key={opt.val}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.86rem',
                cursor: 'pointer',
                color: selectedFunding === opt.val ? 'var(--color-primary)' : 'var(--color-text)',
                fontWeight: selectedFunding === opt.val ? 600 : 400,
              }}
            >
              <input
                type="radio"
                name="funding"
                checked={selectedFunding === opt.val}
                onChange={() => updateFilters({ funded: opt.val })}
                style={{ accentColor: 'var(--color-primary)' }}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* 5. Destination Country */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
          Host Country
        </label>
        <select
          value={selectedCountry}
          onChange={(e) => updateFilters({ country: e.target.value })}
          style={{
            width: '100%',
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            backgroundColor: '#ffffff',
            fontSize: '0.86rem',
            color: 'var(--color-text)',
            outline: 'none',
          }}
        >
          {COUNTRIES.map((c) => (
            <option key={c} value={c === 'All Countries' ? '' : c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* 6. Field of Study */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
          Field of Study
        </label>
        <select
          value={selectedField}
          onChange={(e) => updateFilters({ field: e.target.value })}
          style={{
            width: '100%',
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            backgroundColor: '#ffffff',
            fontSize: '0.86rem',
            color: 'var(--color-text)',
            outline: 'none',
          }}
        >
          {FIELDS.map((f) => (
            <option key={f} value={f === 'All Fields' ? '' : f}>
              {f}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: '28px', paddingBottom: '72px' }}>
      {/* Top Title & Total Count */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.9rem', marginBottom: '4px', color: 'var(--color-primary-dark)' }}>
          Scholarships
        </h1>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.92rem' }}>
          {pagination.total} opportunities available for international study
        </p>
      </div>

      {/* Directory Two-Column Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '28px',
          alignItems: 'start',
        }}
        className="directory-grid"
      >
        {/* Desktop Filters Sidebar */}
        <aside
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid var(--color-border)',
            padding: '20px',
            boxShadow: 'var(--shadow-xs)',
          }}
          className="desktop-filter-sidebar"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-primary-dark)' }}>
              Filters
            </div>
            {activeChips.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--color-danger)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <RotateCcw size={12} /> Clear all
              </button>
            )}
          </div>

          {FilterContent}
        </aside>

        {/* Right Listing Column */}
        <div>
          {/* Search bar & Sort Dropdown */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              border: '1px solid var(--color-border)',
              padding: '12px 16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            {/* Search Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: '1 1 260px',
                gap: '8px',
              }}
            >
              <Search size={18} color="var(--color-muted)" />
              <input
                type="text"
                placeholder="Search scholarships, universities, countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateFilters({ q: searchTerm });
                  }
                }}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.92rem',
                  color: 'var(--color-text)',
                  background: 'transparent',
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    updateFilters({ q: undefined });
                  }}
                  style={{ color: '#94a3b8' }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.84rem', color: 'var(--color-muted)', fontWeight: 600 }}>
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => updateFilters({ sort: e.target.value })}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#ffffff',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="deadline">Deadline (Closing Soonest) ▼</option>
                <option value="newest">Newest Added</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeChips.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '18px',
              }}
            >
              <span style={{ fontSize: '0.82rem', color: 'var(--color-muted)', fontWeight: 600 }}>
                Filters:
              </span>
              {activeChips.map((chip, idx) => (
                <span
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--color-primary-dark)',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  {chip.label}
                  <button
                    type="button"
                    onClick={chip.onRemove}
                    style={{ color: '#64748b', display: 'flex', alignItems: 'center' }}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}

              <button
                type="button"
                onClick={handleClearAll}
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--color-danger)',
                  fontWeight: 600,
                  marginLeft: '4px',
                  textDecoration: 'underline',
                }}
              >
                Clear all
              </button>
            </div>
          )}

          {/* Cards Grid */}
          {isLoading ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '18px',
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  style={{
                    height: '240px',
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid var(--color-border)',
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>
          ) : scholarships.length === 0 ? (
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                padding: '56px 20px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                }}
              >
                <BookOpen size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No Scholarships Found</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 20px auto' }}>
                We couldn&apos;t find any scholarships matching your active filters. Try loosening your keywords or reset all filters.
              </p>
              <button type="button" onClick={handleClearAll} className="btn btn-primary">
                <RotateCcw size={15} /> Reset All Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {scholarships.map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.total_pages > 1 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '40px',
              }}
            >
              <button
                type="button"
                disabled={!pagination.has_prev}
                onClick={() => updateFilters({ page: pagination.page - 1 })}
                className="btn btn-secondary"
                style={{
                  padding: '8px 14px',
                  opacity: pagination.has_prev ? 1 : 0.4,
                  cursor: pagination.has_prev ? 'pointer' : 'not-allowed',
                }}
              >
                <ChevronLeft size={16} /> Prev
              </button>

              {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => updateFilters({ page: p })}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    border: '1px solid var(--color-border)',
                    backgroundColor: pagination.page === p ? 'var(--color-primary)' : '#ffffff',
                    color: pagination.page === p ? '#ffffff' : 'var(--color-text)',
                    cursor: 'pointer',
                  }}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                disabled={!pagination.has_next}
                onClick={() => updateFilters({ page: pagination.page + 1 })}
                className="btn btn-secondary"
                style={{
                  padding: '8px 14px',
                  opacity: pagination.has_next ? 1 : 0.4,
                  cursor: pagination.has_next ? 'pointer' : 'not-allowed',
                }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Mobile Filter Trigger */}
      <div
        className="mobile-sticky-filter"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
          display: 'none',
        }}
      >
        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className="btn btn-primary"
          style={{
            padding: '12px 24px',
            borderRadius: '9999px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <SlidersHorizontal size={17} />
          <span>Filters {activeChips.length > 0 ? `(${activeChips.length})` : ''}</span>
        </button>
      </div>

      {/* Mobile Filters Slide-Up Drawer Modal */}
      {isMobileDrawerOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'flex-end',
          }}
          onClick={() => setIsMobileDrawerOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              width: '100%',
              maxHeight: '85vh',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              padding: '24px',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '18px',
                borderBottom: '1px solid var(--color-border)',
                paddingBottom: '12px',
              }}
            >
              <h3 style={{ fontSize: '1.15rem' }}>Filters & Refinements</h3>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                style={{ color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            {FilterContent}

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  handleClearAll();
                  setIsMobileDrawerOpen(false);
                }}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                Show Results ({pagination.total})
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 860px) {
          .directory-grid {
            grid-template-columns: 1fr !important;
          }
          .desktop-filter-sidebar {
            display: none !important;
          }
          .mobile-sticky-filter {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function ScholarshipsPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>Loading directory...</div>}>
      <DirectoryContent />
    </Suspense>
  );
}
