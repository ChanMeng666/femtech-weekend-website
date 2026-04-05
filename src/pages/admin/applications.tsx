import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@theme/Layout';

interface Application {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  company_type: string | null;
  headquarters: string | null;
  admin_notes: string | null;
  status: string;
  reference_number: string | null;
  created_at: string;
}

type AppType = 'pitch' | 'programme';
type StatusFilter = 'all' | 'submitted' | 'approved' | 'rejected';

const API_BASE = '/api/admin';

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    submitted: 'bg-gray-100 text-gray-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors.submitted}`}>
      {status}
    </span>
  );
}

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  confirmColor,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  confirmColor: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${confirmColor}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminApplications() {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<AppType>('pitch');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    action: 'approved' | 'rejected';
  }>({ open: false, action: 'approved' });

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingNotes, setEditingNotes] = useState<Record<number, string>>({});
  const [savingNotes, setSavingNotes] = useState<number | null>(null);

  // Restore key from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('admin_api_key');
    if (stored) {
      setAdminKey(stored);
      setIsAuthenticated(true);
    }
  }, []);

  const getHeaders = useCallback(() => ({
    'Content-Type': 'application/json',
    'X-Admin-Key': adminKey,
  }), [adminKey]);

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `${API_BASE}/applications?type=${activeTab}&status=${statusFilter}`,
        { headers: getHeaders() }
      );
      if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_api_key');
        setAuthError('Invalid API key');
        return;
      }
      const json = await res.json();
      if (json.success) {
        setApplications(json.data);
      } else {
        setError(json.error || 'Failed to fetch');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }, [adminKey, activeTab, statusFilter, getHeaders]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
      setSelectedIds(new Set());
    }
  }, [isAuthenticated, fetchApplications]);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch(
        `${API_BASE}/applications?type=pitch&status=all`,
        { headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey } }
      );
      if (res.status === 401) {
        setAuthError('Invalid API key');
        return;
      }
      const json = await res.json();
      if (json.success) {
        sessionStorage.setItem('admin_api_key', adminKey);
        setIsAuthenticated(true);
        setApplications(json.data);
      }
    } catch {
      setAuthError('Network error');
    }
  };

  // Filter by search query (client-side)
  const filtered = applications.filter(app => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      app.first_name?.toLowerCase().includes(q) ||
      app.last_name?.toLowerCase().includes(q) ||
      app.company_name?.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.reference_number?.toLowerCase().includes(q)
    );
  });

  // Selection helpers
  const toggleSelect = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map(a => a.id)));
    }
  };

  // Batch action
  const handleBatchAction = async (action: 'approved' | 'rejected') => {
    setConfirmDialog({ open: false, action: 'approved' });
    setProcessing(true);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/batch-review`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          type: activeTab,
          action,
          ids: Array.from(selectedIds),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setResult({
          type: 'success',
          message: `${json.processed} application(s) ${action}. ${json.skipped > 0 ? `${json.skipped} skipped (already reviewed).` : ''}`,
        });
        setSelectedIds(new Set());
        fetchApplications();
      } else {
        setResult({ type: 'error', message: json.error || 'Failed to process' });
      }
    } catch {
      setResult({ type: 'error', message: 'Network error' });
    } finally {
      setProcessing(false);
    }
  };

  // Toggle expanded row
  const toggleExpand = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      const app = applications.find(a => a.id === id);
      if (app && !(id in editingNotes)) {
        setEditingNotes(prev => ({ ...prev, [id]: app.admin_notes || '' }));
      }
    }
  };

  // Save admin notes
  const handleSaveNotes = async (id: number) => {
    setSavingNotes(id);
    try {
      const res = await fetch(`${API_BASE}/applications`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({
          type: activeTab,
          id,
          adminNotes: editingNotes[id] || '',
        }),
      });
      const json = await res.json();
      if (json.success) {
        setApplications(prev =>
          prev.map(app => app.id === id ? { ...app, admin_notes: editingNotes[id] || null } : app)
        );
        setResult({ type: 'success', message: 'Notes saved.' });
      } else {
        setResult({ type: 'error', message: json.error || 'Failed to save notes' });
      }
    } catch {
      setResult({ type: 'error', message: 'Network error' });
    } finally {
      setSavingNotes(null);
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <Layout title="Admin" noFooter>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Admin Access</h1>
            <p className="text-sm text-gray-500 mb-6">Enter your admin API key to continue.</p>
            {authError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{authError}</div>
            )}
            <input
              type="password"
              value={adminKey}
              onChange={e => setAdminKey(e.target.value)}
              placeholder="Admin API Key"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#AA7C52] focus:border-transparent mb-4"
              required
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-[#AA7C52] text-white text-sm font-medium rounded-lg hover:bg-[#996F49] transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Applications Admin" noFooter>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Shanghai Summit Applications</h1>
              <p className="text-sm text-gray-500 mt-0.5">Review and manage applicant submissions</p>
            </div>
            <button
              onClick={() => {
                sessionStorage.removeItem('admin_api_key');
                setIsAuthenticated(false);
                setAdminKey('');
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Result banner */}
          {result && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${result.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {result.message}
              <button onClick={() => setResult(null)} className="ml-3 font-medium underline">Dismiss</button>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1 w-fit">
            {(['pitch', 'programme'] as AppType[]).map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSelectedIds(new Set()); }}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'pitch' ? 'Pitch Applications' : 'Programme Applications'}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex gap-2">
              {(['all', 'submitted', 'approved', 'rejected'] as StatusFilter[]).map(s => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setSelectedIds(new Set()); }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                    statusFilter === s
                      ? 'bg-[#AA7C52] text-white border-[#AA7C52]'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, company, email, or reference..."
              className="flex-1 px-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA7C52] focus:border-transparent"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>
          )}

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-gray-500">Loading applications...</div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                {applications.length === 0 ? 'No applications found.' : 'No applications match your search.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedIds.size === filtered.length && filtered.length > 0}
                          onChange={toggleAll}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Ref #</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Company</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Email</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Notes</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map(app => (
                      <React.Fragment key={app.id}>
                        <tr
                          className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedIds.has(app.id) ? 'bg-amber-50/50' : ''} ${expandedId === app.id ? 'bg-gray-50' : ''}`}
                          onClick={() => toggleExpand(app.id)}
                        >
                          <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedIds.has(app.id)}
                              onChange={() => toggleSelect(app.id)}
                              className="rounded border-gray-300"
                            />
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-gray-500">
                            {app.reference_number || '-'}
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {app.first_name} {app.last_name}
                          </td>
                          <td className="px-4 py-3 text-gray-700">{app.company_name}</td>
                          <td className="px-4 py-3 text-gray-500">{app.email}</td>
                          <td className="px-4 py-3">
                            {app.admin_notes ? (
                              <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                                  <path d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm3 1a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2.5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zM5 10a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z"/>
                                </svg>
                                Has notes
                              </span>
                            ) : (
                              <span className="text-xs text-gray-300">--</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <StatusBadge status={app.status} />
                          </td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                            {new Date(app.created_at).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </td>
                        </tr>
                        {expandedId === app.id && (
                          <tr>
                            <td colSpan={8} className="bg-gray-50/80 px-4 py-4 border-b border-gray-200">
                              <div className="ml-8 max-w-2xl">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm mb-4">
                                  <div>
                                    <span className="text-gray-500">Company Type:</span>{' '}
                                    <span className="text-gray-900">{app.company_type || '-'}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Headquarters:</span>{' '}
                                    <span className="text-gray-900">{app.headquarters || '-'}</span>
                                  </div>
                                </div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                  Admin Notes
                                </label>
                                <textarea
                                  value={editingNotes[app.id] ?? app.admin_notes ?? ''}
                                  onChange={e => setEditingNotes(prev => ({ ...prev, [app.id]: e.target.value }))}
                                  onClick={e => e.stopPropagation()}
                                  placeholder="Add internal notes about this applicant..."
                                  rows={3}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA7C52] focus:border-transparent resize-y"
                                />
                                <div className="flex items-center gap-3 mt-2">
                                  <button
                                    onClick={e => { e.stopPropagation(); handleSaveNotes(app.id); }}
                                    disabled={savingNotes === app.id}
                                    className="px-3 py-1.5 text-xs font-medium text-white bg-[#AA7C52] rounded-lg hover:bg-[#996F49] disabled:opacity-50 transition-colors"
                                  >
                                    {savingNotes === app.id ? 'Saving...' : 'Save Notes'}
                                  </button>
                                  {(editingNotes[app.id] ?? app.admin_notes ?? '') !== (app.admin_notes ?? '') && (
                                    <span className="text-xs text-amber-600">Unsaved changes</span>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-3 text-xs text-gray-400">
            {filtered.length} application(s) shown {selectedIds.size > 0 && `· ${selectedIds.size} selected`}
          </div>
        </div>

        {/* Batch action bar */}
        {selectedIds.size > 0 && (
          <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-lg z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {selectedIds.size} application(s) selected
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDialog({ open: true, action: 'rejected' })}
                  disabled={processing}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {processing ? 'Processing...' : `Reject Selected (${selectedIds.size})`}
                </button>
                <button
                  onClick={() => setConfirmDialog({ open: true, action: 'approved' })}
                  disabled={processing}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {processing ? 'Processing...' : `Approve Selected (${selectedIds.size})`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm dialog */}
        <ConfirmDialog
          open={confirmDialog.open}
          title={confirmDialog.action === 'approved' ? 'Approve Applications' : 'Reject Applications'}
          message={
            confirmDialog.action === 'approved'
              ? `Are you sure you want to approve ${selectedIds.size} application(s)? An invitation email will be sent from team@femtechweekend.com to each applicant.`
              : `Are you sure you want to reject ${selectedIds.size} application(s)? A rejection email will be sent from noreply@femtechweekend.com to each applicant.`
          }
          confirmLabel={confirmDialog.action === 'approved' ? 'Approve & Send Emails' : 'Reject & Send Emails'}
          confirmColor={confirmDialog.action === 'approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
          onConfirm={() => handleBatchAction(confirmDialog.action)}
          onCancel={() => setConfirmDialog({ open: false, action: 'approved' })}
        />
      </div>
    </Layout>
  );
}
