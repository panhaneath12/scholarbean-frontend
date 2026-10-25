'use client';

import React from 'react';
import { Clock, Flame, AlertCircle } from 'lucide-react';

interface DeadlineBadgeProps {
  deadline: string;
}

export function DeadlineBadge({ deadline }: DeadlineBadgeProps) {
  const targetDate = new Date(deadline);
  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return (
      <span className="badge-deadline expired" title={targetDate.toLocaleDateString()}>
        <Clock size={13} />
        Closed
      </span>
    );
  }

  if (diffDays <= 14) {
    return (
      <span className="badge-deadline urgent" title={`Closes on ${targetDate.toLocaleDateString()}`}>
        <Flame size={13} color="#dc2626" />
        {diffDays === 1 ? '1 day left!' : `${diffDays} days left`}
      </span>
    );
  }

  return (
    <span className="badge-deadline safe" title={`Closes on ${targetDate.toLocaleDateString()}`}>
      <Clock size={13} color="#16a34a" />
      {diffDays} days left
    </span>
  );
}
