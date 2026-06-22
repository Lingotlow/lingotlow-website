'use client';

import { Shield, Zap, Clock, GitBranch, BarChart, Lock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Reliable Delivery',
    description: 'Automatic retries with exponential backoff ensure your webhooks always reach their destination.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process webhooks in milliseconds with our highly optimized infrastructure.'
  },
  {
    icon: Clock,
    title: 'Real-time Monitoring',
    description: 'Track every webhook in real-time with detailed logs and performance metrics.'
  },
  {
    icon: GitBranch,
    title: 'Smart Routing',
    description: 'Route webhooks to multiple endpoints with custom rules and transformations.'
  },
  {
    icon: BarChart,
    title: 'Deep Analytics',
    description: 'Understand your webhook traffic with comprehensive analytics and insights.'
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'End-to-end encryption, API keys, and fine-grained access control for peace of mind.'
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Everything you need to{' '}
            <span className="text-blue-600">trust your webhooks</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Built for developers who demand reliability and simplicity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
