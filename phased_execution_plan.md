# Phased Execution Plan: TaxCalc India FY 2025-26

This document outlines a 7-phase execution plan for building the client-side Tax Calculator for FY 2025-26. Each phase represents a self-contained, runnable increment that can be completed in a single development session.

---

## Phase 1: Project Setup & Static Landing Page
### Goal
Set up the React + TypeScript + Tailwind CSS project foundation and build the high-fidelity Landing Page with the premium design system (typography, color palette, and layout).

### What Will Be Done
- Initialize the React + TypeScript app using Vite.
- Configure Tailwind CSS with the design tokens defined in the PRD (Primary `#1E40AF`, Secondary `#059669`, slate backgrounds, etc.).
- Create the custom layout component (responsive navbar, split-screen container, footer with disclaimers).
- Build the **Landing Page** layout:
  - Left side: Title, subtitle, plain-english value props, CTA button ("Start Free Tax Check"), and trust badges.
  - Right side: Static high-fidelity mockup card of the final results page to entice users.
  - Below fold: "How it works" guide and the 5 FAQ accordions (expand/collapse state managed in React).
- Setup the state context shell (using React Context or Zustand) to store user answers.

### How to Verify (Runnable State)
- Run `npm run dev` to launch the local development server.
- Open the landing page in a browser.
- Verify typography, modern colors, and responsiveness (checking layout on mobile vs desktop).
- Interact with the FAQ accordions to ensure they expand/collapse correctly.
- Click the CTA button to see an alert (placeholder for starting the wizard).

---

## Phase 2: Core Tax Engine & Live Preview Sandbox
### Goal
Implement the mathematical tax engine and the Live Preview Panel, verifying calculations against the PRD's test cases in a developer-facing test harness.

### What Will Be Done
- Implement the core calculations in a `taxEngine.ts` utility file:
  - `calculateNewRegimeTax(grossIncome, ageCategory)`
  - `calculateOldRegimeTax(grossIncome, deductions, ageCategory)`
  - `calculateHRAExemption(basicSalary, hraReceived, rentPaid, isMetro)`
  - Helper functions for age-based slabs and limits (80D, 80TTA/80TTB).
- Create the **Live Preview Panel** component:
  - A sticky side card on desktop (or bottom sheet on mobile) displaying the current estimates, taxable income, effective tax rate, and estimated savings.
- Create a temporary developer sandbox route (`/test-engine` or switchable developer tab) with forms for all variables.
- Run the engine against all 7 PRD test cases to confirm mathematical correctness.

### How to Verify (Runnable State)
- Access the developer sandbox page.
- Enter sample inputs for different test cases (e.g., Young Salaried with Metro Rent, Senior Citizen with Interest Income).
- Verify that the Live Preview Panel immediately reflects the calculated Old vs New tax, rebate, cess, and recommendation, matching the expected outputs in Section 9.1 of the PRD.

---

## Phase 3: Wizard Scaffold & Steps 1–3 (Profile & Income)
### Goal
Establish the multi-step wizard framework and implement the first three steps for basic user information and income details.

### What Will Be Done
- Replace the landing page's CTA alert with a transition to the Wizard view.
- Build the **Wizard Header/Footer**:
  - Progress bar indicating "Step X of 8".
  - Back, Next, and Skip navigation buttons.
- Implement the **Live Preview Panel** integration so it sits side-by-side with the wizard on desktop.
- Build:
  - **Step 1 (Age Category):** Radio cards for age selections (Below 60, 60-80, 80+).
  - **Step 2 (Monthly Take-Home):** Input with ₹ prefix, helper text, and validation (min ₹1,000, max ₹10,00,000, warning > ₹10,00,000).
  - **Step 3 (Other Income):** Yes/No toggle showing sub-inputs for savings interest, FD interest, and other income when enabled.
- Add relevant step-specific FAQs below the form inputs.

### How to Verify (Runnable State)
- Start from the Landing Page and click "Start Free Tax Check".
- Step through the age, take-home salary, and other income questions.
- Try entering invalid values to trigger validation errors.
- Observe the Live Preview Panel updating in real-time as you type.

---

## Phase 4: Wizard Steps 4–5 (Salary Structure & HRA Exemption)
### Goal
Implement the salary structure input and rent details steps to support complex HRA exemption calculations and Section 80GG rent deductions.

### What Will Be Done
- Build:
  - **Step 4 (Salary Structure):** Inputs for Basic Salary, HRA received, and PF deduction.
  - **Step 5 (Rent Details):** Yes/No toggle showing Monthly Rent and City Selection (dropdown with metro classification) when enabled.
- Integrate these inputs with `calculateHRAExemption` inside the state machine.
- Implement the Section 80GG fallback logic: if rent is paid but HRA received is 0, auto-apply the 80GG deduction calculation (up to ₹60,000).

### How to Verify (Runnable State)
- Proceed through Steps 1 to 5.
- Enter Basic Salary, HRA received, Rent, and City (e.g. Mumbai vs Bangalore).
- Verify that HRA exemption is correctly computed and shown under the deductions breakdown in the Live Preview Panel.
- Toggle HRA to 0 while keeping rent populated, and confirm that the Section 80GG deduction is automatically applied instead.

---

## Phase 5: Wizard Steps 6–8 (Deductions & Investments)
### Goal
Implement the final steps of the wizard to gather all tax-saving investments, health insurance, and miscellaneous deductions under the Old Regime.

### What Will Be Done
- Build:
  - **Step 6 (Investments - 80C):** Toggle showing a total investment amount input, complete with a visual progress bar indicating the remaining space up to the ₹1.5 lakh cap.
  - **Step 7 (Health Insurance - 80D):** Toggle showing inputs for self/family, parents, and whether parents are senior citizens (auto-adjusting limits to ₹25,000/₹50,000).
  - **Step 8 (Other Deductions):** Checkbox list of other deductions: Home Loan Interest (Section 24, max ₹2 lakh), Education Loan Interest (80E), NPS (80CCD(1B), max ₹50,000), Professional Tax (max ₹2,500), and Donations (80G).
- Feed all values into the tax calculation engine.

### How to Verify (Runnable State)
- Complete all 8 steps of the wizard.
- Verify that entering investments/deductions reduces the Old Regime taxable income in the Live Preview Panel.
- Verify that the caps (₹1.5L for 80C, ₹50k for NPS, etc.) are enforced by checking that values exceeding the limit do not further reduce tax.

---

## Phase 6: Comparison & Recommendations (Result Page)
### Goal
Build the final Results Page with side-by-side comparison tables, personalized education, and dynamic suggestions.

### What Will Be Done
- Add a finish step to transition the wizard into the **Result Page**.
- Build the **Winner Announcement Card**:
  - High-impact header: "Pick the New Regime" or "Pick the Old Regime".
  - Big text: "You save ₹X per year" (computed difference).
- Build the **Side-by-Side Comparison Table** displaying Gross Income, Deductions, Taxable Income, Rebates, Cess, and Total Tax.
- Build the **Slab-by-Slab Breakdown Component** showing how income falls into the tax slabs for both regimes.
- Build the **Personalized Education Section** explaining exactly why one regime won (e.g., "Your rent of ₹X saved you ₹Y in the Old Regime").
- Build the **Tailored Suggestions Engine** to render custom warnings and recommendations (e.g., advising senior citizens on 80TTB, warnings for income > ₹50 lakh).

### How to Verify (Runnable State)
- Fill out the wizard with various scenarios and submit.
- Inspect the Results Page and confirm all numbers, tables, and dynamically generated suggestions match the user's inputs.
- Verify the layout is mobile-friendly.

---

## Phase 7: State Persistence, Sharing, Polish & Final Verification
### Goal
Incorporate local storage state persistence, result sharing, UX micro-animations, and complete final testing.

### What Will Be Done
- **State Persistence:** Auto-save progress to `localStorage` so refreshing does not lose current inputs. Add a "Start Over" button on the results page to clear storage.
- **Result Sharing:** Implement a "Share Result" button that copies a formatted text summary of the tax comparison to the clipboard.
- **Animations & Transitions:**
  - Slide/fade transitions when moving between wizard steps.
  - Smooth number count-up transitions in the Live Preview and Result Card.
- **Accessibility & SEO:**
  - Add descriptive meta titles, descriptions, and Open Graph tags.
  - Verify WCAG 2.1 AA contrast ratios, focus outlines, and keyboard navigation.
- **Final Verification:** Perform a comprehensive manual walkthrough of all test cases in the PRD, documenting findings.

### How to Verify (Runnable State)
- Progress through the wizard, refresh the page, and confirm inputs are restored.
- Complete the check, copy the results, and paste them into notepad to verify formatting.
- Verify that number elements animate smoothly.
- Confirm production builds compile cleanly with zero TypeScript errors.
