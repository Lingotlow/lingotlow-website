'use client';

import { useEffect, useState } from 'react';
import { LayoutWrapper } from '@/components/Layout/LayoutWrapper';
import { MetricsCards } from '@/components/Dashboard/MetricsCards';
import { EventsChart } from '@/components/Dashboard/EventsChart';
import { RecentEvents } from '@/components/Dashboard/RecentEvents';
import { apiClient } from '@/lib/api-client';
import { Spinner } from '@/components/UI/Spinner';

interface DashboardData {
  totalEvents: number;
  successRate: number;
  failedEvents: number;
  activeEndpoints: number;
  eventsOverTime: Array<{ date: string; delivered: number; failed: number }>;
  eventsByStatus: { [key: string]: number };
  recentEvents: Array<{
    id: string;
    documentId: string;
    type: string;
    status: string;
    createdAt: string;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      // TODO: Implementar endpoint de dashboard no backend
      // Por enquanto, dados mockados
      const mockData: DashboardData = {
        totalEvents: 12547,
        successRate: 97.8,
        failedEvents: 276,
        activeEndpoints: 4,
        eventsOverTime: [
          { date: '2026-06-14', delivered: 120, failed: 5 },
          { date: '2026-06-15', delivered: 145, failed: 3 },
          { date: '2026-06-16', delivered: 98, failed: 8 },
          { date: '2026-06-17', delivered: 167, failed: 2 },
          { date: '2026-06-18', delivered: 134, failed: 6 },
          { date: '2026-06-19', delivered: 156, failed: 4 },
          { date: '2026-06-20', delivered: 89, failed: 1 },
        ],
        eventsByStatus: {
          DELIVERED: 11780,
          FAILED: 276,
          RETRY: 345,
          DLQ: 146,
        },
        recentEvents: [
          { id: '1', documentId: 'doc-123', type: 'order.created', status: 'DELIVERED', createdAt: '2026-06-20T10:30:00Z' },
          { id: '2', documentId: 'doc-456', type: 'payment.succeeded', status: 'FAILED', createdAt: '2026-06-20T10:15:00Z' },
          { id: '3', documentId: 'doc-789', type: 'order.updated', status: 'DELIVERED', createdAt: '2026-06-20T09:45:00Z' },
          { id: '4', documentId: 'doc-012', type: 'shipment.created', status: 'RETRY', createdAt: '2026-06-20T09:20:00Z' },
          { id: '5', documentId: 'doc-345', type: 'order.created', status: 'DELIVERED', createdAt: '2026-06-20T08:55:00Z' },
        ],
      };
      setData(mockData);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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

  if (error) {
    return (
      <LayoutWrapper>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Bem-vindo à sua área administrativa.</p>
        </div>

        <MetricsCards
          totalEvents={data?.totalEvents || 0}
          successRate={data?.successRate || 0}
          failedEvents={data?.failedEvents || 0}
          activeEndpoints={data?.activeEndpoints || 0}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EventsChart data={data?.eventsOverTime || []} />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
              <div className="space-y-3">
                {data?.eventsByStatus && Object.entries(data.eventsByStatus).map(([status, count]) => (
                  <div key={status}>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{status}</span>
                      <span className="font-medium text-gray-900">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          status === 'DELIVERED' ? 'bg-green-500' :
                          status === 'FAILED' ? 'bg-red-500' :
                          status === 'RETRY' ? 'bg-yellow-500' :
                          'bg-gray-500'
                        }`}
                        style={{ width: `${(count / (data?.totalEvents || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <RecentEvents events={data?.recentEvents || []} />
      </div>
    </LayoutWrapper>
  );
}
