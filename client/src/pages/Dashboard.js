import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_RECEIPTS } from '../apollo/queries';

// Icons
const StoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const CalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const TrophyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8 21 12 21 16 21"/><line x1="12" y1="17" x2="12" y2="21"/>
    <path d="M7 4H2v3a5 5 0 0 0 5 5h0a5 5 0 0 0 5-5V4"/>
    <path d="M17 4h5v3a5 5 0 0 1-5 5h0a5 5 0 0 1-5-5V4"/>
    <line x1="7" y1="4" x2="17" y2="4"/>
  </svg>
);

function SkeletonCard() {
  return (
    <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px' }}>
      <div className="skeleton" style={{ height: '20px', width: '60%', marginBottom: '12px' }} />
      <div className="skeleton" style={{ height: '14px', width: '40%', marginBottom: '8px' }} />
      <div className="skeleton" style={{ height: '14px', width: '30%', marginBottom: '20px' }} />
      <div className="skeleton" style={{ height: '36px', width: '100%' }} />
    </div>
  );
}

function ReceiptCard({ receipt, onView }) {
  const itemCount = receipt.items?.length || 0;
  const total     = parseFloat(receipt.total || 0).toFixed(2);

  return (
    <div
      className="animate-fade-in-up card-hover"
      style={{
        background: 'rgba(15,23,42,0.7)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        cursor: 'default',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '10px',
            background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee',
          }}>
            <StoreIcon />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#f8fafc', fontFamily: "'Fira Code', monospace" }}>
              {receipt.retailer}
            </h3>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>
        <span style={{
          background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.25)',
          borderRadius: '999px', padding: '4px 12px',
          fontSize: '15px', fontWeight: '800', color: '#22d3ee',
          fontFamily: "'Fira Code', monospace",
        }}>
          ${total}
        </span>
      </div>

      {/* Date / Time */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
          <CalIcon /> {receipt.purchaseDate || '—'}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
          <ClockIcon /> {receipt.purchaseTime || '—'}
        </span>
      </div>

      {/* Items preview */}
      {receipt.items?.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {receipt.items.slice(0, 2).map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>{item.shortDescription}</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>${parseFloat(item.price || 0).toFixed(2)}</span>
            </div>
          ))}
          {receipt.items.length > 2 && (
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>+{receipt.items.length - 2} more items</p>
          )}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => onView(receipt.id)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)',
          borderRadius: '10px', padding: '10px',
          fontSize: '13px', fontWeight: '600', color: '#22d3ee', cursor: 'pointer',
          transition: 'all 0.2s ease', fontFamily: "'Fira Sans', sans-serif",
          marginTop: 'auto',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(34,211,238,0.15)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.4)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(34,211,238,0.08)'; e.currentTarget.style.borderColor = 'rgba(34,211,238,0.2)'; }}
      >
        View Points Breakdown <ArrowIcon />
      </button>
    </div>
  );
}

export default function Dashboard({ onAddNew, onViewReceipt }) {
  const { loading, error, data } = useQuery(GET_ALL_RECEIPTS, { fetchPolicy: 'cache-and-network' });

  const receipts    = data?.getAllReceipts || [];
  const totalSpent  = receipts.reduce((s, r) => s + (parseFloat(r.total) || 0), 0);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

      {/* Page header */}
      <div className="animate-fade-in" style={{ marginBottom: '48px' }}>
        <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#22d3ee', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Overview
        </p>
        <h1 style={{ margin: '0 0 8px 0', fontSize: 'clamp(28px,4vw,44px)', fontWeight: '800', letterSpacing: '-1px', fontFamily: "'Fira Code', monospace" }}>
          Your <span className="gradient-text">Receipts</span>
        </h1>
        <p style={{ margin: 0, fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
          Submit receipts to calculate reward points automatically.
        </p>
      </div>

      {/* Stats bar */}
      <div
        className="animate-fade-in-up"
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          gap: '1px', background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px', overflow: 'hidden', marginBottom: '48px',
        }}
      >
        {[
          { label: 'Receipts Logged', value: loading ? '—' : receipts.length },
          { label: 'Total Spent', value: loading ? '—' : `$${totalSpent.toFixed(2)}` },
          { label: 'Avg. Receipt', value: loading || !receipts.length ? '—' : `$${(totalSpent / receipts.length).toFixed(2)}` },
        ].map((stat, i) => (
          <div key={i} style={{ padding: '24px 20px', background: 'rgba(2,6,23,0.9)', textAlign: 'center' }}>
            <p className="gradient-text" style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: '800', fontFamily: "'Fira Code', monospace" }}>
              {stat.value}
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '16px 20px', marginBottom: '32px', color: '#f87171', fontSize: '14px' }}>
          Could not load receipts: {error.message}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '20px' }}>
          {[1,2,3].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : receipts.length === 0 ? (
        /* Empty state */
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '20px', margin: '0 auto 24px',
            background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee',
          }}>
            <TrophyIcon />
          </div>
          <h3 style={{ margin: '0 0 10px', fontSize: '22px', fontWeight: '700', fontFamily: "'Fira Code', monospace" }}>No receipts yet</h3>
          <p style={{ margin: '0 0 28px', color: 'rgba(255,255,255,0.45)', fontSize: '15px' }}>Add your first receipt to start earning points.</p>
          <button className="btn-primary" onClick={onAddNew} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <PlusIcon /> Add First Receipt
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
              {receipts.length} {receipts.length === 1 ? 'receipt' : 'receipts'}
            </p>
            <button className="btn-primary" onClick={onAddNew} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', fontSize: '14px' }}>
              <PlusIcon /> Add Receipt
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '20px' }}>
            {receipts.map((r, i) => (
              <div key={r.id} className={`delay-${Math.min(i + 1, 4) * 100}`}>
                <ReceiptCard receipt={r} onView={onViewReceipt} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
