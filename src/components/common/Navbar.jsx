import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, ShoppingBag, MapPin, ChevronDown } from 'lucide-react';
import { CAFE_INFO } from '../../data/menuData';
import { useCart } from '../../hooks/useCart';
import { useTableNumber } from '../../hooks/useTableNumber';

export function Navbar() {
  const { tableNumber, changeTable, availableTables } = useTableNumber();
  const { totals } = useCart();
  const location = useLocation();
  const [showTableMenu, setShowTableMenu] = useState(false);

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <header
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EFE8DD',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
        }}
      >
        {/* Brand Logo & Name */}
        <Link
          to={`/menu?table=${tableNumber}`}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: 'var(--brand-terracotta)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(217, 97, 54, 0.25)',
            }}
          >
            <Coffee size={22} />
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--brand-espresso)', lineHeight: 1.1 }}>
              {CAFE_INFO.name}
            </h1>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.02em' }}>
              {CAFE_INFO.tagline}
            </span>
          </div>
        </Link>

        {/* Center / Table Badge & Dropdown Selector */}
        {!isAdminPage && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowTableMenu((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'var(--bg-secondary)',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--brand-espresso)',
                border: '1px solid #E5DCCF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title="Click to switch table"
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#16A34A',
                  display: 'inline-block',
                }}
              />
              <span>Table {tableNumber}</span>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            </button>

            {/* Dropdown menu for selecting Table 1 to 6 */}
            {showTableMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '115%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  border: '1px solid var(--border-color)',
                  padding: '0.5rem',
                  zIndex: 200,
                  minWidth: '160px',
                }}
              >
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-muted)', padding: '0.35rem 0.6rem', textTransform: 'uppercase' }}>
                  Select Table
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                  {availableTables.map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        changeTable(num);
                        setShowTableMenu(false);
                      }}
                      style={{
                        padding: '0.4rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: tableNumber === num ? 800 : 600,
                        backgroundColor: tableNumber === num ? 'var(--brand-terracotta)' : 'var(--bg-secondary)',
                        color: tableNumber === num ? '#FFFFFF' : 'var(--brand-espresso)',
                        textAlign: 'center',
                      }}
                    >
                      Table {num}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Links (Cart Icon only, Staff Admin removed per request) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {!isAdminPage && (
            <Link
              to={`/cart?table=${tableNumber}`}
              className="btn-primary"
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                borderRadius: 'var(--radius-md)',
                position: 'relative',
              }}
            >
              <ShoppingBag size={18} />
              <span className="hide-mobile">Cart</span>
              {totals.itemQuantity > 0 && (
                <span
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: 'var(--brand-terracotta)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '0.2rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  }}
                >
                  {totals.itemQuantity}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
