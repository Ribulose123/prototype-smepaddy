# SME Paddy - Quick Reference Guide

**Version:** 2.0.0  
**Last Updated:** January 7, 2026

---

## 🚀 Quick Access

### Admin Portal
- **Desktop**: Click "Admin Portal" button in sidebar (below profile)
- **Mobile**: More → Support → Admin Portal
- **URL**: `/admin`

### Support Tickets
- **Desktop**: Blue help button (bottom-right) OR More page
- **Mobile**: More → Help & Support

---

## 🔑 Demo Credentials

### Admin Logins
```
Super Admin:
Email: admin@smepaddy.com
Password: admin123

Support Admin:
Email: support@smepaddy.com
Password: support123

Finance Admin:
Email: finance@smepaddy.com
Password: finance123
```

### Keyword Detection (Development)
- Email contains "admin" → Super Admin
- Email contains "support" → Support Admin
- Email contains "finance" → Finance Admin

---

## 🎯 Feature Matrix

### Admin Roles & Permissions

| Feature | Super Admin | Support Admin | Finance Admin |
|---------|-------------|---------------|---------------|
| Dashboard | ✅ Full | 👁️ View | 👁️ View |
| Users & Businesses | ✅ Full | 👁️ View | ❌ No |
| Transactions | ✅ Full | ❌ No | ✅ Full |
| Gamification | ✅ Full | ❌ No | ✅ Full |
| Support Desk | ✅ Full | ✅ Full | ❌ No |
| Categories | ✅ Full | 👁️ View | 👁️ View |
| Settings | ✅ Full | ❌ No | ❌ No |

---

## 📋 Component Locations

### Admin Components
```
/components/admin/
├── AdminLayout.tsx              # Main layout
├── AdminAuthPage.tsx            # Login page
├── AdminDashboardPage.tsx       # Dashboard
├── AdminUsersPage.tsx           # User management
├── AdminTransactionsPage.tsx    # Transactions
├── AdminGamificationPage.tsx    # Gamification
├── AdminSupportPage.tsx         # Support desk
├── AdminBusinessCategoriesPage.tsx  # Categories
└── AdminSettingsPage.tsx        # Settings
```

### User-Facing Components
```
/components/
├── SupportTicketModal.tsx       # Support form
├── HelpButton.tsx               # Floating help
├── MorePage.tsx                 # More menu
└── ...
```

---

## 🗄️ Database Tables

### New Tables (v2.0)
```sql
support_tickets          # User support requests
  - ticket_number (TKT-YYYY-XXX)
  - user_id, business_name, owner_name
  - subject, category, priority, status
  - assigned_to, resolved_at

ticket_replies          # Support conversations
  - ticket_id, from_user_id, from_admin_id
  - message, is_admin_reply

business_categories     # Dynamic categories
  - value, label, is_active
  - usage_count

admin_users            # Admin accounts
  - email, password_hash
  - full_name, role
  - is_active, last_login

admin_audit_logs       # Action tracking
  - admin_id, admin_email, admin_role
  - action, details
  - ip_address
```

---

## 🔗 API Endpoints

### Support Tickets
```
POST   /api/v1/support/tickets           # Submit ticket
GET    /api/v1/support/tickets           # Get user's tickets
GET    /api/v1/admin/support/tickets     # All tickets (admin)
PATCH  /api/v1/admin/support/tickets/:id # Update ticket
POST   /api/v1/admin/support/tickets/:id/replies  # Reply
```

### Admin Portal
```
POST   /api/v1/admin/auth/login          # Admin login
GET    /api/v1/admin/dashboard/stats     # Dashboard data
GET    /api/v1/admin/users               # All users
PATCH  /api/v1/admin/users/:id           # Update user
```

### Business Categories
```
GET    /api/v1/admin/categories          # All categories
POST   /api/v1/admin/categories          # Create category
PATCH  /api/v1/admin/categories/:id      # Update category
DELETE /api/v1/admin/categories/:id      # Delete category
```

---

## 🎨 Design Tokens

### Admin Portal Colors
```css
Primary: Purple/Indigo Gradient
bg-purple-50, bg-purple-600, bg-indigo-600

Accents:
Blue (info): bg-blue-50, text-blue-600
Green (success): bg-green-50, text-green-600
Red (danger): bg-red-50, text-red-600
Yellow (warning): bg-yellow-50, text-yellow-600
```

### User App Colors
```css
Primary: Blue
bg-blue-50, bg-blue-600

Status Colors:
Success: bg-green-50, text-green-600
Error: bg-red-50, text-red-600
Warning: bg-yellow-50, text-yellow-600
```

---

## 📱 Responsive Breakpoints

```css
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px

Admin Portal: Desktop-optimized (>= 1024px)
User App: Mobile-first (all sizes)
```

---

## 🔐 Security Notes

### Admin Authentication
- Separate from user authentication
- JWT-based with refresh tokens
- Session timeout: 60 minutes (configurable)
- IP tracking for all actions

### Role-Based Access
- Enforced at route level
- Enforced at component level
- Enforced at API level
- Audit logged for compliance

### Data Protection
- View-only for most roles
- Confirmation dialogs for destructive actions
- Usage validation before deletion
- Encrypted passwords (bcrypt)

---

## 🧪 Testing Checklist

### Admin Portal
- [ ] Login with all three roles
- [ ] Navigate to all sections
- [ ] Test role-based restrictions
- [ ] Submit forms successfully
- [ ] Search and filter work
- [ ] Export data functions
- [ ] Audit logs populate

### Support System
- [ ] Submit ticket on mobile
- [ ] Submit ticket on desktop
- [ ] Floating button appears (desktop)
- [ ] Form validation works
- [ ] Ticket number generated
- [ ] Success message shown

### Categories
- [ ] View all categories
- [ ] Add new category
- [ ] Edit existing category
- [ ] Toggle active/inactive
- [ ] Delete unused category
- [ ] Cannot delete used category
- [ ] Search works correctly

---

## 📚 Documentation Map

### For Product Team
- **PRD.md** - Product requirements and features
- **UPDATE_SUMMARY_JAN_2026.md** - What's new in v2.0

### For Developers
- **ARCHITECTURE.md** - Technical architecture
- **IMPLEMENTATION_SUMMARY.md** - Implementation details
- **CHANGELOG.md** - Version history

### For Admins
- **ADMIN_README.md** - Complete admin guide
- **ADMIN_ACCESS_GUIDE.md** - Quick access instructions
- **QUICK_REFERENCE.md** - This document

---

## 🐛 Common Issues & Solutions

### Admin Login Issues
**Issue**: Can't login with demo credentials  
**Solution**: Ensure email contains keyword (admin/support/finance)

**Issue**: Redirected after login  
**Solution**: Check role permissions for current page

### Support Ticket Submission
**Issue**: Form won't submit  
**Solution**: Check all required fields are filled

**Issue**: Modal won't close  
**Solution**: Click X button or outside modal area

### Category Management
**Issue**: Can't delete category  
**Solution**: Check if category has usage_count > 0

**Issue**: Can't edit category  
**Solution**: Check if user is Super Admin

---

## 💡 Tips & Best Practices

### For Admins
1. Use search before browsing large lists
2. Check audit logs regularly
3. Respond to high priority tickets first
4. Export data before major changes
5. Document reasons for user suspensions

### For Developers
1. Follow existing component patterns
2. Update documentation when adding features
3. Test with all admin roles
4. Use TypeScript types consistently
5. Keep mock data realistic

### For Support Team
1. Categorize tickets correctly
2. Update ticket status promptly
3. Include details in replies
4. Check ticket history before responding
5. Mark resolved tickets as closed

---

## 🔄 Version History

- **v2.0.0** (Jan 7, 2026) - Admin portal, support system, categories
- **v1.0.0** (Dec 15, 2024) - Initial MVP release

---

## 📞 Need Help?

### Documentation
- Full Admin Guide: `/ADMIN_README.md`
- Technical Docs: `/ARCHITECTURE.md`
- Product Specs: `/PRD.md`

### Contact
- Development Team: dev@smepaddy.com
- Product Team: product@smepaddy.com
- Support: support@smepaddy.com

---

**Quick Reference Guide v2.0**  
*Always up-to-date with latest release*
