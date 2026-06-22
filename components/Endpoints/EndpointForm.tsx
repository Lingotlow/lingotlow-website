'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Endpoint } from '@/types';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

interface EndpointFormProps {
  endpoint?: Endpoint | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function EndpointForm({ endpoint, onClose, onSuccess }: EndpointFormProps) {
  const { tenantKey } = useAuth();
  const isEditing = !!endpoint;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: endpoint?.name || '',
    url: endpoint?.url || '',
    retryCount: endpoint?.retryCount || 3,
    timeoutMs: endpoint?.timeoutMs || 5000,
    active: endpoint?.active ?? true,
    description: endpoint?.description || '',
    secret: endpoint?.secret || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = { ...formData };
      if (!payload.secret) delete payload.secret;

      if (isEditing) {
        await apiClient.put(`/admin/tenants/${tenantKey}/endpoints/${endpoint.id}`, payload);
        toast.success('Endpoint updated successfully');
      } else {
        await apiClient.post(`/admin/tenants/${tenantKey}/endpoints`, payload);
        toast.success('Endpoint created successfully');
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving endpoint:', error);
      toast.error(isEditing ? 'Failed to update endpoint' : 'Failed to create endpoint');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Edit Endpoint' : 'New Endpoint'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="My Webhook"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL *
            </label>
            <Input
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://api.example.com/webhook"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Retry Count
              </label>
              <Input
                type="number"
                value={formData.retryCount}
                onChange={(e) => setFormData({ ...formData, retryCount: parseInt(e.target.value) })}
                min={0}
                max={10}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timeout (ms)
              </label>
              <Input
                type="number"
                value={formData.timeoutMs}
                onChange={(e) => setFormData({ ...formData, timeoutMs: parseInt(e.target.value) })}
                min={1000}
                max={30000}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Secret (optional)
            </label>
            <Input
              value={formData.secret}
              onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
              placeholder="Optional HMAC secret"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="active" className="text-sm text-gray-700">
              Active
            </label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              {isEditing ? 'Update' : 'Create'} Endpoint
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
