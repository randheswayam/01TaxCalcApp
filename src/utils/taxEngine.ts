export type AgeCategory = 'below60' | 'senior60to80' | 'superSenior80plus';

export interface TaxResult {
  taxableIncome: number;
  totalDeductions?: number;
  taxBeforeRebate: number;
  rebate: number;
  taxAfterRebate: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
  slabsBreakdown: {
    slabRange: string;
    rate: number;
    taxableAmount: number;
    tax: number;
  }[];
}

export interface TaxDeductionsInput {
  basicSalary: number;      // Monthly
  hraReceived: number;      // Monthly
  pfDeduction: number;      // Monthly
  paysRent: boolean;
  monthlyRent: number;      // Monthly
  city: string;
  isMetro: boolean;
  total80C: number;         // Annual
  healthSelf: number;       // Annual
  healthParents: number;    // Annual
  parentsSenior: boolean;
  homeLoanInterest: number; // Annual (Section 24)
  npsAmount: number;        // Annual (80CCD(1B))
  educationLoanInterest: number; // Annual (80E)
  professionalTaxAmount: number; // Annual
  savingsInterest: number;  // Annual (for 80TTA)
  fdInterest: number;       // Annual
  charitableDonations: number; // Annual (80G)
}

/**
 * Calculates HRA exemption based on Basic, HRA received, Rent paid and Metro status.
 * All inputs are monthly; returned value is annual.
 */
export function calculateHRAExemption(
  basicSalary: number,
  hraReceived: number,
  rentPaid: number,
  isMetro: boolean
): number {
  if (hraReceived <= 0 || rentPaid <= 0 || basicSalary <= 0) return 0;

  const annualBasic = basicSalary * 12;
  const annualHRA = hraReceived * 12;
  const annualRent = rentPaid * 12;

  // Condition 1: Actual HRA received
  const condition1 = annualHRA;

  // Condition 2: Rent paid - 10% of basic
  const condition2 = Math.max(0, annualRent - (0.10 * annualBasic));

  // Condition 3: 50% for metro, 40% for non-metro
  const metroPercentage = isMetro ? 0.50 : 0.40;
  const condition3 = metroPercentage * annualBasic;

  // Exemption is least of the three
  return Math.min(condition1, condition2, condition3);
}

/**
 * Returns the maximum deduction limit under Section 80D
 */
export function get80DLimit(ageCategory: AgeCategory, parentsSenior: boolean): number {
  const selfLimit = ageCategory === 'below60' ? 25000 : 50000;
  const parentsLimit = parentsSenior ? 50000 : 25000;
  return selfLimit + parentsLimit;
}

/**
 * Returns the maximum deduction limit for savings interest under Section 80TTA/80TTB
 */
export function get80TTALimit(ageCategory: AgeCategory): number {
  return ageCategory === 'below60' ? 10000 : 50000; // 80TTA vs 80TTB
}

/**
 * Calculates the New Regime tax for FY 2025-26
 */
export function calculateNewRegimeTax(grossIncome: number, _ageCategory: AgeCategory): TaxResult {
  // Step 1: Standard Deduction (fixed ₹75,000 for salaried)
  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, grossIncome - standardDeduction);

  // New Regime slabs (FY 2025-26)
  const slabs = [
    { min: 0, max: 400000, rate: 0, label: '₹0 – ₹4 Lakh' },
    { min: 400000, max: 800000, rate: 0.05, label: '₹4 Lakh – ₹8 Lakh' },
    { min: 800000, max: 1200000, rate: 0.10, label: '₹8 Lakh – ₹12 Lakh' },
    { min: 1200000, max: 1600000, rate: 0.15, label: '₹12 Lakh – ₹16 Lakh' },
    { min: 1600000, max: 2000000, rate: 0.20, label: '₹16 Lakh – ₹20 Lakh' },
    { min: 2000000, max: 2400000, rate: 0.25, label: '₹20 Lakh – ₹24 Lakh' },
    { min: 2400000, max: Infinity, rate: 0.30, label: 'Above ₹24 Lakh' }
  ];

  let tax = 0;
  const slabsBreakdown = [];

  for (const slab of slabs) {
    if (taxableIncome > slab.min) {
      const taxableAmountInSlab = Math.min(taxableIncome - slab.min, slab.max - slab.min);
      const slabTax = taxableAmountInSlab * slab.rate;
      tax += slabTax;
      
      slabsBreakdown.push({
        slabRange: slab.label,
        rate: slab.rate * 100,
        taxableAmount: Math.round(taxableAmountInSlab),
        tax: Math.round(slabTax)
      });
    } else {
      slabsBreakdown.push({
        slabRange: slab.label,
        rate: slab.rate * 100,
        taxableAmount: 0,
        tax: 0
      });
    }
  }

  // Step 3: Apply Section 87A Rebate (up to ₹60,000 for taxable income ≤ ₹12,00,000)
  let rebate = 0;
  if (taxableIncome <= 1200000) {
    rebate = Math.min(tax, 60000);
  }
  const taxAfterRebate = Math.max(0, tax - rebate);

  // Step 4: 4% Cess
  const cess = taxAfterRebate * 0.04;
  const totalTax = taxAfterRebate + cess;

  return {
    taxableIncome: Math.round(taxableIncome),
    totalDeductions: standardDeduction,
    taxBeforeRebate: Math.round(tax),
    rebate: Math.round(rebate),
    taxAfterRebate: Math.round(taxAfterRebate),
    cess: Math.round(cess),
    totalTax: Math.round(totalTax),
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
    slabsBreakdown
  };
}

/**
 * Calculates the Old Regime tax for FY 2025-26
 */
export function calculateOldRegimeTax(
  grossIncome: number,
  deductions: TaxDeductionsInput,
  ageCategory: AgeCategory
): TaxResult {
  // Step 1: Standard Deduction (fixed ₹50,000 for salaried under Old Regime)
  const standardDeduction = 50000;

  // HRA Exemption
  const hraExemption = calculateHRAExemption(
    deductions.basicSalary,
    deductions.hraReceived,
    deductions.monthlyRent,
    deductions.isMetro
  );

  // PF deduction counts towards 80C
  const annualPF = deductions.pfDeduction * 12;
  const total80CInvestments = deductions.total80C + annualPF;
  const final80CDeduction = Math.min(total80CInvestments, 150000);

  // 80D Health Insurance
  const limit80D = get80DLimit(ageCategory, deductions.parentsSenior);
  const healthDeduction = Math.min(deductions.healthSelf + deductions.healthParents, limit80D);

  // 80TTA/80TTB (Limit applied to actual savings interest, or fd+savings for seniors)
  const limit80TTA = get80TTALimit(ageCategory);
  let interestDeduction = 0;
  if (ageCategory === 'below60') {
    // 80TTA: Savings interest only
    interestDeduction = Math.min(deductions.savingsInterest, limit80TTA);
  } else {
    // 80TTB: All interest (savings + FD)
    interestDeduction = Math.min(deductions.savingsInterest + deductions.fdInterest, limit80TTA);
  }

  // NPS Additional (80CCD(1B))
  const npsDeduction = Math.min(deductions.npsAmount, 50000);

  // Section 24 (Home Loan Interest)
  const homeLoanDeduction = Math.min(deductions.homeLoanInterest, 200000);

  // Professional Tax
  const profTaxDeduction = Math.min(deductions.professionalTaxAmount, 2500);

  // Calculate Adjusted Gross for 80GG if no HRA is received but rent is paid
  let rentDeduction80GG = 0;
  if (hraExemption <= 0 && deductions.paysRent && deductions.monthlyRent > 0) {
    // Other deductions excluding 80GG
    const otherDeds = 
      standardDeduction +
      final80CDeduction +
      healthDeduction +
      interestDeduction +
      npsDeduction +
      homeLoanDeduction +
      profTaxDeduction +
      deductions.educationLoanInterest +
      deductions.charitableDonations;
    
    const adjustedGross = Math.max(0, grossIncome - otherDeds);
    
    const cond1 = Math.max(0, (deductions.monthlyRent * 12) - (0.10 * adjustedGross));
    const cond2 = 0.25 * adjustedGross;
    const cond3 = 60000;
    rentDeduction80GG = Math.min(cond1, cond2, cond3);
  }

  // Sum up all deductions
  const totalDeductions = 
    standardDeduction +
    final80CDeduction +
    healthDeduction +
    npsDeduction +
    deductions.educationLoanInterest +
    homeLoanDeduction +
    profTaxDeduction +
    hraExemption +
    interestDeduction +
    deductions.charitableDonations +
    rentDeduction80GG;

  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  // Get age-based slabs for Old Regime
  let slabs = [
    { min: 0, max: 250000, rate: 0, label: '₹0 – ₹2.5 Lakh' },
    { min: 250000, max: 500000, rate: 0.05, label: '₹2.5 Lakh – ₹5.0 Lakh' },
    { min: 500000, max: 1000000, rate: 0.20, label: '₹5.0 Lakh – ₹10.0 Lakh' },
    { min: 1000000, max: Infinity, rate: 0.30, label: 'Above ₹10.0 Lakh' }
  ];

  if (ageCategory === 'senior60to80') {
    slabs = [
      { min: 0, max: 300000, rate: 0, label: '₹0 – ₹3.0 Lakh' },
      { min: 300000, max: 500000, rate: 0.05, label: '₹3.0 Lakh – ₹5.0 Lakh' },
      { min: 500000, max: 1000000, rate: 0.20, label: '₹5.0 Lakh – ₹10.0 Lakh' },
      { min: 1000000, max: Infinity, rate: 0.30, label: 'Above ₹10.0 Lakh' }
    ];
  } else if (ageCategory === 'superSenior80plus') {
    slabs = [
      { min: 0, max: 500000, rate: 0, label: '₹0 – ₹5.0 Lakh' },
      { min: 500000, max: 1000000, rate: 0.20, label: '₹5.0 Lakh – ₹10.0 Lakh' },
      { min: 1000000, max: Infinity, rate: 0.30, label: 'Above ₹10.0 Lakh' }
    ];
  }

  let tax = 0;
  const slabsBreakdown = [];

  for (const slab of slabs) {
    if (taxableIncome > slab.min) {
      const taxableAmountInSlab = Math.min(taxableIncome - slab.min, slab.max - slab.min);
      const slabTax = taxableAmountInSlab * slab.rate;
      tax += slabTax;
      
      slabsBreakdown.push({
        slabRange: slab.label,
        rate: slab.rate * 100,
        taxableAmount: Math.round(taxableAmountInSlab),
        tax: Math.round(slabTax)
      });
    } else {
      slabsBreakdown.push({
        slabRange: slab.label,
        rate: slab.rate * 100,
        taxableAmount: 0,
        tax: 0
      });
    }
  }

  // Step 5: Apply Section 87A Rebate (up to ₹12,500 if taxable income ≤ ₹5,00,000)
  let rebate = 0;
  if (taxableIncome <= 500000) {
    rebate = Math.min(tax, 12500);
  }
  const taxAfterRebate = Math.max(0, tax - rebate);

  // Step 6: Apply 4% Cess
  const cess = taxAfterRebate * 0.04;
  const totalTax = taxAfterRebate + cess;

  return {
    taxableIncome: Math.round(taxableIncome),
    totalDeductions: Math.round(totalDeductions),
    taxBeforeRebate: Math.round(tax),
    rebate: Math.round(rebate),
    taxAfterRebate: Math.round(taxAfterRebate),
    cess: Math.round(cess),
    totalTax: Math.round(totalTax),
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
    slabsBreakdown
  };
}
