# Product Requirements Document (PRD)
# TaxCalc India — FY 2025-26 Tax Calculator
## Old vs New Regime Comparison for Salaried Individuals

**Version:** 1.0  
**Date:** June 2026  
**Target Financial Year:** FY 2025-26 (AY 2026-27)  
**Platform:** Browser-based Web Application (Privacy-First, Client-Side Only)

---

## 1. Executive Summary

### 1.1 Problem Statement
Every year, crores of salaried Indians have no idea which tax regime (Old vs New) saves them more money. Existing calculators are confusing, ask for CTC or gross salary (which most people don't know), and present results in dense financial jargon. Users need a simple, trustworthy tool that starts from what they actually know — their monthly take-home salary.

### 1.2 Solution
A step-by-step wizard that asks one question at a time in plain, non-finance language. A live preview panel updates tax estimates in real-time. The result page gives a clear, human-readable recommendation: "Pick this regime. You save ₹X." with side-by-side comparison, slab-by-slab breakdown, personalized education, and practical suggestions.

### 1.3 Target Audience
- Salaried individuals in India (ages 21–60+)
- First-time job holders who don't understand tax jargon
- Anyone confused by Old vs New regime choice
- NOT for: business owners, freelancers, those with capital gains, or incomes above ₹50 lakh (surcharge territory)

### 1.4 Design Philosophy
- **Simplicity:** One question per screen
- **Trust:** Clean, modern, minimal design
- **Transparency:** Live preview, clear explanations
- **Privacy:** All calculations run in the browser — no data leaves the device

---

## 2. Tax Rules & Calculation Engine (FY 2025-26)

### 2.1 New Tax Regime (Section 115BAC) — FY 2025-26

**Tax Slabs (All Age Groups — Same Slabs):**

| Income Range (₹) | Tax Rate |
|---|---|
| 0 – 4,00,000 | Nil |
| 4,00,001 – 8,00,000 | 5% |
| 8,00,001 – 12,00,000 | 10% |
| 12,00,001 – 16,00,000 | 15% |
| 16,00,001 – 20,00,000 | 20% |
| 20,00,001 – 24,00,000 | 25% |
| Above 24,00,000 | 30% |

**Key Features:**
- **Default regime** for all taxpayers
- **Standard Deduction:** ₹75,000 for salaried employees
- **Section 87A Rebate:** Up to ₹60,000 if taxable income ≤ ₹12,00,000 (making income up to ₹12 lakh tax-free; up to ₹12.75 lakh for salaried with standard deduction)
- **No deductions allowed:** 80C, 80D, HRA, LTA, 80E, 80G, Section 24, etc. are NOT available
- **NPS Employer Contribution:** Deductible up to 14% of basic salary (Section 80CCD(2)) — **Note:** This is available in new regime but we exclude it from this app to keep it simple for salaried users who typically don't track this separately

**Tax Calculation Formula (New Regime):**
```
1. Gross Salary = Monthly Take-Home × 12 + Other Income (if any)
2. Taxable Income = Gross Salary - Standard Deduction (₹75,000)
3. Tax = Apply slab rates on Taxable Income
4. If Taxable Income ≤ ₹12,00,000: Tax = max(0, Tax - ₹60,000) [Rebate 87A]
5. Total Tax = Tax + (Tax × 4% Cess)
```

### 2.2 Old Tax Regime — FY 2025-26

**Tax Slabs (Age-Based):**

**Below 60 years:**
| Income Range (₹) | Tax Rate |
|---|---|
| 0 – 2,50,000 | Nil |
| 2,50,001 – 5,00,000 | 5% |
| 5,00,001 – 10,00,000 | 20% |
| Above 10,00,000 | 30% |

**Senior Citizens (60–80 years):**
| Income Range (₹) | Tax Rate |
|---|---|
| 0 – 3,00,000 | Nil |
| 3,00,001 – 5,00,000 | 5% |
| 5,00,001 – 10,00,000 | 20% |
| Above 10,00,000 | 30% |

**Super Senior Citizens (80+ years):**
| Income Range (₹) | Tax Rate |
|---|---|
| 0 – 5,00,000 | Nil |
| 5,00,001 – 10,00,000 | 20% |
| Above 10,00,000 | 30% |

**Key Features:**
- **Standard Deduction:** ₹50,000 for salaried employees
- **Section 87A Rebate:** Up to ₹12,500 if taxable income ≤ ₹5,00,000
- **All deductions available:** 80C, 80D, HRA, LTA, Section 24, 80E, 80G, 80TTA/80TTB, etc.

**Tax Calculation Formula (Old Regime):**
```
1. Gross Salary = Monthly Take-Home × 12 + Other Income (if any)
2. Taxable Income = Gross Salary - Standard Deduction (₹50,000) - All Deductions
3. Tax = Apply age-based slab rates on Taxable Income
4. If Taxable Income ≤ ₹5,00,000: Tax = max(0, Tax - ₹12,500) [Rebate 87A]
5. Total Tax = Tax + (Tax × 4% Cess)
```

### 2.3 Deductions & Exemptions (Old Regime Only)

| Deduction | Section | Limit | Description |
|---|---|---|---|
| Standard Deduction | — | ₹50,000 | Auto-applied for salaried |
| Investments (PPF, ELSS, LIC, etc.) | 80C | ₹1,50,000 | Combined limit for all 80C investments |
| Health Insurance (Self & Family) | 80D | ₹25,000 | Medical insurance premium |
| Health Insurance (Parents <60) | 80D | ₹25,000 | Additional for parents |
| Health Insurance (Parents 60+) | 80D | ₹50,000 | Additional for senior citizen parents |
| Health Insurance (Self 60+) | 80D | ₹50,000 | If self is senior citizen |
| NPS Additional | 80CCD(1B) | ₹50,000 | Over and above 80C |
| Education Loan Interest | 80E | No limit | Interest on education loan |
| Donations | 80G | Varies | Charitable donations |
| Savings Interest | 80TTA | ₹10,000 | For individuals below 60 |
| Interest Income (Senior) | 80TTB | ₹50,000 | For senior citizens (60+) |
| Home Loan Interest | 24 | ₹2,00,000 | Self-occupied property |
| HRA Exemption | 10(13A) | Calculated | Based on rent, basic salary, city |
| LTA | 10(5) | Actuals | Leave Travel Allowance (2 trips in 4 years) |
| Professional Tax | 16(iii) | ₹2,500 | Tax on employment paid to state |
| Rent (No HRA) | 80GG | ₹60,000 | If no HRA received from employer |

### 2.4 HRA Exemption Calculation (Old Regime Only)

**Metro Cities (FY 2025-26):** Delhi, Mumbai, Kolkata, Chennai  
*(Note: Bangalore, Hyderabad, Pune, Ahmedabad are NON-metro for FY 2025-26)*

**HRA Exemption = Least of:**
1. Actual HRA received from employer
2. Rent paid - 10% of (Basic Salary + DA)
3. 50% of (Basic Salary + DA) for metro cities OR 40% of (Basic Salary + DA) for non-metro cities

**Important Notes:**
- HRA is ONLY available in Old Regime
- If user doesn't receive HRA from employer, they can claim deduction under Section 80GG (up to ₹60,000/year) if they pay rent
- Rent receipts required if monthly rent > ₹3,000
- Landlord PAN required if annual rent > ₹1,00,000

### 2.5 Section 87A Rebate Details

| Regime | Income Limit | Rebate Amount | Condition |
|---|---|---|---|
| New | ≤ ₹12,00,000 | Up to ₹60,000 | Tax cannot exceed rebate |
| Old | ≤ ₹5,00,000 | Up to ₹12,500 | Tax cannot exceed rebate |

**Important:** Rebate is applied BEFORE adding 4% Health & Education Cess.

### 2.6 Health & Education Cess
- **4%** on total tax payable (after rebate, before surcharge)
- Applied uniformly in both regimes

### 2.7 Surcharge (Documented but NOT Implemented in App)

| Income | Old Regime | New Regime |
|---|---|---|
| ₹50L – ₹1Cr | 10% | 10% |
| ₹1Cr – ₹2Cr | 15% | 15% |
| ₹2Cr – ₹5Cr | 25% | 25% |
| Above ₹5Cr | 37% | 25% |

**App Constraint:** App is designed for salaried individuals with income primarily from salary. Surcharge calculation is excluded. If user's calculated income exceeds ₹50 lakh, show a note: "Your income may attract surcharge. This calculator provides base tax estimate."

### 2.8 Age-Based Handling

**Input:** User selects age category:
- "Below 60 years"
- "60 to 80 years (Senior Citizen)"
- "Above 80 years (Super Senior Citizen)"

**Impact:**
- Old Regime: Different tax slabs apply
- New Regime: Same slabs for all ages
- 80D limits: Higher for senior citizens
- 80TTB available for 60+ (replaces 80TTA)

---

## 3. Application Architecture

### 3.1 Tech Stack
- **Frontend:** React/Vue/Angular (recommendation: React with TypeScript)
- **State Management:** React Context or Zustand
- **Styling:** Tailwind CSS or similar utility-first framework
- **No Backend:** All calculations in browser using JavaScript/TypeScript
- **No Database:** LocalStorage for session persistence only (optional)
- **No External APIs:** All tax rules hardcoded for FY 2025-26

### 3.2 Data Flow
```
User Input → Wizard State → Tax Engine → Live Preview Panel
                                    ↓
                              Result Page
```

### 3.3 State Structure
```typescript
interface TaxState {
  // Step 1: Basic Info
  ageCategory: 'below60' | 'senior60to80' | 'superSenior80plus';

  // Step 2: Income
  monthlyTakeHome: number;  // What lands in bank
  otherIncome: number;      // FD interest, savings interest, etc.

  // Step 3: Salary Structure (for HRA & PF)
  basicSalary: number;      // Monthly basic
  hraReceived: number;      // Monthly HRA from employer
  pfDeduction: number;      // Monthly PF deduction (employee)

  // Step 4: Rent
  paysRent: boolean;
  monthlyRent: number;
  city: string;
  isMetro: boolean;

  // Step 5: Investments
  has80C: boolean;
  total80C: number;         // PPF, ELSS, LIC, etc.

  // Step 6: Health Insurance
  hasHealthInsurance: boolean;
  healthSelf: number;       // Self + family premium
  healthParents: number;    // Parents premium
  parentsSenior: boolean;

  // Step 7: Home Loan
  hasHomeLoan: boolean;
  homeLoanInterest: number;

  // Step 8: Other Deductions
  hasNPS: boolean;
  npsAmount: number;        // 80CCD(1B) - additional NPS
  hasEducationLoan: boolean;
  educationLoanInterest: number;
  hasProfessionalTax: boolean;
  professionalTaxAmount: number;

  // Calculated Results
  oldRegimeTax: TaxResult;
  newRegimeTax: TaxResult;
  recommendedRegime: 'old' | 'new';
  savings: number;
}
```

---

## 4. User Flow & Screens

### 4.1 Landing Page

**Layout:** Full-screen hero section with split layout (left: content, right: preview mockup)

**Left Side (60%):**
- **Headline:** "Find out which tax regime saves you more money"
- **Subheadline:** "Answer 8 simple questions. Get your personalized tax comparison in 2 minutes. No jargon. 100% private."
- **Trust Badges:**
  - "✓ FY 2025-26 Latest Rules"
  - "✓ No data leaves your device"
  - "✓ Used by 10,000+ salaried Indians"
- **CTA Button:** "Start Free Tax Check →" (large, prominent)
- **Secondary Link:** "How does this work?" (scrolls to explanation section)

**Right Side (40%):**
- **Preview Card:** A mockup of the result page showing:
  - "You save ₹47,500 by choosing New Regime"
  - Side-by-side comparison mini-chart
  - "This is what your result will look like"

**Below the fold:**
- 3-step explanation with icons:
  1. "Tell us about your salary & rent" (icon: wallet)
  2. "Add your investments & insurance" (icon: shield)
  3. "Get your regime comparison" (icon: chart)
- FAQ accordion (5 common questions)

**Footer:**
- "This calculator is for informational purposes only. Consult a tax professional for advice."
- "Built for FY 2025-26 (AY 2026-27)"

### 4.2 Wizard Flow (Step-by-Step)

**Global Elements (visible on all wizard steps):**
- **Progress Bar:** Top of page, showing "Step X of 8" with dots
- **Live Preview Panel:** Right side (on desktop) / Bottom sheet (on mobile) — updates in real-time
- **FAQ Section:** Bottom of each step — 2-3 relevant FAQs for that step
- **Back Button:** "← Previous" (hidden on Step 1)
- **Skip Button:** "Skip this →" (for optional questions)

**Step 1: How old are you?**
- **Question:** "How old are you?"
- **Subtext:** "Your age affects tax slabs and deductions available to you."
- **Options (Radio Cards):**
  - "Below 60 years" (default)
  - "60 to 80 years (Senior Citizen)"
  - "Above 80 years (Super Senior Citizen)"
- **FAQ:**
  - Q: "Why does age matter for tax?"
    A: "Senior citizens get higher basic exemption limits and additional deductions on interest income."
  - Q: "What if I turn 60 this year?"
    A: "Your age as of March 31, 2026 counts. If you turn 60 on or before that date, select 'Senior Citizen'."

**Step 2: What's your monthly take-home salary?**
- **Question:** "What amount lands in your bank account every month?"
- **Subtext:** "This is your in-hand salary after all deductions. Don't worry about CTC or gross salary."
- **Input:** Currency field with ₹ symbol, numeric only
- **Validation:** Min ₹1,000, Max ₹10,00,000
- **Helper:** "Not sure? Check your last salary slip or bank statement."
- **FAQ:**
  - Q: "What if my salary varies every month?"
    A: "Enter your average monthly take-home. If you got a raise, use your current salary."
  - Q: "Should I include bonus?"
    A: "Yes, if you receive a fixed annual bonus, divide it by 12 and add to monthly amount."

**Step 3: Do you have any other income?**
- **Question:** "Do you earn any other income besides your salary?"
- **Subtext:** "Like interest from savings account, FDs, or rental income."
- **Toggle:** Yes / No
- **If Yes:**
  - "Interest from savings account:" ₹ input
  - "Interest from FDs:" ₹ input
  - "Other income:" ₹ input
- **FAQ:**
  - Q: "Is bank interest taxable?"
    A: "Yes, but you can claim deduction up to ₹10,000 under Section 80TTA (below 60) or ₹50,000 under 80TTB (60+)."
  - Q: "What about rental income?"
    A: "If you have rental income, enter it here. Note: This app is designed for primarily salaried income."

**Step 4: Let's understand your salary structure**
- **Question:** "We need a few details from your salary slip for accurate calculation."
- **Subtext:** "Don't worry, we'll guide you on where to find these."
- **Inputs:**
  - "Basic Salary (per month):" ₹ input — Helper: "Usually 40-50% of your gross salary. Found on your salary slip."
  - "HRA received (per month):" ₹ input — Helper: "House Rent Allowance. Usually 40-50% of basic."
  - "PF deducted (per month):" ₹ input — Helper: "Employee's PF contribution. Usually 12% of basic."
- **Validation:** All fields optional but recommended. If skipped, HRA exemption won't be calculated.
- **FAQ:**
  - Q: "Where do I find these on my salary slip?"
    A: "Look for 'Basic', 'HRA', and 'PF Contribution' or 'EPF'. These are standard components."
  - Q: "What if I don't have HRA?"
    A: "Leave it blank. We'll check if you qualify for rent deduction under Section 80GG instead."
  - Q: "Is PF deductible?"
    A: "Yes! Your PF contribution counts under Section 80C (up to ₹1.5L total)."

**Step 5: Do you pay rent?**
- **Question:** "Do you live in a rented house?"
- **Toggle:** Yes / No
- **If Yes:**
  - "Monthly rent paid:" ₹ input
  - "Which city do you live in?" Dropdown: [Delhi, Mumbai, Kolkata, Chennai, Bangalore, Hyderabad, Pune, Ahmedabad, Other]
  - **Auto-detect metro:** Delhi, Mumbai, Kolkata, Chennai = Metro (50% rule). Others = Non-metro (40% rule).
- **FAQ:**
  - Q: "Can I claim HRA if I live with parents?"
    A: "Yes, if you pay rent to your parents and have a rent agreement + receipts. But they must declare it as income."
  - Q: "What if my city is not in the list?"
    A: "Select 'Other'. We'll use the non-metro calculation (40% of basic)."
  - Q: "I don't get HRA from my company. Can I still claim?"
    A: "Yes! If you pay rent but don't get HRA, you can claim up to ₹60,000 under Section 80GG."

**Step 6: Do you have any tax-saving investments?**
- **Question:** "Do you invest in any tax-saving schemes?"
- **Subtext:** "These reduce your taxable income in the Old Regime."
- **Toggle:** Yes / No
- **If Yes:**
  - "Total amount invested in FY 2025-26:" ₹ input
  - **Helper:** "This includes: PPF, ELSS mutual funds, LIC premium, NSC, tax-saving FDs, tuition fees, etc. Max ₹1.5 lakh."
  - **Progress bar:** Shows "₹X of ₹1,50,000 limit used"
- **FAQ:**
  - Q: "What counts under 80C?"
    A: "PPF, ELSS, LIC, NSC, 5-year tax-saving FDs, EPF, tuition fees for children, principal repayment of home loan, etc."
  - Q: "What if I don't invest in anything?"
    A: "That's fine! The New Regime might be better for you. We'll compare both."
  - Q: "Does my PF count here?"
    A: "Yes! The PF amount you entered in Step 4 is already included. Don't double-count."

**Step 7: Do you have health insurance?**
- **Question:** "Do you pay for health insurance?"
- **Subtext:** "Premium paid for health insurance is deductible under the Old Regime."
- **Toggle:** Yes / No
- **If Yes:**
  - "Premium for self & family:" ₹ input
  - "Premium for parents:" ₹ input
  - "Are your parents above 60?" Toggle: Yes / No
- **Auto-calculation:**
  - If user is below 60: Self limit = ₹25,000; Parents limit = ₹25,000 (if <60) or ₹50,000 (if 60+)
  - If user is 60+: Self limit = ₹50,000; Parents limit = ₹50,000 (if 60+)
- **FAQ:**
  - Q: "Does company-provided health insurance count?"
    A: "No, only premiums YOU pay directly count. If you pay extra to top up company insurance, that counts."
  - Q: "What about parents' insurance?"
    A: "Yes, premiums for your parents' health insurance are separately deductible."

**Step 8: Any other deductions?**
- **Question:** "Any other deductions you'd like to include?"
- **Subtext:** "These are optional but can save you more tax in the Old Regime."
- **Checkboxes (expandable):**
  - [ ] "I have a home loan for self-occupied house" → "Interest paid:" ₹ input (max ₹2 lakh)
  - [ ] "I have an education loan" → "Interest paid:" ₹ input (no limit)
  - [ ] "I contribute to NPS (beyond PF)" → "Amount:" ₹ input (max ₹50,000)
  - [ ] "I pay professional tax to my state" → "Amount:" ₹ input (max ₹2,500)
  - [ ] "I made charitable donations" → "Amount:" ₹ input
- **FAQ:**
  - Q: "What's NPS?"
    A: "National Pension System. If you contribute extra beyond your PF, you can claim additional ₹50,000 deduction."
  - Q: "What's professional tax?"
    A: "A tax some states charge on employment. It's deductible. Max ₹2,500/year."
  - Q: "I have a home loan. Should I enter principal or interest?"
    A: "Enter INTEREST only. Principal repayment goes under 80C (already covered in Step 6)."

### 4.3 Live Preview Panel (Right Side / Bottom Sheet)

**Layout:** Sticky card that updates as user answers questions.

**Sections:**
1. **Income Summary:**
   - Annual Salary: ₹X
   - Other Income: ₹Y
   - Total Income: ₹Z

2. **Old Regime Estimate:**
   - Taxable Income: ₹A
   - Tax Before Cess: ₹B
   - Cess (4%): ₹C
   - Total Tax: ₹D
   - Effective Tax Rate: E%

3. **New Regime Estimate:**
   - Taxable Income: ₹F
   - Tax Before Cess: ₹G
   - Cess (4%): ₹H
   - Total Tax: ₹I
   - Effective Tax Rate: J%

4. **Recommendation Preview:**
   - "New Regime looks better" (green) OR "Old Regime looks better" (blue)
   - "Potential savings: ₹X"

5. **Mini Slab Table:**
   - Shows applicable tax slabs for both regimes with user's income highlighted

**Update Behavior:**
- Updates on every input change (debounced 300ms)
- Uses smooth number transitions (count-up animation)
- Shows "Calculating..." spinner during update

### 4.4 Result Page

**Hero Section:**
- **Big Result Card:**
  - "Pick the New Regime" (or "Pick the Old Regime")
  - "You save ₹47,500 per year"
  - Subtext: "Based on your inputs for FY 2025-26"

**Side-by-Side Comparison:**

| | Old Regime | New Regime | Difference |
|---|---|---|---|
| **Total Income** | ₹X | ₹X | — |
| **Deductions** | ₹Y | ₹75,000 (Standard) | — |
| **Taxable Income** | ₹Z | ₹W | — |
| **Tax Before Cess** | ₹A | ₹B | ₹C |
| **Rebate (87A)** | ₹D | ₹E | — |
| **Tax After Rebate** | ₹F | ₹G | — |
| **Cess (4%)** | ₹H | ₹I | — |
| **Total Tax Payable** | ₹J | ₹K | **₹L** |
| **Effective Tax Rate** | M% | N% | — |
| **Monthly Tax** | ₹O | ₹P | ₹Q |

**Slab-by-Slab Breakdown:**

**Old Regime:**
| Slab | Rate | Taxable Amount | Tax |
|---|---|---|---|
| ₹0 – ₹2.5L | 0% | ₹X | ₹0 |
| ₹2.5L – ₹5L | 5% | ₹Y | ₹Z |
| ... | ... | ... | ... |

**New Regime:**
| Slab | Rate | Taxable Amount | Tax |
|---|---|---|---|
| ₹0 – ₹4L | 0% | ₹X | ₹0 |
| ₹4L – ₹8L | 5% | ₹Y | ₹Z |
| ... | ... | ... | ... |

**Personalized Education Section:**
- "How your inputs affected your tax:"
  - "Your rent of ₹X gave you ₹Y HRA exemption in Old Regime"
  - "Your ₹Z investments saved you ₹W in Old Regime"
  - "In New Regime, you get ₹75,000 standard deduction regardless"
  - "Your health insurance saved you ₹V in Old Regime"

**Practical Suggestions (Tailored):**
- If Old Regime wins by small margin: "You're barely saving with Old Regime. Consider if tracking all deductions is worth the effort. New Regime is simpler."
- If New Regime wins: "New Regime is clearly better for you. No need to make forced investments just for tax saving."
- If user has low 80C investment: "You could save ₹X more in Old Regime by investing ₹Y more in PPF/ELSS."
- If user has no health insurance: "Consider buying health insurance — it saves tax AND protects you."
- If user is senior citizen: "As a senior citizen, you get additional benefits. Make sure to claim 80TTB for interest income."

**CTA Buttons:**
- "Start Over" (reset)
- "Share Result" (copy text summary to clipboard)
- "Learn More About Tax Planning" (link to educational content)

**Disclaimer:**
- "This is an estimate based on your inputs. Actual tax may vary. Consult a CA for precise calculation. Surcharge not included for incomes above ₹50 lakh."

---

## 5. Detailed Tax Calculation Engine

### 5.1 Calculation Functions

#### Function: `calculateNewRegimeTax(grossIncome, ageCategory)`
```javascript
function calculateNewRegimeTax(grossIncome, ageCategory) {
  // Step 1: Apply Standard Deduction
  const standardDeduction = 75000;
  let taxableIncome = Math.max(0, grossIncome - standardDeduction);

  // Step 2: Calculate tax using slabs
  const slabs = [
    { limit: 400000, rate: 0 },
    { limit: 800000, rate: 0.05 },
    { limit: 1200000, rate: 0.10 },
    { limit: 1600000, rate: 0.15 },
    { limit: 2000000, rate: 0.20 },
    { limit: 2400000, rate: 0.25 },
    { limit: Infinity, rate: 0.30 }
  ];

  let tax = 0;
  let remainingIncome = taxableIncome;
  let previousLimit = 0;

  for (const slab of slabs) {
    const slabAmount = Math.min(remainingIncome, slab.limit - previousLimit);
    if (slabAmount <= 0) break;
    tax += slabAmount * slab.rate;
    remainingIncome -= slabAmount;
    previousLimit = slab.limit;
  }

  // Step 3: Apply Section 87A Rebate
  let rebate = 0;
  if (taxableIncome <= 1200000) {
    rebate = Math.min(tax, 60000);
  }
  tax -= rebate;

  // Step 4: Apply 4% Cess
  const cess = tax * 0.04;
  const totalTax = tax + cess;

  return {
    taxableIncome,
    taxBeforeRebate: tax + rebate,
    rebate,
    taxAfterRebate: tax,
    cess,
    totalTax,
    effectiveRate: (totalTax / grossIncome) * 100
  };
}
```

#### Function: `calculateOldRegimeTax(grossIncome, deductions, ageCategory)`
```javascript
function calculateOldRegimeTax(grossIncome, deductions, ageCategory) {
  // Step 1: Apply Standard Deduction
  const standardDeduction = 50000;

  // Step 2: Calculate total deductions
  const totalDeductions = standardDeduction + 
    Math.min(deductions.section80C || 0, 150000) +
    Math.min(deductions.section80D || 0, get80DLimit(ageCategory, deductions.parentsSenior)) +
    Math.min(deductions.section80CCD1B || 0, 50000) +
    (deductions.section80E || 0) +
    Math.min(deductions.section24 || 0, 200000) +
    Math.min(deductions.professionalTax || 0, 2500) +
    (deductions.hraExemption || 0) +
    (deductions.lta || 0) +
    Math.min(deductions.section80TTA || 0, get80TTALimit(ageCategory)) +
    (deductions.section80G || 0) +
    Math.min(deductions.section80GG || 0, 60000);

  let taxableIncome = Math.max(0, grossIncome - totalDeductions);

  // Step 3: Get age-based slabs
  const slabs = getOldRegimeSlabs(ageCategory);

  // Step 4: Calculate tax
  let tax = 0;
  let remainingIncome = taxableIncome;
  let previousLimit = 0;

  for (const slab of slabs) {
    const slabAmount = Math.min(remainingIncome, slab.limit - previousLimit);
    if (slabAmount <= 0) break;
    tax += slabAmount * slab.rate;
    remainingIncome -= slabAmount;
    previousLimit = slab.limit;
  }

  // Step 5: Apply Section 87A Rebate
  let rebate = 0;
  if (taxableIncome <= 500000) {
    rebate = Math.min(tax, 12500);
  }
  tax -= rebate;

  // Step 6: Apply 4% Cess
  const cess = tax * 0.04;
  const totalTax = tax + cess;

  return {
    taxableIncome,
    totalDeductions,
    taxBeforeRebate: tax + rebate,
    rebate,
    taxAfterRebate: tax,
    cess,
    totalTax,
    effectiveRate: (totalTax / grossIncome) * 100
  };
}
```

#### Function: `calculateHRAExemption(basicSalary, hraReceived, rentPaid, isMetro)`
```javascript
function calculateHRAExemption(basicSalary, hraReceived, rentPaid, isMetro) {
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
```

#### Function: `get80DLimit(ageCategory, parentsSenior)`
```javascript
function get80DLimit(ageCategory, parentsSenior) {
  // Self + Family limit
  let selfLimit = ageCategory === 'below60' ? 25000 : 50000;

  // Parents limit
  let parentsLimit = parentsSenior ? 50000 : 25000;

  return selfLimit + parentsLimit;
}
```

#### Function: `get80TTALimit(ageCategory)`
```javascript
function get80TTALimit(ageCategory) {
  if (ageCategory === 'below60') {
    return 10000; // Section 80TTA
  } else {
    return 50000; // Section 80TTB
  }
}
```

### 5.2 Edge Cases & Validation Rules

| Scenario | Handling |
|---|---|
| User enters rent but no HRA received | Use Section 80GG (max ₹60,000) instead of HRA exemption |
| User enters PF but no other 80C | PF counts toward 80C. Show warning if total 80C > ₹1.5L |
| User is senior citizen with interest income | Auto-apply 80TTB (₹50,000) instead of 80TTA |
| User enters home loan principal | Remind: Principal goes under 80C, interest under Section 24 |
| User enters income > ₹50 lakh | Show warning: "Surcharge may apply. This is base tax estimate." |
| User enters negative values | Block input, show error: "Amount cannot be negative" |
| User skips all deduction steps | New Regime will likely win. Show appropriate suggestion |
| Monthly take-home > ₹10 lakh | Show warning: "Please verify this is your monthly amount, not annual" |
| Total 80C investments > ₹1.5L | Cap at ₹1.5L in calculation, show note: "80C limit is ₹1.5 lakh" |
| Health insurance > age limit | Cap at applicable limit, show note |
| Professional tax > ₹2,500 | Cap at ₹2,500, show note: "Max professional tax deduction is ₹2,500" |
| Home loan interest > ₹2L | Cap at ₹2 lakh for self-occupied, show note |
| User selects age = 60+ but enters 80C | Remind: Senior citizens can also claim 80C |
| Rent paid < 10% of basic | HRA exemption = 0. Show note: "Rent must be > 10% of basic for HRA benefit" |
| User lives in own house | Skip rent step, no HRA/80GG applicable |

### 5.3 Input Validation Matrix

| Input | Type | Min | Max | Default | Required |
|---|---|---|---|---|---|
| Age Category | Radio | — | — | Below 60 | Yes |
| Monthly Take-Home | Number | 1,000 | 10,00,000 | — | Yes |
| Other Income | Number | 0 | 50,00,000 | 0 | No |
| Basic Salary | Number | 0 | 10,00,000 | — | No (but recommended) |
| HRA Received | Number | 0 | 10,00,000 | 0 | No |
| PF Deduction | Number | 0 | 1,00,000 | 0 | No |
| Monthly Rent | Number | 0 | 5,00,000 | 0 | No |
| City | Dropdown | — | — | — | No |
| 80C Investments | Number | 0 | 10,00,000 | 0 | No |
| Health Self | Number | 0 | 1,00,000 | 0 | No |
| Health Parents | Number | 0 | 1,00,000 | 0 | No |
| Parents Senior | Boolean | — | — | No | No |
| Home Loan Interest | Number | 0 | 10,00,000 | 0 | No |
| NPS Amount | Number | 0 | 10,00,000 | 0 | No |
| Education Loan Interest | Number | 0 | No limit | 0 | No |
| Professional Tax | Number | 0 | 10,000 | 0 | No |

---

## 6. UI/UX Design Specifications

### 6.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary | #1E40AF | Buttons, links, active states, New Regime highlight |
| Primary Light | #3B82F6 | Hover states, accents |
| Secondary | #059669 | Success, savings, Old Regime highlight |
| Secondary Light | #10B981 | Positive indicators |
| Background | #F8FAFC | Page background |
| Card | #FFFFFF | Cards, input backgrounds |
| Text Primary | #1E293B | Headlines, primary text |
| Text Secondary | #64748B | Subtext, labels, descriptions |
| Border | #E2E8F0 | Input borders, dividers |
| Error | #DC2626 | Validation errors |
| Warning | #F59E0B | Warning messages |
| Success | #10B981 | Success states |

### 6.2 Typography

| Element | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| H1 (Landing) | Inter/System | 48px | 700 | 1.1 |
| H2 (Step Title) | Inter/System | 28px | 600 | 1.3 |
| H3 (Section) | Inter/System | 20px | 600 | 1.4 |
| Body | Inter/System | 16px | 400 | 1.6 |
| Small | Inter/System | 14px | 400 | 1.5 |
| Caption | Inter/System | 12px | 400 | 1.4 |
| Number Display | Inter/System | 32px | 700 | 1.2 |

### 6.3 Component Specifications

**Radio Cards (Age Selection):**
- Border: 2px solid #E2E8F0
- Border-radius: 12px
- Padding: 20px
- Selected: Border color #1E40AF, background #EFF6FF
- Icon: 40px circle with relevant icon
- Hover: Border color #3B82F6

**Currency Input:**
- Prefix: ₹ symbol inside input, left-aligned
- Border: 2px solid #E2E8F0
- Border-radius: 8px
- Padding: 16px
- Focus: Border color #1E40AF, shadow 0 0 0 3px rgba(30,64,175,0.1)
- Error: Border color #DC2626

**Toggle Switch:**
- Track: 48px wide, 24px tall
- Thumb: 20px circle
- Active: Background #1E40AF
- Transition: 200ms ease

**Progress Bar:**
- Height: 4px
- Background: #E2E8F0
- Fill: #1E40AF
- Border-radius: 2px
- Step dots: 8px circles, active = filled, inactive = outline

**Live Preview Card:**
- Background: #FFFFFF
- Border: 1px solid #E2E8F0
- Border-radius: 16px
- Shadow: 0 4px 6px -1px rgba(0,0,0,0.1)
- Padding: 24px
- Sticky on desktop (top: 24px)

**FAQ Accordion:**
- Border: 1px solid #E2E8F0
- Border-radius: 8px
- Padding: 16px
- Expand/collapse with smooth animation (300ms)
- Chevron icon rotates 180° on expand

**Result Comparison Table:**
- Header: Background #F1F5F9, bold text
- Row hover: Background #F8FAFC
- Difference column: Green if positive savings, red if negative
- Border-radius: 12px on container

### 6.4 Responsive Breakpoints

| Breakpoint | Layout | Live Preview |
|---|---|---|
| Mobile (<640px) | Single column, full width | Bottom sheet (collapsible) |
| Tablet (640-1024px) | Single column, max-width 600px | Bottom sheet |
| Desktop (>1024px) | Two column (60/40 split) | Right sidebar sticky |

### 6.5 Animations & Transitions

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Step transition | Slide left + fade | 300ms | ease-in-out |
| Number update | Count-up | 500ms | ease-out |
| Progress bar | Width transition | 300ms | ease-in-out |
| FAQ expand | Height + opacity | 300ms | ease-in-out |
| Card hover | Translate Y -2px + shadow | 200ms | ease |
| Button hover | Background darken 10% | 150ms | ease |
| Result reveal | Fade in + scale from 0.95 | 400ms | ease-out |

---

## 7. Content & Copy

### 7.1 Landing Page Copy

**Headline:** "Find out which tax regime saves you more money"

**Subheadline:** "Answer 8 simple questions about your salary, rent, and investments. Get a clear, personalized comparison of Old vs New tax regime for FY 2025-26."

**Trust Badges:**
- "✓ Updated for FY 2025-26 (AY 2026-27)"
- "✓ 100% Private — No data leaves your device"
- "✓ Plain English — No CA required"

**CTA:** "Start Your Free Tax Check →"

**How It Works:**
1. "Enter your monthly salary and rent"
2. "Add your investments and insurance"
3. "See your personalized regime comparison"

**FAQ (Landing Page):**
- Q: "Is this really free?"
  A: "Yes, completely free. No signup, no ads, no data collection."
- Q: "How accurate is this?"
  A: "We use the official FY 2025-26 tax slabs and deduction limits. Results are estimates based on your inputs."
- Q: "What's the difference between Old and New regime?"
  A: "Old regime allows deductions (80C, HRA, etc.) but has higher tax rates. New regime has lower rates but only standard deduction."
- Q: "Can I switch between regimes?"
  A: "Yes, salaried employees can choose every year when filing ITR."
- Q: "Is my data safe?"
  A: "Absolutely. All calculations happen in your browser. We don't store or transmit any of your financial information."

### 7.2 Wizard Step Copy

See Section 4.2 for detailed step-by-step copy.

### 7.3 Result Page Copy

**Winner Announcement:**
- "Pick the {Old/New} Regime"
- "You save ₹{amount} per year"
- "That's ₹{monthly} more in your pocket every month"

**Comparison Table Headers:**
- "Old Tax Regime" / "New Tax Regime" / "You Save"

**Education Section:**
- "How your inputs affected your tax:"
- "Your rent of ₹{rent}/month gave you ₹{hra} HRA exemption in the Old Regime"
- "Your ₹{80c} investments reduced your taxable income by ₹{80c} in the Old Regime"
- "In the New Regime, you automatically get ₹75,000 standard deduction — no investments needed"
- "Your health insurance premium of ₹{health} saved you ₹{health_tax} in the Old Regime"

**Suggestions (Dynamic):**
- If Old wins by >₹20,000: "Stick with the Old Regime and keep investing in tax-saving instruments."
- If New wins by >₹20,000: "The New Regime is clearly better. Consider stopping forced tax-saving investments and invest based on goals instead."
- If margin <₹10,000: "The difference is small. Choose New Regime for simplicity, or Old Regime if you already have investments."
- If user has no 80C: "You could save more in Old Regime by investing ₹{remaining_80c} in PPF or ELSS."
- If user has no health insurance: "Consider buying health insurance — it protects you AND saves tax in the Old Regime."
- If user pays high rent: "Your high rent makes the Old Regime attractive due to HRA benefits."
- If user has home loan: "Your home loan interest of ₹{interest} gives significant benefit in the Old Regime."

---

## 8. Privacy & Security

### 8.1 Privacy-First Architecture
- **No Backend Server:** Application is a static site (HTML/CSS/JS)
- **No Data Collection:** No analytics, no tracking pixels, no cookies for data collection
- **Local Storage Only:** Optional use of localStorage to save progress if user refreshes
- **No External APIs:** All tax rules embedded in code
- **No User Accounts:** No login, no signup, no personal data storage

### 8.2 Technical Implementation
- All calculations in JavaScript/TypeScript
- No network requests for tax calculation
- If using a framework (React/Vue), ensure no telemetry
- Host on static site hosting (Netlify, Vercel, GitHub Pages)
- HTTPS mandatory

### 8.3 Privacy Notice (Display on Landing Page)
"🔒 Your data never leaves this device. All calculations happen in your browser. We don't store, track, or transmit any of your financial information."

---

## 9. Testing & Quality Assurance

### 9.1 Test Cases

**Test Case 1: Young Salaried, No Investments, Rent in Metro**
- Age: 28, Take-home: ₹60,000/month
- Basic: ₹25,000, HRA: ₹12,000, PF: ₹3,000
- Rent: ₹15,000, City: Mumbai
- No investments, no insurance
- **Expected:** New Regime should win (no deductions to claim)

**Test Case 2: Middle-Aged, High Investments, High Rent**
- Age: 35, Take-home: ₹1,20,000/month
- Basic: ₹50,000, HRA: ₹25,000, PF: ₹6,000
- Rent: ₹30,000, City: Bangalore (Non-metro for FY 2025-26)
- 80C: ₹1,50,000, Health: ₹25,000, Home Loan: ₹2,00,000
- **Expected:** Old Regime should win significantly

**Test Case 3: Senior Citizen with Interest Income**
- Age: 65, Take-home: ₹40,000/month
- Interest income: ₹40,000
- Health insurance: ₹50,000
- **Expected:** Old Regime should win due to 80TTB (₹50,000) and higher exemption limit

**Test Case 4: Income at Rebate Threshold (New Regime)**
- Age: 30, Take-home: ₹1,06,250/month (₹12.75L annually with standard deduction)
- No other income, no deductions
- **Expected:** Tax = ₹0 (Rebate 87A covers full tax)

**Test Case 5: Income at Rebate Threshold (Old Regime)**
- Age: 30, Take-home: ₹45,833/month (₹5.5L annually)
- 80C: ₹50,000, Standard: ₹50,000
- Taxable: ₹4.5L
- **Expected:** Tax = ₹0 (Rebate 87A covers ₹12,500 tax on ₹5L)

**Test Case 6: HRA Calculation Edge Case**
- Basic: ₹50,000, HRA: ₹20,000, Rent: ₹15,000
- Condition 1: ₹2,40,000
- Condition 2: ₹1,80,000 - ₹60,000 = ₹1,20,000
- Condition 3: ₹3,00,000 (metro)
- **Expected HRA:** ₹1,20,000 (least of three)

**Test Case 7: No HRA, Pays Rent**
- No HRA received, Rent: ₹10,000/month
- **Expected:** 80GG deduction = ₹60,000 (least of: rent-10% income, 25% income, ₹60,000)

### 9.2 Validation Checklist
- [ ] All tax slabs match FY 2025-26 official rates
- [ ] Standard deduction: ₹75,000 (New), ₹50,000 (Old)
- [ ] Rebate 87A: ₹60,000 (New, income ≤₹12L), ₹12,500 (Old, income ≤₹5L)
- [ ] Cess: 4% on tax after rebate
- [ ] HRA metro cities: Delhi, Mumbai, Kolkata, Chennai only (FY 2025-26)
- [ ] 80C cap: ₹1,50,000
- [ ] 80D limits: Self ₹25K/₹50K, Parents ₹25K/₹50K based on age
- [ ] 80CCD(1B): ₹50,000
- [ ] Section 24: ₹2,00,000
- [ ] Professional tax: ₹2,500
- [ ] 80TTA: ₹10,000 (below 60), 80TTB: ₹50,000 (60+)
- [ ] 80GG: ₹60,000 max
- [ ] Age-based slabs for Old Regime
- [ ] New Regime same slabs for all ages

---

## 10. Deployment & Performance

### 10.1 Performance Requirements
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90
- Bundle Size: < 200KB (gzipped)

### 10.2 SEO Requirements
- Meta title: "Tax Calculator India FY 2025-26 | Old vs New Regime Comparison"
- Meta description: "Free, private tax calculator for salaried Indians. Compare Old vs New tax regime for FY 2025-26. No signup, no data collection."
- Structured data: FAQ schema for landing page
- Open Graph tags for social sharing

### 10.3 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation for all inputs
- Screen reader friendly labels
- Focus indicators on all interactive elements
- Color contrast ratio > 4.5:1

---

## 11. Future Enhancements (Out of Scope for V1)

- Surcharge calculation for income > ₹50 lakh
- Capital gains tax handling
- Freelance/business income support
- Previous year comparison (FY 2024-25)
- PDF report generation
- Save results via email
- Multi-language support (Hindi, Tamil, etc.)
- Dark mode
- Mobile app (PWA)

---

## 12. Appendix

### 12.1 Tax Slab Reference Tables

**New Regime (All Ages):**
| Income | Rate | Cumulative Tax |
|---|---|---|
| ₹0-4L | 0% | ₹0 |
| ₹4L-8L | 5% | ₹20,000 |
| ₹8L-12L | 10% | ₹60,000 |
| ₹12L-16L | 15% | ₹1,20,000 |
| ₹16L-20L | 20% | ₹2,00,000 |
| ₹20L-24L | 25% | ₹3,00,000 |
| Above ₹24L | 30% | ₹3,00,000 + 30% of excess |

**Old Regime (Below 60):**
| Income | Rate | Cumulative Tax |
|---|---|---|
| ₹0-2.5L | 0% | ₹0 |
| ₹2.5L-5L | 5% | ₹12,500 |
| ₹5L-10L | 20% | ₹1,12,500 |
| Above ₹10L | 30% | ₹1,12,500 + 30% of excess |

**Old Regime (60-80):**
| Income | Rate | Cumulative Tax |
|---|---|---|
| ₹0-3L | 0% | ₹0 |
| ₹3L-5L | 5% | ₹10,000 |
| ₹5L-10L | 20% | ₹1,10,000 |
| Above ₹10L | 30% | ₹1,10,000 + 30% of excess |

**Old Regime (80+):**
| Income | Rate | Cumulative Tax |
|---|---|---|
| ₹0-5L | 0% | ₹0 |
| ₹5L-10L | 20% | ₹1,00,000 |
| Above ₹10L | 30% | ₹1,00,000 + 30% of excess |

### 12.2 Deduction Limits Quick Reference

| Deduction | Limit | Regime |
|---|---|---|
| Standard Deduction | ₹75,000 | New |
| Standard Deduction | ₹50,000 | Old |
| 80C | ₹1,50,000 | Old only |
| 80D (Self <60) | ₹25,000 | Old only |
| 80D (Self 60+) | ₹50,000 | Old only |
| 80D (Parents <60) | ₹25,000 | Old only |
| 80D (Parents 60+) | ₹50,000 | Old only |
| 80CCD(1B) | ₹50,000 | Old only |
| 80E | No limit | Old only |
| 80G | Varies | Old only |
| 80TTA | ₹10,000 | Old only |
| 80TTB | ₹50,000 | Old only |
| 80GG | ₹60,000 | Old only |
| Section 24 | ₹2,00,000 | Old only |
| Professional Tax | ₹2,500 | Old only |
| HRA | Calculated | Old only |
| LTA | Actuals | Old only |

### 12.3 Glossary for FAQ

- **CTC:** Cost to Company — total salary package including benefits
- **Take-Home:** Net salary after all deductions (PF, tax, etc.) that lands in bank
- **Basic Salary:** Fixed component of salary, usually 40-50% of gross
- **HRA:** House Rent Allowance — part of salary for rent expenses
- **PF/EPF:** Provident Fund — retirement savings, 12% of basic from employee
- **80C:** Section of Income Tax Act for investments (PPF, ELSS, LIC, etc.)
- **80D:** Health insurance premium deduction
- **NPS:** National Pension System — additional retirement savings
- **Rebate 87A:** Tax credit that reduces tax to zero for low incomes
- **Cess:** Additional tax for health and education (4%)
- **Taxable Income:** Income on which tax is calculated after deductions
- **Exemption:** Income not taxed at all (like HRA)
- **Deduction:** Amount subtracted from income before tax calculation

---

**End of PRD**
