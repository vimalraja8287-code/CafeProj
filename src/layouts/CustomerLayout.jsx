import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { PrototypeBanner } from '../components/common/PrototypeBanner';
import { Toast } from '../components/common/Toast';
import { CAFE_INFO } from '../data/menuData';

export function CustomerLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PrototypeBanner />
      <Navbar />
      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        <Outlet />
      </main>
      <footer
        style={{
          backgroundColor: 'var(--brand-espresso)',
          color: '#FAF7F2',
          padding: '2rem 1rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          marginTop: 'auto',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="container">
          <p style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
            {CAFE_INFO.name}
          </p>
          <p style={{ color: '#D9CFC4', fontSize: '0.8rem', marginBottom: '1rem' }}>
            {CAFE_INFO.tagline} • QR Table Ordering System Prototype
          </p>
          <p style={{ fontSize: '0.75rem', color: '#9E8E85' }}>
            Designed for ASP.NET Core Web API & SQL Server Integration
          </p>
        </div>
      </footer>
      <Toast />
    </div>
  );
}
