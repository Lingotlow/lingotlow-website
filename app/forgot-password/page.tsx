'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';
import { Card } from '@/components/UI/Card';
import { toast } from 'react-hot-toast';
import { apiClient } from '@/lib/api-client';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implementar endpoint de reset password no backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSent(true);
      toast.success('Reset link sent to your email!');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to send reset link';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] py-12 px-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={32} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a]">Check your email</h2>
          <p className="text-[#6B6B6B] mt-2">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-[#6B6B6B] mt-4">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => setIsSent(false)}
              className="text-[#F5A623] hover:text-[#D4891C] font-medium"
            >
              try again
            </button>
          </p>
          <Link
            href="/login"
            className="inline-block mt-6 text-sm text-[#F5A623] hover:text-[#D4891C] font-medium"
          >
            ← Back to Sign In
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] py-12 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link href="/login" className="inline-flex items-center text-sm text-[#6B6B6B] hover:text-[#1a1a1a] transition-colors mb-4">
            <ArrowLeft size={16} className="mr-1" />
            Back to Sign In
          </Link>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Reset Password</h1>
          <p className="text-[#6B6B6B] mt-2">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a]">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
            />
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Send Reset Link
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#6B6B6B]">
            Remember your password?{' '}
            <Link href="/login" className="text-[#F5A623] hover:text-[#D4891C] font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
