'use client';

import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent transition-all duration-200 bg-white text-[#1a1a1a] placeholder-[#6B6B6B]',
        className
      )}
      {...props}
    />
  );
}
