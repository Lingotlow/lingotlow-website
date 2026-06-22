'use client';

import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export default function HomePage() {
  return (
    <>
      {/* Navegação */}
      <nav className="fixed top-0 w-full bg-[#1a1a1a] border-b border-gray-800 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo size="lg" />
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2.5 bg-[#F5A623] hover:bg-[#D4891C] text-[#1a1a1a] font-semibold rounded-lg text-sm transition-colors shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#FFF9E6] to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#F5A623] bg-opacity-10 border border-[#F5A623] text-[#1a1a1a] text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2 text-[#F5A623]" />
            <span>Enterprise-grade reliability</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-[#1a1a1a]">Flawless</span>
            <span className="text-[#F5A623] ml-2">Webhooks.</span>
            <br />
            <span className="text-[#1a1a1a]">Ironclad</span>
            <span className="text-[#F5A623] ml-2">Infrastructure.</span>
          </h1>

          <p className="mt-6 text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Never lose a webhook again. Lingotlow provides reliable delivery, automatic retries,
            and real-time monitoring for all your critical integrations.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center px-8 py-4 bg-[#F5A623] hover:bg-[#D4891C] text-[#1a1a1a] font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl group"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center px-8 py-4 bg-white text-[#1a1a1a] font-semibold rounded-xl hover:bg-gray-50 transition-colors border border-[#E0E0E0] shadow-sm"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <p className="text-3xl font-bold text-[#1a1a1a]">99.9%</p>
              <p className="text-sm text-[#6B6B6B]">Delivery Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#1a1a1a]">500ms</p>
              <p className="text-sm text-[#6B6B6B]">Avg. Latency</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#1a1a1a]">∞</p>
              <p className="text-sm text-[#6B6B6B]">Scalable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
              Everything you need to{' '}
              <span className="text-[#F5A623]">trust your webhooks</span>
            </h2>
            <p className="mt-4 text-[#6B6B6B]">
              Built for developers who demand reliability and simplicity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Reliable Delivery', desc: 'Automatic retries with exponential backoff ensure your webhooks always reach their destination.' },
              { title: 'Lightning Fast', desc: 'Process webhooks in milliseconds with our highly optimized infrastructure.' },
              { title: 'Real-time Monitoring', desc: 'Track every webhook in real-time with detailed logs and performance metrics.' },
              { title: 'Smart Routing', desc: 'Route webhooks to multiple endpoints with custom rules and transformations.' },
              { title: 'Deep Analytics', desc: 'Understand your webhook traffic with comprehensive analytics and insights.' },
              { title: 'Enterprise Security', desc: 'End-to-end encryption, API keys, and fine-grained access control for peace of mind.' },
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow-sm border border-[#E0E0E0] hover:shadow-md transition-all duration-200 hover:border-[#F5A623]">
                <div className="w-12 h-12 rounded-full bg-[#FFF9E6] flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-[#F5A623]"></div>
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a1a]">{feature.title}</h3>
                <p className="mt-2 text-sm text-[#6B6B6B]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Logo size="sm" showText={false} />
              <span className="text-xl font-bold text-white">Lingotlow</span>
            </div>
            <div className="flex gap-8 text-sm">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Support</Link>
              <Link href="#" className="hover:text-white transition-colors">Status</Link>
            </div>
            <p className="text-sm text-gray-500">© 2026 Lingotlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
