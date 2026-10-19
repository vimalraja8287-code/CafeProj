import React, { useState } from 'react';
import { Clock, User, Phone, MessageSquare, ChefHat, CheckCircle2, Coffee, Ban } from 'lucide-react';
import { formatCurrency, formatTime, formatRelativeTime, getStatusMeta } from '../../utils/formatters';
import { isValidStatusTransition } from '../../utils/orderUtils';
import { ConfirmModal } from '../common/ConfirmModal';

export function OrderCard({ order, onUpdateStatus }) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const statusMeta = getStatusMeta(order.status);

  const handleAdvanceStatus = () => {
    if (order.status === 'new') {
      onUpdateStatus(order.id, 'preparing');
    } else if (order.status === 'preparing') {
      onUpdateStatus(order.id, 'ready');
    } else if (order.status === 'ready') {
      onUpdateStatus(order.id, 'served');
    }
  };

  const handleConfirmCancel = () => {
    onUpdateStatus(order.id, 'cancelled');
    setIsCancelModalOpen(false);
  };

  return (
    <>
      <div
        className="animate-fade-in"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Header: Table, Order # & Status Badge */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span
                style={{
                  backgroundColor: 'var(--brand-terracotta)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: '0 2px 6px rgba(217, 97, 54, 0.2)',
                }}
              >
                Table {order.tableNumber}
              </span>
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--brand-espresso)' }}>
                #{order.id}
              </span>
            </div>

            {/* Status Badge */}
            <span
              className="badge"
              style={{
                backgroundColor: `var(--status-${order.status === 'preparing' ? 'prep' : order.status === 'cancelled' ? 'cancel' : order.status}-bg)`,
                color: `var(--status-${order.status === 'preparing' ? 'prep' : order.status === 'cancelled' ? 'cancel' : order.status}-text)`,
                border: `1px solid var(--status-${order.status === 'preparing' ? 'prep' : order.status === 'cancelled' ? 'cancel' : order.status}-border)`,
                padding: '0.3rem 0.7rem',
              }}
            >
              {statusMeta.label}
            </span>
          </div>

          {/* Time & Customer Info */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.85rem',
              fontSize: '0.825rem',
              color: 'var(--text-secondary)',
              paddingBottom: '0.75rem',
              borderBottom: '1px dashed var(--border-color)',
              marginBottom: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={14} />
              <span>{formatTime(order.createdAt)} ({formatRelativeTime(order.createdAt)})</span>
            </div>

            {order.customerName && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <User size={14} />
                <span>{order.customerName}</span>
              </div>
            )}

            {order.customerPhone && order.customerPhone !== 'Not Provided' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Phone size={14} />
                <span>{order.customerPhone}</span>
              </div>
            )}
          </div>

          {/* Items List */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Ordered Items
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--brand-espresso)' }}>
                    <span style={{ color: 'var(--brand-terracotta)', fontWeight: 800, marginRight: '6px' }}>
                      {item.quantity}x
                    </span>
                    {item.name}
                  </span>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Special Instructions */}
            {order.specialNotes && (
              <div
                style={{
                  marginTop: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.825rem',
                  color: 'var(--brand-espresso)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.4rem',
                  border: '1px solid #EFE8DD',
                }}
              >
                <MessageSquare size={14} style={{ color: 'var(--brand-terracotta)', flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Note:</strong> {order.specialNotes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer: Payment status & Action buttons */}
        <div>
          <div
            style={{
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              marginBottom: '1rem',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: order.paymentStatus === 'paid' ? '#D1FAE5' : '#FEF3C7',
                  color: order.paymentStatus === 'paid' ? '#047857' : '#B45309',
                  display: 'inline-block',
                  marginRight: '6px',
                }}
              >
                {order.paymentStatus === 'paid' ? 'PAID' : 'PENDING'}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                ({order.paymentMethod})
              </span>
            </div>

            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--brand-espresso)' }}>
              {formatCurrency(order.total)}
            </div>
          </div>

          {/* Action buttons depending on state */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {order.status === 'new' && (
              <button
                className="btn-primary"
                onClick={handleAdvanceStatus}
                style={{ flex: 1, padding: '0.6rem', fontSize: '0.875rem' }}
              >
                <ChefHat size={16} />
                <span>Start Preparing</span>
              </button>
            )}

            {order.status === 'preparing' && (
              <button
                className="btn-primary"
                onClick={handleAdvanceStatus}
                style={{ flex: 1, padding: '0.6rem', fontSize: '0.875rem', backgroundColor: '#059669', borderColor: '#059669' }}
              >
                <CheckCircle2 size={16} />
                <span>Mark Ready</span>
              </button>
            )}

            {order.status === 'ready' && (
              <button
                className="btn-primary"
                onClick={handleAdvanceStatus}
                style={{ flex: 1, padding: '0.6rem', fontSize: '0.875rem', backgroundColor: '#4B5563', borderColor: '#4B5563' }}
              >
                <Coffee size={16} />
                <span>Mark Served</span>
              </button>
            )}

            {order.status !== 'served' && order.status !== 'cancelled' && (
              <button
                className="btn-secondary"
                onClick={() => setIsCancelModalOpen(true)}
                title="Cancel Order"
                style={{ padding: '0.6rem 0.85rem', color: '#DC2626' }}
              >
                <Ban size={16} />
                <span className="hide-mobile">Cancel</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isCancelModalOpen}
        title="Cancel Order"
        message={`Are you sure you want to cancel Order #${order.id} for Table ${order.tableNumber}?`}
        confirmLabel="Yes, Cancel Order"
        cancelLabel="No, Keep Order"
        isDanger={true}
        onConfirm={handleConfirmCancel}
        onCancel={() => setIsCancelModalOpen(false)}
      />
    </>
  );
}
