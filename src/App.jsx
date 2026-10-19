import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import { CustomerLayout } from './layouts/CustomerLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <Routes>
          {/* Customer Facing Experience */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Navigate to="/menu?table=3" replace />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/:orderId" element={<OrderConfirmationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Staff / Admin Dashboard Experience */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Route>
        </Routes>
      </OrderProvider>
    </BrowserRouter>
  );
}
