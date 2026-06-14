import React, { useState } from 'react';
import { useTax } from '../context/TaxContext';
import { ArrowLeft, CreditCard, Lock, Check, Loader2, ShieldCheck, Key } from 'lucide-react';

export const PaymentGate: React.FC = () => {
  const { unlockCalculator, setCurrentStep } = useTax();

  // Input states
  const [transactionId, setTransactionId] = useState('');
  const [showVerifyForm, setShowVerifyForm] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const paymentLink = 'https://superprofile.bio/vp/tax-calculator-app';

  // Validation: Exactly a 10-digit number
  const isIdValid = /^\d{10}$/.test(transactionId);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!isIdValid) {
      setError('Please enter a valid 10-digit numeric Transaction ID.');
      return;
    }

    setError('');
    setIsVerifying(true);

    // Simulate verification delay
    setTimeout(() => {
      setIsVerifying(false);
      setSuccess(true);
      
      // Complete verification and unlock calculator
      setTimeout(() => {
        unlockCalculator(transactionId);
        setCurrentStep(1); // Proceed to step 1
      }, 1500);
    }, 1500);
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/20 via-transparent to-transparent">
      <div className="max-w-md w-full space-y-6">
        
        {/* Back navigation */}
        <button
          onClick={() => setCurrentStep(0)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Landing Page</span>
        </button>

        {/* Card Container */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-premium relative overflow-hidden">
          {/* Top visual accent line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          {success ? (
            /* Success State */
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100 shadow-md shadow-emerald-500/10">
                <ShieldCheck className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-outfit font-black text-slate-900">
                  Payment Verified!
                </h2>
                <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                  Thank you for your purchase. We are unlocking the calculator and routing you to the tax wizard...
                </p>
              </div>
              <div className="flex justify-center space-x-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse delay-100"></span>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse delay-200"></span>
              </div>
            </div>
          ) : (
            /* Paywall & Input forms */
            <div className="space-y-6">
              
              {/* Header */}
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto border border-blue-100 shadow-sm">
                  <Lock className="w-5 h-5 text-blue-700" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-3xl font-outfit font-black text-slate-900 tracking-tight">
                    Unlock Calculator
                  </h2>
                  <p className="text-sm text-slate-500">
                    Unlock full access to compare regimes, deduct HRA, and plan investments.
                  </p>
                </div>
              </div>

              {/* Paywall Bullet features */}
              <div className="bg-slate-50/65 border border-slate-100 rounded-2xl p-5 space-y-3.5 text-left">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">What's Unlocked:</h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Interactive 8-Step Tax Wizard</strong>: Profile details, HRA deductions, and custom investments tracking.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Live Exemption Sandbox</strong>: Real-time calculation feedback as you adjust inputs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Comparative Tax Report</strong>: Personalized advice, warnings, and detailed slab breakdowns.</span>
                  </li>
                </ul>
              </div>

              {/* Actions Stack */}
              <div className="space-y-4 pt-2">
                {/* Primary Button: Unlock (Opens Payment Link) */}
                <a
                  href={paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-md shadow-blue-500/10 transition-all text-center flex items-center justify-center gap-2 cursor-pointer font-outfit text-sm"
                >
                  <CreditCard className="w-4.5 h-4.5" />
                  <span>Unlock Tax Calculator</span>
                </a>

                {/* Secondary Option Toggler */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowVerifyForm(!showVerifyForm);
                      setError('');
                      setTouched(false);
                    }}
                    className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {showVerifyForm ? 'Hide payment verification' : 'Already paid? Enter transaction details'}
                  </button>
                </div>

                {/* Verification Form (Collapsible) */}
                {showVerifyForm && (
                  <form onSubmit={handleVerify} className="border-t border-slate-100 pt-5 space-y-4 animate-fade-in text-left">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Transaction ID / Reference
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                          <Key className="w-4.5 h-4.5" />
                        </span>
                        <input
                          type="text"
                          pattern="\d*"
                          maxLength={15}
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value.replace(/\D/g, ''))}
                          placeholder="Enter 10-digit number"
                          disabled={isVerifying}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                            touched && !isIdValid
                              ? 'border-red-300 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                              : 'border-slate-200 bg-slate-50/35 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold block leading-snug">
                        💡 For testing, enter **any 10-digit number** (e.g. `1234567890`).
                      </span>
                      {touched && !isIdValid && (
                        <p className="text-[11px] font-semibold text-red-500">
                          {error || 'Reference code must be exactly 10 digits.'}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isVerifying}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs font-outfit tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Verifying Payment...</span>
                        </>
                      ) : (
                        <span>Verify & Unlock</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
