'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';
import { PasswordInput } from '@/components/UI/PasswordInput';
import { Card } from '@/components/UI/Card';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      toast.success('Login successful! Welcome back.');
      router.push('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Invalid credentials';
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] py-12 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Welcome Back</h1>
          <p className="text-[#6B6B6B] mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a]">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a]">Password</label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded border-[#E0E0E0] text-[#F5A623]" />
              <label htmlFor="remember" className="text-sm text-[#6B6B6B]">Remember me</label>
            </div>
            <Link href="/forgot-password" className="text-sm text-[#F5A623] hover:text-[#D4891C] transition-colors">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#6B6B6B]">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#F5A623] hover:text-[#D4891C] font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
