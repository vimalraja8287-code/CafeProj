# Brew & Bite | QR Code Cafe Ordering System (Frontend Prototype)

A premium, contemporary, responsive QR-code-based cafe ordering web application and kitchen management staff dashboard built with **React** and **Vite**.

This prototype is built strictly as a frontend application designed for demonstration to cafe owners. It features full localStorage state persistence, realistic mock data, and an isolated API service abstraction layer for future backend integration (ASP.NET Core Web API + Microsoft SQL Server).

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v18+ or v20+ recommended
- **npm** or **yarn**

### Setup & Run
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   - **Customer Digital Menu**: `http://localhost:3000/menu?table=3`
   - **Staff Kitchen Dashboard**: `http://localhost:3000/admin`

---

## 🎨 Visual & Design System

- **Background Palette**: Warm cream and off-white (`#FAF7F2`, `#F4EFE6`)
- **Typography & Text**: Deep Espresso Brown (`#2A1B16`) and Muted Charcoal (`#6B5B54`)
- **Accents**: Warm Terracotta (`#D96136`) and Amber
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Playfair Display*)
- **Icons**: Lucide React
- **Status Indicators**:
  - `New`: Blue badge
  - `Preparing`: Amber/Orange badge
  - `Ready`: Emerald Green badge
  - `Served`: Neutral Grey badge
  - `Cancelled`: Rose Red badge

---

## 📱 Page & Route Descriptions

### Customer Experience
1. **Digital Menu (`/menu?table=3`)**:
   - Parses table number dynamically from URL (`?table=N`).
   - Category filtering (All, Snacks, Meals, Desserts, Beverages).
   - Instant search by item name or description.
   - Appetizing food cards with vegetarian indicators, bestseller tags, and quantity controls (`+` / `-`).
   - Mobile sticky summary bar showing live cart subtotal and item count.

2. **Cart (`/cart`)**:
   - Itemized list of selected dishes with thumbnail preview.
   - Item-level quantity adjustment and quick removal.
   - Transparent bill breakdown: Subtotal, 5% GST tax itemization, and Final Total in INR (`₹`).
   - Clear empty cart experience.

3. **Checkout (`/checkout`)**:
   - Customer details input (Name, Phone number validation).
   - Special cooking/preparation notes textarea.
   - Demo payment options: **Pay Online (UPI/Card)** vs **Pay at Counter (Cash)** with test mode disclaimer.
   - Order submission with auto-generated order IDs (`ORD-XXXX`).

4. **Order Confirmation (`/order/:orderId`)**:
   - Order receipt with table number, timestamp, and item summary.
   - Live **Order Status Progress Bar**: `Order Placed` → `Preparing` → `Ready` → `Served`.
   - Clear banner clarifying prototype state.

### Staff / Kitchen Experience
5. **Staff Kitchen Dashboard (`/admin`)**:
   - Desktop-first responsive kitchen display system.
   - **Overview Metrics**: Today's order count, New, Preparing, Ready, and Total Revenue.
   - Filter tabs by status (`All`, `New`, `Preparing`, `Ready`, `Served`, `Cancelled`).
   - Interactive order cards with status advance controls (`Start Preparing` → `Mark Ready` → `Mark Served`) and cancellation modal.
   - **Simulate Incoming Order** button: Injects mock orders on demand from Table 2, 4, 6, etc. to demonstrate live updates.

---

## 📁 Project Structure

```
Prototype-Cafe/
├── public/
├── src/
│   ├── components/
│   │   ├── admin/       # StatsHeader, OrderCard, OrderFilterTabs, StatusTimeline
│   │   ├── cart/        # CartItem, CartSummary
│   │   ├── checkout/    # PaymentSelector
│   │   ├── common/      # Navbar, VegBadge, Toast, ConfirmModal, PrototypeBanner
│   │   └── menu/        # MenuHeader, CategoryFilter, SearchBar, MenuItemCard, StickyCartBar
│   ├── context/
│   │   └── OrderContext.jsx  # Centralized cart, orders, & toast notification state
│   ├── data/
│   │   ├── menuData.js       # Cafe info, categories, and sample menu items (Samosa ₹20, etc.)
│   │   └── initialOrders.js  # Sample order dataset for admin dashboard
│   ├── hooks/
│   │   ├── useCart.js        # Cart accessor hook
│   │   ├── useOrders.js      # Orders accessor hook
│   │   └── useTableNumber.js # URL searchParam table parser hook
│   ├── layouts/
│   │   ├── CustomerLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── pages/
│   │   ├── MenuPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── OrderConfirmationPage.jsx
│   │   ├── AdminDashboardPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/
│   │   ├── apiConfig.js      # Base API config & fetch client template for ASP.NET Core
│   │   ├── menuService.js    # Async menu data provider
│   │   ├── orderService.js   # Async order management & localStorage provider
│   │   └── storageService.js# Safe localStorage wrapper
│   ├── styles/
│   │   └── globals.css       # Design tokens, variables, utility classes, and base styles
│   ├── utils/
│   │   ├── formatters.js     # Currency (₹), date/time, and status formatting
│   │   └── orderUtils.js     # Cart recalculations, GST taxes, and order ID generator
│   ├── App.jsx               # React Router configuration
│   └── main.jsx              # Vite entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔌 Connecting to ASP.NET Core Web API (Future Step)

This codebase is structured with an **isolated service layer** (`src/services/`).

When your ASP.NET Core Web API and SQL Server database are ready:

1. Open `src/services/apiConfig.js`:
   ```javascript
   export const API_CONFIG = {
     USE_MOCK_DATA: false, // Change to false
     API_BASE_URL: 'https://localhost:7001/api', // Your ASP.NET Core API Base URL
   };
   ```

2. Expected API Endpoints:
   - `GET /api/menu/items` -> Returns list of menu items
   - `GET /api/menu/categories` -> Returns list of categories
   - `GET /api/orders` -> Returns active kitchen orders
   - `POST /api/orders` -> Creates new order
   - `PATCH /api/orders/{id}/status` -> Updates order status (`preparing`, `ready`, `served`, `cancelled`)

---

## ⚡ Demo Workflow (Step-by-Step for Presentation)

1. Open `/menu?table=3`.
2. Add **2 Samosas (₹20 each)** and **1 Chocolate Milkshake (₹120)**.
3. Tap the bottom sticky cart bar to open `/cart`. Verify item quantities, subtotal (₹160), 5% GST (₹8), and Total (₹168).
4. Click **Proceed to Checkout**, type Customer Name (*Aarav*) and Phone Number.
5. Select **Pay Online** or **Pay at Counter** and click **Place Order**.
6. View the order confirmation page `/order/ORD-XXXX` with live status timeline.
7. Open `/admin` in a new tab/window (or click Staff Admin in navbar).
8. Find order `ORD-XXXX` under Table 3 in the **New** tab.
9. Click **Start Preparing** → Notice status advances to **Preparing**.
10. Click **Mark Ready** → Status moves to **Ready**.
11. Click **Mark Served** → Status moves to **Served**.
12. Click **Simulate Incoming Order** to demonstrate adding a mock order from Table 5 on demand.

---

## 📜 License & Usage
Created for customer presentation and frontend prototype demonstration.
