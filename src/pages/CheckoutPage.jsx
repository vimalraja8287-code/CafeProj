import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import { useTableNumber } from '../hooks/useTableNumber';
import { PaymentSelector } from '../components/checkout/PaymentSelector';
import { formatCurrency } from '../utils/formatters';
import { ArrowLeft, MapPin, User, Phone, MessageSquare, CheckCircle, ShieldCheck } from 'lucide-react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { tableNumber } = useTableNumber();
  const { items, totals, isEmpty } = useCart();
  const { placeOrder } = useOrders();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect back to menu
  if (isEmpty) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--brand-espresso)', marginBottom: '1rem' }}>
          Your cart is empty. Please add items before checking out.
        </h3>
        <Link to={`/menu?table=${tableNumber}`} className="btn-primary">
          Return to Menu
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    const errs = {};
    if (!customerName.trim()) {
      errs.customerName = 'Please enter your name for order identification.';
    }
    if (!customerPhone.trim()) {
      errs.customerPhone = 'Please enter a valid phone number.';
    } else if (customerPhone.trim().length < 8) {
      errs.customerPhone = 'Phone number should be at least 8 digits.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const newOrder = await placeOrder({
        tableNumber,
        customerName,
        customerPhone,
        specialNotes,
        paymentMethod,
        items,
      });

      // Redirect to Order Confirmation page with table parameter
      navigate(`/order/${newOrder.id}?table=${tableNumber}`);
    } catch (err) {
      console.error('Failed to submit order:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem', maxWidth: '1000px' }}>
      <Link
        to={`/cart?table=${tableNumber}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--text-secondary)',
          fontWeight: 600,
          fontSize: '0.9rem',
          marginBottom: '1.25rem',
        }}
      >
        <ArrowLeft size={18} />
        <span>Return to Cart</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'var(--brand-espresso)' }}>
            Checkout & Confirm
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Review your order details and choose a payment method.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--brand-espresso)',
            color: '#FFFFFF',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <MapPin size={16} style={{ color: 'var(--brand-terracotta)' }} />
          <span>Ordering for Table {tableNumber}</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem',
            alignItems: 'flex-start',
          }}
        >
          {/* Customer Details Form */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-espresso)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={20} style={{ color: 'var(--brand-terracotta)' }} />
              Customer Details
            </h3>

            {/* Name input */}
            <div style={{ marginBottom: '1.15rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-espresso)', marginBottom: '0.35rem' }}>
                Your Name <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. Aarav Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: errors.customerName ? '1.5px solid #DC2626' : '1.5px solid var(--border-color)',
                    fontSize: '0.925rem',
                    outline: 'none',
                  }}
                />
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
              {errors.customerName && (
                <span style={{ fontSize: '0.8rem', color: '#DC2626', marginTop: '4px', display: 'block' }}>
                  {errors.customerName}
                </span>
              )}
            </div>

            {/* Phone input */}
            <div style={{ marginBottom: '1.15rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-espresso)', marginBottom: '0.35rem' }}>
                Phone Number <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: errors.customerPhone ? '1.5px solid #DC2626' : '1.5px solid var(--border-color)',
                    fontSize: '0.925rem',
                    outline: 'none',
                  }}
                />
                <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
              {errors.customerPhone && (
                <span style={{ fontSize: '0.8rem', color: '#DC2626', marginTop: '4px', display: 'block' }}>
                  {errors.customerPhone}
                </span>
              )}
            </div>

            {/* Special instructions */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-espresso)', marginBottom: '0.35rem' }}>
                Special Cooking / Preparation Notes (Optional)
              </label>
              <div style={{ position: 'relative' }}>
                <textarea
                  rows={3}
                  placeholder="e.g. Make coffee extra hot, less sugar in milkshake..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-color)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
                <MessageSquare size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            {/* Payment options component */}
            <PaymentSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
          </div>

          {/* Right Summary Column */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-espresso)', marginBottom: '1rem' }}>
              Order Items Summary ({totals.itemQuantity})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem', maxHeight: '240px', overflowY: 'auto' }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--brand-espresso)', fontWeight: 600 }}>
                    <span style={{ color: 'var(--brand-terracotta)', fontWeight: 800, marginRight: '4px' }}>{item.quantity}x</span>
                    {item.name}
                  </span>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>{formatCurrency(totals.subtotal)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>GST ({totals.taxRatePercentage})</span>
                <span>{formatCurrency(totals.tax)}</span>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.65rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: 'var(--brand-espresso)' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--brand-terracotta)' }}>{formatCurrency(totals.total)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
              style={{
                width: '100%',
                marginTop: '1.5rem',
                padding: '0.9rem',
                fontSize: '1.05rem',
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? (
                <span>Placing Demo Order...</span>
              ) : (
                <>
                  <CheckCircle size={20} />
                  <span>Place Order ({formatCurrency(totals.total)})</span>
                </>
              )}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.85rem', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={14} />
              <span>Contactless Table Order • Instant Kitchen Transmission</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
