# System Architecture Document
## SME Paddy - Technical Architecture & Design

**Version:** 2.0  
**Last Updated:** January 7, 2026  
**Document Owner:** Engineering Team  
**Status:** Active Development

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [System Context](#system-context)
3. [Technical Stack](#technical-stack)
4. [Application Architecture](#application-architecture)
5. [Data Architecture](#data-architecture)
6. [API Design](#api-design)
7. [Security Architecture](#security-architecture)
8. [Infrastructure & Deployment](#infrastructure--deployment)
9. [Performance Optimization](#performance-optimization)
10. [Scalability Strategy](#scalability-strategy)
11. [Monitoring & Observability](#monitoring--observability)
12. [Development Workflow](#development-workflow)
13. [Future Architecture Considerations](#future-architecture-considerations)

---

## 1. Architecture Overview

### 1.1 System Purpose
SME Paddy is a **mobile-first, progressive web application (PWA)** designed to provide Nigerian micro-business owners with simple financial record-keeping, gamified engagement, and access to business loans based on behavioral tracking.

### 1.2 Architecture Principles

#### Principle 1: Mobile-First Performance
- **Why:** 80%+ users on low-end Android devices with 3G connectivity
- **How:** 
  - Bundle size <500KB initial load
  - Code splitting by route
  - Lazy loading for images and non-critical components
  - Service worker caching

#### Principle 2: Offline-First (Future)
- **Why:** Unreliable internet in Nigerian markets
- **How:**
  - IndexedDB for local data persistence
  - Background sync when connection restored
  - Optimistic UI updates

#### Principle 3: Scalability by Design
- **Why:** Target 100K users in Year 1
- **How:**
  - Stateless API design
  - Horizontal scaling
  - Database read replicas
  - CDN for static assets

#### Principle 4: Security by Default
- **Why:** Handling financial data and loan applications
- **How:**
  - HTTPS everywhere
  - JWT-based authentication
  - Encryption at rest and in transit
  - Regular security audits

#### Principle 5: Data-Driven Development
- **Why:** Need to validate product hypotheses quickly
- **How:**
  - Comprehensive analytics instrumentation
  - A/B testing framework
  - Feature flags for gradual rollouts
  - Real-time dashboards

---

## 2. System Context

### 2.1 System Context Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         External Systems                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐        │
│  │   SMS/OTP    │   │   Payment    │   │  WhatsApp    │        │
│  │  (Twilio/    │   │   Gateway    │   │  Business    │        │
│  │  Termii)     │   │ (Paystack)   │   │     API      │        │
│  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘        │
│         │                  │                   │                 │
└─────────┼──────────────────┼───────────────────┼─────────────────┘
          │                  │                   │
          ▼                  ▼                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SME Paddy System                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Frontend (React PWA)                    │  │
│  │  - Homepage Dashboard  - Transactions  - Stock/Inventory  │  │
│  │  - Invoices            - Loans         - Paddy Coins      │  │
│  └───────────────────────┬───────────────────────────────────┘  │
│                          │                                       │
│                          ▼                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                 Backend API (Node.js/Express)             │  │
│  │  - Auth Service  - Transaction Service  - Loan Service   │  │
│  │  - Coin Service  - Invoice Service      - Analytics      │  │
│  └───────────────────────┬───────────────────────────────────┘  │
│                          │                                       │
│                          ▼                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Database Layer (PostgreSQL)                  │  │
│  │  - User Data  - Transactions  - Inventory  - Loans       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
          │                  │                   │
          ▼                  ▼                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Supporting Services                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐        │
│  │   Analytics  │   │    Object    │   │   Email      │        │
│  │   (Mixpanel/ │   │   Storage    │   │   Service    │        │
│  │   Amplitude) │   │   (AWS S3)   │   │  (SendGrid)  │        │
│  └──────────────┘   └──────────────┘   └──────────────┘        │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

### 2.2 User Interaction Flow

```
User Device (Mobile Browser/PWA)
         │
         ├─> HTTPS Request
         │
         ▼
   Load Balancer (Nginx)
         │
         ├─> API Server 1 ─┐
         ├─> API Server 2 ─┼─> Business Logic
         ├─> API Server N ─┘
         │
         ▼
   Database (PostgreSQL)
   Redis Cache
   Object Storage (S3)
```

---

## 3. Technical Stack

### 3.1 Frontend Stack

#### Core Framework
- **React 18.3+** 
  - Reason: Component reusability, virtual DOM performance, massive ecosystem
  - State Management: React hooks (useState, useContext, useReducer)
  - Future: Consider Zustand/Jotai for complex global state

#### Styling
- **Tailwind CSS v4.0**
  - Reason: Utility-first, minimal CSS bundle, rapid development
  - Custom theme in `/styles/globals.css`
  - No traditional tailwind.config.js (using CSS variables)

#### UI Components
- **Lucide React** - Icon library (tree-shakeable, 20KB compressed)
- **Recharts** - Chart library (responsive, customizable)
- **Sonner** - Toast notifications (minimal, accessible)
- **React Hook Form** - Form validation (performant, DX-friendly)

#### Build Tool
- **Vite** (recommended for production)
  - Reason: Fast HMR, optimized builds, tree-shaking
  - Alternative: Next.js (if SSR needed for SEO)

#### PWA
- **Workbox** - Service worker management
- **Web App Manifest** - Install prompts, splash screens

### 3.2 Backend Stack

#### Runtime & Framework
- **Node.js 18 LTS**
  - Runtime: Fast, non-blocking I/O for high concurrency
- **Express.js 4.x**
  - Framework: Minimal, flexible, battle-tested
  - Middleware: CORS, helmet (security), compression

#### Authentication
- **JWT (JSON Web Tokens)**
  - Access token: 15-minute expiry
  - Refresh token: 30-day expiry
- **bcrypt** - Password hashing (10 rounds)

#### Validation
- **Joi** or **Zod** - Request validation schemas

#### ORM
- **Prisma** (recommended)
  - Reason: Type-safe, auto-migrations, great DX
  - Alternative: TypeORM

### 3.3 Database

#### Primary Database
- **PostgreSQL 14+**
  - Reason: ACID compliance, JSON support, scalability
  - Hosting: AWS RDS or Supabase (managed PostgreSQL)

#### Caching Layer
- **Redis 7+**
  - Use cases:
    - Session storage
    - Rate limiting
    - Leaderboards (coin rankings)
    - Real-time analytics aggregation

#### Object Storage
- **AWS S3** or **Cloudflare R2**
  - Use cases:
    - User profile images
    - Product images
    - Invoice PDFs (future)
    - Receipt photos (future)

### 3.4 Third-Party Services

#### SMS/OTP
- **Termii** (Nigeria-focused) or **Twilio**
  - OTP delivery for phone verification
  - Cost: ~₦3-5 per SMS

#### Payment Processing
- **Paystack** or **Flutterwave**
  - Use cases:
    - Premium subscription payments
    - Loan disbursement
    - Loan repayment collection
  - Integration: REST API + Webhooks

#### Analytics
- **Mixpanel** or **Amplitude**
  - Event tracking: User actions, feature usage
  - Cohort analysis, funnel tracking
  - Alternative: PostHog (open-source, self-hosted)

#### Error Tracking
- **Sentry**
  - Real-time error monitoring
  - Source maps for stack traces
  - Performance monitoring

#### Email
- **SendGrid** or **Resend**
  - Transactional emails (password resets, loan updates)

#### Push Notifications
- **Firebase Cloud Messaging (FCM)**
  - Daily reminders
  - Streak alerts
  - Payment due notifications

---

## 4. Application Architecture

### 4.1 Frontend Architecture

#### Component Structure

```
/src
├── /components
│   ├── /ui               # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Card.tsx
│   ├── /features         # Feature-specific components
│   │   ├── /sales
│   │   │   ├── RecordSale.tsx
│   │   │   ├── SelectItemGrid.tsx
│   │   │   ├── QuickProductSale.tsx
│   │   │   └── QuickServiceSale.tsx
│   │   ├── /transactions
│   │   │   ├── TransactionList.tsx
│   │   │   ├── TransactionCard.tsx
│   │   │   └── WeeklyChart.tsx
│   │   ├── /loans
│   │   │   ├── LoansPage.tsx
│   │   │   ├── LoanTierCard.tsx
│   │   │   └── LoanApplicationModal.tsx
│   │   └── /coins
│   │       ├── PaddyCoinBadge.tsx
│   │       └── CoinHistoryModal.tsx
│   ├── /admin            # Admin portal components
│   │   ├── AdminLayout.tsx
│   │   ├── AdminAuthPage.tsx
│   │   ├── AdminDashboardPage.tsx
│   │   ├── AdminUsersPage.tsx
│   │   ├── AdminTransactionsPage.tsx
│   │   ├── AdminGamificationPage.tsx
│   │   ├── AdminSupportPage.tsx
│   │   ├── AdminBusinessCategoriesPage.tsx
│   │   └── AdminSettingsPage.tsx
│   ├── /pages            # Top-level page components
│   │   ├── HomePage.tsx
│   │   ├── TransactionsPage.tsx
│   │   ├── StockPage.tsx
│   │   ├── InvoicesPage.tsx
│   │   ├── LoansPage.tsx
│   │   ├── SettingsPage.tsx
│   │   ├── ReportsPage.tsx
│   │   └── MorePage.tsx
│   ├── SupportTicketModal.tsx  # Support ticket submission
│   ├── HelpButton.tsx          # Floating help button (desktop)
│   └── /layout
│       ├── BottomNav.tsx
│       ├── Sidebar.tsx
│       └── Header.tsx
├── /hooks                # Custom React hooks
│   ├── useAuth.ts
│   ├── useCoins.ts
│   ├── useTransactions.ts
│   └── useLocalStorage.ts
├── /utils                # Utility functions
│   ├── paddyCoinSystem.ts
│   ├── loanSystem.ts
│   ├── formatters.ts     # Currency, date formatting
│   └── validators.ts
├── /services             # API communication
│   ├── api.ts            # Base Axios config
│   ├── authService.ts
│   ├── transactionService.ts
│   └── loanService.ts
├── /types                # TypeScript types
│   ├── user.ts
│   ├── transaction.ts
│   ├── loan.ts
│   └── coin.ts
├── /styles
│   └── globals.css       # Tailwind + custom styles
├── App.tsx               # Root component
└── main.tsx              # Entry point
```

#### State Management Strategy

**Local Component State (useState)**
- UI state (modals, dropdowns, form inputs)
- Ephemeral data (current page, filters)

**Context API (useContext)**
- Auth state (user, token, isAuthenticated)
- Theme (future: dark mode)
- App-wide settings

**Server State (React Query - future)**
- API data fetching
- Caching strategy
- Optimistic updates
- Background refetching

**Local Storage**
- User preferences
- Offline transaction queue (future)
- Draft invoices

### 4.2 Backend Architecture

#### Layered Architecture Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                      Presentation Layer                      │
│  (Express Routes, Middleware, Request Validation)            │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                       Business Logic Layer                   │
│  (Services: TransactionService, LoanService, CoinService)    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Access Layer                       │
│  (Repositories: UserRepo, TransactionRepo, LoanRepo)         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                         Database Layer                       │
│              (PostgreSQL via Prisma ORM)                     │
└─────────────────────────────────────────────────────────────┘
```

#### Project Structure

```
/backend
├── /src
│   ├── /routes
│   │   ├── auth.routes.ts       # POST /auth/login, /auth/register
│   │   ├── transaction.routes.ts
│   │   ├── stock.routes.ts
│   │   ├── invoice.routes.ts
│   │   ├── loan.routes.ts
│   │   └── coin.routes.ts
│   ├── /controllers
│   │   ├── authController.ts
│   │   ├── transactionController.ts
│   │   ├── loanController.ts
│   │   └── coinController.ts
│   ├── /services
│   │   ├── authService.ts       # Business logic
│   │   ├── transactionService.ts
│   │   ├── loanService.ts
│   │   ├── coinService.ts
│   │   └── notificationService.ts
│   ├── /repositories
│   │   ├── userRepository.ts    # Database queries
│   │   ├── transactionRepository.ts
│   │   ├── loanRepository.ts
│   │   └── coinRepository.ts
│   ├── /middleware
│   │   ├── auth.middleware.ts   # JWT verification
│   │   ├── validation.middleware.ts
│   │   ├── rateLimit.middleware.ts
│   │   └── error.middleware.ts
│   ├── /utils
│   │   ├── jwt.ts
│   │   ├── encryption.ts
│   │   ├── validators.ts
│   │   └── logger.ts
│   ├── /config
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── env.ts
│   ├── /types
│   │   └── index.ts
│   ├── /prisma
│   │   ├── schema.prisma
│   │   └── /migrations
│   └── server.ts                # Express app initialization
├── package.json
└── tsconfig.json
```

---

## 5. Data Architecture

### 5.1 Database Schema (PostgreSQL)

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  phone_verified BOOLEAN DEFAULT FALSE,
  pin_hash VARCHAR(255) NOT NULL,
  
  -- Profile Information
  business_name VARCHAR(255),
  business_type VARCHAR(50), -- retail, wholesale, services, food, etc.
  owner_name VARCHAR(255),
  email VARCHAR(255),
  business_logo_url TEXT,
  
  -- Location
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  
  -- Profile Status
  profile_complete BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_profile_complete ON users(profile_complete);
CREATE INDEX idx_users_state ON users(state); -- For location-based queries
```

#### Paddy Coins Table
```sql
CREATE TABLE paddy_coins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  balance INTEGER DEFAULT 0,
  total_earned INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_user_coins UNIQUE(user_id)
);

CREATE INDEX idx_coins_user ON paddy_coins(user_id);
CREATE INDEX idx_coins_balance ON paddy_coins(balance DESC); -- For leaderboards
```

#### Coin Transactions Table
```sql
CREATE TABLE coin_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  event_type VARCHAR(50) NOT NULL, -- 'sale_recorded', 'loan_approved', etc.
  description TEXT,
  metadata JSONB, -- Flexible data (e.g., transaction_id, loan_id)
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_coin_tx_user ON coin_transactions(user_id);
CREATE INDEX idx_coin_tx_created_at ON coin_transactions(created_at DESC);
```

#### Transactions Table
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL, -- 'sale' or 'expense'
  category VARCHAR(50), -- 'product', 'service', 'transport', 'rent', etc.
  item_name VARCHAR(255) NOT NULL,
  quantity DECIMAL(10,2) DEFAULT 1,
  unit_price DECIMAL(12,2) NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  amount_paid DECIMAL(12,2) DEFAULT 0,
  amount_due DECIMAL(12,2) DEFAULT 0,
  payment_status VARCHAR(20) DEFAULT 'paid', -- 'paid', 'partial', 'pending'
  customer_name VARCHAR(255),
  customer_phone VARCHAR(20),
  notes TEXT,
  transaction_date TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tx_user ON transactions(user_id);
CREATE INDEX idx_tx_type ON transactions(type);
CREATE INDEX idx_tx_date ON transactions(transaction_date DESC);
CREATE INDEX idx_tx_customer ON transactions(customer_name);
```

#### Stock/Inventory Table
```sql
CREATE TABLE stock_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  item_name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  image_url TEXT,
  buying_price DECIMAL(12,2) NOT NULL,
  selling_price DECIMAL(12,2) NOT NULL,
  current_stock INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_stock_user ON stock_items(user_id);
CREATE INDEX idx_stock_name ON stock_items(item_name);
CREATE INDEX idx_stock_low ON stock_items(user_id, current_stock) 
  WHERE current_stock < low_stock_threshold;
```

#### Stock Movement Table (Audit Trail)
```sql
CREATE TABLE stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_item_id UUID REFERENCES stock_items(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  movement_type VARCHAR(20) NOT NULL, -- 'sale', 'restock', 'adjustment'
  quantity_change INTEGER NOT NULL, -- Positive for add, negative for deduct
  stock_before INTEGER NOT NULL,
  stock_after INTEGER NOT NULL,
  reference_id UUID, -- Links to transaction_id or other entity
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_movement_item ON stock_movements(stock_item_id);
CREATE INDEX idx_movement_date ON stock_movements(created_at DESC);
```

#### Invoices Table
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  customer_address TEXT,
  line_items JSONB NOT NULL, -- Array of {item_name, quantity, unit_price, total}
  subtotal DECIMAL(12,2) NOT NULL,
  tax DECIMAL(12,2) DEFAULT 0,
  discount DECIMAL(12,2) DEFAULT 0,
  total_amount DECIMAL(12,2) NOT NULL,
  amount_paid DECIMAL(12,2) DEFAULT 0,
  amount_due DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'draft', 'pending', 'partial', 'paid', 'overdue', 'cancelled'
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_invoice_user ON invoices(user_id);
CREATE INDEX idx_invoice_status ON invoices(status);
CREATE INDEX idx_invoice_due ON invoices(due_date);
CREATE INDEX idx_invoice_number ON invoices(invoice_number);
```

#### Invoice Settings Table
```sql
CREATE TABLE invoice_settings (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Logo
  invoice_logo_url TEXT,
  
  -- Bank Account Details
  bank_name VARCHAR(255),
  account_name VARCHAR(255),
  account_number VARCHAR(50),
  show_account_details BOOLEAN DEFAULT TRUE,
  
  -- Display Options
  show_business_address BOOLEAN DEFAULT TRUE,
  show_contact_info BOOLEAN DEFAULT TRUE,
  
  -- Default Settings
  payment_terms_days INTEGER DEFAULT 7,
  invoice_notes TEXT DEFAULT 'Thank you for your business!',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT unique_user_invoice_settings UNIQUE(user_id)
);

CREATE INDEX idx_invoice_settings_user ON invoice_settings(user_id);
```

#### Loans Table
```sql
CREATE TABLE loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  loan_number VARCHAR(50) UNIQUE NOT NULL,
  tier_at_application VARCHAR(20) NOT NULL, -- 'bronze', 'silver', 'gold', etc.
  coins_at_application INTEGER NOT NULL,
  loan_amount DECIMAL(12,2) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL, -- Monthly percentage
  duration_months INTEGER NOT NULL,
  total_interest DECIMAL(12,2) NOT NULL,
  total_repayment DECIMAL(12,2) NOT NULL,
  monthly_payment DECIMAL(12,2) NOT NULL,
  amount_paid DECIMAL(12,2) DEFAULT 0,
  amount_outstanding DECIMAL(12,2) NOT NULL,
  loan_purpose TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'disbursed', 'active', 'completed', 'defaulted'
  application_date TIMESTAMP DEFAULT NOW(),
  approval_date TIMESTAMP,
  disbursement_date TIMESTAMP,
  completion_date TIMESTAMP,
  next_payment_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_loan_user ON loans(user_id);
CREATE INDEX idx_loan_status ON loans(status);
CREATE INDEX idx_loan_number ON loans(loan_number);
```

#### Loan Payments Table
```sql
CREATE TABLE loan_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID REFERENCES loans(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  payment_amount DECIMAL(12,2) NOT NULL,
  payment_date TIMESTAMP DEFAULT NOW(),
  due_date DATE NOT NULL,
  is_on_time BOOLEAN DEFAULT TRUE,
  payment_method VARCHAR(50), -- 'bank_transfer', 'card', 'cash'
  transaction_reference VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payment_loan ON loan_payments(loan_id);
CREATE INDEX idx_payment_date ON loan_payments(payment_date DESC);
```

#### User Streaks Table
```sql
CREATE TABLE user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  streak_7_day_count INTEGER DEFAULT 0, -- How many times achieved
  streak_30_day_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_user_streak UNIQUE(user_id)
);

CREATE INDEX idx_streak_user ON user_streaks(user_id);
```

#### Support Tickets Table
```sql
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number VARCHAR(50) UNIQUE NOT NULL, -- TKT-YYYY-XXX format
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  business_name VARCHAR(255) NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  
  -- Ticket Details
  subject VARCHAR(500) NOT NULL,
  category VARCHAR(100) NOT NULL, -- technical, billing, loan, account, feature, training, other
  priority VARCHAR(20) NOT NULL, -- low, medium, high, urgent
  status VARCHAR(50) DEFAULT 'open', -- open, in_progress, resolved, closed
  message TEXT NOT NULL,
  
  -- Assignment & Tracking
  assigned_to UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  resolved_at TIMESTAMP,
  closed_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ticket_user ON support_tickets(user_id);
CREATE INDEX idx_ticket_status ON support_tickets(status);
CREATE INDEX idx_ticket_priority ON support_tickets(priority);
CREATE INDEX idx_ticket_assigned ON support_tickets(assigned_to);
CREATE INDEX idx_ticket_created ON support_tickets(created_at DESC);
```

#### Ticket Replies Table
```sql
CREATE TABLE ticket_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  from_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  from_admin_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  is_admin_reply BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reply_ticket ON ticket_replies(ticket_id);
CREATE INDEX idx_reply_created ON ticket_replies(created_at DESC);
```

#### Business Categories Table
```sql
CREATE TABLE business_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value VARCHAR(100) UNIQUE NOT NULL, -- URL-safe identifier (e.g., 'real-estate')
  label VARCHAR(255) NOT NULL, -- Display name (e.g., 'Real Estate & Property')
  is_active BOOLEAN DEFAULT TRUE,
  usage_count INTEGER DEFAULT 0, -- How many businesses use this category
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_category_active ON business_categories(is_active);
CREATE INDEX idx_category_value ON business_categories(value);
```

#### Admin Users Table
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL, -- super_admin, support_admin, finance_admin
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_admin_email ON admin_users(email);
CREATE INDEX idx_admin_role ON admin_users(role);
CREATE INDEX idx_admin_active ON admin_users(is_active);
```

#### Admin Audit Logs Table
```sql
CREATE TABLE admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  admin_email VARCHAR(255) NOT NULL,
  admin_role VARCHAR(50) NOT NULL,
  action VARCHAR(255) NOT NULL, -- e.g., 'Updated Coin Settings', 'Suspended User'
  details TEXT, -- JSON string with additional details
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_admin ON admin_audit_logs(admin_id);
CREATE INDEX idx_audit_created ON admin_audit_logs(created_at DESC);
```

### 5.2 Data Relationships

```
users (1) ──────< (many) transactions
users (1) ──────< (many) stock_items
users (1) ──────< (many) invoices
users (1) ──────< (many) loans
users (1) ──────< (many) coin_transactions
users (1) ──────< (many) support_tickets
users (1) ──────○ (one) paddy_coins
users (1) ──────○ (one) user_streaks

stock_items (1) ──────< (many) stock_movements
loans (1) ──────< (many) loan_payments
support_tickets (1) ──────< (many) ticket_replies
admin_users (1) ──────< (many) support_tickets (assigned_to)
admin_users (1) ──────< (many) ticket_replies
admin_users (1) ──────< (many) admin_audit_logs
business_categories (1) ──────< (many) users (via business_type)
```

### 5.3 Data Retention Policy

| Data Type | Retention Period | Reason |
|-----------|------------------|--------|
| Transactions | Unlimited | Core business records |
| Invoices | Unlimited | Legal/tax compliance |
| Loans | 10 years post-completion | Regulatory requirement |
| Coin Transactions | Unlimited | Audit trail |
| User Activity Logs | 90 days | Privacy compliance |
| Error Logs | 30 days | Performance optimization |
| Deleted User Data | 30 days (soft delete), then permanent | NDPR compliance |

---

## 6. API Design

### 6.1 API Architecture Style
**RESTful API** with JSON payloads

#### Base URL
```
Production: https://api.smepaddy.ng/v1
Staging: https://api-staging.smepaddy.ng/v1
Development: http://localhost:3000/api/v1
```

### 6.2 Authentication Flow

#### Complete Authentication Architecture

**Authentication Screens:**
1. Welcome/Landing Page (OPay-style professional design)
2. Phone Number Entry
3. OTP Verification  
4. PIN Setup (new users) / PIN Login (returning users)
5. Main Application

#### 1. Welcome/Landing Page
```http
GET /
Content-Type: text/html

Response:
- Professional gradient design (blue to blue-dark)
- App branding with logo
- Key statistics: "10k+ businesses", "₦2B+ tracked", "99% uptime"
- Feature highlights:
  • Track Every Sale (TrendingUp icon)
  • Earn Paddy Coins (Coins icon)
  • Unlock Business Loans (Zap icon)
  • Bank-level Security (Shield icon)
- Trust indicators in info box
- Primary CTA: "Create Free Account"
- Subtext: "No credit card required • Setup in 2 minutes"
```

**Design Specifications:**
- Layout: Logo + stats grid (3 columns) + feature cards (4 items) + trust box + CTA
- Colors: Blue gradient (#2563EB to #1E40AF), white cards with colored borders
- Typography: System fonts, bold headings, clear hierarchy
- Icons: Lucide React (TrendingUp, Coins, Zap, Shield, CheckCircle2, Users)

#### 2. Phone Number Registration
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "phone_number": "+2348012345678",
  "business_name": "Mama Ngozi Provisions"
}

Response 200:
{
  "success": true,
  "message": "OTP sent to +234801****678",
  "session_id": "sess_abc123xyz"
}
```

#### 3. OTP Verification
```http
POST /api/v1/auth/verify-otp
Content-Type: application/json

{
  "session_id": "sess_abc123xyz",
  "otp": "123456"
}

Response 200:
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_abc123",
      "phone_number": "+2348012345678",
      "business_name": "Mama Ngozi Provisions",
      "is_new_user": true
    },
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIs...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
      "expires_in": 900
    }
  }
}
```

#### 4. Set PIN (New Users)
```http
POST /api/v1/auth/set-pin
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "pin": "123456" // 6-digit PIN
}

Response 200:
{
  "success": true,
  "message": "PIN set successfully"
}
```

#### 5. Login with PIN
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "phone_number": "+2348012345678",
  "pin": "123456"
}

Response 200:
{
  "success": true,
  "data": {
    "user": {...},
    "tokens": {...}
  }
}
```

#### 6. Profile Setup (First-Time Users)
```http
POST /api/v1/users/profile-setup
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "business_name": "Mama Ngozi Provisions",
  "business_type": "retail",
  "owner_name": "Ngozi Okafor",
  "email": "ngozi@example.com",
  "address": "23 Allen Avenue",
  "city": "Ikeja",
  "state": "Lagos",
  "business_logo": "data:image/png;base64,..."
}

Response 200:
{
  "success": true,
  "message": "Profile setup complete!",
  "data": {
    "user": {
      "id": "usr_abc123",
      "business_name": "Mama Ngozi Provisions",
      "profile_complete": true
    },
    "coins_earned": {
      "amount": 50,
      "new_balance": 70,
      "event": "profile_setup_complete"
    }
  }
}
```

#### 7. Update Profile
```http
PUT /api/v1/users/profile
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "business_name": "Mama Ngozi Supermarket",
  "business_type": "retail",
  "owner_name": "Ngozi Okafor",
  "email": "new.email@example.com",
  "address": "45 New Street",
  "city": "Ikeja",
  "state": "Lagos"
}

Response 200:
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {...}
  }
}
```

#### 8. Change PIN
```http
PUT /api/v1/users/change-pin
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "current_pin": "123456",
  "new_pin": "654321"
}

Response 200:
{
  "success": true,
  "message": "PIN changed successfully"
}

Response 400 (Invalid Current PIN):
{
  "success": false,
  "error": {
    "code": "INVALID_CURRENT_PIN",
    "message": "Current PIN is incorrect",
    "details": {
      "attempts_remaining": 2
    }
  }
}
```

#### 9. Get User Profile
```http
GET /api/v1/users/profile
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_abc123",
      "phone_number": "+2348012345678",
      "business_name": "Mama Ngozi Provisions",
      "business_type": "retail",
      "owner_name": "Ngozi Okafor",
      "email": "ngozi@example.com",
      "address": "23 Allen Avenue",
      "city": "Ikeja",
      "state": "Lagos",
      "business_logo_url": "https://s3.../logo.png",
      "profile_complete": true,
      "created_at": "2024-12-01T10:00:00Z"
    }
  }
}
```

### 6.3 Core API Endpoints

#### Transactions

**Record Sale (Product)**
```http
POST /api/v1/transactions/sale
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "type": "product",
  "item_id": "itm_abc123", // Stock item ID
  "quantity": 2,
  "unit_price": 1500,
  "payment_status": "partial",
  "amount_paid": 2000,
  "customer_name": "Bro Emeka"
}

Response 201:
{
  "success": true,
  "data": {
    "transaction": {
      "id": "txn_xyz789",
      "type": "sale",
      "item_name": "Rice 10 cups",
      "total_amount": 3000,
      "amount_paid": 2000,
      "amount_due": 1000,
      "created_at": "2024-12-15T10:30:00Z"
    },
    "stock_updated": true,
    "new_stock_quantity": 8,
    "coins_earned": {
      "amount": 10,
      "new_balance": 245,
      "event": "sale_recorded"
    },
    "invoice_created": {
      "id": "inv_abc123",
      "amount_due": 1000
    }
  }
}
```

**Get Transactions**
```http
GET /api/v1/transactions?page=1&limit=50&type=sale&start_date=2024-12-01
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": {
    "transactions": [...],
    "pagination": {
      "total": 150,
      "page": 1,
      "limit": 50,
      "total_pages": 3
    },
    "summary": {
      "total_sales": 520000,
      "total_expenses": 180000,
      "net_profit": 340000
    }
  }
}
```

#### Stock Management

**Add Stock Item**
```http
POST /api/v1/stock
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "item_name": "Rice (10 cups)",
  "category": "Food",
  "buying_price": 1200,
  "selling_price": 1500,
  "current_stock": 10,
  "image_url": "https://s3.amazonaws.com/smepaddy/items/rice.jpg"
}

Response 201:
{
  "success": true,
  "data": {
    "stock_item": {...},
    "coins_earned": {
      "amount": 15,
      "new_balance": 260
    }
  }
}
```

**Get Low Stock Items**
```http
GET /api/v1/stock/low-stock
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "itm_abc123",
        "item_name": "Rice (10 cups)",
        "current_stock": 3,
        "low_stock_threshold": 5
      }
    ]
  }
}
```

#### Paddy Coins

**Get Coin Balance**
```http
GET /api/v1/coins
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": {
    "balance": 245,
    "total_earned": 450,
    "current_level": 3,
    "level_name": "Smart Seller",
    "progress_to_next_level": {
      "current_coins": 245,
      "next_level_threshold": 300,
      "coins_needed": 55,
      "percentage": 81.7
    }
  }
}
```

**Get Coin History**
```http
GET /api/v1/coins/history?page=1&limit=20
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "cointx_abc",
        "amount": 10,
        "event_type": "sale_recorded",
        "description": "Sale recorded: Rice (10 cups)",
        "created_at": "2024-12-15T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

#### Loans

**Get Loan Eligibility**
```http
GET /api/v1/loans/eligibility
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": {
    "is_eligible": true,
    "current_tier": {
      "level": 3,
      "name": "Silver",
      "badge": "🥈",
      "min_coins": 300,
      "max_loan_amount": 300000,
      "interest_rate": 2.5,
      "approval_time": "24 hours"
    },
    "user_coins": 245,
    "next_tier": {
      "name": "Gold",
      "min_coins": 600,
      "coins_needed": 355
    },
    "max_loan_by_revenue": 780000,
    "actual_max_loan": 300000
  }
}
```

**Apply for Loan**
```http
POST /api/v1/loans/apply
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "amount": 200000,
  "duration_months": 6,
  "purpose": "Buy more stock for end-of-year sales"
}

Response 201:
{
  "success": true,
  "data": {
    "loan": {
      "id": "loan_abc123",
      "loan_number": "LN-2024-001234",
      "amount": 200000,
      "interest_rate": 2.5,
      "duration_months": 6,
      "monthly_payment": 38333,
      "total_repayment": 230000,
      "status": "pending",
      "estimated_approval_date": "2024-12-16T10:00:00Z"
    },
    "coins_earned": {
      "amount": 50,
      "event": "first_loan_application",
      "new_balance": 295
    }
  }
}
```

#### Support Tickets

**Submit Support Ticket**
```http
POST /api/v1/support/tickets
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "subject": "Cannot generate invoice",
  "category": "technical",
  "priority": "high",
  "message": "I am trying to create an invoice but the system keeps showing an error.",
  "email": "ngozi@gmail.com"
}

Response 201:
{
  "success": true,
  "data": {
    "ticket": {
      "id": "ticket_abc123",
      "ticket_number": "TKT-2026-042",
      "subject": "Cannot generate invoice",
      "status": "open",
      "created_at": "2026-01-07T14:30:00Z"
    },
    "message": "Your support ticket has been submitted. We'll respond within 24 hours."
  }
}
```

**Get User's Tickets**
```http
GET /api/v1/support/tickets?status=open&limit=20
Authorization: Bearer {access_token}

Response 200:
{
  "success": true,
  "data": {
    "tickets": [...],
    "pagination": {
      "total": 5,
      "page": 1,
      "limit": 20
    }
  }
}
```

#### Admin Portal APIs

**Admin Login**
```http
POST /api/v1/admin/auth/login
Content-Type: application/json

{
  "email": "admin@smepaddy.com",
  "password": "admin123"
}

Response 200:
{
  "success": true,
  "data": {
    "admin": {
      "id": "admin_abc123",
      "email": "admin@smepaddy.com",
      "full_name": "Super Admin",
      "role": "super_admin"
    },
    "access_token": "eyJhbGci...",
    "refresh_token": "eyJhbGci..."
  }
}
```

**Get All Support Tickets (Admin)**
```http
GET /api/v1/admin/support/tickets?status=open&priority=high&limit=50
Authorization: Bearer {admin_access_token}

Response 200:
{
  "success": true,
  "data": {
    "tickets": [...],
    "stats": {
      "open": 12,
      "in_progress": 8,
      "resolved": 45,
      "closed": 120
    }
  }
}
```

**Update Ticket Status (Admin)**
```http
PATCH /api/v1/admin/support/tickets/{ticket_id}
Authorization: Bearer {admin_access_token}
Content-Type: application/json

{
  "status": "in_progress",
  "assigned_to": "admin_xyz789"
}
```

**Reply to Ticket (Admin)**
```http
POST /api/v1/admin/support/tickets/{ticket_id}/replies
Authorization: Bearer {admin_access_token}
Content-Type: application/json

{
  "message": "Thank you for reporting this. We've identified the issue and will fix it shortly."
}
```

#### Business Categories Management (Admin)

**Get All Categories**
```http
GET /api/v1/admin/categories
Authorization: Bearer {admin_access_token}

Response 200:
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "cat_abc123",
        "value": "retail",
        "label": "Retail Shop (Selling to customers)",
        "is_active": true,
        "usage_count": 1245,
        "created_at": "2024-01-01T00:00:00Z"
      },
      ...
    ],
    "stats": {
      "total": 21,
      "active": 21,
      "total_usage": 5234
    }
  }
}
```

**Create Business Category (Admin)**
```http
POST /api/v1/admin/categories
Authorization: Bearer {admin_access_token}
Content-Type: application/json

{
  "value": "real-estate",
  "label": "Real Estate & Property"
}

Response 201:
{
  "success": true,
  "data": {
    "category": {
      "id": "cat_new123",
      "value": "real-estate",
      "label": "Real Estate & Property",
      "is_active": true,
      "usage_count": 0
    }
  }
}
```

**Update Business Category (Admin)**
```http
PATCH /api/v1/admin/categories/{category_id}
Authorization: Bearer {admin_access_token}
Content-Type: application/json

{
  "label": "Real Estate, Property & Land",
  "is_active": true
}
```

**Delete Business Category (Admin)**
```http
DELETE /api/v1/admin/categories/{category_id}
Authorization: Bearer {admin_access_token}

Response 200:
{
  "success": true,
  "message": "Category deleted successfully"
}

Error 400 (if category in use):
{
  "success": false,
  "error": {
    "code": "CATEGORY_IN_USE",
    "message": "Cannot delete category: 123 businesses are using it"
  }
}
```

### 6.4 Error Handling

**Standard Error Response**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PIN",
    "message": "The PIN you entered is incorrect",
    "details": {
      "attempts_remaining": 2
    }
  }
}
```

**HTTP Status Codes**
| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Successful GET request |
| 201 | Created | Successful POST (new resource) |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | No permission |
| 404 | Not Found | Resource doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server error |

### 6.5 Rate Limiting

```http
Headers in Response:
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1702648200
```

**Limits:**
- Authentication endpoints: 5 requests/minute/IP
- General API: 100 requests/minute/user
- File uploads: 10 requests/hour/user

---

## 7. Security Architecture

### 7.1 Authentication & Authorization

#### JWT Token Structure
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "user_id": "usr_abc123",
    "phone_number": "+2348012345678",
    "role": "user",
    "iat": 1702645200,
    "exp": 1702646100
  }
}
```

#### Token Refresh Flow
1. Access token expires (15 minutes)
2. Client sends refresh token to `/auth/refresh`
3. Server validates refresh token
4. Server issues new access token + refresh token
5. Old refresh token invalidated (rotation)

### 7.2 Data Encryption

**In Transit:**
- TLS 1.3 for all API communication
- HTTPS-only (HSTS header enabled)
- Certificate pinning (mobile app - future)

**At Rest:**
- Database encryption (AWS RDS encryption)
- PINs hashed with bcrypt (10 rounds)
- Sensitive fields (future): AES-256 encryption

### 7.3 Security Headers

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

### 7.4 Input Validation

**Sanitization:**
- All user inputs sanitized (prevent XSS)
- SQL injection prevention via ORM (Prisma)
- Rate limiting on all endpoints
- File upload: Type + size validation

**Validation Rules:**
- Phone numbers: E.164 format validation
- Amounts: Max 12 digits, 2 decimal places
- PINs: 6 digits, numeric only
- Item names: Max 255 chars, no special characters

### 7.5 Threat Mitigation

| Threat | Mitigation |
|--------|------------|
| **SQL Injection** | ORM with parameterized queries |
| **XSS** | Input sanitization, CSP headers |
| **CSRF** | SameSite cookies, CSRF tokens |
| **Brute Force** | Rate limiting, account lockout (3 attempts) |
| **DDoS** | Cloudflare protection, rate limiting |
| **Session Hijacking** | Secure cookies, token rotation |
| **Man-in-the-Middle** | TLS 1.3, certificate pinning |

---

## 8. Infrastructure & Deployment

### 8.1 Production Infrastructure

```
┌─────────────────────────────────────────────────────────────┐
│                       User Requests                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Cloudflare (CDN + DDoS Protection)              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           Load Balancer (AWS ALB / Nginx)                    │
└────────────┬───────────────────────────┬────────────────────┘
             │                           │
             ▼                           ▼
┌─────────────────────┐       ┌─────────────────────┐
│   API Server 1      │       │   API Server 2      │
│  (Node.js/Express)  │       │  (Node.js/Express)  │
│  Auto-scaling Group │       │  Auto-scaling Group │
└──────────┬──────────┘       └──────────┬──────────┘
           │                              │
           └──────────────┬───────────────┘
                          │
                          ▼
           ┌──────────────────────────────┐
           │  Database (PostgreSQL RDS)   │
           │  - Primary (Write)           │
           │  - Read Replica (Read)       │
           └──────────────────────────────┘
                          │
                          ▼
           ┌──────────────────────────────┐
           │   Redis Cluster (ElastiCache)│
           │   - Session Storage          │
           │   - Rate Limiting            │
           └──────────────────────────────┘
```

### 8.2 Hosting Options

#### Option 1: AWS (Recommended for Scale)
- **Frontend:** S3 + CloudFront
- **Backend:** ECS Fargate or EC2 Auto-scaling
- **Database:** RDS PostgreSQL (Multi-AZ)
- **Cache:** ElastiCache Redis
- **Storage:** S3
- **CDN:** CloudFront

**Cost Estimate (Month 1):**
- EC2/Fargate: $50-100
- RDS: $50-80
- S3: $10
- CloudFront: $20
- **Total:** ~$150-200/month

#### Option 2: Vercel + Supabase (Fastest MVP)
- **Frontend:** Vercel (Next.js deployment)
- **Backend:** Vercel Serverless Functions
- **Database:** Supabase (Managed PostgreSQL)
- **Storage:** Supabase Storage
- **Auth:** Supabase Auth

**Cost Estimate:**
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- **Total:** ~$45/month (scales with usage)

#### Option 3: Render (Simplicity)
- **Full-stack:** Render Web Service
- **Database:** Render PostgreSQL
- **Storage:** AWS S3 or Cloudinary

### 8.3 CI/CD Pipeline

```
┌──────────────┐
│   Git Push   │
│  to GitHub   │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│  GitHub Actions      │
│  - Run Tests         │
│  - Lint Code         │
│  - Build Docker      │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Deploy to Staging   │
│  - Run E2E Tests     │
│  - Manual Approval   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Deploy to Production │
│ - Blue/Green Deploy  │
│ - Health Checks      │
└──────────────────────┘
```

**GitHub Actions Workflow Example:**
```yaml
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Tests
        run: npm test
      
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### 8.4 Environment Configuration

**.env (Sample)**
```bash
# Server
NODE_ENV=production
PORT=3000
API_URL=https://api.smepaddy.ng

# Database
DATABASE_URL=postgresql://user:pass@host:5432/smepaddy
REDIS_URL=redis://redis-host:6379

# JWT
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=30d

# Third-Party Services
TERMII_API_KEY=your-termii-key
TERMII_SENDER_ID=SMEPaddy
PAYSTACK_SECRET_KEY=sk_live_xxx
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
S3_BUCKET_NAME=smepaddy-uploads

# Analytics
MIXPANEL_TOKEN=your-mixpanel-token
SENTRY_DSN=https://xxx@sentry.io/xxx
```

---

## 9. Performance Optimization

### 9.1 Frontend Optimization

**Code Splitting:**
```javascript
// Lazy load pages
const LoansPage = lazy(() => import('./components/LoansPage'));
const InvoicesPage = lazy(() => import('./components/InvoicesPage'));

// Route-based code splitting
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/loans" element={<LoansPage />} />
  </Routes>
</Suspense>
```

**Image Optimization:**
- WebP format with JPEG fallback
- Lazy loading (intersection observer)
- Compression: <200KB per image
- Responsive images (srcset)

**Bundle Size Targets:**
- Initial bundle: <300KB (gzipped)
- Total JS: <500KB
- CSS: <50KB

### 9.2 Backend Optimization

**Database Query Optimization:**
```sql
-- Use indexes
CREATE INDEX idx_tx_user_date ON transactions(user_id, transaction_date DESC);

-- Query optimization
EXPLAIN ANALYZE 
SELECT * FROM transactions 
WHERE user_id = 'usr_abc' 
AND transaction_date >= NOW() - INTERVAL '7 days';
```

**Caching Strategy:**
```javascript
// Redis cache for user coins
async function getUserCoins(userId) {
  const cacheKey = `user:${userId}:coins`;
  
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // Fallback to database
  const coins = await db.coins.findUnique({ where: { userId } });
  
  // Cache for 5 minutes
  await redis.setex(cacheKey, 300, JSON.stringify(coins));
  
  return coins;
}
```

**Connection Pooling:**
```javascript
// PostgreSQL connection pool
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### 9.3 Performance Metrics

| Metric | Target | Measurement Tool |
|--------|--------|------------------|
| First Contentful Paint (FCP) | <1.5s | Lighthouse |
| Largest Contentful Paint (LCP) | <2.5s | Lighthouse |
| Time to Interactive (TTI) | <3.5s | Lighthouse |
| Cumulative Layout Shift (CLS) | <0.1 | Lighthouse |
| API Response Time (P95) | <300ms | New Relic/Datadog |
| Database Query Time (P95) | <50ms | PostgreSQL logs |

---

## 10. Scalability Strategy

### 10.1 Horizontal Scaling

**Stateless API Servers:**
- No session storage on server (use Redis/JWT)
- Load balancer distributes traffic
- Auto-scaling based on CPU/memory

**Database Scaling:**
- **Read Replicas:** Offload read queries (transactions, stock lists)
- **Write-Primary:** Single primary for consistency
- **Partitioning (future):** Shard by user_id when >1M users

### 10.2 Caching Layers

**CDN (Cloudflare):**
- Static assets (images, CSS, JS)
- Cache for 1 year (immutable assets)

**Redis (Application Cache):**
- User sessions (15 minutes TTL)
- Coin balances (5 minutes TTL)
- Loan tiers (1 hour TTL)
- Rate limiting counters

**Database Query Cache:**
- Dashboard summary (1 minute TTL)
- Stock list (30 seconds TTL)

### 10.3 Database Optimization

**Indexing Strategy:**
- Primary keys: UUID with index
- Foreign keys: Auto-indexed
- Query-specific: transaction_date, user_id combinations

**Partitioning (Future):**
```sql
-- Partition transactions table by date (monthly)
CREATE TABLE transactions_2024_12 PARTITION OF transactions
FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');
```

**Archive Strategy:**
- Transactions older than 2 years → Archive table
- Loans completed >3 years → Cold storage (S3)

---

## 11. Monitoring & Observability

### 11.1 Application Monitoring

**Tools:**
- **Sentry:** Error tracking, stack traces
- **Datadog/New Relic:** APM, performance monitoring
- **Mixpanel/Amplitude:** User analytics, funnels

**Key Metrics:**
```javascript
// Custom metrics
metrics.increment('transaction.recorded', { type: 'sale' });
metrics.timing('api.response_time', duration, { endpoint: '/transactions' });
metrics.gauge('users.active_now', activeUserCount);
```

### 11.2 Logging

**Structured Logging (Winston):**
```javascript
logger.info('Transaction recorded', {
  user_id: 'usr_abc123',
  transaction_id: 'txn_xyz789',
  amount: 3000,
  type: 'sale',
  timestamp: new Date()
});
```

**Log Levels:**
- ERROR: Critical issues (payment failures, crashes)
- WARN: Recoverable issues (low stock, retry attempts)
- INFO: Business events (transactions, logins)
- DEBUG: Detailed debugging (development only)

### 11.3 Alerts

**Critical Alerts (PagerDuty/Opsgenie):**
- API error rate >5%
- Database CPU >80%
- Payment gateway failures
- Server downtime

**Warning Alerts (Slack):**
- API response time >1s (P95)
- High memory usage >70%
- Unusual spike in traffic

### 11.4 Health Checks

```javascript
// /health endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date(),
    services: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      s3: await checkS3()
    }
  };
  
  const isHealthy = Object.values(health.services).every(s => s === 'ok');
  res.status(isHealthy ? 200 : 503).json(health);
});
```

---

## 12. Development Workflow

### 12.1 Git Branching Strategy

```
main (production)
  ├── staging
  │     ├── feature/paddy-coin-system
  │     ├── feature/loan-application
  │     └── bugfix/transaction-validation
  └── hotfix/critical-bug
```

**Branch Naming:**
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Emergency production fixes
- `refactor/` - Code improvements

### 12.2 Code Review Process

1. Developer creates PR (pull request)
2. Automated checks run (tests, lint, build)
3. At least 1 peer review required
4. QA testing on staging
5. Merge to staging → Deploy
6. Final approval → Merge to main → Production deploy

### 12.3 Testing Strategy

**Unit Tests (Jest):**
```javascript
describe('Coin Service', () => {
  it('should award 10 coins for sale', () => {
    const reward = awardCoins('sale_recorded');
    expect(reward.amount).toBe(10);
  });
});
```

**Integration Tests:**
```javascript
describe('POST /api/transactions/sale', () => {
  it('should create transaction and award coins', async () => {
    const response = await request(app)
      .post('/api/transactions/sale')
      .set('Authorization', `Bearer ${token}`)
      .send({ ... });
    
    expect(response.status).toBe(201);
    expect(response.body.data.coins_earned.amount).toBe(10);
  });
});
```

**E2E Tests (Playwright/Cypress - future):**
```javascript
test('User can record a sale', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Record Sale');
  await page.selectOption('select', 'product');
  // ... complete flow
  await expect(page.locator('.success-toast')).toContainText('+10 coins');
});
```

**Test Coverage Target:** >80% for critical paths

---

## 13. Future Architecture Considerations

### 13.1 Microservices Migration (Year 2+)

**When to Consider:**
- Team size >20 engineers
- User base >1M
- Complex domain logic

**Potential Services:**
- Auth Service
- Transaction Service
- Loan Service
- Notification Service
- Analytics Service

### 13.2 Event-Driven Architecture

**Use Case:** Decouple services, enable real-time features

**Example:**
```
Transaction Recorded Event
  ├─> Coin Service (award coins)
  ├─> Stock Service (update inventory)
  ├─> Analytics Service (track metrics)
  └─> Notification Service (send alerts)
```

**Technology:** Apache Kafka or AWS EventBridge

### 13.3 Mobile Native Apps

**React Native (Recommended):**
- Code sharing with web (70-80%)
- Native performance
- Offline-first capabilities
- Push notifications

**Architecture:**
```
Shared Business Logic (TypeScript)
    ├─> Web (React)
    ├─> iOS (React Native)
    └─> Android (React Native)
```

### 13.4 AI/ML Integration

**Use Cases:**
- Fraud detection (anomalous transactions)
- Loan default prediction
- Personalized recommendations (products to stock)
- OCR for receipt scanning
- Chatbot support (NLP)

**Technology:** TensorFlow.js, AWS SageMaker

---

## Appendix A: Technology Decision Log

| Decision | Chosen Option | Alternatives Considered | Rationale |
|----------|---------------|-------------------------|-----------|
| Frontend Framework | React | Vue, Svelte | Ecosystem, talent availability |
| Styling | Tailwind CSS | CSS Modules, Styled Components | Utility-first, performance |
| Backend Runtime | Node.js | Python (Django/Flask), Go | JavaScript full-stack, async I/O |
| Database | PostgreSQL | MySQL, MongoDB | ACID compliance, JSON support |
| Auth | JWT | Session cookies, OAuth2 | Stateless, mobile-friendly |
| Hosting | Vercel + Supabase | AWS, Render | Fastest MVP, low cost |
| OTP Provider | Termii | Twilio | Nigeria-focused, cost-effective |

---

## Appendix B: API Versioning Strategy

**URL Versioning:**
```
/api/v1/transactions  (Current)
/api/v2/transactions  (Future breaking changes)
```

**Deprecation Policy:**
- Announce 3 months before deprecation
- Support old version for 6 months
- Return deprecation headers:
  ```
  Deprecation: version=v1; sunset=2025-06-01
  Sunset: Sun, 01 Jun 2025 00:00:00 GMT
  ```

---

## Appendix C: Disaster Recovery Plan

**RTO (Recovery Time Objective):** 4 hours  
**RPO (Recovery Point Objective):** 15 minutes

**Backup Strategy:**
1. **Database:** Automated daily backups (RDS)
2. **Point-in-time recovery:** 7 days
3. **Cross-region replication:** Critical data only
4. **Disaster recovery drill:** Quarterly

**Incident Response:**
1. Detect (monitoring alerts)
2. Assess severity (P0, P1, P2)
3. Communicate (status page, Slack)
4. Mitigate (rollback, scale up)
5. Resolve (root cause fix)
6. Post-mortem (document learnings)

---

**End of Architecture Document**

*Last updated: January 7, 2026*  
*Changes: Added admin portal architecture, support ticket system, business categories management, and related database schemas and API endpoints.*  
*Next review: April 7, 2026*