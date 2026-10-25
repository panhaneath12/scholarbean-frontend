'use client';

import React, { useState } from 'react';
import { HowToApplyStep } from '@/types/scholarship';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

interface ApplicationStepsProps {
  steps: HowToApplyStep[];
}

export function ApplicationSteps({ steps }: ApplicationStepsProps) {
  // Allow all to be open or toggle
  const [openSteps, setOpenSteps] = useState<Record<number, boolean>>({ 1: true, 2: true });

  const toggleStep = (stepNum: number) => {
    setOpenSteps((prev) => ({
      ...prev,
      [stepNum]: !prev[stepNum],
    }));
  };

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
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px' }}>
        🚀 Step-by-Step How to Apply
      </h3>
      <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', marginBottom: '20px' }}>
        Follow this roadmap in sequence to maximize your selection chances.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {steps.map((step, idx) => {
          const isOpen = openSteps[step.step] ?? false;
          const isLast = idx === steps.length - 1;

          return (
            <div key={step.step} style={{ position: 'relative' }}>
              <div
                onClick={() => toggleStep(step.step)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  backgroundColor: isOpen ? 'var(--color-primary-light)' : '#f8fafc',
                  border: isOpen ? '1px solid #bfdbfe' : '1px solid var(--color-border)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {step.step}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-primary-dark)' }}>
                    {step.title}
                  </span>
                </div>

                <div style={{ color: 'var(--color-muted)' }}>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {isOpen && (
                <div
                  style={{
                    padding: '12px 16px 14px 56px',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    color: '#334155',
                  }}
                >
                  {step.description}
                </div>
              )}

              {!isLast && (
                <div
                  style={{
                    position: 'absolute',
                    left: '29px',
                    bottom: '-12px',
                    width: '2px',
                    height: '12px',
                    backgroundColor: '#cbd5e1',
                    zIndex: 1,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
