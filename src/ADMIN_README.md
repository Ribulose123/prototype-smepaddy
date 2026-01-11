# SME Paddy Admin Portal

## Overview
The SME Paddy Admin Portal is a comprehensive administrative dashboard for managing the SME Paddy platform. It provides tools for monitoring users, transactions, support tickets, gamification settings, and system configuration.

## Accessing the Admin Portal

### Demo Access
To access the admin portal in demo mode:
1. Navigate to `/admin` in your browser
2. Use any email containing one of these keywords:
   - `super` - for Super Admin access (full permissions)
   - `support` - for Support Admin access (users and support desk)
   - `finance` - for Finance Admin access (transactions and gamification)

Examples:
- `super@smepaddy.com` - Super Admin
- `support@smepaddy.com` - Support Admin
- `finance@smepaddy.com` - Finance Admin

Any password will work in demo mode.

## Admin Roles

### Super Admin
**Full access to all features:**
- Dashboard with platform-wide analytics
- User & Business Management (view, suspend, activate)
- Transaction Monitoring
- Gamification Configuration (coin rewards, level thresholds, loan limits)
- Support Desk Management
- Platform Settings (general, security, notifications)
- Audit Logs

### Support Admin
**Limited to user support functions:**
- Dashboard (read-only)
- User & Business Management (view only)
- Support Desk (full access to respond to tickets)
- Business Categories (view-only)

### Finance Admin
**Limited to financial features:**
- Dashboard (read-only)
- Transaction Monitoring
- Gamification Settings (view and adjust rewards)
- Business Categories (view-only)

## Features

### 1. Dashboard
- Real-time platform statistics
- User growth metrics
- Transaction volume tracking
- System health monitoring
- Recent activity feed
- Top performing businesses

### 2. Users & Businesses
- Search and filter users by status, category, location
- View detailed user profiles
- Monitor user activity and engagement
- Suspend or activate user accounts
- Export user data
- Track user levels and Paddy Coins

### 3. Transaction Monitoring
- Real-time transaction tracking
- Filter by type (Money In/Money Out)
- Search by business, transaction ID, or description
- View transaction details
- Financial overview (total sales, expenses, net flow)
- Export transaction data

### 4. Gamification Management
- Configure Paddy Coin rewards for all actions
- Set level thresholds (Bronze, Silver, Gold, Platinum, Diamond)
- Manage loan limits per level
- View level distribution across platform
- Monitor recent achievements
- Track total coins issued

### 5. Support Desk
- View and manage all support tickets
- Filter by status (Open, In Progress, Resolved, Closed)
- Filter by priority (Low, Medium, High, Urgent)
- Respond to user inquiries
- Update ticket status
- View conversation history
- Track average response time

### 6. Business Categories Management
**View & Manage Categories:**
- See all business categories used during user onboarding
- View usage statistics (how many businesses use each category)
- Search and filter categories
- Real-time statistics (total, active, usage)

**Category Operations (Super Admin Only):**
- **Add new categories** with custom value and display label
- **Edit existing categories** (inline editing)
- **Toggle active/inactive status** (with usage protection)
- **Delete categories** (only if no businesses are using it)

**Protection Features:**
- Cannot deactivate categories with active users
- Cannot delete categories with any usage
- Confirmation dialogs for destructive actions
- View-only access for Support and Finance Admins

### 7. Settings & Audit Logs
**General Settings:**
- Platform name
- Support email
- Maintenance mode toggle

**Security Settings:**
- Session timeout configuration
- Two-factor authentication
- IP whitelist

**Notification Settings:**
- Email notifications
- Slack integration
- Critical alerts

**Audit Logs:**
- Complete history of all admin actions
- Timestamp and IP tracking
- Immutable logging for compliance
- Export capability

## Design Principles

The admin portal follows the same design principles as the main SME Paddy app:
- **Simple & Intuitive**: Easy to navigate with clear visual hierarchy
- **Calming Colors**: Purple/indigo gradient for admin branding
- **Touch-Friendly**: Large buttons and controls (mobile-responsive)
- **Real-time Feedback**: Toast notifications for all actions
- **Role-Based Access**: Only show features relevant to admin role

## Technical Implementation

### Components Structure
```
/components/admin/
├── AdminAuthPage.tsx              # Admin login
├── AdminLayout.tsx                # Navigation and layout
├── AdminDashboardPage.tsx         # Main dashboard
├── AdminUsersPage.tsx             # User management
├── AdminTransactionsPage.tsx      # Transaction monitoring
├── AdminGamificationPage.tsx      # Gamification settings
├── AdminSupportPage.tsx           # Support desk
├── AdminBusinessCategoriesPage.tsx # Business categories management
└── AdminSettingsPage.tsx          # Settings and audit logs
```

### State Management
- Uses React hooks for local state
- Role-based rendering throughout
- Mock data for demonstration (would connect to API in production)

### Security Features
- Role-based access control (RBAC)
- Session management
- IP whitelisting capability
- Two-factor authentication option
- Comprehensive audit logging

## Future Enhancements

1. **Analytics Dashboard**: Advanced charts and insights
2. **Bulk Operations**: Mass user updates, bulk notifications
3. **Report Generation**: Automated reports and exports
4. **API Integration**: Connect to real backend services
5. **Real-time Updates**: WebSocket for live data
6. **Advanced Filtering**: Date ranges, custom filters
7. **User Communication**: Direct messaging to users
8. **Automated Actions**: Rules and workflows

## Notes

- All admin actions are logged for security and compliance
- The admin portal is separate from the main user app
- Admins cannot access user accounts directly (view only)
- All sensitive data is properly secured (in production)
- Demo mode uses mock data for demonstration purposes
