'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Webhook, 
  Activity, 
  Key, 
  CreditCard,
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/endpoints', label: 'Endpoints', icon: Webhook },
  { href: '/events', label: 'Events', icon: Activity },
  { href: '/api-keys', label: 'API Keys', icon: Key },
  { href: '/billing', label: 'Billing', icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-[#1a1a1a] flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-[#F5A623]">Lingotlow</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#F5A623] text-[#1a1a1a]'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-[#1a1a1a]' : 'text-[#F5A623]'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
        >
          <LogOut size={20} className="text-[#F5A623]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
