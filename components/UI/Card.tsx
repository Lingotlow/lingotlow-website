import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('bg-white rounded-lg shadow-md border border-gray-200', className)}>
      {children}
    </div>
  );
}
