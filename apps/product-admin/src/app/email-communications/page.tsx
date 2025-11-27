'use client';

import { useEffect, useState } from 'react';
import { Mail, Search, Filter, CheckCircle, XCircle, Clock, RefreshCw, ChevronDown, Eye } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_PUB_AI_URL || 'http://localhost:8001';
const ADMIN_KEY = 'agentcare-product-admin-key-2024';

interface EmailCommunication {
  id: string;
  to_email: string;
  to_name: string;
  subject: string;
  type: 'welcome' | 'transcript' | 'notification' | 'marketing';
  status: 'sent' | 'failed' | 'pending' | 'queued';
  sent_at: string;
  tenant_id?: string;
  metadata?: Record<string, unknown>;
}

// Mock data for demonstration
const MOCK_EMAILS: EmailCommunication[] = [
  {
    id: '1',
    to_email: 'john@example.com',
    to_name: 'John Doe',
    subject: 'Welcome to AgentCare - Your Free Trial is Ready!',
    type: 'welcome',
    status: 'sent',
    sent_at: '2024-11-26T10:30:00Z',
    tenant_id: 'tenant_123',
  },
  {
    id: '2',
    to_email: 'sarah@company.com',
    to_name: 'Sarah Smith',
    subject: 'Your AgentCare Chat Transcript - Session abc123',
    type: 'transcript',
    status: 'sent',
    sent_at: '2024-11-26T09:15:00Z',
  },
  {
    id: '3',
    to_email: 'mike@business.com',
    to_name: 'Mike Johnson',
    subject: 'Welcome to AgentCare - Your Free Trial is Ready!',
    type: 'welcome',
    status: 'failed',
    sent_at: '2024-11-26T08:45:00Z',
    tenant_id: 'tenant_456',
  },
  {
    id: '4',
    to_email: 'lisa@startup.io',
    to_name: 'Lisa Chen',
    subject: 'Your AgentCare Account is Ready!',
    type: 'notification',
    status: 'sent',
    sent_at: '2024-11-25T16:20:00Z',
    tenant_id: 'tenant_789',
  },
];

export default function EmailCommunicationsPage() {
  const [emails, setEmails] = useState<EmailCommunication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedEmail, setSelectedEmail] = useState<EmailCommunication | null>(null);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((r) => setTimeout(r, 500));
      setEmails(MOCK_EMAILS);
    } catch (error) {
      console.error('Failed to fetch emails:', error);
      setEmails(MOCK_EMAILS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.to_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.to_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || email.type === filterType;
    const matchesStatus = filterStatus === 'all' || email.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; icon: typeof CheckCircle }> = {
      sent: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', icon: CheckCircle },
      failed: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', icon: XCircle },
      pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', icon: Clock },
      queued: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', icon: Clock },
    };
    const style = styles[status] || styles.pending;
    const Icon = style.icon;
    return (
      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}>
        <Icon className="h-3 w-3" />
        {status}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      welcome: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      transcript: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      notification: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      marketing: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[type] || 'bg-gray-100 text-gray-700'}`}>
        {type}
      </span>
    );
  };

  const stats = {
    total: emails.length,
    sent: emails.filter((e) => e.status === 'sent').length,
    failed: emails.filter((e) => e.status === 'failed').length,
    pending: emails.filter((e) => e.status === 'pending' || e.status === 'queued').length,
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600">
                  <span className="text-lg font-bold text-white">A</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">AgentCare</h1>
                  <p className="text-sm text-muted-foreground">Product Admin</p>
                </div>
              </a>
            </div>
            <nav className="flex items-center gap-4">
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</a>
              <a href="/email-communications" className="text-sm font-medium text-primary">Emails</a>
              <a href="/email-templates" className="text-sm text-muted-foreground hover:text-foreground">Templates</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Email Communications</h1>
          <p className="mt-1 text-muted-foreground">Monitor and manage all outgoing email communications</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Emails</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sent</p>
                <p className="text-2xl font-bold">{stats.sent}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold">{stats.failed}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by email, name, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border bg-background pl-10 pr-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none rounded-lg border bg-background pl-4 pr-10 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Types</option>
              <option value="welcome">Welcome</option>
              <option value="transcript">Transcript</option>
              <option value="notification">Notification</option>
              <option value="marketing">Marketing</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none rounded-lg border bg-background pl-4 pr-10 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
              <option value="queued">Queued</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          <button
            onClick={fetchEmails}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Email Table */}
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50 text-left text-sm text-muted-foreground">
                  <th className="px-6 py-4 font-medium">Recipient</th>
                  <th className="px-6 py-4 font-medium">Subject</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Sent At</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <RefreshCw className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Loading emails...</p>
                    </td>
                  </tr>
                ) : filteredEmails.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <Mail className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-medium">No emails found</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {searchTerm || filterType !== 'all' || filterStatus !== 'all'
                          ? 'Try adjusting your filters'
                          : 'Emails will appear here once sent'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredEmails.map((email) => (
                    <tr key={email.id} className="text-sm hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{email.to_name}</p>
                          <p className="text-muted-foreground">{email.to_email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate">{email.subject}</td>
                      <td className="px-6 py-4">{getTypeBadge(email.type)}</td>
                      <td className="px-6 py-4">{getStatusBadge(email.status)}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(email.sent_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedEmail(email)}
                          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Email Detail Modal */}
      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-background shadow-xl">
            <div className="border-b p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Email Details</h2>
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="rounded-full p-2 hover:bg-muted transition-colors"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">To</label>
                  <p className="mt-1">{selectedEmail.to_name} &lt;{selectedEmail.to_email}&gt;</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Status</label>
                  <p className="mt-1">{getStatusBadge(selectedEmail.status)}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Type</label>
                  <p className="mt-1">{getTypeBadge(selectedEmail.type)}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Sent At</label>
                  <p className="mt-1">{new Date(selectedEmail.sent_at).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Subject</label>
                <p className="mt-1">{selectedEmail.subject}</p>
              </div>
              {selectedEmail.tenant_id && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Tenant ID</label>
                  <p className="mt-1 font-mono text-sm">{selectedEmail.tenant_id}</p>
                </div>
              )}
            </div>
            <div className="border-t p-4 flex justify-end gap-3">
              {selectedEmail.status === 'failed' && (
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                  Retry Send
                </button>
              )}
              <button
                onClick={() => setSelectedEmail(null)}
                className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
