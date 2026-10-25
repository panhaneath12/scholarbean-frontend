'use client';

import React, { useState } from 'react';
import { Coffee, X } from 'lucide-react';

export function BuyMeACoffeeWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const bmcUsername = process.env.NEXT_PUBLIC_BUY_ME_COFFEE_USERNAME || 'scholarbean';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {/* Expanded popover */}
      {isOpen && (
        <div
          style={{
            marginBottom: 12,
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '18px',
            maxWidth: '280px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #fde68a',
            animation: 'fadeIn 0.2s ease-out forwards',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#b45309', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Coffee size={16} />
              Support ScholarBean
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ color: '#94a3b8', padding: 2 }}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: '1.45', marginBottom: 14 }}>
            ScholarBean is 100% free and community supported. If this platform helped your scholarship journey, consider buying us a coffee! ☕
          </p>
          <a
            href={`https://buymeacoffee.com/${bmcUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-amber"
            style={{ width: '100%', fontSize: '0.85rem', padding: '8px' }}
          >
            Buy a Coffee ($3)
          </a>
        </div>
      )}

      {/* Floating Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Support ScholarBean"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 16px',
          borderRadius: '9999px',
          backgroundColor: '#d97706',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '0.88rem',
          boxShadow: '0 10px 15px -3px rgba(217, 119, 6, 0.35)',
          border: '2px solid #ffffff',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#b45309';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#d97706';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <Coffee size={18} />
        <span>Support Us</span>
      </button>
    </div>
  );
}
