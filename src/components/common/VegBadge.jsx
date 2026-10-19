import React from 'react';

export function VegBadge({ isVeg = true, size = 'md' }) {
  const dimension = size === 'sm' ? '14px' : size === 'lg' ? '20px' : '16px';
  const dotSize = size === 'sm' ? '6px' : size === 'lg' ? '10px' : '8px';

  return (
    <div
      title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
      style={{
        width: dimension,
        height: dimension,
        border: `2px solid ${isVeg ? '#16A34A' : '#DC2626'}`,
        borderRadius: '3px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1px',
        boxSizing: 'border-box',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: isVeg ? '50%' : '0%',
          backgroundColor: isVeg ? '#16A34A' : '#DC2626',
        }}
      />
    </div>
  );
}
