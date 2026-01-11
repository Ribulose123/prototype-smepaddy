import { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Database, 
  Bell, 
  Globe,
  Save,
  Activity,
  Clock,
  User,
  FileText,
  Download
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type AdminRole = 'super_admin' | 'support_admin' | 'finance_admin';

interface AdminSettingsPageProps {
  role: AdminRole;
}

interface AuditLog {
  id: string;
  admin: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export function AdminSettingsPage({ role }: AdminSettingsPageProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications' | 'audit'>('general');

  // General Settings
  const [platformName, setPlatformName] = useState('SME Paddy');
  const [supportEmail, setSupportEmail] = useState('support@smepaddy.com');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Security Settings
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState('');

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [criticalAlerts, setCriticalAlerts] = useState(true);

  // Audit Logs
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      admin: 'Super Admin',
      action: 'Updated Coin Settings',
      details: 'Changed sale transaction reward from 10 to 15 coins',
      timestamp: '2025-01-07T14:30:00',
      ipAddress: '197.210.55.123',
    },
    {
      id: '2',
      admin: 'Support Admin',
      action: 'Resolved Support Ticket',
      details: 'Ticket #TKT-2025-003 - How to add products',
      timestamp: '2025-01-07T11:00:00',
      ipAddress: '197.210.55.124',
    },
    {
      id: '3',
      admin: 'Super Admin',
      action: 'Suspended User Account',
      details: 'Suspended Tech Repairs Hub for policy violation',
      timestamp: '2025-01-07T09:15:00',
      ipAddress: '197.210.55.123',
    },
    {
      id: '4',
      admin: 'Finance Admin',
      action: 'Updated Loan Limits',
      details: 'Increased Gold level loan limit to ₦400,000',
      timestamp: '2025-01-06T16:45:00',
      ipAddress: '197.210.55.125',
    },
    {
      id: '5',
      admin: 'Super Admin',
      action: 'Exported User Data',
      details: 'Downloaded all user data for Q4 2024 report',
      timestamp: '2025-01-06T10:20:00',
      ipAddress: '197.210.55.123',
    },
    {
      id: '6',
      admin: 'Support Admin',
      action: 'Updated Support Ticket',
      details: 'Ticket #TKT-2025-002 status changed to In Progress',
      timestamp: '2025-01-05T14:30:00',
      ipAddress: '197.210.55.124',
    },
  ];

  const handleSaveGeneral = () => {
    toast.success('General settings saved successfully');
  };

  const handleSaveSecurity = () => {
    toast.success('Security settings saved successfully');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification settings saved successfully');
  };

  const handleExportAuditLogs = () => {
    toast.success('Audit logs exported successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div>
          <h1 className="text-gray-900 text-2xl font-bold mb-1">Platform Settings</h1>
          <p className="text-gray-600">Configure platform settings and view audit logs</p>
        </div>
      </div>

      <div className="p-8">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('general')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors border-b-2 ${
                  activeTab === 'general'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>General</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors border-b-2 ${
                  activeTab === 'security'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span>Security</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors border-b-2 ${
                  activeTab === 'notifications'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </button>

              <button
                onClick={() => setActiveTab('audit')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors border-b-2 ${
                  activeTab === 'audit'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Activity className="w-5 h-5" />
                <span>Audit Logs</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Platform Name</label>
                      <input
                        type="text"
                        value={platformName}
                        onChange={(e) => setPlatformName(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={role !== 'super_admin'}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Support Email</label>
                      <input
                        type="email"
                        value={supportEmail}
                        onChange={(e) => setSupportEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={role !== 'super_admin'}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <div>
                        <p className="text-gray-900 font-semibold">Maintenance Mode</p>
                        <p className="text-gray-600 text-sm">Temporarily disable user access for maintenance</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={maintenanceMode}
                          onChange={(e) => setMaintenanceMode(e.target.checked)}
                          className="sr-only peer"
                          disabled={role !== 'super_admin'}
                        />
                        <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  {role === 'super_admin' && (
                    <button
                      onClick={handleSaveGeneral}
                      className="mt-6 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        value={sessionTimeout}
                        onChange={(e) => setSessionTimeout(parseInt(e.target.value))}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={role !== 'super_admin'}
                      />
                      <p className="text-gray-600 text-sm mt-2">Admin sessions will timeout after this period of inactivity</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-gray-900 font-semibold">Two-Factor Authentication</p>
                        <p className="text-gray-600 text-sm">Require 2FA for all admin accounts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={twoFactorAuth}
                          onChange={(e) => setTwoFactorAuth(e.target.checked)}
                          className="sr-only peer"
                          disabled={role !== 'super_admin'}
                        />
                        <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">IP Whitelist</label>
                      <textarea
                        value={ipWhitelist}
                        onChange={(e) => setIpWhitelist(e.target.value)}
                        placeholder="Enter allowed IP addresses (one per line)"
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        disabled={role !== 'super_admin'}
                      />
                      <p className="text-gray-600 text-sm mt-2">Only these IP addresses can access the admin panel</p>
                    </div>
                  </div>

                  {role === 'super_admin' && (
                    <button
                      onClick={handleSaveSecurity}
                      className="mt-6 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-4">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-gray-900 font-semibold">Email Notifications</p>
                        <p className="text-gray-600 text-sm">Receive email alerts for important events</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={emailNotifications}
                          onChange={(e) => setEmailNotifications(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-gray-900 font-semibold">Slack Notifications</p>
                        <p className="text-gray-600 text-sm">Send alerts to Slack workspace</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={slackNotifications}
                          onChange={(e) => setSlackNotifications(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
                      <div>
                        <p className="text-gray-900 font-semibold">Critical Alerts</p>
                        <p className="text-gray-600 text-sm">Always notify for critical system issues</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={criticalAlerts}
                          onChange={(e) => setCriticalAlerts(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveNotifications}
                    className="mt-6 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Audit Logs */}
            {activeTab === 'audit' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-900 font-bold text-lg">Audit Logs</h3>
                    <p className="text-gray-600 text-sm">Track all admin actions and system changes</p>
                  </div>
                  <button
                    onClick={handleExportAuditLogs}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Logs</span>
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Timestamp</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Admin</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Details</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">IP Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-white transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>{new Date(log.timestamp).toLocaleString()}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-900 font-semibold text-sm">{log.admin}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Activity className="w-4 h-4 text-blue-600" />
                              <span className="text-gray-900 font-medium text-sm">{log.action}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-gray-700 text-sm">{log.details}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-gray-600 text-sm font-mono">{log.ipAddress}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-gray-900 font-semibold">Audit logs are immutable</p>
                      <p className="text-gray-600 text-sm">All admin actions are permanently recorded for security and compliance</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
