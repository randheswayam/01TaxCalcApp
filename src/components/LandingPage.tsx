import React, { useState } from 'react';
import { useTax } from '../context/TaxContext';
import { Wallet, Shield, BarChart3, ChevronDown, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200/80 rounded-xl bg-white overflow-hidden transition-all duration-300 shadow-sm hover:border-blue-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-slate-800 hover:text-blue-700 transition-colors"
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-blue-600' : ''
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-60 border-t border-slate-100' : 'max-h-0'
        } overflow-hidden`}
      >
        <p className="px-6 py-4 text-sm text-slate-600 leading-relaxed bg-slate-50/50">
          {answer}
        </p>
      </div>
    </div>
  );
};

export const LandingPage: React.FC = () => {
  const { setCurrentStep } = useTax();

  const faqs = [
    {
      question: 'Is this really free?',
      answer: 'Yes, completely free. No signup, no ads, no hidden paywalls, and absolutely no data collection.',
    },
    {
      question: 'How accurate is this?',
      answer: 'We use the official FY 2025-26 (AY 2026-27) tax slabs and rules, including Section 87A rebate and standard deductions. Results are precise estimates based on your inputs.',
    },
    {
      question: "What's the difference between the Old and New regime?",
      answer: 'The Old regime allows deductions (80C, HRA, home loan, etc.) but has higher tax rates. The New regime has lower tax rates but does not allow deductions, except for a standard deduction of ₹75,000.',
    },
    {
      question: 'Can I switch between regimes?',
      answer: 'Yes, salaried employees in India have the flexibility to choose their preferred tax regime every year when filing their Income Tax Return (ITR).',
    },
    {
      question: 'Is my data safe?',
      answer: 'Absolutely. We use a privacy-first architecture. All calculation logic runs locally in your browser. None of your financial information is sent or stored on any server.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-blue-50/30 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Block */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Updated for Union Budget 2025</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-extrabold text-slate-900 tracking-tight leading-[1.08] max-w-2xl mx-auto lg:mx-0">
                Find out which tax regime <span className="text-blue-600 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">saves you more money</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Answer 8 simple questions about your salary, rent, and investments. Get a clear, personalized comparison of the Old vs New tax regime for FY 2025-26. No finance jargon required.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 sm:gap-6 text-sm text-slate-600">
                <div className="flex items-center space-x-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/60 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">FY 2025-26 Latest Slabs</span>
                </div>
                <div className="flex items-center space-x-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/60 shadow-sm">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">100% Secure & Client-Side</span>
                </div>
              </div>

              {/* Call To Action */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center font-outfit cursor-pointer"
                >
                  Start Your Tax Check →
                </button>
                <a
                  href="#how-it-works"
                  className="text-sm font-semibold text-slate-500 hover:text-slate-900 px-4 py-2 transition-colors"
                >
                  How does it work?
                </a>
              </div>

              {/* Bottom Notice */}
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-xs text-slate-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>No registration required. Your data never leaves this browser.</span>
              </div>
            </div>

            {/* Right Hero Block - Interactive Preview mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-100 p-6 space-y-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                {/* Visual gradient accent */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500"></div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-outfit font-bold text-slate-800">Recommendation</h3>
                    <p className="text-xs text-slate-400">Based on standard estimates</p>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                    Winner
                  </span>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-xl p-4 text-center">
                  <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wider">Choose New Regime</p>
                  <p className="text-3xl font-outfit font-black text-emerald-800 mt-1">₹47,500</p>
                  <p className="text-xs text-emerald-600 font-medium mt-1">Annual savings over Old Regime</p>
                </div>

                {/* Simulated visual split chart */}
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Old Tax Regime</span>
                      <span>₹1,12,500</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-slate-400 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>New Tax Regime</span>
                      <span className="text-blue-600 font-bold">₹65,000</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: '49%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs text-slate-500">
                  <span className="flex items-center"><Lock className="w-3.5 h-3.5 text-emerald-600 mr-1" /> Safe & Local</span>
                  <span className="font-semibold text-blue-600">Sample Mockup</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-100/50 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-outfit font-extrabold text-slate-900">
              Get Your Tax Answer in 3 Simple Steps
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              No complex documentation or tax forms required. We do all calculations in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-inner">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="font-outfit font-bold text-lg text-slate-900">1. Enter Salary & Rent</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Provide your bank take-home salary, rent details, and salary basic/HRA components. No complex definitions.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-inner">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-outfit font-bold text-lg text-slate-900">2. Add Deductions</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Input your 80C investments, medical insurance (80D), home loan interest, and other optional tax exemptions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-inner">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-outfit font-bold text-lg text-slate-900">3. Instantly Compare</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                See side-by-side slabs, effective tax rates, slab mappings, and get a clear, plain-english recommendation of your winner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-outfit font-extrabold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about the regimes and how this tool works.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </div>
  );
};
