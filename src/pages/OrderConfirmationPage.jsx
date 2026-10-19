import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../services/orderService';
import { StatusTimeline } from '../components/admin/StatusTimeline';
import { formatCurrency, formatTime, getStatusMeta } from '../utils/formatters';
import { CheckCircle2, Clock, MapPin, Coffee, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';

export function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrderById(orderId);
      setOrder(data);
    } catch (err) {
      setError(err.message || 'Order not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Loading order #{orderId}...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '2.5rem',
            border: '1px solid var(--border-color)',
          }}
        >
          <AlertCircle size={40} style={{ color: '#DC2626', margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.25rem', color: 'var(--brand-espresso)', marginBottom: '0.5rem' }}>
            Order Not Found
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            We couldn't locate order details for #{orderId}.
          </p>
          <Link to="/menu?table=3" className="btn-primary">
            Return to Menu
          </Link>
        </div>
      </div>
    );
  }

  const statusMeta = getStatusMeta(order.status);

  return (
    <div className="container" style={{ paddingTop: '1.5rem', maxWidth: '800px' }}>
      {/* Top Banner Confirmation */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#D1FAE5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)',
          }}
        >
          <CheckCircle2 size={36} />
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'var(--brand-espresso)', marginBottom: '0.25rem' }}>
          Order Received!
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Thank you, <strong>{order.customerName}</strong>! Your order has been sent to the kitchen.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span
            style={{
              backgroundColor: 'var(--brand-terracotta)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '0.9rem',
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
            }}
          >
            Order #{order.id}
          </span>

          <span
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--brand-espresso)',
              fontWeight: 700,
              fontSize: '0.9rem',
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <MapPin size={14} style={{ color: 'var(--brand-terracotta)' }} />
            Table {order.tableNumber}
          </span>

          <span
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--brand-espresso)',
              fontWeight: 600,
              fontSize: '0.85rem',
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Clock size={14} />
            {formatTime(order.createdAt)}
          </span>
        </div>

        {/* Live Status Tracker Timeline */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Preparation Status Tracker
            </span>
            <button
              onClick={fetchOrder}
              style={{
                fontSize: '0.8rem',
                color: 'var(--brand-terracotta)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <RefreshCw size={14} /> Refresh Status
            </button>
          </div>

          <StatusTimeline status={order.status} />
        </div>
      </div>

      {/* Itemized Order Details */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '1.5rem',
        }}
      >
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-espresso)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Coffee size={20} style={{ color: 'var(--brand-terracotta)' }} />
          Items Summary
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
          {order.items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.925rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--brand-espresso)' }}>
                <span style={{ color: 'var(--brand-terracotta)', fontWeight: 800, marginRight: '6px' }}>{item.quantity}x</span>
                {item.name}
              </span>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span>Subtotal</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span>GST (5%)</span>
            <span>{formatCurrency(order.tax)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
            <span>Payment Method</span>
            <span>{order.paymentMethod} ({order.paymentStatus})</span>
          </div>
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-espresso)' }}>
            <span>Total Paid</span>
            <span style={{ color: 'var(--brand-terracotta)' }}>{formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to={`/menu?table=${order.tableNumber}`} className="btn-primary" style={{ width: '100%', maxWidth: '340px' }}>
          <ArrowLeft size={16} />
          <span>Order More Items (Table {order.tableNumber})</span>
        </Link>
      </div>
    </div>
  );
}
