'use client';

import { Activity, CheckCircle, XCircle, Server } from 'lucide-react';

interface MetricsCardsProps {
  totalEvents: number;
  successRate: number;
  failedEvents: number;
  activeEndpoints: number;
}

export function MetricsCards({ totalEvents, successRate, failedEvents, activeEndpoints }: MetricsCardsProps) {
  const cards = [
    {
      title: 'Total Events',
      value: totalEvents.toLocaleString(),
      icon: Activity,
      color: 'bg-blue-500',
    },
    {
      title: 'Success Rate',
      value: `${successRate}%`,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'Failed Events',
      value: failedEvents.toLocaleString(),
      icon: XCircle,
      color: 'bg-red-500',
    },
    {
      title: 'Active Endpoints',
      value: activeEndpoints.toLocaleString(),
      icon: Server,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.title} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
