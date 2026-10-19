import React from 'react';
import { CreditCard, Wallet, ShieldAlert, CheckCircle2 } from 'lucide-react';

export function PaymentSelector({ paymentMethod, setPaymentMethod }) {
  const options = [
    {
      id: 'online',
      title: 'Pay Online (UPI / Card / NetBanking)',
      description: 'Simulated Razorpay Test Gateway payment',
      icon: CreditCard,
      badge: 'Instant Confirmation',
    },
    {
      id: 'counter',
      title: 'Pay at Counter / Cash on Delivery',
      description: 'Pay cash or UPI directly at the cafe counter',
      icon: Wallet,
      badge: 'Pay Later',
    },
  ];

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: 'var(--brand-espresso)', marginBottom: '0.75rem' }}>
        Select Payment Method
      </label>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {options.map((opt) => {
          const IconComp = opt.icon;
          const isSelected = paymentMethod === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => setPaymentMethod(opt.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                border: isSelected ? '2px solid var(--brand-terracotta)' : '1px solid var(--border-color)',
                backgroundColor: isSelected ? '#FFFBF7' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 4px 12px rgba(217, 97, 54, 0.12)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: isSelected ? 'var(--brand-terracotta)' : 'var(--bg-secondary)',
                    color: isSelected ? '#FFFFFF' : 'var(--brand-espresso)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComp size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--brand-espresso)' }}>
                    {opt.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {opt.description}
                  </div>
                </div>
              </div>

              {isSelected && <CheckCircle2 size={22} style={{ color: 'var(--brand-terracotta)', flexShrink: 0 }} />}
            </div>
          );
        })}
      </div>

      {/* Demo payment disclaimer */}
      <div
        style={{
          marginTop: '0.85rem',
          padding: '0.65rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          fontSize: '0.8rem',
          color: '#1E40AF',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <ShieldAlert size={16} style={{ flexShrink: 0 }} />
        <span>
          <strong>Demo Notice:</strong> Payment gateway is simulated for this prototype. Real Razorpay Test Gateway can be plugged in via API service layer.
        </span>
      </div>
    </div>
  );
}
