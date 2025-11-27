'use client';

import { useEffect, useState } from 'react';
import { Building2, Users, Clock, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_PUB_AI_URL || 'http://localhost:8001';
const ADMIN_KEY = 'agentcare-product-admin-key-2024';

interface Stats {
  total_tenants: number;
  active_tenants: number;
  pending_tenants: number;
  provisioning_tenants: number;
}

interface Tenant {
  id: string;
  company_name: string;
  admin_email: string;
  status: string;
  created_at: string;
}

interface DashboardData {
  stats: Stats;
  recent_tenants: Tenant[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/v1/admin/dashboard`, {
        headers: {
          'X-Admin-Key': ADMIN_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const dashboardData = await response.json();
      setData(dashboardData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Use mock data for demo
      setData({
        stats: {
          total_tenants: 0,
          active_tenants: 0,
          pending_tenants: 0,
          provisioning_tenants: 0,
        },
        recent_tenants: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      provisioning: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      suspended: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600">
                <span className="text-lg font-bold text-white">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">AgentCare</h1>
                <p className="text-sm text-muted-foreground">Product Admin</p>
              </div>
            </div>
            <button
              onClick={fetchDashboard}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-yellow-100 p-4 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            <AlertCircle className="h-5 w-5" />
            <span>API not available. Showing demo mode.</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Tenants</p>
                <p className="text-2xl font-bold">{data?.stats.total_tenants || 0}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{data?.stats.active_tenants || 0}</p>
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
                <p className="text-2xl font-bold">{data?.stats.pending_tenants || 0}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Provisioning</p>
                <p className="text-2xl font-bold">{data?.stats.provisioning_tenants || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tenants */}
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-lg font-semibold">Recent Registrations</h2>
            <p className="text-sm text-muted-foreground">Latest tenant signups</p>
          </div>

          <div className="p-6">
            {data?.recent_tenants.length === 0 ? (
              <div className="py-12 text-center">
                <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No tenants yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tenants will appear here once they register through the landing page chat.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="pb-4 font-medium">Company</th>
                      <th className="pb-4 font-medium">Admin Email</th>
                      <th className="pb-4 font-medium">Status</th>
                      <th className="pb-4 font-medium">Registered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {data?.recent_tenants.map((tenant) => (
                      <tr key={tenant.id} className="text-sm">
                        <td className="py-4 font-medium">{tenant.company_name}</td>
                        <td className="py-4 text-muted-foreground">{tenant.admin_email}</td>
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(
                              tenant.status
                            )}`}
                          >
                            {tenant.status}
                          </span>
                        </td>
                        <td className="py-4 text-muted-foreground">
                          {tenant.created_at
                            ? new Date(tenant.created_at).toLocaleDateString()
                            : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">API Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">API URL</span>
                <code className="rounded bg-muted px-2 py-1 text-xs">{API_URL}</code>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Health Check</span>
                <code className="rounded bg-muted px-2 py-1 text-xs">{API_URL}/health</code>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Admin Endpoint</span>
                <code className="rounded bg-muted px-2 py-1 text-xs">/api/v1/admin/*</code>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a
                href="http://localhost:3003/en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted"
              >
                <span className="text-sm font-medium">Landing Page</span>
                <span className="text-xs text-muted-foreground">localhost:3003</span>
              </a>
              <a
                href={`${API_URL}/docs`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted"
              >
                <span className="text-sm font-medium">API Documentation</span>
                <span className="text-xs text-muted-foreground">Swagger UI</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
