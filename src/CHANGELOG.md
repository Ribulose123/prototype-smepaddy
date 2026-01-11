# Changelog
All notable changes to SME Paddy will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-01-07

### Added

#### Admin Portal
- **Complete admin dashboard** with platform statistics and metrics
- **Role-based access control** with three admin types:
  - Super Admin (full access)
  - Support Admin (users, support, categories view-only)
  - Finance Admin (transactions, gamification, categories view-only)
- **User Management Page** with search, filter, suspend/activate capabilities
- **Transaction Monitoring** with filtering and analytics
- **Gamification Controls** to configure coin rewards and tier requirements
- **Support Desk** for managing user support tickets
- **Business Categories Management** for dynamic category control
- **Settings Page** with platform configuration and audit logs
- **Admin authentication system** separate from user authentication
- **Audit logging** for all admin actions with IP tracking
- **Access via**:
  - Desktop: Admin Portal button in sidebar
  - Mobile: More page → Support section → Admin Portal
  - Direct URL: `/admin`

#### Support Ticket System
- **User-facing support ticket submission** accessible from:
  - Mobile: More page → Help & Support
  - Desktop: Floating help button (bottom-right corner) + More page
- **Complete ticket form** with:
  - Auto-filled business and owner information
  - Contact email field
  - Subject and detailed message
  - Category selection (7 categories)
  - Priority levels (Low, Medium, High, Urgent)
- **Unique ticket number generation** (TKT-YYYY-XXX format)
- **Success confirmation** with ticket number and 24-hour response message
- **Floating help button** on desktop (always visible, bottom-right corner)
- **Responsive design** for both mobile and desktop

#### Business Categories Management
- **Admin interface** to manage categories shown during user onboarding
- **Category operations**:
  - View all categories with usage statistics
  - Add new categories (value + display label)
  - Edit existing categories (inline editing)
  - Toggle active/inactive status
  - Delete categories (only if not in use)
- **Search and filter** functionality
- **Usage protection** prevents deletion/deactivation of categories in use
- **Statistics dashboard** showing total, active, and usage metrics
- **Role-based permissions**:
  - Super Admin: Full management access
  - Support/Finance Admin: View-only access

### Changed
- **App.tsx** updated to include admin mode state and routing
- **MorePage.tsx** enhanced with support ticket access
- **Desktop sidebar** now includes Admin Portal access button
- **Component structure** reorganized with `/admin` subdirectory

### Technical
- Added 5 new database tables:
  - `support_tickets`
  - `ticket_replies`
  - `business_categories`
  - `admin_users`
  - `admin_audit_logs`
- Added 15+ new API endpoints for admin and support features
- Created 9 new admin components
- Created 2 new user-facing components (SupportTicketModal, HelpButton)
- Updated data relationships and schemas

### Documentation
- **PRD.md** updated to version 2.0
  - Added FR-015: Support Ticket System
  - Added FR-016: Admin Portal
  - Added FR-017: Business Categories Management
- **ARCHITECTURE.md** updated to version 2.0
  - Added admin component structure
  - Added new database schemas
  - Added new API endpoints
  - Updated data relationships
- **IMPLEMENTATION_SUMMARY.md** updated to version 2.0
  - Added comprehensive admin implementation details
  - Added support system implementation
  - Added technical architecture updates
- **CHANGELOG.md** created to track all changes

---

## [1.0.0] - 2024-12-15

### Added
- Initial SME Paddy MVP release
- User authentication with phone + 6-digit PIN
- Mandatory 3-step profile setup for new users
- Dashboard with business overview
- Transaction recording (sales and expenses)
- Stock/inventory management
- Invoice creation and management
- Business loans with 6-tier system
- Paddy Coins gamification system
- Reports and analytics
- Tax filing features
- Settings and profile management
- Responsive mobile-first design
- Nigerian-specific features (Naira currency, local business categories)

### Components
- AuthPage with phone verification flow
- ProfileSetupPage (3-step onboarding)
- HomePage with dashboard
- TransactionsPage with Money In/Out tracking
- StockPage for inventory management
- InvoicesPage with creation and tracking
- LoansPage with tier-based lending
- ReportsPage with analytics
- SettingsPage with profile and security
- TaxFilingPage with Nigerian tax compliance
- MorePage for additional features

### Features
- **Gamification**: 
  - 6 user tiers (Bronze to Diamond)
  - Coin rewards for business activities
  - Progress tracking and streaks
- **Loans**: 
  - Tier-based loan limits (₦50k to ₦1M)
  - Automated eligibility checking
  - Interest rate calculation (2.5% - 5%)
- **Invoices**:
  - Professional invoice generation
  - Payment status tracking
  - Customizable invoice settings
- **Reports**:
  - Sales vs Expenses charts
  - Money flow tracking
  - Top products analytics
  - Monthly comparisons

### Design System
- OPay/PalmPay-inspired interface
- Calming blues and soft greys color scheme
- Bold, touch-friendly buttons
- Zero financial jargon (plain Nigerian English)
- 1-2 click maximum for all actions

### Technical Foundation
- React with TypeScript
- Tailwind CSS v4
- Recharts for data visualization
- Lucide React for icons
- Mobile-first responsive design
- Local state management
- Mock data layer for development

### Documentation
- PRD.md (Product Requirements Document)
- ARCHITECTURE.md (Technical Architecture)
- IMPLEMENTATION_SUMMARY.md (Implementation Details)
- ADMIN_README.md (Admin Portal Guide)
- ADMIN_ACCESS_GUIDE.md (Quick Access Guide)

---

## Future Releases

### Planned for 2.1.0
- [ ] Real-time notifications system
- [ ] Email notifications for support tickets
- [ ] Bulk user operations (admin)
- [ ] Advanced filtering and export features
- [ ] Mobile admin app considerations

### Planned for 2.2.0
- [ ] Multi-language support (Pidgin, Hausa, Yoruba, Igbo)
- [ ] WhatsApp integration for support
- [ ] SMS notifications
- [ ] Offline mode support
- [ ] Progressive Web App (PWA) features

### Planned for 3.0.0
- [ ] Multi-user business accounts (owner + employees)
- [ ] POS integration
- [ ] Payment gateway integration
- [ ] Bank account connection
- [ ] Automated bookkeeping
- [ ] AI-powered insights

---

**Maintained by:** SME Paddy Development Team  
**Last Updated:** January 7, 2026
