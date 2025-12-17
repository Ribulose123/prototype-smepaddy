# Product Requirements Document (PRD)
## SME Paddy - Business Management Dashboard for Nigerian Micro & Small Businesses

**Version:** 1.0  
**Last Updated:** December 15, 2024  
**Document Owner:** Product Team  
**Status:** Active Development

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Product Vision & Strategy](#product-vision--strategy)
3. [Target Market & User Personas](#target-market--user-personas)
4. [User Problems & Solutions](#user-problems--solutions)
5. [Functional Requirements](#functional-requirements)
6. [Non-Functional Requirements](#non-functional-requirements)
7. [User Stories & Acceptance Criteria](#user-stories--acceptance-criteria)
8. [User Experience Requirements](#user-experience-requirements)
9. [Feature Specifications](#feature-specifications)
10. [Success Metrics & KPIs](#success-metrics--kpis)
11. [Risks & Mitigation](#risks--mitigation)
12. [Product Roadmap](#product-roadmap)
13. [Appendices](#appendices)

---

## 1. Executive Summary

### 1.1 Product Overview
**SME Paddy** is a mobile-first web application designed specifically for Nigerian micro and small business owners with low financial literacy. The platform enables users to track sales, manage inventory, create invoices, monitor cash flow, and access business loans through an intuitive, jargon-free interface.

### 1.2 Business Objectives
- **Primary Goal:** Empower 100,000+ Nigerian SME owners to manage their businesses professionally within 12 months
- **Secondary Goals:**
  - Reduce financial record-keeping barriers for low-literacy users
  - Provide pathway to formal credit through gamified business tracking
  - Build trust and financial inclusion for underserved entrepreneurs

### 1.3 Key Differentiators
1. **Zero Financial Jargon:** Uses everyday Nigerian language ("Money In" vs "Revenue")
2. **Gamification System:** Paddy Coins reward good business practices
3. **Coin-Based Lending:** Credit access tied to consistent record-keeping behavior
4. **Cultural Familiarity:** Interface inspired by trusted Nigerian fintech apps (OPay, PalmPay, Moniepoint)
5. **1-2 Click Actions:** Maximum simplicity for every operation

---

## 2. Product Vision & Strategy

### 2.1 Vision Statement
*"To become the most trusted business companion for Nigerian street-level entrepreneurs, transforming informal businesses into trackable, creditworthy enterprises through simplicity and trust."*

### 2.2 Mission Statement
*"We help small business owners understand their money, grow their profits, and access opportunities—without confusion or stress."*

### 2.3 Strategic Pillars

#### Pillar 1: Radical Simplicity
- No accounting terms or complex features
- Every action in 1-2 clicks maximum
- Large touch-friendly controls (minimum 44px)
- Human language only

#### Pillar 2: Behavioral Economics
- Gamification drives consistent usage
- Paddy Coins create psychological ownership
- Progressive rewards system encourages daily engagement
- Social proof through tier badges

#### Pillar 3: Financial Inclusion
- Loan access democratized through behavior, not assets
- No traditional credit checks or collateral
- Transparent tier system shows path to better terms
- Educational approach to credit

#### Pillar 4: Mobile-First Design
- Optimized for low-end Android devices
- Works on 3G networks
- Minimal data consumption
- Offline-first capabilities (future)

---

## 3. Target Market & User Personas

### 3.1 Market Overview
- **Target Market:** Nigerian micro and small businesses
- **Market Size:** ~41.5 million MSMEs in Nigeria (SMEDAN 2021)
- **Addressable Segment:** 10-15 million smartphone-enabled SME owners
- **Initial Focus:** Urban and peri-urban traders, service providers

### 3.2 Primary Persona: "Mama Ngozi" - The Market Trader

**Demographics:**
- Age: 32-48
- Gender: Female (65% of target market)
- Education: Secondary school or less
- Location: Lagos, Kano, Port Harcourt, Ibadan (Tier 1 & 2 cities)
- Income: ₦100,000-500,000 monthly revenue

**Business Profile:**
- Business Type: Provisions shop, food seller, fabric trader
- Years in Business: 3-10 years
- Employees: 0-2 (often family members)
- Record Keeping: Exercise books, mental tracking
- Digital Literacy: Uses WhatsApp, makes mobile money transfers

**Pain Points:**
1. Struggles to know if business is truly profitable
2. Can't access bank loans due to lack of formal records
3. Confuses personal and business money
4. Loses track of who owes money
5. Makes financial decisions based on "feeling" not data
6. Intimidated by complex accounting software

**Goals:**
- Know exactly how much profit made each week
- Remember who owes money and how much
- Access small loans for inventory expansion
- Save time on manual record-keeping
- Feel confident making business decisions

**Technology Usage:**
- Smartphone: Low-end Android (1-2GB RAM)
- Apps Used: WhatsApp, OPay/PalmPay, TikTok, Facebook
- Internet: Primarily mobile data (3G/4G)
- Digital Payments: Frequent user of mobile money

**Quote:**
*"I need something simple like OPay. I don't understand 'accounts receivable' or 'profit margin'. Just tell me: am I making money or not?"*

---

### 3.3 Secondary Persona: "Bro Emeka" - The Service Provider

**Demographics:**
- Age: 25-40
- Gender: Male (60% of service providers)
- Education: Secondary to some tertiary
- Location: Urban centers
- Income: ₦150,000-800,000 monthly

**Business Profile:**
- Business Type: Mechanic, barber, phone repairer, graphic designer
- Years in Business: 2-8 years
- Employees: 1-3 apprentices
- Record Keeping: WhatsApp messages, notebooks
- Digital Literacy: Moderate to high

**Pain Points:**
1. Difficult to track service completion vs payment
2. Customers delay payments indefinitely
3. Hard to prove business viability for loans
4. No professional invoice system
5. Can't analyze which services are most profitable

**Goals:**
- Send professional invoices to customers
- Track outstanding payments easily
- Access working capital for equipment
- Grow from solo operator to small team
- Build business credit history

**Quote:**
*"My customers say 'I'll pay you later' and I forget. I need something to remind them and track everything automatically."*

---

### 3.4 Tertiary Persona: "Aunty Bisi" - The Digital Native Entrepreneur

**Demographics:**
- Age: 22-35
- Gender: Female (55%)
- Education: University degree or ongoing
- Location: Major cities
- Income: ₦200,000-1,500,000 monthly

**Business Profile:**
- Business Type: Online boutique, catering, beauty services, tutoring
- Years in Business: 1-5 years
- Employees: 0-5
- Record Keeping: Excel sheets, multiple apps
- Digital Literacy: High

**Pain Points:**
1. Using too many different tools (Excel + WhatsApp + Banking apps)
2. Wants simple all-in-one solution
3. Needs professional reports for business growth
4. Wants to scale but lacks financial insights

**Goals:**
- Consolidated business dashboard
- Professional reporting for investors/partners
- Access to growth capital
- Automate repetitive tasks
- Data-driven business decisions

**Quote:**
*"I have the skills and customers, but I'm using 5 different apps. I need one simple place for everything."*

---

## 4. User Problems & Solutions

### 4.1 Problem Statement
Nigerian micro and small business owners struggle to:
1. Track daily business transactions accurately
2. Differentiate business profit from revenue
3. Access formal credit due to lack of records
4. Use complex accounting software designed for large businesses
5. Make data-driven business decisions

### 4.2 Solution Overview
SME Paddy provides:

| Problem | SME Paddy Solution | Impact |
|---------|-------------------|---------|
| Complex accounting terms | Human language UI ("Money In/Out") | 90% comprehension rate |
| Lack of credit history | Coin-based behavioral tracking | Alternative credit scoring |
| Intimidating software | Familiar fintech-style interface | <5 min onboarding |
| Inconsistent record-keeping | Gamification rewards (Paddy Coins) | Daily usage habit formation |
| No access to business loans | Tiered loan system (100 coins = eligible) | Financial inclusion |
| Time-consuming data entry | 1-2 click workflows, quick-select options | <30 seconds per transaction |
| Poor inventory management | Visual stock tracking with low-stock alerts | Reduced stockouts |
| Forgotten customer debts | Invoice system with payment tracking | Improved cash flow |

---

## 5. Functional Requirements

### 5.1 Core Features (MVP)

#### FR-001: User Authentication & Onboarding
- **Priority:** P0 (Critical)
- **Description:** Complete authentication flow with phone verification and secure PIN
- **Requirements:**
  
  **Welcome/Landing Screen:**
  - Professional OPay-style landing page
  - App logo and branding (SME Paddy)
  - Value proposition: "Manage Your Business Like a Pro"
  - Key statistics display (10k+ businesses, ₦2B+ tracked, 99% uptime)
  - Feature highlights with icons:
    - Track Every Sale (with daily profit visibility)
    - Earn Paddy Coins (gamification rewards)
    - Unlock Business Loans (up to ₦2M, no collateral)
    - Bank-level Security
  - Trust indicators (Free forever, 100% secure, No credit card)
  - Primary CTA: "Create Free Account"
  - Secondary text: "No credit card required • Setup in 2 minutes"
  
  **Phone Number Entry:**
  - Nigerian phone format (+234 prefix pre-filled)
  - 10-digit input validation
  - Real-time validation feedback
  - Visual indicator of input progress
  - SMS OTP trigger on submit
  
  **OTP Verification:**
  - 6-digit OTP input boxes
  - Auto-focus between input fields
  - Display masked phone number (+234801****678)
  - "Resend Code" option (30-second cooldown)
  - Auto-verify when 6 digits entered
  
  **PIN Setup (New Users):**
  - 6-digit numeric PIN creation
  - Password-masked input
  - Auto-focus between digits
  - Helpful tip: "Choose a PIN you can remember"
  - Green success theme (welcoming)
  - Coin reward on completion (+20 coins for signup)
  
  **PIN Login (Returning Users):**
  - 6-digit PIN entry
  - Blue theme (familiar, trusted)
  - "Forgot PIN?" recovery option
  - Maximum 3 failed attempts before lockout
  - Biometric option (fingerprint/face - future)
  
  **Session Management:**
  - 30-day session persistence (auto-login)
  - Secure token storage
  - Logout functionality
  - Auto-logout on 3 failed PIN attempts
  
  **Security Features:**
  - PIN hashed with bcrypt (10 rounds)
  - Rate limiting: 5 OTP requests per hour per phone
  - SMS fraud detection
  - Device fingerprinting (future)

#### FR-002: User Authentication (DEPRECATED - merged into FR-001)
- This section has been merged into FR-001 above

#### FR-001B: Profile Setup & Management
- **Priority:** P0 (Critical)
- **Description:** Mandatory first-time profile setup and comprehensive settings management
- **Requirements:**

  **Profile Setup (First-Time Users - Mandatory):**
  
  **Flow:**
  1. User completes phone verification & PIN
  2. System detects first login
  3. Profile setup screens displayed (cannot skip)
  4. 3-step wizard with progress bar
  5. +50 Paddy Coins reward on completion
  
  **Step 1: Business Information (33% progress)**
  - Upload business logo (optional, max 2MB, image formats)
  - Business name (required, max 255 chars)
  - Business type (required, dropdown):
    - Retail Shop, Wholesale, Services, Food & Drinks
    - Fashion & Tailoring, Electronics, Farm Products
    - Transport & Logistics, Other Business
  
  **Step 2: Personal Information (66% progress)**
  - Full name (required)
  - Email address (optional, for updates)
  - Phone number (pre-filled, read-only)
  
  **Step 3: Business Location (100% progress)**
  - State (dropdown, all 36 Nigerian states + FCT)
  - City/Town (text input)
  - Street address (textarea, optional)
  
  **Settings & Profile Management:**
  
  **Main Settings Screen:**
  - Profile preview card with business logo, name, owner, phone
  
  **Settings Sections:**
  1. **Account:** Edit Profile, Change PIN
  2. **Preferences:** Notifications (daily reminders, payment alerts, low stock, coin achievements)
  3. **Support:** Help & Support, FAQs, Terms & Privacy
  4. **Account Actions:** Logout (with confirmation)

#### FR-002: Home Dashboard
- **Priority:** P0 (Critical)
- **Description:** At-a-glance business overview
- **Requirements:**
  - Display current Paddy Coin balance (clickable badge)
  - Show "Money In This Week" with amount
  - Show "Money Out This Week" with amount
  - Display net profit/loss with trend indicator
  - Quick action button: "Record Sale"
  - Visual alerts for low stock items (max 3)
  - Display "People Who Owe Me" count and total amount
  - Show current loan tier and next milestone

#### FR-003: Record Sale (Product)
- **Priority:** P0 (Critical)
- **Description:** Fast product sale recording
- **Requirements:**
  - 2-step flow: Choose item → Enter details
  - Item selection from existing stock (grid view with images)
  - Quick-add new item option
  - Quantity selector (numeric input + +/- buttons)
  - Auto-calculated total (price × quantity)
  - Payment status: "Paid Now", "Partial Payment", "Will Pay Later"
  - Partial payment: Enter amount received + remaining balance calculation
  - Customer name (optional, autocomplete from previous customers)
  - Date/time auto-captured
  - Success confirmation with coin reward (+10 coins)
  - Transaction saved to "Transactions" page

#### FR-004: Record Sale (Service)
- **Priority:** P0 (Critical)
- **Description:** Service-based sale recording
- **Requirements:**
  - Service name (text input with suggestions: Tailoring, Repairs, Hair, Transport, etc.)
  - Customer name (optional, autocomplete)
  - Amount (numeric input with ₦ symbol)
  - Payment status: "Paid", "Partial", "Later"
  - Service completion date
  - Notes field (optional, 200 chars max)
  - Success confirmation with coin reward (+10 coins)

#### FR-005: Record Expense (Money Out)
- **Priority:** P0 (Critical)
- **Description:** Track business expenses
- **Requirements:**
  - Expense category selection (Transport, Rent, NEPA, Supplies, Stock Purchase, Salary, Other)
  - Category icons for visual recognition
  - Amount input (numeric)
  - Description (optional, 100 chars)
  - Payment method (Cash, Transfer, Card)
  - Date selector (default: today)
  - Receipt photo upload (optional, future)
  - Success confirmation with coin reward (+5 coins)

#### FR-006: Stock/Inventory Management
- **Priority:** P0 (Critical)
- **Description:** Track product inventory
- **Requirements:**
  - Grid view of all items with images
  - Item card shows: Name, image, current stock, selling price
  - Low stock indicator (red badge when <5 units)
  - Add new item: Name, category, image (upload/select icon), buying price, selling price, initial stock quantity
  - Edit item: Update all fields except transaction history
  - Stock adjustment: Add/remove stock with reason
  - Auto-deduction on sale recording
  - Stock value calculation (quantity × buying price)
  - Filter by category
  - Search functionality
  - Coin reward for adding items (+15 coins)

#### FR-007: Transactions History
- **Priority:** P0 (Critical)
- **Description:** Complete transaction log
- **Requirements:**
  - Chronological list (newest first)
  - Filter tabs: All, Money In, Money Out
  - Transaction card displays:
    - Type icon (green up arrow for in, red down arrow for out)
    - Item/service name
    - Customer name (if applicable)
    - Amount (color-coded: green for in, red for out)
    - Payment status badge (Paid/Not Paid/Partial)
    - Timestamp (relative: "2 hours ago")
  - Weekly summary chart (bar chart, 7 days)
  - Summary cards: Total In, Total Out, Net Profit
  - Infinite scroll pagination
  - Tap transaction to view details (future: edit/delete)

#### FR-008: Invoices
- **Priority:** P1 (High)
- **Description:** Create and manage customer invoices
- **Requirements:**
  - Invoice list view with status filters (All, Paid, Pending, Overdue)
  - Summary cards: Total Paid, Total Pending, Total Overdue
  - Create new invoice:
    - Customer name (autocomplete)
    - Customer phone (optional)
    - Add line items (select from stock or add custom)
    - Quantity and price per item
    - Auto-calculate subtotal
    - Due date selector
    - Notes field
    - Preview invoice
  - Invoice card displays:
    - Customer name
    - Total amount
    - Status (Paid/Pending/Overdue with color coding)
    - Due date
    - Number of items
  - Mark as paid (full payment)
  - Send invoice via WhatsApp (future)
  - PDF download (future)

#### FR-009: Paddy Coin System
- **Priority:** P0 (Critical)
- **Description:** Gamification and rewards
- **Requirements:**
  - Coin balance display on homepage (clickable badge)
  - Coin earning rules:
    - Record sale: +10 coins
    - Record expense: +5 coins
    - Add new item: +15 coins
    - Daily login: +5 coins
    - 7-day streak: +50 coins
    - 30-day streak: +200 coins
  - Coin history modal:
    - Current balance (large display)
    - Current level (1-6) with badge
    - Progress bar to next level
    - "How to Earn" section
    - Recent coin transactions (last 10)
    - Redemption options section
  - Level system:
    - Level 1: Beginner Trader (0-99 coins) 🌱
    - Level 2: Rising Star (100-299 coins) ⭐
    - Level 3: Smart Seller (300-599 coins) 💼
    - Level 4: Business Pro (600-999 coins) 🎯
    - Level 5: Market Leader (1000-1999 coins) 👑
    - Level 6: Paddy Master (2000+ coins) 💎
  - Celebration animations on coin earning
  - Toast notifications with coin emoji

#### FR-010: Loan System (Coin-Powered)
- **Priority:** P1 (High)
- **Description:** Tiered loan access based on Paddy Coins
- **Requirements:**
  - Loan tiers (6 levels):
    - Starter: 0 coins - Not eligible 🔒
    - Bronze: 100 coins - ₦100k @ 3%/month, 48hr approval 🥉
    - Silver: 300 coins - ₦300k @ 2.5%/month, 24hr approval 🥈
    - Gold: 600 coins - ₦500k @ 2%/month, 12hr approval 🥇
    - Platinum: 1,000 coins - ₦1M @ 1.5%/month, 6hr approval 💎
    - Paddy VIP: 2,000 coins - ₦2M @ 1%/month, instant 👑
  - Current tier display:
    - Tier badge and name
    - Current coins vs required
    - Progress bar to next tier
    - Max loan amount available
    - Interest rate
    - Approval time
  - Tier benefits list for current level
  - All tiers view (scrollable cards):
    - Locked vs unlocked visual state
    - Coins required
    - Max loan amount
    - Interest rate
    - Special benefits
  - Loan application form:
    - Amount selector (slider + manual input)
    - Recommended amount (60% of max)
    - Quick buttons: 50%, Recommended, Max
    - Repayment period (3, 6, 12 months)
    - Loan purpose (dropdown)
    - Live calculator showing:
      - Total interest
      - Total repayment
      - Monthly payment
    - Terms and conditions checkbox
  - Loan bonus coins:
    - First application: +50
    - Approved: +100
    - On-time payment: +10 each
    - Early repayment: +150
    - Full repayment: +200
  - "How to Earn Coins" help section
  - Educational content: Why coin-based loans

#### FR-011: Reports (Future Premium Feature)
- **Priority:** P2 (Medium)
- **Description:** Business insights and analytics
- **Requirements:**
  - Revenue trends (daily, weekly, monthly)
  - Expense breakdown by category
  - Top-selling products
  - Customer purchase frequency
  - Profit margin analysis
  - Export to PDF/Excel
  - Requires: 1000+ coins or ₦2,000 monthly subscription

#### FR-012: Bottom Navigation
- **Priority:** P0 (Critical)
- **Description:** Main app navigation
- **Requirements:**
  - Fixed bottom bar with 5 tabs
  - Icons with labels:
    - Home (house icon)
    - Money (arrows icon) → Transactions
    - Stock (box icon)
    - Invoices (document icon)
    - Loans (banknote icon)
  - Active state highlighting (blue color)
  - Minimum 44px touch targets
  - Smooth transitions between pages

### 5.2 User Management Features

#### FR-013: User Profile
- **Priority:** P1 (High)
- **Requirements:**
  - Business name
  - Owner name
  - Phone number (verified)
  - Business category
  - Profile photo
  - Business address (optional)
  - Email (optional)

#### FR-014: Settings
- **Priority:** P1 (High)
- **Requirements:**
  - Change PIN
  - Enable/disable biometric login
  - Notification preferences
  - Language selection (English, Pidgin - future)
  - Currency (₦ default, $ future)
  - Data backup/restore
  - Account deletion

---

## 6. Non-Functional Requirements

### 6.1 Performance Requirements

#### NFR-001: Response Time
- Page load time: <2 seconds on 3G
- Transaction recording: <1 second
- Search results: <500ms
- Chart rendering: <1.5 seconds

#### NFR-002: Scalability
- Support 100,000 concurrent users
- Handle 1 million transactions per day
- Database: 99.9% uptime
- Auto-scaling on traffic spikes

#### NFR-003: Data Storage
- Transaction history: Unlimited retention
- Image storage: 10MB per user (compressed)
- Backup frequency: Daily incremental, weekly full

### 6.2 Security Requirements

#### NFR-004: Data Protection
- End-to-end encryption for sensitive data
- HTTPS/TLS 1.3 for all communications
- Data encryption at rest (AES-256)
- Compliance with Nigeria Data Protection Regulation (NDPR)
- GDPR-ready architecture

#### NFR-005: Authentication & Authorization
- Multi-factor authentication (SMS OTP)
- Session timeout: 30 minutes inactive
- Maximum 3 failed login attempts before lockout
- JWT token-based authentication
- Role-based access control (future: multi-user)

#### NFR-006: PII Protection
- **Critical Constraint:** Platform NOT designed for sensitive PII
- Minimal personal data collection
- Clear privacy policy disclosure
- No storage of government IDs, BVN, or financial credentials
- Disclaimer: Not suitable for highly sensitive business data

### 6.3 Usability Requirements

#### NFR-007: Accessibility
- Minimum touch target: 44px × 44px
- Font size: Minimum 14px for body text
- High contrast ratios (WCAG AA compliant)
- Support for screen readers (future)
- Simplified language (5th-grade reading level)

#### NFR-008: Internationalization
- Support for Nigerian English
- Currency: Naira (₦) default
- Date format: DD/MM/YYYY
- Number format: Nigerian conventions
- Future: Pidgin, Hausa, Yoruba, Igbo

#### NFR-009: Mobile Optimization
- Responsive design (320px - 1920px)
- Touch-optimized controls
- Offline functionality (future)
- Progressive Web App (PWA) capabilities
- Works on Android 6.0+
- Maximum bundle size: 500KB initial load

### 6.4 Reliability Requirements

#### NFR-010: Availability
- System uptime: 99.5% (excluding planned maintenance)
- Planned maintenance: Max 4 hours/month, off-peak hours
- Maximum downtime: <2 hours unplanned

#### NFR-011: Backup & Recovery
- Real-time data replication
- Point-in-time recovery (7 days)
- Recovery Time Objective (RTO): <4 hours
- Recovery Point Objective (RPO): <15 minutes

### 6.5 Compliance Requirements

#### NFR-012: Legal & Regulatory
- Nigeria Data Protection Regulation (NDPR) compliance
- Central Bank of Nigeria (CBN) lending guidelines
- Consumer Protection Framework
- Anti-Money Laundering (AML) basic checks for loans >₦500k
- Terms of Service and Privacy Policy

---

## 7. User Stories & Acceptance Criteria

### Epic 1: Transaction Recording

#### US-001: Record Product Sale
**As** Mama Ngozi (market trader)  
**I want to** quickly record a sale when a customer buys from me  
**So that** I can track my daily revenue and earn coins

**Acceptance Criteria:**
- [ ] Given I'm on the home page, when I tap "Record Sale", then I see product/service choice screen
- [ ] Given I choose "Product", when I see my stock items, then I can select any item with a single tap
- [ ] Given I selected an item, when I enter quantity and payment status, then the total is auto-calculated
- [ ] Given I complete the sale, when I tap "Done", then I receive +10 coins and see success message
- [ ] Given the sale is recorded, when I view Transactions, then the sale appears at the top of the list
- [ ] Given I selected "Will Pay Later", when I complete the sale, then it appears in invoices as pending

**Priority:** P0  
**Story Points:** 8

---

#### US-002: Record Service Sale
**As** Bro Emeka (mechanic)  
**I want to** record service income from car repairs  
**So that** I can track which services make the most money

**Acceptance Criteria:**
- [ ] Given I tap "Record Sale", when I choose "Service", then I see a service entry form
- [ ] Given I'm entering service details, when I start typing service name, then I see suggestions (Repairs, Tailoring, etc.)
- [ ] Given I enter amount, when I choose "Partial Payment", then I can enter amount received
- [ ] Given partial payment, when I complete, then the balance is calculated and saved
- [ ] Given I complete the form, when I submit, then I receive +10 coins

**Priority:** P0  
**Story Points:** 5

---

#### US-003: Record Business Expense
**As** Mama Ngozi  
**I want to** record when I spend money on business  
**So that** I can see if I'm truly making profit

**Acceptance Criteria:**
- [ ] Given I'm on Transactions page, when I tap the red FAB button, then I see expense recording screen
- [ ] Given I'm recording expense, when I select category, then I see relevant icons (Transport, Rent, NEPA, etc.)
- [ ] Given I enter expense details, when I submit, then I receive +5 coins
- [ ] Given expense is recorded, when I view Transactions, then it shows with red color and minus sign
- [ ] Given I view weekly summary, when expense is recorded, then the "Money Out" chart updates

**Priority:** P0  
**Story Points:** 5

---

### Epic 2: Stock Management

#### US-004: Add New Product to Stock
**As** Aunty Bisi (boutique owner)  
**I want to** add new items when I buy stock  
**So that** I can sell them and track inventory

**Acceptance Criteria:**
- [ ] Given I'm on Stock page, when I tap "Add New Item", then I see item creation form
- [ ] Given I'm adding item, when I fill name, buying price, selling price, and quantity, then I can save
- [ ] Given I add item photo, when I upload, then it's compressed to <200KB
- [ ] Given I complete adding item, when I save, then I receive +15 coins
- [ ] Given item is added, when I view Stock page, then the new item appears in the grid

**Priority:** P0  
**Story Points:** 8

---

#### US-005: Low Stock Alert
**As** Mama Ngozi  
**I want to** be notified when items are running low  
**So that** I can restock before running out

**Acceptance Criteria:**
- [ ] Given an item has <5 units, when I open the app, then I see a low stock badge on homepage
- [ ] Given I tap low stock alert, when modal opens, then I see list of all low-stock items
- [ ] Given I view stock page, when item is low, then it has a red "Low Stock" badge
- [ ] Given I restock item, when quantity goes above 5, then the alert disappears

**Priority:** P1  
**Story Points:** 3

---

### Epic 3: Gamification

#### US-006: Earn Paddy Coins
**As** any user  
**I want to** earn coins for recording transactions  
**So that** I feel motivated to track my business daily

**Acceptance Criteria:**
- [ ] Given I record a sale, when transaction is saved, then I receive +10 coins with celebration toast
- [ ] Given I record an expense, when saved, then I receive +5 coins
- [ ] Given I add new item, when saved, then I receive +15 coins
- [ ] Given I login daily, when app opens, then I receive +5 coins (max once per day)
- [ ] Given I record transactions for 7 consecutive days, when streak completes, then I receive +50 bonus coins
- [ ] Given I record for 30 consecutive days, when streak completes, then I receive +200 bonus coins

**Priority:** P0  
**Story Points:** 13

---

#### US-007: View Coin Balance and Level
**As** any user  
**I want to** see my coins and level  
**So that** I understand my progress

**Acceptance Criteria:**
- [ ] Given I'm on homepage, when page loads, then I see my coin balance in a gold badge
- [ ] Given I tap coin badge, when modal opens, then I see current balance, level, and progress bar
- [ ] Given I view coin modal, when I scroll, then I see "How to Earn" section with all earning methods
- [ ] Given I view level, when I see my tier, then I see corresponding badge emoji (🌱⭐💼🎯👑💎)
- [ ] Given I'm close to next level, when I view progress, then I see how many coins needed

**Priority:** P0  
**Story Points:** 5

---

### Epic 4: Loans

#### US-008: View Loan Eligibility
**As** Bro Emeka  
**I want to** know if I can get a loan  
**So that** I can plan business expansion

**Acceptance Criteria:**
- [ ] Given I have <100 coins, when I open Loans page, then I see "Not Eligible" message
- [ ] Given I have ≥100 coins, when I open Loans page, then I see my current tier and max loan amount
- [ ] Given I view loans page, when I scroll, then I see all 6 tiers with locked/unlocked status
- [ ] Given I see locked tier, when I tap it, then I see coins required to unlock
- [ ] Given I'm at Bronze tier, when I view details, then I see 3% monthly interest rate

**Priority:** P1  
**Story Points:** 8

---

#### US-009: Apply for Loan
**As** Mama Ngozi  
**I want to** apply for business loan  
**So that** I can buy more stock

**Acceptance Criteria:**
- [ ] Given I'm eligible (≥100 coins), when I tap "Apply for Loan", then I see application form
- [ ] Given I'm on application form, when I see loan amount, then I see recommended amount (60% of max)
- [ ] Given I adjust loan amount, when I use slider, then I see live calculation of monthly payment
- [ ] Given I select repayment period, when I choose 3/6/12 months, then calculator updates
- [ ] Given I complete form, when I submit, then I receive +50 coins (first application bonus)
- [ ] Given loan is approved, when I check, then I receive +100 coins

**Priority:** P1  
**Story Points:** 13

---

#### US-010: Earn Loan Bonus Coins
**As** any user with loan  
**I want to** earn bonus coins for responsible repayment  
**So that** I can unlock better loan terms

**Acceptance Criteria:**
- [ ] Given I make on-time payment, when payment is confirmed, then I receive +10 coins
- [ ] Given I repay loan early, when full payment made before due date, then I receive +150 bonus coins
- [ ] Given I complete full repayment, when final payment made, then I receive +200 coins
- [ ] Given I earn repayment coins, when I check coin history, then I see "Loan Repayment Bonus" entry

**Priority:** P2  
**Story Points:** 5

---

### Epic 5: Invoices

#### US-011: Create Invoice
**As** Bro Emeka  
**I want to** send professional invoice to customer  
**So that** I get paid on time

**Acceptance Criteria:**
- [ ] Given I'm on Invoices page, when I tap "+", then I see invoice creation form
- [ ] Given I'm creating invoice, when I enter customer name, then I see suggestions from previous customers
- [ ] Given I add line items, when I select from stock, then price is auto-filled
- [ ] Given I set due date, when I choose date, then system calculates days until due
- [ ] Given I complete invoice, when I save, then it appears in "Pending" invoices

**Priority:** P1  
**Story Points:** 13

---

#### US-012: Track Invoice Payment
**As** Aunty Bisi  
**I want to** mark invoices as paid  
**So that** I know who still owes me

**Acceptance Criteria:**
- [ ] Given I have pending invoice, when customer pays, then I can mark as "Paid"
- [ ] Given invoice is overdue, when I view invoices, then it shows in red with "Overdue" badge
- [ ] Given I view invoice summary, when on Invoices page, then I see total: Paid, Pending, Overdue
- [ ] Given I filter by status, when I select "Pending", then I see only unpaid invoices

**Priority:** P1  
**Story Points:** 5

---

## 8. User Experience Requirements

### 8.1 Design Language

#### Visual Identity
- **Color Palette:**
  - Primary Blue: `#2563EB` (Trust, professionalism)
  - Success Green: `#10B981` (Money In, positive actions)
  - Warning Orange: `#F59E0B` (Pending, attention needed)
  - Error Red: `#EF4444` (Money Out, overdue)
  - Neutral Grays: `#F9FAFB` (background), `#1F2937` (text)
  - Accent Gold: `#F59E0B` (Paddy Coins, premium)

- **Typography:**
  - Sans-serif font family (system fonts for performance)
  - Minimum body text: 14px
  - Headings: Bold, clear hierarchy
  - Line height: 1.5 for readability

- **Iconography:**
  - Lucide React icon library
  - Minimum icon size: 20px
  - Consistent stroke width
  - Filled icons for active states

#### Layout Principles
- **Mobile-first:** 375px base design (iPhone SE)
- **Safe zones:** 16px padding on all sides
- **Bottom nav clearance:** 24px padding (pb-24) on all scrollable pages
- **Card-based design:** Rounded corners (16px radius)
- **Generous whitespace:** Minimum 12px between elements

### 8.2 Interaction Patterns

#### Touch Interactions
- **Minimum touch target:** 44px × 44px (WCAG AAA)
- **Active states:** Scale down to 95% on tap
- **Haptic feedback:** On button press (native)
- **Swipe gestures:** Future - swipe to delete transactions

#### Feedback Mechanisms
- **Loading states:** Skeleton screens, spinners
- **Success:** Green toast notifications + confetti animation (coin rewards)
- **Error:** Red toast with clear message + suggested action
- **Empty states:** Friendly illustrations + CTA button

#### Navigation
- **Bottom nav:** Persistent across pages
- **Back button:** Android hardware back support
- **Modal dismiss:** Tap outside, swipe down, or X button
- **Breadcrumbs:** Not needed (flat navigation)

### 8.3 Language & Tone

#### Voice & Tone Guidelines
- **Friendly, not formal:** "Let's track your sale!" vs "Record transaction"
- **Encouraging:** "Great job! You earned 10 coins!" vs "Transaction saved"
- **Clear, not clever:** "Money In" vs "Revenue" or "Accounts Receivable"
- **Conversational:** "Who did you sell to?" vs "Enter customer name"
- **Respectful:** Avoid assumptions about literacy or education

#### Terminology Mapping
| ❌ Accounting Term | ✅ SME Paddy Term |
|-------------------|------------------|
| Revenue | Money In |
| Expenses | Money Out |
| Profit | What You Made |
| Accounts Receivable | People Who Owe Me |
| Accounts Payable | I Owe |
| Inventory | My Stock |
| Cost of Goods Sold | What I Spent on Stock |
| Gross Margin | Profit per Item |
| Cash Flow | Money Movement |
| Reconciliation | Check My Records |

### 8.4 Onboarding Experience

#### First-Time User Flow (P1 Priority)
1. **Welcome Screen:**
   - App name + logo
   - Tagline: "Your business, simplified"
   - "Get Started" CTA

2. **Phone Verification:**
   - Enter phone number
   - SMS OTP code entry
   - Auto-detect and fill

3. **Business Profile:**
   - Business name
   - What do you sell? (category dropdown)
   - Upload logo (optional, skip option)

4. **Quick Tutorial (3 screens):**
   - Screen 1: "Record every sale to earn Paddy Coins! 🪙"
   - Screen 2: "Earn enough coins to unlock business loans 💰"
   - Screen 3: "Everything in your language, nothing complicated ✨"
   - Skip tutorial option

5. **Dashboard:**
   - "Add Your First Item" prompt
   - Interactive tooltip: "Tap here to record sale"

#### Returning User Flow
- PIN entry or biometric
- Direct to dashboard
- Daily login bonus notification (+5 coins)

---

## 9. Feature Specifications

### 9.1 Paddy Coin System (Detailed)

#### Coin Earning Engine

**Implementation:**
```typescript
// Coin earning events
enum CoinEvent {
  SALE_RECORDED = 'sale_recorded',          // +10
  EXPENSE_RECORDED = 'expense_recorded',    // +5
  ITEM_ADDED = 'item_added',               // +15
  DAILY_LOGIN = 'daily_login',             // +5
  STREAK_7_DAY = 'streak_7_day',           // +50
  STREAK_30_DAY = 'streak_30_day',         // +200
  LOAN_APPLICATION = 'loan_application',   // +50
  LOAN_APPROVED = 'loan_approved',         // +100
  LOAN_PAYMENT_ONTIME = 'loan_payment',    // +10
  LOAN_EARLY_REPAY = 'loan_early_repay',   // +150
  LOAN_FULL_REPAY = 'loan_full_repay'      // +200
}
```

**Level Thresholds:**
| Level | Name | Coins Required | Badge |
|-------|------|---------------|-------|
| 1 | Beginner Trader | 0 | 🌱 |
| 2 | Rising Star | 100 | ⭐ |
| 3 | Smart Seller | 300 | 💼 |
| 4 | Business Pro | 600 | 🎯 |
| 5 | Market Leader | 1000 | 👑 |
| 6 | Paddy Master | 2000 | 💎 |

**Coin Redemption (Future):**
- 500 coins: 1 month premium features
- 1000 coins: Business insights report
- 2000 coins: Free loan application fee waiver
- 5000 coins: Cash reward (₦5,000)

#### Streak Tracking
- **Daily Streak:** User must record at least 1 transaction per day
- **Grace Period:** 1 day miss doesn't break streak (can recover)
- **Notification:** Daily reminder at 6 PM if no activity
- **Visualization:** Fire emoji 🔥 with streak count on homepage

---

### 9.2 Loan System (Detailed)

#### Tier Unlock Logic

**Algorithm:**
```
IF user_coins >= 100 THEN eligible = true
tier = CALCULATE_TIER(user_coins)
max_loan = MIN(tier.max_loan_amount, monthly_revenue × 1.5)
interest_rate = tier.interest_rate
```

**Tier Progression Matrix:**

| Tier | Coins | Max Loan | Interest | Approval | Benefits |
|------|-------|----------|----------|----------|----------|
| 🥉 Bronze | 100 | ₦100,000 | 3.0%/mo | 48 hours | Basic approval |
| 🥈 Silver | 300 | ₦300,000 | 2.5%/mo | 24 hours | Flexible repayment |
| 🥇 Gold | 600 | ₦500,000 | 2.0%/mo | 12 hours | 1-month grace period |
| 💎 Platinum | 1,000 | ₦1,000,000 | 1.5%/mo | 6 hours | No collateral, 2-month grace |
| 👑 Paddy VIP | 2,000 | ₦2,000,000 | 1.0%/mo | Instant | Dedicated support, 3-month grace |

#### Interest Calculation (Simple Interest)

**Formula:**
```
Total Interest = Loan Amount × (Interest Rate / 100) × Number of Months
Total Repayment = Loan Amount + Total Interest
Monthly Payment = Total Repayment / Number of Months
```

**Example:**
- Loan Amount: ₦300,000
- Tier: Silver (2.5% monthly)
- Duration: 6 months

```
Total Interest = 300,000 × 0.025 × 6 = ₦45,000
Total Repayment = 300,000 + 45,000 = ₦345,000
Monthly Payment = 345,000 / 6 = ₦57,500
```

#### Risk Mitigation
- **Behavior scoring:** Consistent daily recording = lower risk
- **Revenue check:** Max loan = 1.5× monthly revenue (prevent over-lending)
- **Grace periods:** Higher tiers get longer grace before late penalties
- **Graduation:** Successful repayment increases trust score

---

### 9.3 Transaction Recording (Detailed)

#### Payment Status Flow

**Three Payment Types:**

1. **Paid Now (Full Payment)**
   - Amount received = Total amount
   - Balance = 0
   - Status: Completed
   - Invoice: Not created

2. **Partial Payment**
   - User enters: Amount received
   - System calculates: Balance = Total - Received
   - Status: Partial
   - Invoice: Auto-created with remaining balance
   - Due date: 7 days default (editable)

3. **Will Pay Later (Credit Sale)**
   - Amount received = 0
   - Balance = Total amount
   - Status: Pending
   - Invoice: Auto-created
   - Due date: 7 days default (editable)

#### Auto-Deduction Logic

**Stock Updates on Sale:**
```
IF item.type == "product" THEN
  item.stock_quantity -= sale.quantity
  
  IF item.stock_quantity < 5 THEN
    CREATE low_stock_alert
  END IF
  
  IF item.stock_quantity <= 0 THEN
    item.status = "out_of_stock"
    NOTIFY user
  END IF
END IF
```

---

### 9.4 Invoice System (Detailed)

#### Invoice Lifecycle

**States:**
- **Draft:** Created but not sent
- **Pending:** Sent, awaiting payment
- **Partial:** Partially paid
- **Paid:** Fully paid
- **Overdue:** Past due date, unpaid
- **Cancelled:** Voided by user

**Status Transitions:**
```
Draft → Pending → Paid
           ↓
        Partial → Paid
           ↓
        Overdue → Paid
```

#### Invoice Data Model
```typescript
interface Invoice {
  id: string;
  invoice_number: string;         // Auto-generated: INV-001, INV-002
  customer: {
    name: string;
    phone?: string;
    address?: string;
  };
  line_items: Array<{
    item_name: string;
    quantity: number;
    unit_price: number;
    total: number;
  }>;
  subtotal: number;
  tax?: number;                   // Future
  discount?: number;              // Future
  total_amount: number;
  amount_paid: number;
  amount_due: number;
  status: 'draft' | 'pending' | 'partial' | 'paid' | 'overdue' | 'cancelled';
  issue_date: Date;
  due_date: Date;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}
```

#### Overdue Logic
```
IF current_date > invoice.due_date AND invoice.status != 'paid' THEN
  invoice.status = 'overdue'
  days_overdue = current_date - invoice.due_date
  
  IF days_overdue == 1 THEN
    SEND reminder_notification
  END IF
END IF
```

#### Invoice Customization Settings

**Purpose:** Allow users to customize their invoices with business branding and payment details for professional client communication.

**Location:** Settings > Business > Invoice Settings

**Features:**

1. **Logo Upload**
   - Accepts: JPG, PNG (max 2MB)
   - Displays on invoice header
   - Falls back to business name if not uploaded
   - Preview before saving

2. **Bank Account Details**
   - Bank Name (text input)
   - Account Name (text input)
   - Account Number (numeric input)
   - Toggle: Show/Hide on invoices
   - Multiple accounts (future feature)

3. **Display Options**
   - Show Business Address (toggle)
   - Show Bank Account Details (toggle)
   - Show Contact Information (default: ON)

4. **Invoice Defaults**
   - Payment Terms (days): Default 7, editable 1-90
   - Invoice Notes: Default "Thank you for your business!"
   - Custom terms and conditions (future)

5. **Invoice Preview**
   - Real-time preview of invoice with settings applied
   - Shows logo, business info, bank details, notes
   - Helps users verify information before saving

**Data Model:**
```typescript
interface InvoiceSettings {
  business_logo?: string;           // Base64 or URL
  bank_details: {
    bank_name: string;
    account_name: string;
    account_number: string;
    show_on_invoice: boolean;
  };
  display_options: {
    show_business_address: boolean;
    show_contact_info: boolean;
  };
  defaults: {
    payment_terms_days: number;     // 1-90
    invoice_notes: string;          // Max 500 chars
  };
}
```

**User Flow:**
1. User navigates to Settings
2. Selects "Invoice Settings" from Business section
3. Uploads logo (optional)
4. Enters bank account details
5. Configures display toggles
6. Sets default payment terms and notes
7. Clicks "Preview Invoice" to see sample
8. Saves settings
9. All future invoices use these settings automatically

**Benefits:**
- Professional-looking invoices build customer trust
- Easy payment with visible bank details
- Consistent branding across all invoices
- Saves time - settings applied to all invoices
- Flexibility to hide sensitive info when needed

---

## 10. Success Metrics & KPIs

### 10.1 North Star Metric
**Daily Active Users (DAU) Recording at Least 1 Transaction**

Target: 60% of registered users record ≥1 transaction per day within 30 days of signup

### 10.2 Product Metrics

#### Engagement Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| DAU/MAU Ratio | >40% | Daily/Monthly active users |
| Avg. Transactions/User/Day | 3-5 | Transaction count |
| Avg. Session Duration | 2-3 minutes | Analytics |
| Return Rate (D1) | >70% | Users who return next day |
| Return Rate (D7) | >50% | Users who return in 7 days |
| Return Rate (D30) | >35% | Users who return in 30 days |

#### Feature Adoption
| Feature | Target | Measurement |
|---------|--------|-------------|
| Sales Recording | 100% of users | At least 1 sale recorded |
| Expense Tracking | 70% of users | At least 1 expense recorded |
| Stock Management | 60% of users | Added ≥1 item |
| Invoice Creation | 40% of users | Created ≥1 invoice |
| Loan Application | 15% of eligible users | Applied for loan |

#### Gamification Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Avg. Coins Earned/User (Week 1) | 100+ | Coin transaction log |
| Users Reaching Bronze (100 coins) | 60% by Week 2 | User level distribution |
| 7-Day Streak Achievers | 40% of users | Streak tracker |
| 30-Day Streak Achievers | 15% of users | Streak tracker |
| Coin Modal Open Rate | 80% of users | Analytics event |

#### Loan Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Loan Eligibility Rate (100+ coins) | 60% by Month 1 | User coin balance |
| Loan Application Rate (eligible users) | 25% | Applications / Eligible users |
| Loan Approval Rate | 80% | Approvals / Applications |
| Loan Repayment Rate (On-time) | >90% | Payment status |
| Default Rate | <5% | Defaults / Total loans |

### 10.3 Business Metrics

#### Growth Metrics
| Metric | Month 3 | Month 6 | Month 12 |
|--------|---------|---------|----------|
| Total Registered Users | 10,000 | 50,000 | 100,000 |
| Monthly Active Users (MAU) | 6,000 | 30,000 | 65,000 |
| Total Transactions Recorded | 500K | 3M | 8M |
| Total Loans Disbursed (₦) | ₦50M | ₦300M | ₦800M |

#### Revenue Metrics (Future Monetization)
| Revenue Stream | Year 1 Target |
|----------------|---------------|
| Loan Interest Income | ₦15M |
| Premium Subscriptions | ₦5M |
| Transaction Fees (future) | ₦2M |
| Total Revenue | ₦22M |

### 10.4 User Satisfaction Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Net Promoter Score (NPS) | >50 | In-app survey |
| Customer Satisfaction (CSAT) | >4.5/5 | Post-transaction survey |
| App Store Rating | >4.5 | Play Store/App Store |
| Support Ticket Volume | <5% of MAU | Support system |
| Churn Rate | <10% monthly | Users with no activity 30 days |

---

## 11. Risks & Mitigation

### 11.1 Product Risks

#### Risk 1: Low User Adoption (High Probability, High Impact)
**Description:** Users download app but don't record transactions consistently

**Mitigation Strategies:**
- Implement aggressive onboarding with first-sale tutorial
- Daily push notifications (6 PM) if no activity
- Gamification hooks: "You're 5 coins away from Bronze tier!"
- Referral bonuses: 50 coins for inviting friend who records 10 sales
- SMS reminders for lapsed users

**Success Criteria:** >60% D7 retention

---

#### Risk 2: Gamification Fatigue (Medium Probability, Medium Impact)
**Description:** Users lose interest in earning coins after initial novelty

**Mitigation Strategies:**
- Refresh coin rewards quarterly (seasonal bonuses)
- Introduce new redemption options (cash rewards, premium features)
- Leaderboards (optional, privacy-conscious)
- Surprise bonuses for loyal users
- Evolving level system (add Levels 7-10 for power users)

**Success Criteria:** <15% drop in coin-earning activity MoM

---

#### Risk 3: Loan Default (Medium Probability, High Impact)
**Description:** Users take loans but fail to repay

**Mitigation Strategies:**
- Conservative lending: Max loan = 1.5× monthly revenue
- Behavioral scoring: Require consistent recording (30+ days)
- Grace periods for higher tiers (cushion for emergencies)
- Early repayment incentives (+150 coins)
- Partnership with debt collection agency (last resort)
- Insurance fund: 5% of interest income for defaults

**Success Criteria:** <5% default rate

---

#### Risk 4: Data Accuracy Issues (High Probability, Low Impact)
**Description:** Users enter incorrect amounts, duplicates, or fake transactions

**Mitigation Strategies:**
- Reasonable limits: Flag sales >₦500k for review
- Duplicate detection: "You recorded similar sale 2 minutes ago"
- Undo feature: 5-minute window to delete/edit transaction
- Periodic reconciliation prompts: "Does this look right?"
- Machine learning: Detect anomalies (future)

**Success Criteria:** <10% of transactions flagged/corrected

---

### 11.2 Technical Risks

#### Risk 5: Performance Degradation (Low Probability, High Impact)
**Description:** App becomes slow as transaction volume grows

**Mitigation Strategies:**
- Database indexing on frequently queried fields
- Pagination: Load 50 transactions at a time
- Image compression: Max 200KB per image
- CDN for static assets
- Regular performance audits
- Auto-scaling infrastructure

**Success Criteria:** <2s page load on 3G

---

#### Risk 6: Security Breach (Low Probability, Critical Impact)
**Description:** User data exposed or accounts compromised

**Mitigation Strategies:**
- End-to-end encryption for sensitive data
- Regular security audits (quarterly)
- Bug bounty program
- Multi-factor authentication (SMS OTP)
- Rate limiting on login attempts
- NDPR compliance review
- Incident response plan

**Success Criteria:** Zero major breaches, <0.1% account compromise rate

---

### 11.3 Market Risks

#### Risk 7: Competitor Copying Features (High Probability, Medium Impact)
**Description:** Established players (OPay, PalmPay) replicate SME Paddy features

**Mitigation Strategies:**
- First-mover advantage: Build strong brand loyalty
- Community building: WhatsApp groups, local ambassadors
- Continuous innovation: Ship features faster
- Network effects: Referral system, supplier-buyer connections (future)
- Superior UX: Maintain simplicity edge

**Success Criteria:** Maintain >20% market share in SME segment

---

#### Risk 8: Regulatory Changes (Medium Probability, High Impact)
**Description:** CBN introduces stricter lending regulations

**Mitigation Strategies:**
- Proactive engagement with regulators
- Legal counsel on retainer
- Flexible lending model (can pivot to marketplace)
- Partnership with licensed microfinance banks
- Compliance-first approach

**Success Criteria:** Full regulatory compliance, zero shutdowns

---

### 11.4 User Risks

#### Risk 9: Low Financial Literacy Barriers (High Probability, Medium Impact)
**Description:** Users struggle despite simplified language

**Mitigation Strategies:**
- Video tutorials in local languages (Yoruba, Hausa, Igbo)
- In-app chat support with human agents
- Community WhatsApp support groups
- Local agent network (future): Physical ambassadors
- Voice input option (future)

**Success Criteria:** <5% support ticket rate, >4.5 CSAT

---

#### Risk 10: Trust Issues (Medium Probability, High Impact)
**Description:** Users hesitate to share business data or take loans

**Mitigation Strategies:**
- Transparent data usage policy
- Testimonials from real users (with permission)
- Partnership with trusted brands (MTN, First Bank)
- Offline events: Business training workshops
- Money-back guarantee for premium features
- Clear communication: "We don't share your data"

**Success Criteria:** >50 NPS, >70% loan application conversion

---

## 12. Product Roadmap

### 12.1 Phase 1: MVP (Months 1-3)

**Goal:** Validate core hypothesis - Will users consistently record transactions for gamification rewards?

**Features:**
- ✅ User authentication (phone + OTP)
- ✅ Home dashboard
- ✅ Record sale (product + service)
- ✅ Record expense
- ✅ Stock management (add, view, edit)
- ✅ Transaction history
- ✅ Paddy Coin system (earning + levels)
- ✅ Basic invoices (create, view, mark paid)
- ✅ Loan system (tier display, application)
- ✅ Bottom navigation

**Success Metrics:**
- 1,000 registered users
- 60% D7 retention
- 50% of users reach Bronze tier (100 coins)
- 500 transactions recorded per day

---

### 12.2 Phase 2: Engagement & Retention (Months 4-6)

**Goal:** Increase daily usage and habit formation

**Features:**
- 📱 Push notifications (daily reminders, streak alerts)
- 🔥 Streak visualization (fire emoji on homepage)
- 📊 Weekly business summary (automated WhatsApp message)
- 👥 Customer management (save customer details, view purchase history)
- 🎁 Referral system (50 coins per successful referral)
- 🌍 Localization (Pidgin English support)
- 📸 Receipt scanning (OCR for automatic expense entry)
- ✏️ Edit/delete transactions (5-minute window)

**Success Metrics:**
- 10,000 MAU
- 70% D7 retention
- 40% users achieve 7-day streak
- 15% loan application rate

---

### 12.3 Phase 3: Monetization & Scale (Months 7-12)

**Goal:** Achieve product-market fit and revenue generation

**Features:**
- 💎 Premium subscription (₦2,000/month):
  - Advanced reports (profit trends, best customers)
  - Unlimited invoice templates
  - Priority loan approval
  - Export to Excel/PDF
  - Remove coin redemption requirements
- 💰 Loan marketplace (partner with MFBs)
- 🏦 Bank integration (auto-import transactions - future)
- 📱 WhatsApp Business integration (send invoices, payment reminders)
- 🎯 Smart alerts (predict stockouts, suggest reorder quantities)
- 👨‍👩‍👧 Multi-user support (add staff, set permissions)
- 🌐 Supplier network (connect buyers and sellers)

**Success Metrics:**
- 100,000 registered users
- 65,000 MAU
- ₦500M loans disbursed
- 5,000 premium subscribers (₦10M MRR)
- <5% loan default rate

---

### 12.4 Phase 4: Ecosystem (Year 2+)

**Goal:** Build comprehensive SME ecosystem

**Features:**
- 🏪 SME Marketplace (buy/sell directly on platform)
- 📚 Business training (video courses, certifications)
- 💳 SME Paddy Card (virtual debit card for business expenses)
- 🚚 Logistics integration (delivery partners)
- 📄 Government integration (business registration, tax filing)
- 🌍 Regional expansion (Ghana, Kenya, South Africa)
- 🤝 B2B features (bulk ordering, trade credit)
- 🎓 Paddy Academy (certified business management courses)

**Success Metrics:**
- 1M registered users
- ₦5B loans disbursed
- ₦100M ARR
- Breakeven or profitability

---

## 13. Appendices

### 13.1 Glossary

| Term | Definition |
|------|------------|
| **DAU** | Daily Active Users - Users who open app and perform action daily |
| **MAU** | Monthly Active Users - Unique users in a 30-day period |
| **Paddy** | Nigerian slang for "friend" or "buddy" |
| **Paddy Coins** | In-app gamification currency |
| **SME** | Small and Medium Enterprise |
| **MSME** | Micro, Small, and Medium Enterprise |
| **OPay/PalmPay** | Popular Nigerian fintech apps |
| **NEPA** | Nigerian Electric Power Authority (colloquial for electricity) |
| **Mama/Bro/Aunty** | Common respectful terms in Nigerian English |
| **NDPR** | Nigeria Data Protection Regulation |
| **CBN** | Central Bank of Nigeria |
| **MFB** | Microfinance Bank |

### 13.2 Competitive Analysis

#### Direct Competitors

**1. Pocketbook (Ghana)**
- Strengths: Established brand, invoice features
- Weaknesses: Not Nigeria-focused, no gamification
- Differentiation: SME Paddy has coin-based loans

**2. Kippa**
- Strengths: Nigeria-focused, simple bookkeeping
- Weaknesses: Limited lending, less engaging
- Differentiation: SME Paddy has superior gamification

**3. Accounteer**
- Strengths: Comprehensive accounting features
- Weaknesses: Too complex for low-literacy users
- Differentiation: SME Paddy is radically simpler

#### Indirect Competitors

**4. OPay/PalmPay (Fintech Apps)**
- Strengths: High trust, massive user base
- Weaknesses: Not SME-focused, no business tracking
- Opportunity: Partner for payment processing

**5. WhatsApp Business**
- Strengths: Universal adoption, free
- Weaknesses: Manual tracking, no analytics
- Differentiation: SME Paddy automates what WhatsApp can't

### 13.3 Technical Constraints

**Device Support:**
- Minimum: Android 6.0 (Marshmallow)
- RAM: 1GB minimum
- Storage: 50MB app size
- Screen: 320px minimum width

**Network:**
- Works on 3G (minimum)
- Offline mode (future): Cache last 100 transactions
- Maximum API response: 3 seconds

**Browser Support (PWA):**
- Chrome 80+
- Safari 13+
- Firefox 75+

### 13.4 Privacy & Data Protection

**Data Collection:**
- **Minimal Collection:** Only business data, no government IDs
- **User Consent:** Clear opt-in for data usage
- **Right to Delete:** Users can export and delete all data
- **Data Retention:** Transactions kept indefinitely (unless user deletes)

**NDPR Compliance:**
- Privacy policy in plain English
- Data protection officer appointed
- Incident response within 72 hours
- Annual compliance audit

**Data Usage:**
- Improve product features
- Loan risk assessment (anonymous aggregation)
- Marketing (opt-in only)
- No selling to third parties

### 13.5 Support & Documentation

**User Support Channels:**
- In-app chat (WhatsApp Business integration)
- Email: support@smepaddy.ng
- Phone: +234-XXX-XXXX (business hours)
- FAQ/Help Center (in-app)
- Video tutorials (YouTube channel)

**Developer Documentation:**
- API documentation (future: third-party integrations)
- Webhook specifications
- SDK for partner apps

### 13.6 Localization Plan

**Language Support (Priority Order):**
1. ✅ English (Nigerian English) - MVP
2. 📅 Pidgin English - Phase 2
3. 📅 Yoruba - Phase 3
4. 📅 Hausa - Phase 3
5. 📅 Igbo - Phase 3

**Cultural Adaptations:**
- Currency: Naira (₦) only initially
- Date format: DD/MM/YYYY
- Phone format: +234-XXX-XXX-XXXX
- Payment methods: Cash, mobile money, bank transfer

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Dec 15, 2024 | Product Team | Initial PRD - MVP specification |

---

## Approval & Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Manager | | | |
| Engineering Lead | | | |
| Design Lead | | | |
| Business Owner | | | |

---

**End of Product Requirements Document**