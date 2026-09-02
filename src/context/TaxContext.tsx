/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import {
  type AgeCategory,
  type TaxResult,
  type TaxDeductionsInput,
  calculateNewRegimeTax,
  calculateOldRegimeTax
} from '../utils/taxEngine';

export interface TaxState {
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
}

export interface TaxContextType {
  state: TaxState;
  currentStep: number; // -30: PaymentGate, -20: SignUp, -10: Sandbox, 0: Landing, 1-8: Wizard, 9: Result
  updateState: (updates: Partial<TaxState>) => void;
  setCurrentStep: (step: number) => void;
  resetState: () => void;
  // Derived state
  newRegimeTax: TaxResult;
  oldRegimeTax: TaxResult;
  savings: number;
  recommendedRegime: 'old' | 'new';
  user: { name: string; email: string } | null;
  signUp: (name: string, email: string) => void;
  signOut: () => void;
  hasPaid: boolean;
  paymentReference: string | null;
  unlockCalculator: (reference: string) => void;
}

const initialTaxState: TaxState = {
  ageCategory: 'below60',
  monthlyTakeHome: 0,
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
};

const TaxContext = createContext<TaxContextType | undefined>(undefined);

export const TaxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<TaxState>(initialTaxState);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem('taxcalc_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [hasPaid, setHasPaid] = useState<boolean>(() => {
    return localStorage.getItem('taxcalc_paid') === 'true';
  });
  const [paymentReference, setPaymentReference] = useState<string | null>(() => {
    return localStorage.getItem('taxcalc_pay_ref');
  });

  const updateState = (updates: Partial<TaxState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const resetState = () => {
    setState(initialTaxState);
    setCurrentStep(0);
  };

  const signUp = (name: string, email: string) => {
    const newUser = { name, email };
    localStorage.setItem('taxcalc_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const signOut = () => {
    localStorage.removeItem('taxcalc_user');
    localStorage.removeItem('taxcalc_paid');
    localStorage.removeItem('taxcalc_pay_ref');
    setUser(null);
    setHasPaid(false);
    setPaymentReference(null);
  };

  const unlockCalculator = (reference: string) => {
    localStorage.setItem('taxcalc_paid', 'true');
    localStorage.setItem('taxcalc_pay_ref', reference);
    setHasPaid(true);
    setPaymentReference(reference);
  };

  // Derive tax calculations
  const annualGross = (state.monthlyTakeHome * 12) + state.otherIncome;
  
  const deductionsInput: TaxDeductionsInput = {
    basicSalary: state.basicSalary,
    hraReceived: state.hraReceived,
    pfDeduction: state.pfDeduction,
    paysRent: state.paysRent,
    monthlyRent: state.monthlyRent,
    city: state.city,
    isMetro: state.isMetro,
    total80C: state.total80C,
    healthSelf: state.healthSelf,
    healthParents: state.healthParents,
    parentsSenior: state.parentsSenior,
    homeLoanInterest: state.homeLoanInterest,
    npsAmount: state.npsAmount,
    educationLoanInterest: state.educationLoanInterest,
    professionalTaxAmount: state.professionalTaxAmount,
    savingsInterest: state.savingsInterest,
    fdInterest: state.fdInterest,
    charitableDonations: state.charitableDonations,
  };

  const newRegimeTax = calculateNewRegimeTax(annualGross, state.ageCategory);
  const oldRegimeTax = calculateOldRegimeTax(annualGross, deductionsInput, state.ageCategory);

  const savings = Math.abs(newRegimeTax.totalTax - oldRegimeTax.totalTax);
  const recommendedRegime = newRegimeTax.totalTax <= oldRegimeTax.totalTax ? 'new' : 'old';

  return (
    <TaxContext.Provider
      value={{
        state,
        currentStep,
        updateState,
        setCurrentStep,
        resetState,
        newRegimeTax,
        oldRegimeTax,
        savings,
        recommendedRegime,
        user,
        signUp,
        signOut,
        hasPaid,
        paymentReference,
        unlockCalculator,
      }}
    >
      {children}
    </TaxContext.Provider>
  );
};

export const useTax = () => {
  const context = useContext(TaxContext);
  if (!context) {
    throw new Error('useTax must be used within a TaxProvider');
  }
  return context;
};
export type { AgeCategory, TaxResult };
export { initialTaxState };
