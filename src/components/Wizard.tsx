import React, { useState } from 'react';
import { useTax } from '../context/TaxContext';
import { LivePreviewPanel } from './LivePreviewPanel';
import { 
  ArrowRight, 
  ChevronDown, 
  Info, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-100 rounded-xl bg-slate-50/40 overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3 flex items-center justify-between text-left font-semibold text-slate-700 hover:text-blue-600 transition-colors text-xs"
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-blue-600' : ''
          }`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 border-t border-slate-100/60' : 'max-h-0'
        } overflow-hidden`}
      >
        <p className="px-5 py-3.5 text-xs text-slate-500 leading-relaxed bg-white/50">
          {answer}
        </p>
      </div>
    </div>
  );
};

export const Wizard: React.FC = () => {
  const { state, updateState, currentStep, setCurrentStep } = useTax();

  // Local interaction states
  const [showOtherIncomeFields, setShowOtherIncomeFields] = useState(
    state.otherIncome > 0 || state.savingsInterest > 0 || state.fdInterest > 0
  );

  // Validation checking
  const salaryError = state.monthlyTakeHome > 0 && state.monthlyTakeHome < 1000;
  const salaryWarning = state.monthlyTakeHome > 1000000;
  const isStep2Valid = state.monthlyTakeHome >= 1000;

  const getStepValidation = () => {
    if (currentStep === 1) return true;
    if (currentStep === 2) return isStep2Valid;
    return true;
  };

  const handleSalaryChange = (val: string) => {
    const parsed = parseFloat(val);
    updateState({ monthlyTakeHome: isNaN(parsed) ? 0 : parsed });
  };

  const handleOtherIncomeToggle = (hasOther: boolean) => {
    setShowOtherIncomeFields(hasOther);
    if (!hasOther) {
      updateState({ otherIncome: 0, savingsInterest: 0, fdInterest: 0 });
    }
  };

  const handleOtherIncomeFieldChange = (field: 'savingsInterest' | 'fdInterest' | 'generalOther', val: string) => {
    const parsed = parseFloat(val) || 0;
    
    if (field === 'savingsInterest') {
      const general = state.otherIncome - state.savingsInterest - state.fdInterest;
      updateState({ 
        savingsInterest: parsed,
        otherIncome: parsed + state.fdInterest + general
      });
    } else if (field === 'fdInterest') {
      const general = state.otherIncome - state.savingsInterest - state.fdInterest;
      updateState({ 
        fdInterest: parsed,
        otherIncome: state.savingsInterest + parsed + general
      });
    } else {
      updateState({ 
        otherIncome: state.savingsInterest + state.fdInterest + parsed 
      });
    }
  };

  // Navigations
  const handleNext = () => {
    if (getStepValidation()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(0); // Return to landing
    }
  };

  const handleSkip = () => {
    if (currentStep === 2) {
      // Set default salary on skip if not valid
      if (!isStep2Valid) {
        updateState({ monthlyTakeHome: 50000 });
      }
    }
    setCurrentStep(currentStep + 1);
  };

  // Step names dictionary
  const stepTitles: Record<number, string> = {
    1: 'Age Category',
    2: 'Monthly Take-Home',
    3: 'Other Income Sources',
    4: 'Salary Structure & PF',
    5: 'Rent & City (HRA)',
    6: '80C Investments',
    7: '80D Health Insurance',
    8: 'Other Deductions',
    9: 'Report Summary'
  };

  // Step-specific FAQs
  const stepFAQs: Record<number, { q: string; a: string }[]> = {
    1: [
      {
        q: 'Why does my age category matter?',
        a: 'Your age category affects the basic exemption limit under the Old Tax Regime. Taxpayers below 60 years have a ₹2.5 Lakh limit, senior citizens (60-80) have a ₹3 Lakh limit, and super seniors (80+) have a ₹5 Lakh limit. Under the New Regime, slabs are uniform for all age groups.'
      },
      {
        q: 'What if I turn 60 during this financial year?',
        a: 'If your 60th birthday falls at any point between April 1, 2025, and March 31, 2026, you are officially classified as a senior citizen for the entire financial year 2025-26.'
      }
    ],
    2: [
      {
        q: 'What monthly value should I enter?',
        a: 'Enter your monthly net take-home salary. Do not worry about PF, basic, or HRA breakdowns yet; we will collect those specific components in Step 4 to compute deductions.'
      },
      {
        q: 'Can I enter my annual income instead?',
        a: 'No, this field specifically collects your monthly take-home salary. We will automatically calculate the annual salary gross estimate for the engine.'
      }
    ],
    3: [
      {
        q: 'What counts as "Other Income"?',
        a: 'This includes any income outside your primary salary, such as interest earned from savings bank accounts, fixed deposits (FD), capital gains from investments, rental yields, or freelancing profits.'
      },
      {
        q: 'Why is savings interest separated from other incomes?',
        a: 'Interest earned from bank savings accounts qualifies for a dedicated deduction under Section 80TTA (up to ₹10,000 for under 60) or Section 80TTB (up to ₹50,000 on all deposits for senior citizens).'
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Card: Active Wizard Step (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-premium relative overflow-hidden text-left">
            {/* Progress accent */}
            <div 
              className="absolute top-0 left-0 h-1.5 bg-blue-600 transition-all duration-300"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            ></div>

            {/* Header info */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Wizard Onboarding
                </span>
                <h2 className="text-xl font-outfit font-black text-slate-900 mt-0.5">
                  {currentStep <= 8 ? `${currentStep}. ${stepTitles[currentStep]}` : 'Calculations Finished'}
                </h2>
              </div>
              <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-500 font-mono">
                {currentStep <= 8 ? `Step ${currentStep}/8` : 'Complete'}
              </span>
            </div>

            {/* Steps Rendering */}
            <div className="min-h-[260px] flex flex-col justify-between">
              
              {/* Step 1: Age Category */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Select your age bracket. Exemption structures differ based on age group under the Old Regime.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {/* Bracket 1 */}
                    <label 
                      className={`flex items-center justify-between p-4.5 rounded-2xl border-2 transition-all cursor-pointer ${
                        state.ageCategory === 'below60'
                          ? 'border-blue-600 bg-blue-50/15 shadow-sm'
                          : 'border-slate-150 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ageCategory"
                        value="below60"
                        checked={state.ageCategory === 'below60'}
                        onChange={() => updateState({ ageCategory: 'below60' })}
                        className="sr-only"
                      />
                      <div className="space-y-0.5">
                        <span className="text-sm font-bold text-slate-800 block">Below 60 years</span>
                        <span className="text-xs text-slate-400 font-medium">General bracket (Exemption limit: ₹2,50,000)</span>
                      </div>
                      {state.ageCategory === 'below60' && (
                        <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </label>

                    {/* Bracket 2 */}
                    <label 
                      className={`flex items-center justify-between p-4.5 rounded-2xl border-2 transition-all cursor-pointer ${
                        state.ageCategory === 'senior60to80'
                          ? 'border-blue-600 bg-blue-50/15 shadow-sm'
                          : 'border-slate-150 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ageCategory"
                        value="senior60to80"
                        checked={state.ageCategory === 'senior60to80'}
                        onChange={() => updateState({ ageCategory: 'senior60to80' })}
                        className="sr-only"
                      />
                      <div className="space-y-0.5">
                        <span className="text-sm font-bold text-slate-800 block">60 to 80 years</span>
                        <span className="text-xs text-slate-400 font-medium">Senior Citizen (Exemption limit: ₹3,00,000)</span>
                      </div>
                      {state.ageCategory === 'senior60to80' && (
                        <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </label>

                    {/* Bracket 3 */}
                    <label 
                      className={`flex items-center justify-between p-4.5 rounded-2xl border-2 transition-all cursor-pointer ${
                        state.ageCategory === 'superSenior80plus'
                          ? 'border-blue-600 bg-blue-50/15 shadow-sm'
                          : 'border-slate-150 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ageCategory"
                        value="superSenior80plus"
                        checked={state.ageCategory === 'superSenior80plus'}
                        onChange={() => updateState({ ageCategory: 'superSenior80plus' })}
                        className="sr-only"
                      />
                      <div className="space-y-0.5">
                        <span className="text-sm font-bold text-slate-800 block">80 years & above</span>
                        <span className="text-xs text-slate-400 font-medium">Super Senior Citizen (Exemption limit: ₹5,00,000)</span>
                      </div>
                      {state.ageCategory === 'superSenior80plus' && (
                        <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              )}

              {/* Step 2: Monthly Take-Home */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Provide your monthly net take-home salary. This is your in-hand pay (after taxes and PF deductions).
                  </p>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                      Monthly In-Hand Salary
                    </label>
                    <div className="relative max-w-sm">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 font-bold font-outfit text-sm">
                        ₹
                      </span>
                      <input
                        type="number"
                        value={state.monthlyTakeHome || ''}
                        onChange={(e) => handleSalaryChange(e.target.value)}
                        placeholder="Enter amount"
                        className={`w-full pl-8 pr-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                          salaryError
                            ? 'border-red-300 bg-red-50/15 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                            : salaryWarning
                            ? 'border-amber-300 bg-amber-50/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                            : 'border-slate-200 bg-slate-50/35 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500'
                        }`}
                      />
                    </div>

                    {/* Salary error status */}
                    {salaryError && (
                      <p className="text-[11px] font-semibold text-red-500 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" />
                        <span>Monthly take-home salary must be at least ₹1,000.</span>
                      </p>
                    )}

                    {/* Salary warning status */}
                    {salaryWarning && (
                      <p className="text-[11px] font-semibold text-amber-600 flex items-center gap-1 bg-amber-50 border border-amber-100 p-2.5 rounded-lg max-w-md">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        <span>Note: Please check if your monthly in-hand is greater than ₹10 Lakhs (Annual: ₹1.2 Crore).</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Other Income */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Do you earn income outside of your primary salary, such as interest from bank savings accounts or fixed deposits?
                    </p>
                  </div>

                  {/* Toggle Selector Cards */}
                  <div className="grid grid-cols-2 gap-4 max-w-sm">
                    <button
                      type="button"
                      onClick={() => handleOtherIncomeToggle(false)}
                      className={`p-4 rounded-xl border-2 text-center font-bold text-sm transition-all cursor-pointer ${
                        !showOtherIncomeFields
                          ? 'border-blue-600 bg-blue-50/15 text-blue-700'
                          : 'border-slate-150 text-slate-600 hover:border-slate-350'
                      }`}
                    >
                      No Other Incomes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOtherIncomeToggle(true)}
                      className={`p-4 rounded-xl border-2 text-center font-bold text-sm transition-all cursor-pointer ${
                        showOtherIncomeFields
                          ? 'border-blue-600 bg-blue-50/15 text-blue-700'
                          : 'border-slate-150 text-slate-600 hover:border-slate-350'
                      }`}
                    >
                      Yes, I have
                    </button>
                  </div>

                  {/* Other Income Fields */}
                  {showOtherIncomeFields && (
                    <div className="space-y-4 pt-2 border-t border-slate-100 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Savings Interest */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                            Savings Bank Interest (₹/yr)
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-xs font-bold font-outfit">
                              ₹
                            </span>
                            <input
                              type="number"
                              value={state.savingsInterest || ''}
                              onChange={(e) => handleOtherIncomeFieldChange('savingsInterest', e.target.value)}
                              placeholder="0"
                              className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        {/* FD Interest */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                            FD/Term Interest (₹/yr)
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-xs font-bold font-outfit">
                              ₹
                            </span>
                            <input
                              type="number"
                              value={state.fdInterest || ''}
                              onChange={(e) => handleOtherIncomeFieldChange('fdInterest', e.target.value)}
                              placeholder="0"
                              className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        {/* Miscellaneous Incomes */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                            Other General Incomes (₹/yr)
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-xs font-bold font-outfit">
                              ₹
                            </span>
                            <input
                              type="number"
                              value={state.otherIncome - state.savingsInterest - state.fdInterest || ''}
                              onChange={(e) => handleOtherIncomeFieldChange('generalOther', e.target.value)}
                              placeholder="0"
                              className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Steps 4-8 Scaffold Placeholders */}
              {currentStep > 3 && currentStep <= 8 && (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center border border-blue-100">
                    <Info className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-slate-800 font-outfit">
                      Step Placeholder
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                      In subsequent execution phases (Phase 4 & 5), this area will display the form fields to collect details for <strong className="text-slate-600 font-semibold">{stepTitles[currentStep]}</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation buttons footer */}
              <div className="flex justify-between items-center border-t border-slate-100 pt-6 mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 text-xs font-bold font-outfit text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                >
                  ← Back
                </button>

                <div className="flex items-center gap-3">
                  {/* Skip action */}
                  {currentStep <= 8 && (
                    <button
                      type="button"
                      onClick={handleSkip}
                      className="px-4 py-2.5 text-xs font-bold font-outfit text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      Skip
                    </button>
                  )}

                  {/* Next action */}
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!getStepValidation()}
                    className={`px-6 py-2.5 rounded-xl text-white font-bold text-xs font-outfit tracking-wide flex items-center gap-1.5 cursor-pointer shadow-sm transition-all ${
                      getStepValidation()
                        ? 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-500/10'
                        : 'bg-slate-300 shadow-none cursor-not-allowed opacity-80'
                    }`}
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Step-specific FAQs section */}
          {stepFAQs[currentStep] && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider text-left pl-1">
                Frequently Asked Questions
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {stepFAQs[currentStep].map((faq, index) => (
                  <FAQItem key={index} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Sticky Live Preview Panel (5 Cols) */}
        <div className="lg:col-span-5">
          <LivePreviewPanel />
        </div>

      </div>
    </div>
  );
};
