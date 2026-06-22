'use client';

import { useAuth } from '@/hooks/useAuth';
import { LayoutWrapper } from '@/components/Layout/LayoutWrapper';
import { Copy } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SettingsPage() {
  const { tenantKey } = useAuth();

  const copyToClipboard = () => {
    if (tenantKey) {
      navigator.clipboard.writeText(tenantKey);
      toast.success('Copied to clipboard!');
    }
  };

  return (
    <LayoutWrapper>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Tenant ID</h2>
          <p className="text-sm text-gray-600 mb-4">
            Use this ID to authenticate your webhook requests.
          </p>
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <code className="flex-1 text-sm font-mono text-gray-800">
              {tenantKey || 'Loading...'}
            </code>
            <button
              onClick={copyToClipboard}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              title="Copy to clipboard"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800">📖 Example Usage</h3>
          <p className="text-sm text-blue-700 mt-1">Send a webhook to this URL:</p>
          <code className="block bg-white p-2 rounded border border-blue-200 mt-2 text-sm">
            POST https://api.lingotlow.com/api/ingest/{tenantKey}
          </code>
          <p className="text-sm text-blue-700 mt-2">With header:</p>
          <code className="block bg-white p-2 rounded border border-blue-200 mt-1 text-sm">
            X-API-Key: your-api-key
          </code>
        </div>
      </div>
    </LayoutWrapper>
  );
}
