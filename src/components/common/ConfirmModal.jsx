import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export function ConfirmModal({
  isOpen,
  title = 'Confirm Action',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(42, 27, 22, 0.5)',
        backdropFilter: 'blur(3px)',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '1.75rem',
          maxWidth: '440px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          border: '1px solid #EFE8DD',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: isDanger ? '#FEE2E2' : '#FEF3C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDanger ? '#DC2626' : '#D97706',
              }}
            >
              <AlertTriangle size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#2A1B16' }}>{title}</h3>
          </div>
          <button onClick={onCancel} style={{ color: '#9E8E85' }}>
            <X size={20} />
          </button>
        </div>

        <p style={{ color: '#6B5B54', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          {message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            className="btn-primary"
            onClick={onConfirm}
            style={{
              backgroundColor: isDanger ? '#DC2626' : 'var(--brand-terracotta)',
              borderColor: isDanger ? '#DC2626' : 'var(--brand-terracotta)',
              boxShadow: isDanger ? '0 4px 12px rgba(220, 38, 38, 0.25)' : undefined,
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
