'use client';

import { useEffect, useState } from 'react';
import { LayoutWrapper } from '@/components/Layout/LayoutWrapper';
import { apiClient } from '@/lib/api-client';
import { Spinner } from '@/components/UI/Spinner';
import { useAuth } from '@/hooks/useAuth';
import { PlusCircle, Webhook, Activity, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { tenantKey } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEndpoints: 0,
    successRate: 0,
  });

  useEffect(() => {
    if (tenantKey) {
      fetchDashboardData();
    }
  }, [tenantKey]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Buscar eventos
      const eventsResponse = await apiClient.get(`/admin/tenants/${tenantKey}/events?page=0&size=1`);
      const events = eventsResponse.data.content || [];
      
      // Buscar endpoints
      const endpointsResponse = await apiClient.get(`/admin/tenants/${tenantKey}/endpoints`);
      const endpoints = endpointsResponse.data || [];
      
      const totalEvents = eventsResponse.data.totalElements || 0;
      const activeEndpoints = endpoints.filter((e: any) => e.active).length;
      
      setStats({
        totalEvents,
        activeEndpoints,
        successRate: 0,
      });
      
      setHasData(totalEvents > 0 || activeEndpoints > 0);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setHasData(false);
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

  // TELA PARA USUÁRIO SEM DADOS
  if (!hasData) {
    return (
      <LayoutWrapper>
        <div className="max-w-4xl mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-[#1a1a1a]">Welcome to Lingotlow!</h1>
            <p className="text-[#6B6B6B] mt-2">You're all set up. Here's how to get started:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Passo 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#F5A623] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Webhook className="w-6 h-6 text-[#F5A623]" />
              </div>
              <h3 className="font-semibold text-[#1a1a1a]">Step 1: Create an Endpoint</h3>
              <p className="text-sm text-[#6B6B6B] mt-2">
                Define where your webhooks should be delivered.
              </p>
              <Link
                href="/endpoints"
                className="inline-flex items-center mt-4 px-4 py-2 bg-[#F5A623] text-[#1a1a1a] rounded-lg hover:bg-[#D4891C] transition-colors text-sm font-medium"
              >
                Create Endpoint
                <PlusCircle className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Passo 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#F5A623] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-[#F5A623]" />
              </div>
              <h3 className="font-semibold text-[#1a1a1a]">Step 2: Generate an API Key</h3>
              <p className="text-sm text-[#6B6B6B] mt-2">
                Create a secure key to authenticate your requests.
              </p>
              <Link
                href="/api-keys"
                className="inline-flex items-center mt-4 px-4 py-2 bg-[#F5A623] text-[#1a1a1a] rounded-lg hover:bg-[#D4891C] transition-colors text-sm font-medium"
              >
                Generate Key
                <PlusCircle className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Passo 3 */}
            <div className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#F5A623] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-[#F5A623]" />
              </div>
              <h3 className="font-semibold text-[#1a1a1a]">Step 3: Send Your First Webhook</h3>
              <p className="text-sm text-[#6B6B6B] mt-2">
                Use your API key to send a webhook and see it in action.
              </p>
              <Link
                href="/events"
                className="inline-flex items-center mt-4 px-4 py-2 bg-[#F5A623] text-[#1a1a1a] rounded-lg hover:bg-[#D4891C] transition-colors text-sm font-medium"
              >
                View Events
                <BarChart3 className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Dica - removendo links de documentação */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-800">
              💡 Need help? Check the Swagger documentation at{' '}
              <code className="bg-blue-100 px-2 py-0.5 rounded text-xs">http://localhost:8080/api/swagger-ui.html</code>
            </p>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  // TELA PARA USUÁRIO COM DADOS
  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Your webhook activity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600">Total Events</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalEvents}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600">Active Endpoints</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeEndpoints}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-600">Success Rate</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.successRate}%</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-600">📊 Charts and detailed analytics will appear here as you send more webhooks.</p>
        </div>
      </div>
    </LayoutWrapper>
  );
}
