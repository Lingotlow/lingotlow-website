'use client';

import { useEffect, useState } from 'react';
import { LayoutWrapper } from '@/components/Layout/LayoutWrapper';
import { apiClient } from '@/lib/api-client';
import { Endpoint } from '@/types';
import { Button } from '@/components/UI/Button';
import { Spinner } from '@/components/UI/Spinner';
import { Plus, Edit, Trash2, Power, Webhook } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { EndpointForm } from '@/components/Endpoints/EndpointForm';
import { useAuth } from '@/hooks/useAuth';

export default function EndpointsPage() {
  const { tenantKey } = useAuth();
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEndpoint, setEditingEndpoint] = useState<Endpoint | null>(null);

  useEffect(() => {
    if (tenantKey) {
      fetchEndpoints();
    }
  }, [tenantKey]);

  const fetchEndpoints = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`/admin/tenants/${tenantKey}/endpoints`);
      setEndpoints(response.data || []);
    } catch (error) {
      console.error('Error fetching endpoints:', error);
      setEndpoints([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this endpoint?')) return;
    
    try {
      await apiClient.delete(`/admin/tenants/${tenantKey}/endpoints/${id}`);
      toast.success('Endpoint deleted successfully');
      fetchEndpoints();
    } catch (error) {
      console.error('Error deleting endpoint:', error);
      toast.error('Failed to delete endpoint');
    }
  };

  const handleToggleActive = async (endpoint: Endpoint) => {
    try {
      const updated = { ...endpoint, active: !endpoint.active };
      await apiClient.put(`/admin/tenants/${tenantKey}/endpoints/${endpoint.id}`, updated);
      toast.success(`Endpoint ${updated.active ? 'activated' : 'deactivated'}`);
      fetchEndpoints();
    } catch (error) {
      console.error('Error toggling endpoint:', error);
      toast.error('Failed to update endpoint');
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingEndpoint(null);
    fetchEndpoints();
  };

  if (isLoading) {
    return (
      <LayoutWrapper>
        <div className="flex justify-center items-center h-96">
          <Spinner />
        </div>
      </LayoutWrapper>
    );
  }

  // TELA SEM ENDPOINTS
  if (endpoints.length === 0) {
    return (
      <LayoutWrapper>
        <div className="max-w-2xl mx-auto py-16 text-center">
          <div className="w-20 h-20 bg-[#F5A623] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Webhook className="w-10 h-10 text-[#F5A623]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a]">No endpoints yet</h2>
          <p className="text-[#6B6B6B] mt-2 max-w-md mx-auto">
            Create your first endpoint to start receiving webhooks.
          </p>
          <Button onClick={() => setShowForm(true)} className="mt-6">
            <Plus size={18} className="mr-2" />
            Create Endpoint
          </Button>
        </div>

        {showForm && (
          <EndpointForm
            endpoint={editingEndpoint}
            onClose={() => {
              setShowForm(false);
              setEditingEndpoint(null);
            }}
            onSuccess={handleFormSuccess}
          />
        )}
      </LayoutWrapper>
    );
  }

  // TELA COM ENDPOINTS
  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Endpoints</h1>
            <p className="text-gray-600 mt-1">Manage your webhook endpoints</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus size={18} className="mr-2" />
            New Endpoint
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {endpoints.map((endpoint) => (
                  <tr key={endpoint.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {endpoint.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      {endpoint.url}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {endpoint.retryCount}x
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        endpoint.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {endpoint.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleActive(endpoint)}
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                          title={endpoint.active ? 'Deactivate' : 'Activate'}
                        >
                          <Power size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setEditingEndpoint(endpoint);
                            setShowForm(true);
                          }}
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(endpoint.id)}
                          className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showForm && (
          <EndpointForm
            endpoint={editingEndpoint}
            onClose={() => {
              setShowForm(false);
              setEditingEndpoint(null);
            }}
            onSuccess={handleFormSuccess}
          />
        )}
      </div>
    </LayoutWrapper>
  );
}
