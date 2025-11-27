'use client';

import { useEffect, useState } from 'react';
import { FileText, Plus, Search, Edit2, Trash2, Copy, Eye, Check, ChevronDown, RefreshCw } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  type: 'welcome' | 'transcript' | 'notification' | 'marketing' | 'system';
  status: 'active' | 'draft' | 'archived';
  created_at: string;
  updated_at: string;
  variables: string[];
  preview_text: string;
}

// Mock templates
const MOCK_TEMPLATES: EmailTemplate[] = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to AgentCare - Your Free Trial is Ready!',
    type: 'welcome',
    status: 'active',
    created_at: '2024-11-01T10:00:00Z',
    updated_at: '2024-11-25T14:30:00Z',
    variables: ['{{first_name}}', '{{company_name}}', '{{temp_password}}', '{{login_url}}'],
    preview_text: 'Congratulations! Your free 30-day trial is now active.',
  },
  {
    id: '2',
    name: 'Chat Transcript',
    subject: 'Your AgentCare Chat Transcript - Session {{session_id}}',
    type: 'transcript',
    status: 'active',
    created_at: '2024-11-10T09:00:00Z',
    updated_at: '2024-11-24T11:15:00Z',
    variables: ['{{name}}', '{{session_id}}', '{{messages}}', '{{agent_name}}'],
    preview_text: 'Thank you for chatting with us! Here is a copy of your conversation.',
  },
  {
    id: '3',
    name: 'Account Ready',
    subject: 'Your AgentCare Account is Ready!',
    type: 'notification',
    status: 'active',
    created_at: '2024-11-05T08:00:00Z',
    updated_at: '2024-11-20T16:45:00Z',
    variables: ['{{first_name}}', '{{company_name}}', '{{subdomain}}'],
    preview_text: 'Great news! Your AgentCare account has been fully set up.',
  },
  {
    id: '4',
    name: 'Password Reset',
    subject: 'Reset Your AgentCare Password',
    type: 'system',
    status: 'active',
    created_at: '2024-11-03T10:00:00Z',
    updated_at: '2024-11-18T09:20:00Z',
    variables: ['{{first_name}}', '{{reset_link}}', '{{expiry_time}}'],
    preview_text: 'You requested to reset your password. Click the link below.',
  },
  {
    id: '5',
    name: 'Trial Ending Soon',
    subject: 'Your AgentCare Trial Ends in {{days}} Days',
    type: 'marketing',
    status: 'draft',
    created_at: '2024-11-15T14:00:00Z',
    updated_at: '2024-11-22T10:30:00Z',
    variables: ['{{first_name}}', '{{days}}', '{{upgrade_link}}'],
    preview_text: 'Your free trial is ending soon. Upgrade now to keep all features.',
  },
];

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      setTemplates(MOCK_TEMPLATES);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
      setTemplates(MOCK_TEMPLATES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || template.type === filterType;
    const matchesStatus = filterStatus === 'all' || template.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      draft: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      archived: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
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
      system: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[type] || 'bg-gray-100 text-gray-700'}`}>
        {type}
      </span>
    );
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
              <a href="/email-communications" className="text-sm text-muted-foreground hover:text-foreground">Emails</a>
              <a href="/email-templates" className="text-sm font-medium text-primary">Templates</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Title & Action */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Email Templates</h1>
            <p className="mt-1 text-muted-foreground">Manage email templates used across the platform</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-purple-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            Create Template
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Templates</p>
                <p className="text-2xl font-bold">{templates.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{templates.filter((t) => t.status === 'active').length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                <Edit2 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold">{templates.filter((t) => t.status === 'draft').length}</p>
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
              placeholder="Search templates..."
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
              <option value="system">System</option>
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
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          <button
            onClick={fetchTemplates}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Templates Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl border bg-card p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-muted rounded w-full mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))
          ) : filteredTemplates.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No templates found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm || filterType !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Create your first email template'}
              </p>
            </div>
          ) : (
            filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getTypeBadge(template.type)}
                    {getStatusBadge(template.status)}
                  </div>
                  <button
                    onClick={() => handleCopyId(template.id)}
                    className="p-1.5 rounded hover:bg-muted transition-colors"
                    title="Copy template ID"
                  >
                    {copiedId === template.id ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <h3 className="font-semibold mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.subject}</p>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{template.preview_text}</p>

                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Variables:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.variables.slice(0, 3).map((v) => (
                      <span key={v} className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                        {v}
                      </span>
                    ))}
                    {template.variables.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{template.variables.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-xs text-muted-foreground">
                    Updated {new Date(template.updated_at).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedTemplate(template)}
                      className="p-2 rounded hover:bg-muted transition-colors"
                      title="Preview"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded hover:bg-muted transition-colors" title="Edit">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded hover:bg-red-50 text-red-600 transition-colors" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background shadow-xl">
            <div className="sticky top-0 border-b bg-background p-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{selectedTemplate.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    {getTypeBadge(selectedTemplate.type)}
                    {getStatusBadge(selectedTemplate.status)}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="rounded-full p-2 hover:bg-muted transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label className="text-xs font-medium text-muted-foreground">Subject Line</label>
                <p className="mt-1 p-3 rounded-lg bg-muted/50 font-medium">{selectedTemplate.subject}</p>
              </div>

              <div className="mb-6">
                <label className="text-xs font-medium text-muted-foreground">Preview Text</label>
                <p className="mt-1 p-3 rounded-lg bg-muted/50">{selectedTemplate.preview_text}</p>
              </div>

              <div className="mb-6">
                <label className="text-xs font-medium text-muted-foreground">Available Variables</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedTemplate.variables.map((v) => (
                    <code key={v} className="rounded bg-primary/10 text-primary px-2 py-1 text-sm">
                      {v}
                    </code>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-xs font-medium text-muted-foreground">Email Preview</label>
                <div className="mt-2 rounded-lg border overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-purple-600 p-6 text-center text-white">
                    <h1 className="text-xl font-bold">AgentCare</h1>
                  </div>
                  <div className="p-6 bg-white dark:bg-slate-900">
                    <p className="text-sm text-muted-foreground">
                      Hi {'{'}{'{'} first_name {'}'}{'}'},
                    </p>
                    <p className="mt-4">{selectedTemplate.preview_text}</p>
                    <div className="mt-6">
                      <button className="bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-2 rounded-lg text-sm">
                        Get Started
                      </button>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 text-center text-xs text-muted-foreground">
                    &copy; 2024 AgentCare Technologies. All rights reserved.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Created</label>
                  <p className="mt-1">{new Date(selectedTemplate.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Last Updated</label>
                  <p className="mt-1">{new Date(selectedTemplate.updated_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 border-t bg-background p-4 flex justify-end gap-3">
              <button
                onClick={() => setSelectedTemplate(null)}
                className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Close
              </button>
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                Edit Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl bg-background shadow-xl">
            <div className="border-b p-6">
              <h2 className="text-lg font-semibold">Create New Template</h2>
              <p className="mt-1 text-sm text-muted-foreground">Set up a new email template</p>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Template Name</label>
                <input
                  type="text"
                  placeholder="e.g., Welcome Email"
                  className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject Line</label>
                <input
                  type="text"
                  placeholder="e.g., Welcome to AgentCare!"
                  className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                    <option value="welcome">Welcome</option>
                    <option value="transcript">Transcript</option>
                    <option value="notification">Notification</option>
                    <option value="marketing">Marketing</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Preview Text</label>
                <textarea
                  rows={3}
                  placeholder="Short preview text shown in email clients..."
                  className="w-full rounded-lg border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
            </form>
            <div className="border-t p-4 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Cancel
              </button>
              <button className="rounded-lg bg-gradient-to-r from-primary to-purple-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
