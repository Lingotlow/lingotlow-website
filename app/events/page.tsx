'use client';

import { LayoutWrapper } from '@/components/Layout/LayoutWrapper';

export default function EventsPage() {
  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <p className="text-gray-600">View and manage your webhook events.</p>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-500">Event management coming soon...</p>
        </div>
      </div>
    </LayoutWrapper>
  );
}
