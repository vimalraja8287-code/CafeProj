import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { VegBadge } from '../common/VegBadge';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';

export function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        marginBottom: '0.75rem',
        boxShadow: 'var(--shadow-sm)',
        gap: '1rem',
      }}
    >
      {/* Thumbnail & Item info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1 }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '10px',
            objectFit: 'cover',
            backgroundColor: 'var(--bg-secondary)',
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
          }}
        />

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
            <VegBadge isVeg={item.isVeg !== false} size="sm" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--brand-espresso)' }}>
              {item.name}
            </h4>
          </div>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            {formatCurrency(item.price)} each
          </div>
        </div>
      </div>

      {/* Quantity Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '0.25rem 0.5rem',
          border: '1px solid #E5DCCF',
        }}
      >
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          style={{ padding: '2px', color: 'var(--brand-espresso)', display: 'flex' }}
        >
          <Minus size={14} />
        </button>
        <span style={{ fontWeight: 700, fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          style={{ padding: '2px', color: 'var(--brand-espresso)', display: 'flex' }}
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Item Total & Remove */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--brand-terracotta)', minWidth: '60px', textAlign: 'right' }}>
          {formatCurrency(item.price * item.quantity)}
        </span>
        <button
          onClick={() => removeFromCart(item.id)}
          title="Remove item"
          style={{
            color: '#9E8E85',
            padding: '6px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#DC2626')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#9E8E85')}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
