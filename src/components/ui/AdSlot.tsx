'use client';

import React from 'react';

interface AdSlotProps {
  slotType: 'horizontal' | 'sidebar' | 'detail-bottom';
  className?: string;
}

export function AdSlot({ slotType, className = '' }: AdSlotProps) {
  const isHorizontal = slotType === 'horizontal' || slotType === 'detail-bottom';

  return (
    <aside
      aria-label="Advertisement"
      className={className}
      style={{
        margin: isHorizontal ? '32px 0' : '20px 0',
        width: '100%',
        backgroundColor: '#f8fafc',
        border: '1px dashed #cbd5e1',
        borderRadius: '12px',
        padding: '16px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: isHorizontal ? '100px' : '250px',
        color: '#94a3b8',
        fontSize: '0.8rem',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '4px', fontSize: '0.7rem' }}>
        Sponsor / Resource Placement
      </div>
      <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>
        {slotType === 'horizontal' && '🚀 Preparing for IELTS or GRE? Access verified Southeast Asian prep bundles and mentorship.'}
        {slotType === 'sidebar' && '💡 Study abroad loan guides and foreign currency exchange tips for ASEAN scholars.'}
        {slotType === 'detail-bottom' && '🎓 Connect with previous scholarship recipients and get your statement of purpose reviewed.'}
      </div>
    </aside>
  );
}
