import React, { useState, useEffect } from 'react';

// Receipt icon SVG
const ReceiptIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/>
    <line x1="8" y1="8" x2="16" y2="8"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
    <line x1="8" y1="16" x2="14" y2="16"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

export default function Navbar({ page, navigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        background: scrolled ? 'rgba(2,6,23,0.97)' : 'rgba(2,6,23,0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        transition: 'background 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <button
          onClick={() => navigate('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #22d3ee, #a78bfa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#000', flexShrink: 0,
          }}>
            <ReceiptIcon />
          </div>
          <span style={{ fontFamily: "'Fira Code', monospace", fontWeight: '700', fontSize: '16px', color: '#f8fafc', letterSpacing: '-0.3px' }}>
            receipt<span style={{ color: '#22d3ee' }}>.app</span>
          </span>
        </button>

        {/* Nav items */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => navigate('dashboard')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: page === 'dashboard' ? 'rgba(34,211,238,0.1)' : 'transparent',
              border: page === 'dashboard' ? '1px solid rgba(34,211,238,0.3)' : '1px solid transparent',
              borderRadius: '8px', padding: '7px 14px',
              fontSize: '14px', fontWeight: '500',
              color: page === 'dashboard' ? '#22d3ee' : 'rgba(255,255,255,0.6)',
              cursor: 'pointer', transition: 'all 0.2s ease',
              fontFamily: "'Fira Sans', sans-serif",
            }}
            onMouseEnter={(e) => { if (page !== 'dashboard') { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; } }}
            onMouseLeave={(e) => { if (page !== 'dashboard') { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'transparent'; } }}
          >
            <GridIcon /> Dashboard
          </button>

          <button
            onClick={() => navigate('add')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'linear-gradient(135deg, #22d3ee, #a78bfa)',
              border: 'none', borderRadius: '8px',
              padding: '8px 18px', fontSize: '14px', fontWeight: '700',
              color: '#000', cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              fontFamily: "'Fira Sans', sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <PlusIcon /> Add Receipt
          </button>
        </div>
      </div>
    </nav>
  );
}
