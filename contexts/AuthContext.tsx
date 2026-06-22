'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/lib/api-client';
import { User } from '@/types';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  tenantKey: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tenantKey, setTenantKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedTenant = localStorage.getItem('tenantKey');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Só usar o tenantKey se ele existir no localStorage
        if (storedTenant && storedTenant !== 'null' && storedTenant !== 'undefined') {
          setTenantKey(storedTenant);
        } else {
          // Se não tiver tenantKey, tentar buscar do backend
          fetchUserTenant(token);
        }
      } catch (e) {
        console.error('Error parsing user data', e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tenantKey');
      }
    }
    setIsLoading(false);
  }, []);

  const fetchUserTenant = async (token: string) => {
    try {
      // Tentar buscar o tenant do usuário
      // Por enquanto, vamos criar um tenant padrão baseado no email
      const userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;
      if (userEmail) {
        const emailPrefix = userEmail.split('@')[0];
        const defaultTenant = `user-${emailPrefix}`;
        setTenantKey(defaultTenant);
        localStorage.setItem('tenantKey', defaultTenant);
      }
    } catch (error) {
      console.error('Error fetching user tenant:', error);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    const { token } = response.data;
    
    localStorage.setItem('token', token);
    
    const userData = { email, role: 'USER' };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Buscar o tenant do usuário
    try {
      // Tentar buscar do backend via app_users
      // Por enquanto, criar um tenant baseado no email
      const emailPrefix = email.split('@')[0];
      const tenantKey = `user-${emailPrefix}`;
      setTenantKey(tenantKey);
      localStorage.setItem('tenantKey', tenantKey);
    } catch (error) {
      console.error('Error fetching tenant:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tenantKey');
    setUser(null);
    setTenantKey(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, tenantKey, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
