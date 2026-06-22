'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('bg-white rounded-xl shadow-sm border border-[#E0E0E0] hover:shadow-md transition-all duration-200', className)}>
      {children}
    </div>
  );
}
