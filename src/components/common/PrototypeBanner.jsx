import React from 'react';
import { Info } from 'lucide-react';

export function PrototypeBanner() {
  return (
    <div
      style={{
        backgroundColor: '#FFFBEB',
        borderBottom: '1px solid #FDE68A',
        color: '#92400E',
        fontSize: '0.825rem',
        padding: '0.5rem 1rem',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontWeight: 500,
      }}
    >
      <Info size={16} style={{ flexShrink: 0 }} />
      <span>
        <strong>Frontend Demo Prototype:</strong> Data and status updates are saved locally in your browser. Ready for ASP.NET Core API connection.
      </span>
    </div>
  );
}
