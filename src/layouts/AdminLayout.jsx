import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Coffee, PlusCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { PrototypeBanner } from '../components/common/PrototypeBanner';
import { Toast } from '../components/common/Toast';
import { useOrderContext } from '../context/OrderContext';
import { CAFE_INFO } from '../data/menuData';

export function AdminLayout() {
  const { simulateIncomingOrder, refreshOrders } = useOrderContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FAF7F2' }}>
      <PrototypeBanner />

      {/* Admin Top Header */}
      <header
        style={{
          backgroundColor: 'var(--brand-espresso)',
          color: '#FFFFFF',
          padding: '0.85rem 1rem',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          {/* Brand & Admin Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'var(--brand-terracotta)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Coffee size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
                {CAFE_INFO.name} — Staff Kitchen Display
              </div>
              <div style={{ fontSize: '0.75rem', color: '#D9CFC4' }}>
                Real-time Order Management & Preparation Dashboard
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <button
              onClick={refreshOrders}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.825rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
              title="Refresh Orders"
            >
              <RefreshCw size={15} />
              <span className="hide-mobile">Refresh</span>
            </button>

            {/* Simulate Incoming Order Button */}
            <button
              onClick={simulateIncomingOrder}
              className="btn-primary"
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--brand-terracotta)',
              }}
              title="Add a mock incoming customer order"
            >
              <PlusCircle size={16} />
              <span>Simulate Incoming Order</span>
            </button>

            <Link
              to={`/menu?table=3`}
              style={{
                color: '#D9CFC4',
                fontSize: '0.825rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                textDecoration: 'none',
                marginLeft: '0.5rem',
              }}
            >
              <ArrowLeft size={16} />
              <span className="hide-mobile">View Menu</span>
            </Link>
          </div>
        </div>
      </header>

      <main style={{ flex: 1, padding: '1.5rem 0 3rem 0' }}>
        <Outlet />
      </main>

      <Toast />
    </div>
  );
}
