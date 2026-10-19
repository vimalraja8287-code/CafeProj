import React from 'react';

export function OrderFilterTabs({ activeFilter, onSelectFilter, orders = [] }) {
  const filterOptions = [
    { id: 'all', label: 'All Orders' },
    { id: 'new', label: 'New' },
    { id: 'preparing', label: 'Preparing' },
    { id: 'ready', label: 'Ready' },
    { id: 'served', label: 'Served' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const getCount = (id) => {
    if (id === 'all') return orders.length;
    return orders.filter((o) => o.status === id).length;
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        marginBottom: '1.5rem',
        paddingBottom: '0.25rem',
      }}
    >
      {filterOptions.map((opt) => {
        const count = getCount(opt.id);
        const isActive = activeFilter === opt.id;

        return (
          <button
            key={opt.id}
            onClick={() => onSelectFilter(opt.id)}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              border: isActive ? '1.5px solid var(--brand-espresso)' : '1px solid var(--border-color)',
              backgroundColor: isActive ? 'var(--brand-espresso)' : '#FFFFFF',
              color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{opt.label}</span>
            <span
              style={{
                backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'var(--bg-secondary)',
                color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                fontSize: '0.75rem',
                padding: '1px 7px',
                borderRadius: '999px',
                fontWeight: 700,
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
