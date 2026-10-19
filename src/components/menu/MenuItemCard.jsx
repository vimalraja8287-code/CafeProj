import React from 'react';
import { Plus, Minus, Star } from 'lucide-react';
import { VegBadge } from '../common/VegBadge';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';

export function MenuItemCard({ item }) {
  const { getItemQuantity, addToCart, updateQuantity } = useCart();
  const quantity = getItemQuantity(item.id);

  return (
    <div
      className="animate-fade-in"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {/* Food Image */}
      <div style={{ position: 'relative', height: '170px', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Veg Badge & Popular Tag */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '4px', borderRadius: '4px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            <VegBadge isVeg={item.isVeg} size="sm" />
          </div>
          {item.popular && (
            <span
              style={{
                backgroundColor: 'rgba(42, 27, 22, 0.85)',
                color: '#FFD700',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Star size={10} fill="#FFD700" /> Bestseller
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--brand-espresso)', lineHeight: 1.3 }}>
              {item.name}
            </h3>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--brand-terracotta)', whiteSpace: 'nowrap' }}>
              {formatCurrency(item.price)}
            </span>
          </div>

          <p
            style={{
              fontSize: '0.825rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.45,
              marginBottom: '1rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.description}
          </p>
        </div>

        {/* Action Button / Quantity Controls */}
        <div style={{ marginTop: 'auto' }}>
          {quantity === 0 ? (
            <button
              onClick={() => addToCart(item, 1)}
              style={{
                width: '100%',
                padding: '0.55rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FFFFFF',
                color: 'var(--brand-terracotta)',
                border: '1.5px solid var(--brand-terracotta)',
                fontWeight: 700,
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease',
              }}
            >
              <Plus size={16} /> ADD
            </button>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--brand-terracotta)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '0.35rem 0.6rem',
                boxShadow: '0 4px 10px rgba(217, 97, 54, 0.25)',
              }}
            >
              <button
                onClick={() => updateQuantity(item.id, quantity - 1)}
                style={{
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                }}
              >
                <Minus size={16} />
              </button>
              <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, quantity + 1)}
                style={{
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                }}
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
