import React from 'react';
import { useTax, type AgeCategory } from '../context/TaxContext';
import { LivePreviewPanel } from './LivePreviewPanel';
import { RotateCcw } from 'lucide-react';

interface TestCase {
  name: string;
  description: string;
  data: {
    ageCategory: AgeCategory;
    monthlyTakeHome: number;
    otherIncome: number;
    savingsInterest: number;
    fdInterest: number;
    basicSalary: number;
    hraReceived: number;
    pfDeduction: number;
    paysRent: boolean;
    monthlyRent: number;
    city: string;
    isMetro: boolean;
    has80C: boolean;
    total80C: number;
    hasHealthInsurance: boolean;
    healthSelf: number;
    healthParents: number;
    parentsSenior: boolean;
    hasHomeLoan: boolean;
    homeLoanInterest: number;
    hasNPS: boolean;
    npsAmount: number;
    hasEducationLoan: boolean;
    educationLoanInterest: number;
    hasProfessionalTax: boolean;
    professionalTaxAmount: number;
    charitableDonations: number;
  };
}

const testCases: TestCase[] = [
  {
    name: 'TC 1: Young Salaried, Metro Rent, No Investments',
    description: 'Age 28, Take-home ₹60K/mo. Basic ₹25K, HRA ₹12K, PF ₹3K, Rent ₹15K, Mumbai. No investments. Expected: New Regime wins.',
    data: {
      ageCategory: 'below60',
      monthlyTakeHome: 60000,
      otherIncome: 0,
      savingsInterest: 0,
      fdInterest: 0,
      basicSalary: 25000,
      hraReceived: 12000,
      pfDeduction: 3000,
      paysRent: true,
      monthlyRent: 15000,
      city: 'Mumbai',
      isMetro: true,
      has80C: false,
      total80C: 0,
      hasHealthInsurance: false,
      healthSelf: 0,
      healthParents: 0,
      parentsSenior: false,
      hasHomeLoan: false,
      homeLoanInterest: 0,
      hasNPS: false,
      npsAmount: 0,
      hasEducationLoan: false,
      educationLoanInterest: 0,
      hasProfessionalTax: false,
      professionalTaxAmount: 0,
      charitableDonations: 0,
    },
  },
  {
    name: 'TC 2: Middle-Aged, High Investments & Rent',
    description: 'Age 35, Take-home ₹120K/mo. Basic ₹50K, HRA ₹25K, PF ₹6K, Rent ₹30K, Bangalore (non-metro). 80C ₹1.5L, health ₹25K, home loan ₹2L. Expected: Old Regime wins.',
    data: {
      ageCategory: 'below60',
      monthlyTakeHome: 120000,
      otherIncome: 0,
      savingsInterest: 0,
      fdInterest: 0,
      basicSalary: 50000,
      hraReceived: 25000,
      pfDeduction: 6000,
      paysRent: true,
      monthlyRent: 30000,
      city: 'Bangalore',
      isMetro: false,
      has80C: true,
      total80C: 150000,
      hasHealthInsurance: true,
      healthSelf: 25000,
      healthParents: 0,
      parentsSenior: false,
      hasHomeLoan: true,
      homeLoanInterest: 200000,
      hasNPS: false,
      npsAmount: 0,
      hasEducationLoan: false,
      educationLoanInterest: 0,
      hasProfessionalTax: false,
      professionalTaxAmount: 0,
      charitableDonations: 0,
    },
  },
  {
    name: 'TC 3: Senior Citizen with Interest Income',
    description: 'Age 65, Take-home ₹40K/mo. Interest ₹40K (₹30K FD + ₹10K Savings). Health ₹50K. Expected: Old Regime wins.',
    data: {
      ageCategory: 'senior60to80',
      monthlyTakeHome: 40000,
      otherIncome: 40000,
      savingsInterest: 10000,
      fdInterest: 30000,
      basicSalary: 0,
      hraReceived: 0,
      pfDeduction: 0,
      paysRent: false,
      monthlyRent: 0,
      city: '',
      isMetro: false,
      has80C: false,
      total80C: 0,
      hasHealthInsurance: true,
      healthSelf: 50000,
      healthParents: 0,
      parentsSenior: false,
      hasHomeLoan: false,
      homeLoanInterest: 0,
      hasNPS: false,
      npsAmount: 0,
      hasEducationLoan: false,
      educationLoanInterest: 0,
      hasProfessionalTax: false,
      professionalTaxAmount: 0,
      charitableDonations: 0,
    },
  },
  {
    name: 'TC 4: Rebate Threshold (New Regime)',
    description: 'Take-home ₹1,06,250/mo (₹12.75L annual). No investments. Expected: Tax = ₹0 (87A rebate covers ₹60,000 tax).',
    data: {
      ageCategory: 'below60',
      monthlyTakeHome: 106250,
      otherIncome: 0,
      savingsInterest: 0,
      fdInterest: 0,
      basicSalary: 0,
      hraReceived: 0,
      pfDeduction: 0,
      paysRent: false,
      monthlyRent: 0,
      city: '',
      isMetro: false,
      has80C: false,
      total80C: 0,
      hasHealthInsurance: false,
      healthSelf: 0,
      healthParents: 0,
      parentsSenior: false,
      hasHomeLoan: false,
      homeLoanInterest: 0,
      hasNPS: false,
      npsAmount: 0,
      hasEducationLoan: false,
      educationLoanInterest: 0,
      hasProfessionalTax: false,
      professionalTaxAmount: 0,
      charitableDonations: 0,
    },
  },
  {
    name: 'TC 5: Rebate Threshold (Old Regime)',
    description: 'Take-home ₹45,833/mo (₹5.5L annual). 80C ₹50K. Expected: Tax = ₹0 (Taxable income is ₹4.5L, 87A rebate covers ₹12.5K tax).',
    data: {
      ageCategory: 'below60',
      monthlyTakeHome: 45833,
      otherIncome: 0,
      savingsInterest: 0,
      fdInterest: 0,
      basicSalary: 0,
      hraReceived: 0,
      pfDeduction: 0,
      paysRent: false,
      monthlyRent: 0,
      city: '',
      isMetro: false,
      has80C: true,
      total80C: 50000,
      hasHealthInsurance: false,
      healthSelf: 0,
      healthParents: 0,
      parentsSenior: false,
      hasHomeLoan: false,
      homeLoanInterest: 0,
      hasNPS: false,
      npsAmount: 0,
      hasEducationLoan: false,
      educationLoanInterest: 0,
      hasProfessionalTax: false,
      professionalTaxAmount: 0,
      charitableDonations: 0,
    },
  },
  {
    name: 'TC 6: HRA Exemption Edge Case',
    description: 'Basic ₹50K, HRA ₹20K, Rent ₹15K, Mumbai. Expected HRA Exemption: ₹1.2L annually.',
    data: {
      ageCategory: 'below60',
      monthlyTakeHome: 100000,
      otherIncome: 0,
      savingsInterest: 0,
      fdInterest: 0,
      basicSalary: 50000,
      hraReceived: 20000,
      pfDeduction: 0,
      paysRent: true,
      monthlyRent: 15000,
      city: 'Mumbai',
      isMetro: true,
      has80C: false,
      total80C: 0,
      hasHealthInsurance: false,
      healthSelf: 0,
      healthParents: 0,
      parentsSenior: false,
      hasHomeLoan: false,
      homeLoanInterest: 0,
      hasNPS: false,
      npsAmount: 0,
      hasEducationLoan: false,
      educationLoanInterest: 0,
      hasProfessionalTax: false,
      professionalTaxAmount: 0,
      charitableDonations: 0,
    },
  },
  {
    name: 'TC 7: Rent Paid, No HRA (80GG Fallback)',
    description: 'No HRA received. Rent ₹10K/mo. Basic ₹40K. Expected: 80GG deduction = ₹60K.',
    data: {
      ageCategory: 'below60',
      monthlyTakeHome: 100000,
      otherIncome: 0,
      savingsInterest: 0,
      fdInterest: 0,
      basicSalary: 40000,
      hraReceived: 0,
      pfDeduction: 0,
      paysRent: true,
      monthlyRent: 10000,
      city: 'Bangalore',
      isMetro: false,
      has80C: false,
      total80C: 0,
      hasHealthInsurance: false,
      healthSelf: 0,
      healthParents: 0,
      parentsSenior: false,
      hasHomeLoan: false,
      homeLoanInterest: 0,
      hasNPS: false,
      npsAmount: 0,
      hasEducationLoan: false,
      educationLoanInterest: 0,
      hasProfessionalTax: false,
      professionalTaxAmount: 0,
      charitableDonations: 0,
    },
  },
];

export const Sandbox: React.FC = () => {
  const { state, updateState, resetState } = useTax();

  const handleInputChange = (field: keyof typeof state, value: any) => {
    // Parse numeric fields to avoid string calculations
    if (typeof state[field] === 'number') {
      const parsed = parseFloat(value);
      updateState({ [field]: isNaN(parsed) ? 0 : parsed });
    } else {
      updateState({ [field]: value });
    }
  };

  const loadTestCase = (testCase: TestCase) => {
    updateState(testCase.data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-6">
      
      {/* Sandbox Header with Loader */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-slate-800">
        <div>
          <h2 className="text-2xl font-outfit font-extrabold flex items-center gap-2">
            <span className="bg-blue-600 w-2.5 h-2.5 rounded-full inline-block"></span>
            <span>Developer Sandbox Sandbox</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Directly test the mathematical tax engine. Modify any variables on the fly or load predefined test cases to verify rebates, HRA exemptions, and cess.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            onChange={(e) => {
              const idx = parseInt(e.target.value);
              if (!isNaN(idx)) loadTestCase(testCases[idx]);
            }}
            defaultValue=""
            className="w-full md:w-64 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm font-semibold text-white focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>Load PRD Test Case...</option>
            {testCases.map((tc, idx) => (
              <option key={idx} value={idx}>{tc.name}</option>
            ))}
          </select>
          <button
            onClick={resetState}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors text-slate-300"
            title="Reset All Inputs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form (8 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Basic Info */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-premium space-y-4">
            <h3 className="font-outfit font-bold text-slate-800 text-base border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-3 rounded-full bg-blue-600 inline-block"></span>
              <span>1. Basic Profile & Income</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-500 uppercase">Age Category</label>
                <select
                  value={state.ageCategory}
                  onChange={(e) => handleInputChange('ageCategory', e.target.value as AgeCategory)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 text-sm bg-white"
                >
                  <option value="below60">Below 60 years</option>
                  <option value="senior60to80">60 to 80 years (Senior)</option>
                  <option value="superSenior80plus">Above 80 years (Super Senior)</option>
                </select>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-500 uppercase">Monthly Take-Home (₹)</label>
                <input
                  type="number"
                  value={state.monthlyTakeHome || ''}
                  onChange={(e) => handleInputChange('monthlyTakeHome', e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-50 pt-4">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-semibold text-slate-500 uppercase">Savings Interest (₹/yr)</label>
                <input
                  type="number"
                  value={state.savingsInterest || ''}
                  onChange={(e) => handleInputChange('savingsInterest', e.target.value)}
                  placeholder="0"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-semibold text-slate-500 uppercase">FD Interest (₹/yr)</label>
                <input
                  type="number"
                  value={state.fdInterest || ''}
                  onChange={(e) => handleInputChange('fdInterest', e.target.value)}
                  placeholder="0"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-semibold text-slate-500 uppercase">Other Income (₹/yr)</label>
                <input
                  type="number"
                  value={state.otherIncome - state.savingsInterest - state.fdInterest || ''}
                  onChange={(e) => {
                    const other = parseFloat(e.target.value) || 0;
                    handleInputChange('otherIncome', other + state.savingsInterest + state.fdInterest);
                  }}
                  placeholder="0"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 2: HRA Components */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-premium space-y-4">
            <h3 className="font-outfit font-bold text-slate-800 text-base border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-3 rounded-full bg-blue-600 inline-block"></span>
              <span>2. Salary slip & Rent Details</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-500 uppercase">Basic (₹/mo)</label>
                <input
                  type="number"
                  value={state.basicSalary || ''}
                  onChange={(e) => handleInputChange('basicSalary', e.target.value)}
                  placeholder="0"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-500 uppercase">HRA Received (₹/mo)</label>
                <input
                  type="number"
                  value={state.hraReceived || ''}
                  onChange={(e) => handleInputChange('hraReceived', e.target.value)}
                  placeholder="0"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-500 uppercase">PF Deduction (₹/mo)</label>
                <input
                  type="number"
                  value={state.pfDeduction || ''}
                  onChange={(e) => handleInputChange('pfDeduction', e.target.value)}
                  placeholder="0"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-4">
              <div className="flex items-center space-x-3 text-left">
                <input
                  type="checkbox"
                  id="paysRent"
                  checked={state.paysRent}
                  onChange={(e) => handleInputChange('paysRent', e.target.checked)}
                  className="w-4.5 h-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="paysRent" className="text-sm font-semibold text-slate-700">
                  I pay rent for accommodation
                </label>
              </div>

              {state.paysRent && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Monthly Rent (₹)</label>
                    <input
                      type="number"
                      value={state.monthlyRent || ''}
                      onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                      placeholder="0"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-slate-500 uppercase">City Type</label>
                    <select
                      value={state.city}
                      onChange={(e) => {
                        const val = e.target.value;
                        const metro = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai'].includes(val);
                        updateState({ city: val, isMetro: metro });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white"
                    >
                      <option value="">Select city...</option>
                      <option value="Mumbai">Mumbai (Metro)</option>
                      <option value="Delhi">Delhi (Metro)</option>
                      <option value="Kolkata">Kolkata (Metro)</option>
                      <option value="Chennai">Chennai (Metro)</option>
                      <option value="Bangalore">Bangalore (Non-Metro)</option>
                      <option value="Hyderabad">Hyderabad (Non-Metro)</option>
                      <option value="Pune">Pune (Non-Metro)</option>
                      <option value="Other">Other (Non-Metro)</option>
                    </select>
                  </div>
                  <div className="flex items-center h-full pt-6 justify-center">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                      state.isMetro
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>
                      {state.isMetro ? '50% Metro Calculation' : '40% Non-Metro Calculation'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Deductions */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-premium space-y-4">
            <h3 className="font-outfit font-bold text-slate-800 text-base border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-3 rounded-full bg-blue-600 inline-block"></span>
              <span>3. Tax-Saving Investments & Deductions (Old Regime)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-500 uppercase">80C Investments (₹/yr)</label>
                <input
                  type="number"
                  value={state.total80C || ''}
                  onChange={(e) => handleInputChange('total80C', e.target.value)}
                  placeholder="PPF, ELSS, Insurance premiums"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-500 uppercase">Home Loan Interest (Section 24)</label>
                <input
                  type="number"
                  value={state.homeLoanInterest || ''}
                  onChange={(e) => handleInputChange('homeLoanInterest', e.target.value)}
                  placeholder="Interest portion only (max ₹2L)"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-50 pt-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-500 uppercase">Health Self (80D)</label>
                <input
                  type="number"
                  value={state.healthSelf || ''}
                  onChange={(e) => handleInputChange('healthSelf', e.target.value)}
                  placeholder="Self + Family"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-500 uppercase">Health Parents (80D)</label>
                <input
                  type="number"
                  value={state.healthParents || ''}
                  onChange={(e) => handleInputChange('healthParents', e.target.value)}
                  placeholder="Parents premium"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm"
                />
              </div>

              <div className="flex items-center h-full pt-6 justify-start">
                <label className="flex items-center space-x-2 text-xs font-semibold text-slate-600">
                  <input
                    type="checkbox"
                    checked={state.parentsSenior}
                    onChange={(e) => handleInputChange('parentsSenior', e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Parents are Senior (60+)</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-50 pt-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-500 uppercase">NPS Additional (80CCD(1B))</label>
                <input
                  type="number"
                  value={state.npsAmount || ''}
                  onChange={(e) => handleInputChange('npsAmount', e.target.value)}
                  placeholder="Max ₹50K"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-500 uppercase">Charitable Donations (80G)</label>
                <input
                  type="number"
                  value={state.charitableDonations || ''}
                  onChange={(e) => handleInputChange('charitableDonations', e.target.value)}
                  placeholder="charity donations"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-50 pt-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-500 uppercase">Education Loan (80E)</label>
                <input
                  type="number"
                  value={state.educationLoanInterest || ''}
                  onChange={(e) => handleInputChange('educationLoanInterest', e.target.value)}
                  placeholder="Interest paid"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-500 uppercase">Professional Tax</label>
                <input
                  type="number"
                  value={state.professionalTaxAmount || ''}
                  onChange={(e) => handleInputChange('professionalTaxAmount', e.target.value)}
                  placeholder="Max ₹2,500"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Preview Card (4 Columns) */}
        <div className="lg:col-span-5">
          <LivePreviewPanel />
        </div>

      </div>
    </div>
  );
};
