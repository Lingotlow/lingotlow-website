'use client';

import { useEffect, useState } from 'react';
import { LayoutWrapper } from '@/components/Layout/LayoutWrapper';
import { apiClient } from '@/lib/api-client';
import { Event } from '@/types';
import { Button } from '@/components/UI/Button';
import { Spinner } from '@/components/UI/Spinner';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-hot-toast';
import { Eye, RefreshCw, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import EventDetailsModal from '@/components/Events/EventDetailsModal';

export default function EventsPage() {
  const { tenantKey } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    from: '',
    to: '',
  });
  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
    total: 0,
  });

  useEffect(() => {
    if (tenantKey) {
      fetchEvents();
    }
  }, [tenantKey, filters, pagination.page]);

  const fetchEvents = async () => {
    if (!tenantKey) return;
    
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.from) params.append('from', filters.from);
      if (filters.to) params.append('to', filters.to);
      params.append('page', pagination.page.toString());
      params.append('size', pagination.size.toString());

      const response = await apiClient.get(`/admin/tenants/${tenantKey}/events?${params}`);
      setEvents(response.data.content || []);
      setPagination({
        ...pagination,
        total: response.data.totalElements || 0,
      });
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplay = async (eventId: string) => {
    try {
      await apiClient.post(`/admin/tenants/${tenantKey}/events/${eventId}/replay`);
      toast.success('Event replayed successfully');
      fetchEvents();
    } catch (error) {
      console.error('Error replaying event:', error);
      toast.error('Failed to replay event');
    }
  };

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setShowDetails(true);
  };

  const statusColors: Record<string, string> = {
    DELIVERED: 'bg-green-100 text-green-800',
    FAILED: 'bg-red-100 text-red-800',
    RETRY: 'bg-yellow-100 text-yellow-800',
    DLQ: 'bg-gray-100 text-gray-800',
    RECEIVED: 'bg-blue-100 text-blue-800',
    PROCESSING: 'bg-purple-100 text-purple-800',
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

  // TELA SEM EVENTOS
  if (events.length === 0) {
    return (
      <LayoutWrapper>
        <div className="max-w-2xl mx-auto py-16 text-center">
          <div className="w-20 h-20 bg-[#F5A623] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Inbox className="w-10 h-10 text-[#F5A623]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a]">No events yet</h2>
          <p className="text-[#6B6B6B] mt-2 max-w-md mx-auto">
            Send your first webhook to start seeing events here.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/endpoints"
              className="inline-flex items-center px-4 py-2 bg-[#F5A623] text-[#1a1a1a] rounded-lg hover:bg-[#D4891C] transition-colors text-sm font-medium"
            >
              Create Endpoint
            </a>
            <a
              href="/api-keys"
              className="inline-flex items-center px-4 py-2 border border-[#E0E0E0] text-[#1a1a1a] rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Generate API Key
            </a>
          </div>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <p className="text-sm text-blue-800">
              💡 <span className="font-medium">Tip:</span> Use the Swagger UI at{' '}
              <code className="bg-blue-100 px-2 py-0.5 rounded text-xs">http://localhost:8080/api/swagger-ui.html</code>{' '}
              to test sending a webhook.
            </p>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  // TELA COM EVENTOS
  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-1">View and manage your webhook events.</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="RECEIVED">Received</option>
                <option value="DELIVERED">Delivered</option>
                <option value="FAILED">Failed</option>
                <option value="RETRY">Retry</option>
                <option value="DLQ">DLQ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                type="datetime-local"
                value={filters.from}
                onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="datetime-local"
                value={filters.to}
                onChange={(e) => setFilters({ ...filters, to: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="secondary" onClick={() => setFilters({ status: '', from: '', to: '' })}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retries</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {event.documentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {event.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[event.status] || 'bg-gray-100 text-gray-800'}`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {event.retryCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(event)}
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        {(event.status === 'FAILED' || event.status === 'DLQ') && (
                          <button
                            onClick={() => handleReplay(event.id)}
                            className="text-gray-500 hover:text-blue-600 transition-colors"
                            title="Replay"
                          >
                            <RefreshCw size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {events.length} of {pagination.total} events
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                disabled={pagination.page === 0}
                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm text-gray-600">
                Page {pagination.page + 1} of {Math.ceil(pagination.total / pagination.size)}
              </span>
              <button
                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                disabled={pagination.page >= Math.ceil(pagination.total / pagination.size) - 1}
                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {showDetails && selectedEvent && (
          <EventDetailsModal
            event={selectedEvent}
            onClose={() => setShowDetails(false)}
            onReplay={handleReplay}
          />
        )}
      </div>
    </LayoutWrapper>
  );
}
