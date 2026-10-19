import React from 'react';
import { ShoppingBag, ChefHat, CheckCircle2, Coffee, XCircle } from 'lucide-react';

export function StatusTimeline({ status = 'new' }) {
  if (status === 'cancelled') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#FEE2E2',
          border: '1px solid #FCA5A5',
          color: '#B91C1C',
          fontWeight: 600,
        }}
      >
        <XCircle size={24} />
        <div>
          <div style={{ fontWeight: 700, fontSize: '1rem' }}>Order Cancelled</div>
          <div style={{ fontSize: '0.825rem', opacity: 0.9 }}>
            This order was cancelled by staff or customer.
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 'new', label: 'Order Placed', icon: ShoppingBag },
    { id: 'preparing', label: 'Preparing', icon: ChefHat },
    { id: 'ready', label: 'Ready', icon: CheckCircle2 },
    { id: 'served', label: 'Served', icon: Coffee },
  ];

  const orderMap = { new: 0, preparing: 1, ready: 2, served: 3 };
  const currentIndex = orderMap[status] ?? 0;

  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Background Connecting Line */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '30px',
            right: '30px',
            height: '3px',
            backgroundColor: '#EFE8DD',
            zIndex: 1,
          }}
        />

        {/* Active Filled Line */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '30px',
            width: `${(currentIndex / (steps.length - 1)) * 80 + 5}%`,
            height: '3px',
            backgroundColor: 'var(--brand-terracotta)',
            zIndex: 1,
            transition: 'width 0.4s ease',
          }}
        />

        {steps.map((step, idx) => {
          const IconComp = step.icon;
          const isDone = idx <= currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div
              key={step.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: isDone ? 'var(--brand-terracotta)' : '#FFFFFF',
                  color: isDone ? '#FFFFFF' : '#9E8E85',
                  border: isDone ? '2px solid var(--brand-terracotta)' : '2px solid #EFE8DD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isCurrent ? '0 0 0 4px rgba(217, 97, 54, 0.2)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <IconComp size={18} />
              </div>
              <span
                style={{
                  fontSize: '0.775rem',
                  fontWeight: isCurrent ? 700 : isDone ? 600 : 500,
                  color: isDone ? 'var(--brand-espresso)' : 'var(--text-muted)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
