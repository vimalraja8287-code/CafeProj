import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Receipt } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export function CartSummary({ totals, tableNumber }) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <Receipt size={20} style={{ color: 'var(--brand-terracotta)' }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-espresso)' }}>
          Order Bill Details
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Items Subtotal ({totals.itemQuantity})</span>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatCurrency(totals.subtotal)}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Government Taxes ({totals.taxRatePercentage} GST)</span>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formatCurrency(totals.tax)}</span>
        </div>

        <div
          style={{
            height: '1px',
            backgroundColor: 'var(--border-color)',
            margin: '0.5rem 0',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-espresso)' }}>
          <span>To Pay</span>
          <span style={{ color: 'var(--brand-terracotta)' }}>{formatCurrency(totals.total)}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
        <Link
          to={`/checkout?table=${tableNumber}`}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '0.85rem',
            fontSize: '1rem',
          }}
        >
          <span>Proceed to Checkout</span>
          <ArrowRight size={18} />
        </Link>

        <Link
          to={`/menu?table=${tableNumber}`}
          className="btn-secondary"
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '0.9rem',
          }}
        >
          <ShoppingBag size={16} />
          <span>Add More Items</span>
        </Link>
      </div>
    </div>
  );
}
