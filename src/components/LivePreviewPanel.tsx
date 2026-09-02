import React from 'react';
import { useTax } from '../context/TaxContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const LivePreviewPanel: React.FC = () => {
  const { state, oldRegimeTax, newRegimeTax, savings, recommendedRegime } = useTax();

  const annualSalary = state.monthlyTakeHome * 12;
  const totalGrossIncome = annualSalary + state.otherIncome;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getWinnerMessage = () => {
    if (savings === 0) return 'Both regimes result in the same tax.';
    const winnerName = recommendedRegime === 'new' ? 'New Tax Regime' : 'Old Tax Regime';
    return (
      <span className="flex items-center justify-center lg:justify-start gap-1">
        <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
        <span>
          {winnerName} saves you <strong className="text-emerald-700 font-bold">{formatCurrency(savings)}</strong>/year
        </span>
      </span>
    );
  };

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-6 shadow-premium sticky top-24 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
      {/* Header */}
      <div>
        <h3 className="font-outfit font-bold text-slate-800 text-lg flex items-center gap-2">
          <span>Live Estimate</span>
          <span className="text-[10px] uppercase font-bold tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200/50">
            Real-time
          </span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Calculations update instantly as you type.</p>
      </div>

      {/* Dynamic Recommendation */}
      <div className={`p-4 rounded-xl border transition-all duration-300 ${
        savings > 0 
          ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-800' 
          : 'bg-slate-50 border-slate-200 text-slate-700'
      }`}>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 text-center lg:text-left">
          Our Recommendation
        </p>
        <div className="mt-1 text-sm font-semibold text-center lg:text-left leading-relaxed">
          {getWinnerMessage()}
        </div>
      </div>

      {/* Income Summary Stack */}
      <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-100 space-y-2.5">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Income Summary</h4>
        <div className="flex justify-between text-xs text-slate-600">
          <span>Annual Salary (Monthly x 12)</span>
          <span className="font-semibold text-slate-800">{formatCurrency(annualSalary)}</span>
        </div>
        <div className="flex justify-between text-xs text-slate-600">
          <span>Other Income (Savings, FDs)</span>
          <span className="font-semibold text-slate-800">{formatCurrency(state.otherIncome)}</span>
        </div>
        <div className="border-t border-slate-200/60 pt-2 flex justify-between text-xs font-bold text-slate-800">
          <span>Total Gross Income</span>
          <span>{formatCurrency(totalGrossIncome)}</span>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-2 gap-4">
        {/* Old Regime Card */}
        <div className={`p-4 rounded-xl border transition-all-custom ${
          recommendedRegime === 'old' && savings > 0
            ? 'border-blue-300 bg-blue-50/20 shadow-sm'
            : 'border-slate-100 bg-slate-50/30'
        }`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-extrabold text-slate-700 font-outfit uppercase">Old Regime</span>
            {recommendedRegime === 'old' && savings > 0 && (
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            )}
          </div>
          <div className="space-y-2 text-left">
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Taxable Income</p>
              <p className="text-sm font-bold text-slate-700">{formatCurrency(oldRegimeTax.taxableIncome)}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Tax (incl. Cess)</p>
              <p className={`text-base font-black ${recommendedRegime === 'old' && savings > 0 ? 'text-blue-700' : 'text-slate-800'}`}>
                {formatCurrency(oldRegimeTax.totalTax)}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Effective Rate</p>
              <p className="text-xs font-semibold text-slate-600">
                {oldRegimeTax.effectiveRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* New Regime Card */}
        <div className={`p-4 rounded-xl border transition-all-custom ${
          recommendedRegime === 'new' && savings > 0
            ? 'border-emerald-300 bg-emerald-50/25 shadow-sm'
            : 'border-slate-100 bg-slate-50/30'
        }`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-extrabold text-slate-700 font-outfit uppercase">New Regime</span>
            {recommendedRegime === 'new' && savings > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            )}
          </div>
          <div className="space-y-2 text-left">
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Taxable Income</p>
              <p className="text-sm font-bold text-slate-700">{formatCurrency(newRegimeTax.taxableIncome)}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Tax (incl. Cess)</p>
              <p className={`text-base font-black ${recommendedRegime === 'new' && savings > 0 ? 'text-emerald-700' : 'text-slate-800'}`}>
                {formatCurrency(newRegimeTax.totalTax)}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Effective Rate</p>
              <p className="text-xs font-semibold text-slate-600">
                {newRegimeTax.effectiveRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Slab Tracker */}
      <div className="border-t border-slate-100 pt-4 space-y-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
          <span>Active Tax Slab (New Regime)</span>
          <span className="text-[10px] text-slate-400 lowercase font-normal">highlights taxable range</span>
        </h4>
        <div className="space-y-1.5 text-left">
          {newRegimeTax.slabsBreakdown.map((slab, index) => {
            const isCurrentSlab = slab.taxableAmount > 0;
            return (
              <div
                key={index}
                className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                  isCurrentSlab
                    ? 'bg-blue-50/45 border-blue-100 text-slate-800 font-semibold'
                    : 'bg-transparent border-transparent text-slate-400'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isCurrentSlab ? 'bg-blue-600' : 'bg-transparent'}`}></span>
                  <span>{slab.slabRange}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-right font-mono">
                  <span>{slab.rate}%</span>
                  {isCurrentSlab && (
                    <>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-blue-700">{formatCurrency(slab.tax)}</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Privacy Guarantee */}
      <div className="border-t border-slate-100 pt-4 flex items-center space-x-2 text-[10px] text-slate-400 justify-center">
        <span>🔒 Client-side browser execution. We do not store financial data.</span>
      </div>
    </div>
  );
};
