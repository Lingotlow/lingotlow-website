'use client';

import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
          <Shield className="w-4 h-4 mr-2" />
          <span>Enterprise-grade reliability</span>
        </div>

        {/* Título principal */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="text-gray-900">Flawless</span>
          <span className="text-blue-600 ml-2">Webhooks.</span>
          <br />
          <span className="text-gray-900">Ironclad</span>
          <span className="text-indigo-600 ml-2">Infrastructure.</span>
        </h1>

        {/* Subtítulo */}
        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Never lose a webhook again. Lingotlow provides reliable delivery, automatic retries,
          and real-time monitoring for all your critical integrations.
        </p>

        {/* Botões */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200 group"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
          >
            Learn More
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <p className="text-3xl font-bold text-gray-900">99.9%</p>
            <p className="text-sm text-gray-600">Delivery Rate</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">500ms</p>
            <p className="text-sm text-gray-600">Avg. Latency</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">∞</p>
            <p className="text-sm text-gray-600">Scalable</p>
          </div>
        </div>
      </div>
    </section>
  );
}
