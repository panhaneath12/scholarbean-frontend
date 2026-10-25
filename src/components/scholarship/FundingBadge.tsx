import React from 'react';
import { FundingType } from '@/types/scholarship';

interface FundingBadgeProps {
  funding: FundingType;
}

export function FundingBadge({ funding }: FundingBadgeProps) {
  const isFull = funding === 'full';
  return (
    <span className={`badge-funding ${isFull ? 'badge-fully-funded' : 'badge-partial'}`}>
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          backgroundColor: isFull ? '#16a34a' : '#2563eb',
        }}
      />
      {isFull ? 'Fully Funded' : 'Partial Funded'}
    </span>
  );
}
