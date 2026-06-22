'use client';

import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-[#E0E0E0] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Logo size="sm" />
        <span className="text-lg font-semibold text-[#1a1a1a]">Dashboard</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[#6B6B6B]">
          <User size={18} className="text-[#F5A623]" />
          <span className="text-sm">{user?.email || 'User'}</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#1a1a1a] transition-colors"
        >
          <LogOut size={16} className="text-[#F5A623]" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
