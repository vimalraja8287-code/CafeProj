import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useOrderContext } from '../../context/OrderContext';

export function Toast() {
  const { toast, hideToast } = useOrderContext();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle style={{ color: '#059669', flexShrink: 0 }} size={20} />,
    warning: <AlertCircle style={{ color: '#DC2626', flexShrink: 0 }} size={20} />,
    info: <Info style={{ color: '#2563EB', flexShrink: 0 }} size={20} />,
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        backgroundColor: '#FFFFFF',
        color: '#2A1B16',
        padding: '12px 18px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        border: '1px solid #EFE8DD',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '380px',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      {icons[toast.type] || icons.info}
      <span style={{ fontSize: '0.9rem', fontWeight: 500, flex: 1 }}>{toast.message}</span>
      <button
        onClick={hideToast}
        style={{
          color: '#9E8E85',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
