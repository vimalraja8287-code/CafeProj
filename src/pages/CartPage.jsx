import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useTableNumber } from '../hooks/useTableNumber';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';

export function CartPage() {
  const { items, totals, isEmpty, clearCart } = useCart();
  const { tableNumber } = useTableNumber();

  if (isEmpty) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '3rem 2rem',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--brand-terracotta)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
            }}
          >
            <ShoppingBag size={40} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: 'var(--brand-espresso)', marginBottom: '0.5rem' }}>
            Your Cart is Empty
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.5 }}>
            Looks like you haven't added any delicious cafe items to your cart yet. Explore our fresh menu!
          </p>

          <Link to={`/menu?table=${tableNumber}`} className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
            Browse Cafe Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '1.5rem', maxWidth: '1000px' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Link
          to={`/menu?table=${tableNumber}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          <ArrowLeft size={18} />
          <span>Back to Menu (Table {tableNumber})</span>
        </Link>

        <button
          onClick={clearCart}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#DC2626',
            fontWeight: 600,
            fontSize: '0.85rem',
            backgroundColor: '#FEE2E2',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <Trash2 size={15} />
          <span>Clear Cart</span>
        </button>
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--brand-espresso)',
          marginBottom: '1.5rem',
        }}
      >
        Your Selected Dishes (Table {tableNumber})
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem',
          alignItems: 'flex-start',
        }}
      >
        {/* Cart Items List */}
        <div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Bill Summary */}
        <div>
          <CartSummary totals={totals} tableNumber={tableNumber} />
        </div>
      </div>
    </div>
  );
}
