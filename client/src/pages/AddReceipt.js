import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_RECEIPT, CREATE_POINTS, GET_ALL_RECEIPTS } from '../apollo/queries';

// Icons
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const SpinIcon = () => (
  <svg className="animate-spin-slow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

function Label({ children, required }) {
  return (
    <label style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em', marginBottom: '6px', display: 'block' }}>
      {children}{required && <span style={{ color: '#22d3ee', marginLeft: '3px' }}>*</span>}
    </label>
  );
}

export default function AddReceipt({ onSuccess, onCancel }) {
  const [retailer,     setRetailer]     = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchaseTime, setPurchaseTime] = useState('');
  const [items,        setItems]        = useState([{ shortDescription: '', price: '' }]);
  const [errors,       setErrors]       = useState({});
  const [submitted,    setSubmitted]    = useState(false);

  const [createReceipt] = useMutation(CREATE_RECEIPT, {
    refetchQueries: [{ query: GET_ALL_RECEIPTS }],
  });
  const [createPoints] = useMutation(CREATE_POINTS);

  // Derived total
  const total = items.reduce((s, it) => s + (parseFloat(it.price) || 0), 0);

  function addItem() {
    setItems([...items, { shortDescription: '', price: '' }]);
  }

  function removeItem(i) {
    if (items.length === 1) return;
    setItems(items.filter((_, idx) => idx !== i));
  }

  function updateItem(i, field, val) {
    const copy = [...items];
    copy[i] = { ...copy[i], [field]: val };
    setItems(copy);
  }

  function validate() {
    const e = {};
    if (!retailer.trim())                          e.retailer     = 'Retailer name is required';
    if (!purchaseDate)                             e.purchaseDate = 'Purchase date is required';
    if (!purchaseTime)                             e.purchaseTime = 'Purchase time is required';
    if (items.some(it => !it.shortDescription.trim())) e.items    = 'All items need a description';
    if (items.some(it => !it.price || isNaN(parseFloat(it.price)))) e.prices = 'All items need a valid price';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    try {
      const formattedItems = items.map(it => ({
        shortDescription: it.shortDescription.trim(),
        price: parseFloat(it.price),
      }));

      // 1. Create receipt
      const { data } = await createReceipt({
        variables: { retailer: retailer.trim(), items: formattedItems, purchaseDate, purchaseTime },
      });

      // 2. Calculate & save points using the same data
      const isRoundDollar = total % 1 === 0;
      await createPoints({
        variables: {
          id:                     data?.createReceipt?.id,
          alphNumChar:            retailer.trim(),
          roundDollar:            isRoundDollar,
          totalMultipleOfQuarter: total,
          pairItems:              formattedItems.length,
          oddDays:                purchaseDate,
          peakTime:               purchaseTime,
        },
      });

      onSuccess(data?.createReceipt?.id);
    } catch (err) {
      setErrors({ submit: err.message });
    }
  }

  const inputFocus = (e) => { e.target.style.borderColor = 'rgba(34,211,238,0.5)'; e.target.style.background = 'rgba(34,211,238,0.04)'; };
  const inputBlur  = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)'; };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px' }}>

      {/* Header */}
      <div className="animate-fade-in" style={{ marginBottom: '40px' }}>
        <button
          onClick={onCancel}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: '14px', padding: 0, marginBottom: '20px', fontFamily: "'Fira Sans', sans-serif", transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#22d3ee')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
        >
          <BackIcon /> Back to Dashboard
        </button>
        <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#22d3ee', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          New Entry
        </p>
        <h1 style={{ margin: 0, fontSize: 'clamp(26px,4vw,40px)', fontWeight: '800', letterSpacing: '-1px', fontFamily: "'Fira Code', monospace" }}>
          Add <span className="gradient-text">Receipt</span>
        </h1>
      </div>

      {/* Form card */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="animate-fade-in-up glass" style={{ borderRadius: '20px', padding: '36px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* Retailer */}
          <div>
            <Label required>Retailer Name</Label>
            <input
              className="input-field"
              type="text"
              placeholder="e.g. Whole Foods Market"
              value={retailer}
              onChange={(e) => setRetailer(e.target.value)}
              onFocus={inputFocus}
              onBlur={inputBlur}
            />
            {errors.retailer && <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#f87171' }}>{errors.retailer}</p>}
          </div>

          {/* Date + Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <Label required>Purchase Date</Label>
              <input
                className="input-field"
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                onFocus={inputFocus}
                onBlur={inputBlur}
                style={{ colorScheme: 'dark' }}
              />
              {errors.purchaseDate && <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#f87171' }}>{errors.purchaseDate}</p>}
            </div>
            <div>
              <Label required>Purchase Time</Label>
              <input
                className="input-field"
                type="time"
                value={purchaseTime}
                onChange={(e) => setPurchaseTime(e.target.value)}
                onFocus={inputFocus}
                onBlur={inputBlur}
                style={{ colorScheme: 'dark' }}
              />
              {errors.purchaseTime && <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#f87171' }}>{errors.purchaseTime}</p>}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />

          {/* Items */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Label>Line Items</Label>
              <button
                type="button"
                onClick={addItem}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.25)', borderRadius: '8px', padding: '6px 12px', fontSize: '13px', fontWeight: '600', color: '#22d3ee', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Fira Sans', sans-serif" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(34,211,238,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(34,211,238,0.08)'; }}
              >
                <PlusIcon /> Add Item
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ flex: 2 }}>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Item description"
                      value={item.shortDescription}
                      onChange={(e) => updateItem(i, 'shortDescription', e.target.value)}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      className="input-field"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={item.price}
                      onChange={(e) => updateItem(i, 'price', e.target.value)}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    disabled={items.length === 1}
                    style={{
                      width: '44px', height: '44px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: '10px', color: '#f87171', cursor: items.length === 1 ? 'not-allowed' : 'pointer',
                      opacity: items.length === 1 ? 0.35 : 1, transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { if (items.length > 1) e.currentTarget.style.background = 'rgba(239,68,68,0.18)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
                    aria-label="Remove item"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
            {(errors.items || errors.prices) && (
              <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#f87171' }}>{errors.items || errors.prices}</p>
            )}
          </div>

          {/* Total preview */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: '12px', padding: '16px 20px' }}>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', fontWeight: '500' }}>Calculated Total</span>
            <span style={{ fontSize: '24px', fontWeight: '800', fontFamily: "'Fira Code', monospace", color: '#22d3ee' }}>
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Submit error */}
          {errors.submit && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '12px 16px', fontSize: '13px', color: '#f87171' }}>
              {errors.submit}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', paddingTop: '4px' }}>
            <button type="button" className="btn-ghost" onClick={onCancel} style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {submitted && Object.keys(errors).length === 0 ? <><SpinIcon /> Processing…</> : 'Submit Receipt →'}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
