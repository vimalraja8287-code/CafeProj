import React, { useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import { StatsHeader } from '../components/admin/StatsHeader';
import { OrderFilterTabs } from '../components/admin/OrderFilterTabs';
import { OrderCard } from '../components/admin/OrderCard';
import { ChefHat, Inbox } from 'lucide-react';

export function AdminDashboardPage() {
  const { orders, loading, updateOrderStatus } = useOrders();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredOrders = orders.filter((o) => {
    if (activeFilter === 'all') return true;
    return o.status === activeFilter;
  });

  return (
    <div className="container">
      {/* Overview Metrics Header */}
      <StatsHeader orders={orders} />

      {/* Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 700, color: 'var(--brand-espresso)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChefHat style={{ color: 'var(--brand-terracotta)' }} />
          Kitchen Display & Orders
        </h2>
      </div>

      <OrderFilterTabs
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        orders={orders}
      />

      {/* Orders Grid */}
      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Loading live kitchen orders...
        </div>
      ) : filteredOrders.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            marginTop: '1rem',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
            }}
          >
            <Inbox size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--brand-espresso)', marginBottom: '0.5rem' }}>
            No {activeFilter !== 'all' ? activeFilter : ''} orders found
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            There are currently no orders under this status tab. Click "Simulate Incoming Order" to test.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}
        >
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} onUpdateStatus={updateOrderStatus} />
          ))}
        </div>
      )}
    </div>
  );
}
