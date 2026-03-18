import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECEIPT, GET_POINTS_BY_ID } from '../apollo/queries';

// Icons
const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const StoreIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const pointRules = [
  { key: 'alphNumChar',            label: 'Retailer Name Characters', desc: '1 pt per alphanumeric character in retailer name', color: '#22d3ee' },
  { key: 'roundDollar',            label: 'Round Dollar Amount',       desc: '5 pts if total is a whole dollar amount',          color: '#a78bfa' },
  { key: 'totalMultipleOfQuarter', label: 'Multiple of $0.25',         desc: '25 pts if total is a multiple of $0.25',           color: '#34d399' },
  { key: 'pairItems',              label: 'Paired Items',              desc: '5 pts for every 2 items on the receipt',           color: '#fb923c' },
  { key: 'oddDays',                label: 'Odd Purchase Day',          desc: '6 pts if purchase day is an odd number',           color: '#f472b6' },
  { key: 'peakTime',               label: 'Peak Hours (2–4 PM)',       desc: '10 pts if purchase time is between 2–4 PM',        color: '#facc15' },
];

function PointRow({ rule, value }) {
  // Format value for display
  let displayVal = value;
  if (value === null || value === undefined) displayVal = '—';
  else if (typeof value === 'boolean')       displayVal = value ? 'Yes' : 'No';

  // Parse points earned from the raw value — the server calculates these
  const isZeroLike = value === false || value === null || value === undefined;

  return (
    <div
      className="animate-fade-in-up card-hover"
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '12px', padding: '16px 20px', gap: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
        <div style={{
          width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
          background: isZeroLike ? 'rgba(255,255,255,0.15)' : rule.color,
          boxShadow: isZeroLike ? 'none' : `0 0 8px ${rule.color}66`,
        }} />
        <div>
          <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: '600', color: isZeroLike ? 'rgba(255,255,255,0.4)' : '#f8fafc' }}>
            {rule.label}
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{rule.desc}</p>
        </div>
      </div>
      <span style={{
        fontFamily: "'Fira Code', monospace",
        fontSize: '14px', fontWeight: '700',
        color: isZeroLike ? 'rgba(255,255,255,0.25)' : rule.color,
        minWidth: '60px', textAlign: 'right',
        background: isZeroLike ? 'transparent' : `${rule.color}15`,
        border: `1px solid ${isZeroLike ? 'transparent' : `${rule.color}35`}`,
        borderRadius: '6px', padding: '4px 10px',
      }}>
        {String(displayVal)}
      </span>
    </div>
  );
}

function SkeletonBlock({ h = '20px', w = '100%', mb = '0' }) {
  return <div className="skeleton" style={{ height: h, width: w, marginBottom: mb, borderRadius: '8px' }} />;
}

export default function ReceiptDetail({ receiptId, onBack }) {
  const { data: rData, loading: rLoad, error: rErr } = useQuery(GET_RECEIPT, { variables: { id: receiptId }, skip: !receiptId });
  const { data: pData, loading: pLoad, error: pErr } = useQuery(GET_POINTS_BY_ID, { variables: { id: receiptId }, skip: !receiptId });

  const receipt = rData?.getReceipt;
  const points  = pData?.getPointsById;
  const loading = rLoad || pLoad;
  const error   = rErr || pErr;

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '40px 24px' }}>

      {/* Back */}
      <button
        onClick={onBack}
        className="animate-fade-in"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: '14px', padding: 0, marginBottom: '28px', fontFamily: "'Fira Sans', sans-serif", transition: 'color 0.2s' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
      >
        <BackIcon /> Back to Dashboard
      </button>

      {error && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '16px 20px', color: '#f87171', fontSize: '14px', marginBottom: '24px' }}>
          {error.message}
        </div>
      )}

      {/* Receipt card */}
      <div
        className="animate-fade-in-up glass"
        style={{ borderRadius: '20px', padding: '32px', marginBottom: '32px' }}
      >
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <SkeletonBlock h="28px" w="50%" mb="6px" />
            <SkeletonBlock h="16px" w="35%" />
            <SkeletonBlock h="16px" w="30%" />
            <SkeletonBlock h="1px" mb="6px" />
            <SkeletonBlock h="16px" />
            <SkeletonBlock h="16px" />
          </div>
        ) : receipt ? (
          <>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee' }}>
                  <StoreIcon />
                </div>
                <div>
                  <h2 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '800', fontFamily: "'Fira Code', monospace", color: '#f8fafc' }}>
                    {receipt.retailer}
                  </h2>
                  <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                    {receipt.purchaseDate} · {receipt.purchaseTime}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: '0 0 2px', fontSize: '12px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total</p>
                <p className="gradient-text" style={{ margin: 0, fontSize: '28px', fontWeight: '800', fontFamily: "'Fira Code', monospace" }}>
                  ${parseFloat(receipt.total || 0).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Items */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px' }}>
              <p style={{ margin: '0 0 14px', fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Line Items ({receipt.items?.length || 0})
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {receipt.items?.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>{item.shortDescription}</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc', fontFamily: "'Fira Code', monospace" }}>
                      ${parseFloat(item.price || 0).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Receipt not found.</p>
        )}
      </div>

      {/* Points breakdown */}
      <div className="animate-fade-in-up delay-200">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#22d3ee', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Rewards</p>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', fontFamily: "'Fira Code', monospace" }}>
              Points <span className="gradient-text">Breakdown</span>
            </h2>
          </div>
          {points && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.25)',
              borderRadius: '14px', padding: '12px 20px',
            }}>
              <span style={{ color: '#22d3ee' }}><StarIcon /></span>
              <div>
                <p style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#22d3ee', fontFamily: "'Fira Code', monospace", lineHeight: 1 }}>
                  {points.totalPoints ?? '—'}
                </p>
                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Points</p>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[1,2,3,4,5,6].map(i => <SkeletonBlock key={i} h="68px" />)}
          </div>
        ) : points ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pointRules.map((rule, i) => (
              <div key={rule.key} className={`delay-${Math.min(i + 1, 4) * 100}`}>
                <PointRow rule={rule} value={points[rule.key]} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
              No points record found for this receipt.<br />
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>Points are calculated when a receipt is submitted.</span>
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
