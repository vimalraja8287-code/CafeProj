import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';

export function NotFoundPage() {
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
        }}
      >
        <Coffee size={48} style={{ color: 'var(--brand-terracotta)', margin: '0 auto 1rem auto' }} />
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--brand-espresso)', marginBottom: '0.5rem' }}>
          404 - Page Not Found
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/menu?table=3" className="btn-primary">
          Back to Cafe Menu
        </Link>
      </div>
    </div>
  );
}
