import React from 'react';
import { CAFE_INFO } from '../../data/menuData';
import { useTableNumber } from '../../hooks/useTableNumber';
import { Sparkles, MapPin, QrCode } from 'lucide-react';

export function MenuHeader() {
  const { tableNumber, changeTable, availableTables, hasUrlTable } = useTableNumber();

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid #E5DCCF',
        padding: '1.75rem 1rem 1.5rem 1rem',
        textAlign: 'center',
        marginBottom: '1.5rem',
        borderRadius: '0 0 24px 24px',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: '#FFFFFF',
          padding: '0.3rem 0.85rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--brand-terracotta)',
          marginBottom: '0.75rem',
          border: '1px solid #EFE8DD',
        }}
      >
        <Sparkles size={14} />
        <span>Welcome to {CAFE_INFO.name}</span>
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--brand-espresso)',
          marginBottom: '0.35rem',
        }}
      >
        Fresh, Artisanal & Made to Order
      </h2>

      {/* Table Notice & Interactive Table Selector Section */}
      <div style={{ marginTop: '1rem', maxWidth: '520px', margin: '1rem auto 0 auto' }}>
        <div
          style={{
            fontSize: '0.825rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
          }}
        >
          {hasUrlTable ? (
            <>
              <QrCode size={15} style={{ color: '#16A34A' }} />
              <span style={{ color: '#16A34A' }}>QR Code Scanned • Active Table: <strong>Table {tableNumber}</strong></span>
            </>
          ) : (
            <>
              <MapPin size={15} style={{ color: 'var(--brand-terracotta)' }} />
              <span>Ordering from <strong>Table {tableNumber}</strong> (Tap below to change table)</span>
            </>
          )}
        </div>

        {/* 6 Table Selection Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.45rem',
            flexWrap: 'wrap',
          }}
        >
          {availableTables.map((num) => {
            const isActive = tableNumber === num;
            return (
              <button
                key={num}
                onClick={() => changeTable(num)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 800 : 600,
                  transition: 'all 0.2s ease',
                  border: isActive ? '2px solid var(--brand-terracotta)' : '1px solid #EFE8DD',
                  backgroundColor: isActive ? 'var(--brand-terracotta)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--brand-espresso)',
                  boxShadow: isActive ? '0 4px 10px rgba(217, 97, 54, 0.25)' : 'var(--shadow-sm)',
                }}
              >
                Table {num}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
