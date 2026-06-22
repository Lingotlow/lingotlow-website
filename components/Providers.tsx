'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a1a',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '12px 20px',
            },
            success: {
              style: {
                background: '#1a1a1a',
                color: '#F5A623',
              },
            },
            error: {
              style: {
                background: '#1a1a1a',
                color: '#ef4444',
              },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
