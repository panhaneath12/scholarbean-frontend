'use client';

import React, { useState } from 'react';
import { CheckSquare, Square, FileCheck, CheckCircle2 } from 'lucide-react';

interface DocumentsChecklistProps {
  documents: string[];
}

export function DocumentsChecklist({ documents }: DocumentsChecklistProps) {
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});

  const toggleCheck = (index: number) => {
    setCheckedState((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const completedCount = Object.values(checkedState).filter(Boolean).length;
  const totalCount = documents.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--color-border)',
        padding: '24px',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '6px',
        }}
      >
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📋 Required Documents</span>
        </h3>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>
          {completedCount} / {totalCount} completed ({progressPercent}%)
        </span>
      </div>

      <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', marginBottom: '16px' }}>
        Tick off documents as you prepare them to track your application readiness.
      </p>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '8px',
          borderRadius: '9999px',
          backgroundColor: '#e2e8f0',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: progressPercent === 100 ? '#16a34a' : 'var(--color-primary)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Checklist items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {documents.map((doc, idx) => {
          const isDone = !!checkedState[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: isDone ? '#f0fdf4' : '#f8fafc',
                border: isDone ? '1px solid #bbf7d0' : '1px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {isDone ? (
                <CheckSquare size={20} color="#16a34a" style={{ flexShrink: 0 }} />
              ) : (
                <Square size={20} color="#94a3b8" style={{ flexShrink: 0 }} />
              )}
              <span
                style={{
                  fontSize: '0.92rem',
                  color: isDone ? '#166534' : 'var(--color-text)',
                  textDecoration: isDone ? 'line-through' : 'none',
                  fontWeight: isDone ? 600 : 500,
                  flex: 1,
                }}
              >
                {doc}
              </span>
            </div>
          );
        })}
      </div>

      {progressPercent === 100 && (
        <div
          style={{
            marginTop: '16px',
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: '#dcfce7',
            color: '#15803d',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle2 size={16} /> All documents gathered! You are ready to submit.
        </div>
      )}
    </div>
  );
}
