import React, { type ReactNode } from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel bg-white/85 border-b border-slate-200/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Elegant logo mark */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 font-outfit text-xl">
              ₹
            </div>
            <div className="flex flex-col">
              <span className="font-outfit font-extrabold text-lg leading-tight tracking-tight text-slate-900">
                TaxCalc<span className="text-blue-600">India</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                Privacy-First Calculator
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 shadow-sm">
              FY 2025-26
            </span>
            <div className="hidden md:flex items-center space-x-1 text-xs text-slate-500 font-medium bg-slate-100/80 px-2.5 py-1.5 rounded-lg border border-slate-200/50">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-600 mr-1" />
              <span>100% Client-Side Only</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-slate-800 pb-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 text-white font-outfit font-bold text-lg mb-3">
                <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-xs text-white">₹</div>
                <span>TaxCalc India</span>
              </div>
              <p className="text-sm text-slate-400 max-w-md">
                Simplifying Indian income tax evaluation for salaried individuals. Compare your regimes without sharing your financial data.
              </p>
            </div>
            <div className="flex flex-col md:items-end space-y-3">
              <span className="text-xs text-slate-500 font-medium">
                Assessment Year: AY 2026-27
              </span>
              <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs border border-slate-700/50">
                <Info className="w-3.5 h-3.5 text-blue-400 mr-1.5 flex-shrink-0" />
                <span>Updated with Union Budget 2025 tax rules.</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
            <p className="max-w-xl text-left leading-relaxed">
              <strong>Disclaimer:</strong> This calculator is for educational and planning purposes only. It is not tax advice. Standard deductions, HRA exemptions, and other deductions apply as per the Income Tax Act, 1961. Always consult a Chartered Accountant (CA) or certified tax advisor before making final financial decisions.
            </p>
            <p className="whitespace-nowrap">
              &copy; {new Date().getFullYear()} TaxCalc India. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
