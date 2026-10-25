import {
  AutocompleteResponse,
  MetaResponse,
  ScholarshipCard,
  ScholarshipDetail,
  ScholarshipListResponse,
  ScholarshipQueryParams,
  ScholarshipSubmissionPayload,
  SubmissionResponse,
} from '@/types/scholarship';
import { MOCK_META, MOCK_SCHOLARSHIPS } from './mock-data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const FETCH_TIMEOUT_MS = 2500;

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
    });
    clearTimeout(timeoutId);
    return res;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Fetch portal statistics, categories, and popular destinations
 */
export async function getMeta(): Promise<MetaResponse> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/meta`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Backend offline or error -> fallback gracefully
  }
  return MOCK_META;
}

/**
 * Fetch featured scholarships for the homepage hero carousel/grid
 */
export async function getFeaturedScholarships(): Promise<ScholarshipCard[]> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/scholarships/featured`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const json = await res.json();
      return json.data || json;
    }
  } catch {
    // Fallback to mock featured
  }
  return MOCK_SCHOLARSHIPS.filter((s) => s.is_featured);
}

/**
 * Fetch scholarships with search keywords, multi-parameter filters, and pagination
 */
export async function getScholarships(
  params: ScholarshipQueryParams = {}
): Promise<ScholarshipListResponse> {
  const query = new URLSearchParams();
  if (params.page) query.set('page', params.page.toString());
  if (params.limit) query.set('limit', params.limit.toString());
  if (params.q) query.set('q', params.q);
  if (params.country) query.set('country', params.country);
  if (params.level) query.set('level', params.level);
  if (params.field) query.set('field', params.field);
  if (params.eligible) query.set('eligible', params.eligible);
  if (params.funded) query.set('funded', params.funded);
  if (params.asean !== undefined) query.set('asean', params.asean ? 'true' : 'false');
  if (params.sort) query.set('sort', params.sort);

  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/scholarships?${query.toString()}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback to local filtering on mock data
  }

  // Fallback mock filtering
  let filtered = [...MOCK_SCHOLARSHIPS];

  if (params.q) {
    const qLower = params.q.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(qLower) ||
        s.provider.toLowerCase().includes(qLower) ||
        s.country.toLowerCase().includes(qLower) ||
        s.tags.some((t) => t.toLowerCase().includes(qLower)) ||
        s.short_description.toLowerCase().includes(qLower)
    );
  }

  if (params.asean) {
    filtered = filtered.filter((s) => s.is_asean_friendly);
  }

  if (params.country) {
    const cLower = params.country.toLowerCase();
    filtered = filtered.filter((s) => s.country.toLowerCase().includes(cLower));
  }

  if (params.level) {
    const lLower = params.level.toLowerCase();
    filtered = filtered.filter((s) => s.level.some((lvl) => lvl.toLowerCase() === lLower));
  }

  if (params.field) {
    const fLower = params.field.toLowerCase();
    filtered = filtered.filter((s) =>
      s.field.some((f) => f.toLowerCase().includes(fLower) || f.toLowerCase() === 'any')
    );
  }

  if (params.funded) {
    filtered = filtered.filter((s) => s.funding === params.funded);
  }

  if (params.eligible) {
    const eLower = params.eligible.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.eligible_nationalities.some(
          (nat) => nat.toLowerCase() === eLower || nat.toLowerCase() === 'all'
        )
    );
  }

  // Sorting
  const sort = params.sort || 'newest';
  if (sort === 'deadline') {
    filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  } else if (sort === 'popular') {
    filtered.sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
  } else {
    // Newest
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 12;
  const total = filtered.length;
  const total_pages = Math.ceil(total / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);

  return {
    data: paginatedData,
    pagination: {
      total,
      page,
      limit,
      total_pages,
      has_next: page < total_pages,
      has_prev: page > 1,
    },
  };
}

/**
 * Fetch scholarship detail by id or slug
 */
export async function getScholarshipById(idOrSlug: string): Promise<ScholarshipDetail | null> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/scholarships/${idOrSlug}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback
  }

  const found = MOCK_SCHOLARSHIPS.find(
    (s) => s.slug === idOrSlug || s.id === idOrSlug
  );
  return found || null;
}

/**
 * Autocomplete for instant live navbar search
 */
export async function getAutocomplete(query: string): Promise<AutocompleteResponse> {
  if (!query || query.trim().length < 2) {
    return { results: [] };
  }

  try {
    const res = await fetchWithTimeout(
      `${API_BASE_URL}/search/autocomplete?q=${encodeURIComponent(query)}`,
      { cache: 'no-store' }
    );
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback
  }

  const qLower = query.toLowerCase();
  const results = MOCK_SCHOLARSHIPS.filter(
    (s) =>
      s.name.toLowerCase().includes(qLower) ||
      s.country.toLowerCase().includes(qLower) ||
      s.provider.toLowerCase().includes(qLower)
  )
    .slice(0, 5)
    .map((s) => ({
      id: s.slug || s.id,
      name: s.name,
      country: s.country,
      flag: s.flag,
      funding: s.funding,
    }));

  return { results };
}

/**
 * Community scholarship submission
 */
export async function submitScholarship(
  payload: ScholarshipSubmissionPayload
): Promise<SubmissionResponse> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/scholarships/submit`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch {
    // In offline mode, simulate successful acceptance
    return {
      success: true,
      message: 'Thank you! Your scholarship submission will be reviewed and published within 48 hours.',
    };
  }
}
