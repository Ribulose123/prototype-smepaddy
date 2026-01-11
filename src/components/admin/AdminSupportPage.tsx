import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  X,
  Send,
  ChevronDown,
  User,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type AdminRole = 'super_admin' | 'support_admin' | 'finance_admin';

interface AdminSupportPageProps {
  role: AdminRole;
}

interface SupportTicket {
  id: string;
  ticketNumber: string;
  businessName: string;
  ownerName: string;
  email: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  message: string;
  createdAt: string;
  lastUpdated: string;
  assignedTo?: string;
  replies: Array<{
    from: string;
    message: string;
    timestamp: string;
    isAdmin: boolean;
  }>;
}

export function AdminSupportPage({ role }: AdminSupportPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'in_progress' | 'resolved' | 'closed'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high' | 'urgent'>('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock support tickets
  const tickets: SupportTicket[] = [
    {
      id: '1',
      ticketNumber: 'TKT-2025-001',
      businessName: 'Mama Ngozi Provisions',
      ownerName: 'Ngozi Okafor',
      email: 'ngozi@gmail.com',
      subject: 'Cannot generate invoice',
      category: 'Technical Issue',
      priority: 'high',
      status: 'open',
      message: 'I am trying to create an invoice for my customer but the system keeps showing an error. Please help urgently as I need to send this invoice today.',
      createdAt: '2025-01-07T14:30:00',
      lastUpdated: '2025-01-07T14:30:00',
      replies: [],
    },
    {
      id: '2',
      ticketNumber: 'TKT-2025-002',
      businessName: 'Chidi Electronics',
      ownerName: 'Chidi Okonkwo',
      email: 'chidi@yahoo.com',
      subject: 'Question about loan application',
      category: 'Loan Inquiry',
      priority: 'medium',
      status: 'in_progress',
      message: 'I want to apply for a business loan. What are the requirements and how long does approval take?',
      createdAt: '2025-01-06T10:15:00',
      lastUpdated: '2025-01-07T09:20:00',
      assignedTo: 'Support Admin',
      replies: [
        {
          from: 'Support Admin',
          message: 'Hello Chidi! Thank you for reaching out. To apply for a loan, you need to be at least Silver level. Your current level is Platinum, so you qualify! The approval process typically takes 1-2 business days.',
          timestamp: '2025-01-07T09:20:00',
          isAdmin: true,
        },
      ],
    },
    {
      id: '3',
      ticketNumber: 'TKT-2025-003',
      businessName: 'Ada Fashion Boutique',
      ownerName: 'Ada Uche',
      email: 'ada.fashion@gmail.com',
      subject: 'How to add products to inventory',
      category: 'How-To',
      priority: 'low',
      status: 'resolved',
      message: 'I am new to the app and need help understanding how to add products to my inventory. Can you guide me?',
      createdAt: '2025-01-05T16:45:00',
      lastUpdated: '2025-01-06T11:30:00',
      assignedTo: 'Support Admin',
      replies: [
        {
          from: 'Support Admin',
          message: 'Hello Ada! Welcome to SME Paddy. To add products: 1) Go to Stock & Items page, 2) Click "Add New Item", 3) Fill in product details like name, price, and quantity. You can also add photos!',
          timestamp: '2025-01-06T11:00:00',
          isAdmin: true,
        },
        {
          from: 'Ada Uche',
          message: 'Thank you so much! I was able to add my products successfully.',
          timestamp: '2025-01-06T11:30:00',
          isAdmin: false,
        },
      ],
    },
    {
      id: '4',
      ticketNumber: 'TKT-2025-004',
      businessName: 'Ibrahim General Store',
      ownerName: 'Ibrahim Musa',
      email: 'ibrahim@hotmail.com',
      subject: 'Account suspended unexpectedly',
      category: 'Account Issue',
      priority: 'urgent',
      status: 'open',
      message: 'My account was suspended this morning without any warning. I have not violated any terms. Please restore my access immediately.',
      createdAt: '2025-01-07T08:20:00',
      lastUpdated: '2025-01-07T08:20:00',
      replies: [],
    },
    {
      id: '5',
      ticketNumber: 'TKT-2025-005',
      businessName: 'Blessing Beauty Palace',
      ownerName: 'Blessing James',
      email: 'blessing@gmail.com',
      subject: 'Paddy Coins not adding up correctly',
      category: 'Rewards Issue',
      priority: 'medium',
      status: 'in_progress',
      message: 'I completed 5 transactions today but only received coins for 3 of them. Can you check my account?',
      createdAt: '2025-01-06T14:10:00',
      lastUpdated: '2025-01-06T15:45:00',
      assignedTo: 'Finance Admin',
      replies: [],
    },
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedTicket) return;
    
    toast.success('Reply sent successfully');
    setReplyMessage('');
  };

  const handleUpdateStatus = (ticketId: string, newStatus: SupportTicket['status']) => {
    toast.success(`Ticket status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-700';
      case 'in_progress':
        return 'bg-amber-100 text-amber-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const stats = {
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    avgResponseTime: '2.5 hours',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-gray-900 text-2xl font-bold mb-1">Support Desk</h1>
            <p className="text-gray-600">Manage user inquiries and support tickets</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tickets by business, user, or subject..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Filters</span>
            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'open', 'in_progress', 'resolved', 'closed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterStatus === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {status === 'all' ? 'All' : status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Priority</label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'low', 'medium', 'high', 'urgent'].map((priority) => (
                    <button
                      key={priority}
                      onClick={() => setFilterPriority(priority as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filterPriority === priority
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="px-8 py-6 bg-white border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 text-sm font-semibold">Open</span>
            </div>
            <p className="text-blue-600 text-2xl font-bold">{stats.open}</p>
          </div>

          <div className="bg-amber-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span className="text-gray-700 text-sm font-semibold">In Progress</span>
            </div>
            <p className="text-amber-600 text-2xl font-bold">{stats.inProgress}</p>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 text-sm font-semibold">Resolved</span>
            </div>
            <p className="text-green-600 text-2xl font-bold">{stats.resolved}</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700 text-sm font-semibold">Avg Response</span>
            </div>
            <p className="text-purple-600 text-2xl font-bold">{stats.avgResponseTime}</p>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="divide-y divide-gray-100">
            {filteredTickets.map((ticket) => (
              <div 
                key={ticket.id} 
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gray-500 text-sm font-mono">{ticket.ticketNumber}</span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                        {ticket.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-gray-900 font-bold text-lg mb-1">{ticket.subject}</h3>
                    <p className="text-gray-600 text-sm mb-2">{ticket.message.substring(0, 150)}...</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{ticket.businessName} ({ticket.ownerName})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(ticket.createdAt).toLocaleString()}</span>
                      </div>
                      {ticket.assignedTo && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold">
                          Assigned to {ticket.assignedTo}
                        </span>
                      )}
                    </div>
                  </div>
                  {ticket.priority === 'urgent' && (
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 ml-4" />
                  )}
                </div>

                {ticket.replies.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-gray-600 text-sm">
                      {ticket.replies.length} {ticket.replies.length === 1 ? 'reply' : 'replies'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredTickets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No support tickets found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-t-3xl flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{selectedTicket.subject}</h2>
                <p className="text-blue-100 text-sm">{selectedTicket.ticketNumber}</p>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ticket Info */}
            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Status</p>
                  <select
                    value={selectedTicket.status}
                    onChange={(e) => handleUpdateStatus(selectedTicket.id, e.target.value as any)}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-semibold ${getStatusColor(selectedTicket.status)}`}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mb-1">Priority</p>
                  <span className={`inline-flex px-3 py-2 rounded-lg text-sm font-semibold ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority.toUpperCase()}
                  </span>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mb-1">Category</p>
                  <p className="text-gray-900 font-semibold">{selectedTicket.category}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mb-1">Created</p>
                  <p className="text-gray-900 font-semibold text-sm">{new Date(selectedTicket.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-600 text-sm mb-2">Customer Information</p>
                <p className="text-gray-900 font-semibold">{selectedTicket.businessName}</p>
                <p className="text-gray-700">{selectedTicket.ownerName}</p>
                <p className="text-gray-600 text-sm">{selectedTicket.email}</p>
              </div>
            </div>

            {/* Conversation */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Original Message */}
              <div className="bg-blue-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {selectedTicket.ownerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">{selectedTicket.ownerName}</p>
                    <p className="text-gray-600 text-xs">{new Date(selectedTicket.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-gray-700">{selectedTicket.message}</p>
              </div>

              {/* Replies */}
              {selectedTicket.replies.map((reply, index) => (
                <div 
                  key={index} 
                  className={`rounded-2xl p-4 ${reply.isAdmin ? 'bg-green-50' : 'bg-gray-50'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 ${reply.isAdmin ? 'bg-green-600' : 'bg-gray-600'} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                      {reply.from.charAt(0)}
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">{reply.from}</p>
                      <p className="text-gray-600 text-xs">{new Date(reply.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{reply.message}</p>
                </div>
              ))}
            </div>

            {/* Reply Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-3">
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  rows={3}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <button
                  onClick={handleSendReply}
                  disabled={!replyMessage.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
