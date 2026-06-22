'use client';

import { Event } from '@/types';
import { Button } from '@/components/UI/Button';
import { X, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
  onReplay: (eventId: string) => void;
}

export function EventDetailsModal({ event, onClose, onReplay }: EventDetailsModalProps) {
  const statusColors: Record<string, string> = {
    DELIVERED: 'bg-green-100 text-green-800',
    FAILED: 'bg-red-100 text-red-800',
    RETRY: 'bg-yellow-100 text-yellow-800',
    DLQ: 'bg-gray-100 text-gray-800',
    RECEIVED: 'bg-blue-100 text-blue-800',
    PROCESSING: 'bg-purple-100 text-purple-800',
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'MMM dd, yyyy HH:mm:ss');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>
            <p className="text-sm text-gray-500 mt-1">Request ID: {event.requestId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${statusColors[event.status] || 'bg-gray-100 text-gray-800'}`}>
              {event.status}
            </span>
            <span className="text-sm text-gray-500">
              Retry attempts: {event.retryCount}
            </span>
          </div>

          {/* Event Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Document ID</p>
              <p className="text-sm text-gray-900 mt-1">{event.documentId}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Type</p>
              <p className="text-sm text-gray-900 mt-1">{event.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Received</p>
              <p className="text-sm text-gray-900 mt-1">{formatDate(event.receivedAt)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Delivered</p>
              <p className="text-sm text-gray-900 mt-1">{formatDate(event.deliveredAt)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Created</p>
              <p className="text-sm text-gray-900 mt-1">{formatDate(event.createdAt)}</p>
            </div>
          </div>

          {/* Payload (mock) */}
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Payload</p>
            <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                {`{
  "event": "order_created",
  "data": {
    "orderId": "ORD-${Math.floor(Math.random() * 100000)}",
    "total": ${(Math.random() * 1000).toFixed(2)},
    "customerId": "cust-${Math.floor(Math.random() * 1000)}"
  }
}`}
              </pre>
            </div>
          </div>

          {/* Headers (mock) */}
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Headers</p>
            <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                {`{
  "content-type": "application/json",
  "source": "shopify",
  "x-webhook-id": "${event.id}"
}`}
              </pre>
            </div>
          </div>

          {/* Attempts History (mock) */}
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Attempts History</p>
            <div className="bg-gray-50 rounded-lg p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="pb-2">#</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Latency</th>
                    <th className="pb-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(Math.max(event.retryCount + 1, 1))].map((_, i) => (
                    <tr key={i} className="border-t border-gray-200">
                      <td className="py-2 text-gray-700">{i + 1}</td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${i === 0 && event.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : i === event.retryCount && (event.status === 'FAILED' || event.status === 'DLQ') ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {i === 0 && event.status === 'DELIVERED' ? 'Success' :
                           i === event.retryCount && (event.status === 'FAILED' || event.status === 'DLQ') ? 'Failed' :
                           'Retry'}
                        </span>
                      </td>
                      <td className="py-2 text-gray-700">{Math.floor(Math.random() * 500) + 100}ms</td>
                      <td className="py-2 text-gray-500">{formatDate(event.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          {(event.status === 'FAILED' || event.status === 'DLQ') && (
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <Button onClick={() => onReplay(event.id)}>
                <RefreshCw size={16} className="mr-2" />
                Replay Event
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
