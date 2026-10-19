import React from 'react';
import { CATEGORIES } from '../../data/menuData';
import { UtensilsCrossed, Cookie, Sandwich, Cake, CupSoda } from 'lucide-react';

const ICON_MAP = {
  UtensilsCrossed,
  Cookie,
  Sandwich,
  Cake,
  CupSoda,
};

export function CategoryFilter({ activeCategory, onSelectCategory }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.65rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        marginBottom: '1.5rem',
        scrollbarWidth: 'none',
      }}
    >
      {CATEGORIES.map((cat) => {
        const IconComponent = ICON_MAP[cat.icon] || UtensilsCrossed;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.15rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
              border: isActive ? '1.5px solid var(--brand-terracotta)' : '1px solid #EFE8DD',
              backgroundColor: isActive ? 'var(--brand-terracotta)' : '#FFFFFF',
              color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
              boxShadow: isActive ? '0 4px 12px rgba(217, 97, 54, 0.25)' : 'var(--shadow-sm)',
            }}
          >
            <IconComponent size={16} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
