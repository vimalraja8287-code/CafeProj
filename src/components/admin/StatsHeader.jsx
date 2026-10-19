import React from 'react';
import { ShoppingBag, Sparkles, ChefHat, CheckCircle2, IndianRupee } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export function StatsHeader({ orders = [] }) {
  // Calculate today's stats from active orders array
  const todayOrders = orders; // prototype assumes sample dataset represent recent orders
  const newCount = todayOrders.filter((o) => o.status === 'new').length;
  const prepCount = todayOrders.filter((o) => o.status === 'preparing').length;
  const readyCount = todayOrders.filter((o) => o.status === 'ready').length;
  
  // Exclude cancelled from total revenue calculation
  const totalRevenue = todayOrders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const stats = [
    { title: "Today's Orders", value: todayOrders.length, icon: ShoppingBag, color: '#2A1B16', bg: '#F4EFE6' },
    { title: 'New Orders', value: newCount, icon: Sparkles, color: '#1E40AF', bg: '#EFF6FF' },
    { title: 'In Preparation', value: prepCount, icon: ChefHat, color: '#B45309', bg: '#FEF3C7' },
    { title: 'Ready for Service', value: readyCount, icon: CheckCircle2, color: '#047857', bg: '#D1FAE5' },
    { title: "Today's Revenue", value: formatCurrency(totalRevenue), icon: IndianRupee, color: '#D96136', bg: '#FFF3EE' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
        gap: '1rem',
        marginBottom: '1.75rem',
      }}
    >
      {stats.map((s, idx) => {
        const IconComponent = s.icon;
        return (
          <div
            key={idx}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              padding: '1.15rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                {s.title}
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: s.color, marginTop: '0.2rem' }}>
                {s.value}
              </div>
            </div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: s.bg,
                color: s.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconComponent size={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
