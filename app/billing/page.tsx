'use client';

import { LayoutWrapper } from '@/components/Layout/LayoutWrapper';

export default function BillingPage() {
  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-600">Manage your subscription and billing information.</p>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-gray-500">Billing management coming soon...</p>
        </div>
      </div>
    </LayoutWrapper>
  );
}
