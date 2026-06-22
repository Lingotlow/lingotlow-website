'use client';

import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Configure your endpoint',
    description: 'Set up your webhook URL and define retry policies in minutes.'
  },
  {
    number: '02',
    title: 'Get your API key',
    description: 'Generate a secure API key to authenticate your webhook requests.'
  },
  {
    number: '03',
    title: 'Send webhooks with confidence',
    description: 'Lingotlow handles delivery, retries, and monitoring automatically.'
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            How it works in{' '}
            <span className="text-indigo-600">3 simple steps</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Get started in minutes, not days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 font-bold text-2xl mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-2/3 w-1/4 h-0.5 bg-gray-300">
                  <ArrowRight className="absolute -right-4 -top-3 w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/login"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Start building now
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
