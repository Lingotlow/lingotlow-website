'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/Input';
import { PasswordInput } from '@/components/UI/PasswordInput';
import { Card } from '@/components/UI/Card';
import { toast } from 'react-hot-toast';
import { apiClient } from '@/lib/api-client';

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const score = [hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;
    return {
      isValid: hasMinLength && score >= 3,
      score,
      hasMinLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    
    if (!passwordValidation.isValid) {
      const msg = 'Password must be at least 8 characters and contain at least 3 of: uppercase, lowercase, number, special character';
      setError(msg);
      toast.error(msg);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      const msg = 'Passwords do not match';
      setError(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.post('/auth/signup', {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        name: formData.name,
      });
      
      // Salvar o tenantKey retornado
      const tenantKey = response.data.tenantKey;
      localStorage.setItem('tenantKey', tenantKey);
      
      toast.success('Account created successfully! Welcome to Lingotlow.');
      
      // Fazer login automático
      const loginResponse = await apiClient.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      
      localStorage.setItem('token', loginResponse.data.token);
      localStorage.setItem('user', JSON.stringify({ email: formData.email, role: 'USER' }));
      
      router.push('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to create account';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordValidation = validatePassword(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] py-12 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Create Account</h1>
          <p className="text-[#6B6B6B] mt-2">Start using Lingotlow in minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a]">Company / Name</label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Acme Inc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a]">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a]">Password</label>
            <PasswordInput
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Min 8 characters"
              required
            />
            {formData.password && (
              <div className="mt-2 space-y-1">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className={passwordValidation.hasMinLength ? 'text-green-600' : 'text-gray-400'}>
                    ✓ 8+ chars
                  </span>
                  <span className={passwordValidation.hasUpperCase ? 'text-green-600' : 'text-gray-400'}>
                    ✓ Uppercase
                  </span>
                  <span className={passwordValidation.hasLowerCase ? 'text-green-600' : 'text-gray-400'}>
                    ✓ Lowercase
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className={passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-400'}>
                    ✓ Number
                  </span>
                  <span className={passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-gray-400'}>
                    ✓ Special char
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all ${
                      passwordValidation.score >= 4 ? 'bg-green-600' :
                      passwordValidation.score >= 3 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${(passwordValidation.score / 5) * 100}%` }}
                  />
                </div>
                {!passwordValidation.isValid && passwordValidation.hasMinLength && (
                  <p className="text-xs text-yellow-600">Add more variety</p>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a]">Confirm Password</label>
            <PasswordInput
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirm your password"
              required
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-xs text-red-600 mt-1">✗ Passwords do not match</p>
            )}
            {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password.length >= 8 && (
              <p className="text-xs text-green-600 mt-1">✓ Passwords match</p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#6B6B6B]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#F5A623] hover:text-[#D4891C] font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
