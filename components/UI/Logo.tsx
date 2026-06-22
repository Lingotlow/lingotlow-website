'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className, size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: 36,
    md: 44,
    lg: 56,
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const sizeClasses = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11',
    lg: 'h-14 w-14',
  };

  return (
    <Link href="/" className={cn('flex items-center gap-3 group', className)}>
      <div className={cn('relative flex-shrink-0', sizeClasses[size])}>
        <Image
          src="/logo-v2.png"
          alt="Lingotlow"
          width={sizes[size]}
          height={sizes[size]}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className={cn('font-bold text-white tracking-tight', textSizes[size])}>
          Lingotlow
        </span>
      )}
    </Link>
  );
}
