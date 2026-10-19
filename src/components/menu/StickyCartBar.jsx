import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatters';

export function StickyCartBar({ tableNumber }) {
  const { totals, isEmpty } = useCart();

  if (isEmpty) return null;

  return (
    <div
      className="animate-slide-up"
      style={{
        position: 'sticky',
        bottom: '16px',
        left: 0,
        right: 0,
        zIndex: 90,
        maxWidth: '540px',
        margin: '0 auto',
        padding: '0 12px',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--brand-espresso)',
          color: '#FFFFFF',
          borderRadius: '16px',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              backgroundColor: 'var(--brand-terracotta)',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShoppingBag size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#D9CFC4', textTransform: 'uppercase', fontWeight: 600 }}>
              {totals.itemQuantity} {totals.itemQuantity === 1 ? 'item' : 'items'} added
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>
              {formatCurrency(totals.total)}
            </div>
          </div>
        </div>

        <Link
          to={`/cart?table=${tableNumber}`}
          style={{
            backgroundColor: 'var(--brand-terracotta)',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: '0.9rem',
            padding: '0.65rem 1.15rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 12px rgba(217, 97, 54, 0.3)',
          }}
        >
          <span>View Cart</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
