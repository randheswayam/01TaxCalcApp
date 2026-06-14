import React from 'react';
import { TaxProvider, useTax } from './context/TaxContext';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { Sandbox } from './components/Sandbox';
import { SignUp } from './components/SignUp';

const AppContent: React.FC = () => {
  const { currentStep, setCurrentStep } = useTax();

  return (
    <Layout>
      {currentStep === -20 ? (
        <SignUp />
      ) : currentStep === -10 ? (
        <Sandbox />
      ) : currentStep === 0 ? (
        <LandingPage />
      ) : (
        <div className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-premium text-center space-y-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto border border-blue-100">
              <span className="font-bold text-2xl font-outfit">?</span>
            </div>
            <h2 className="text-2xl font-outfit font-bold text-slate-800">
              Wizard Step {currentStep} Placeholder
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              You've started the tax check! In Phase 3, this area will display the interactive 8-step wizard questions.
            </p>
            <button
              onClick={() => setCurrentStep(0)}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all-custom font-outfit"
            >
              ← Back to Landing Page
            </button>
          </div>
        </div>
      )}

      {/* Floating Developer Sandbox Toggle */}
      <button
        onClick={() => setCurrentStep(currentStep === -10 ? 0 : -10)}
        className="fixed bottom-6 right-6 z-50 bg-slate-900 text-slate-100 hover:bg-slate-800 active:scale-95 px-4 py-2.5 rounded-xl border border-slate-800 shadow-2xl flex items-center gap-2 transition-all cursor-pointer font-outfit text-xs font-bold"
      >
        <span className={`w-2 h-2 rounded-full ${currentStep === -10 ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`}></span>
        <span>{currentStep === -10 ? 'Exit Sandbox' : 'Open Developer Sandbox'}</span>
      </button>
    </Layout>
  );
};

export default function App() {
  return (
    <TaxProvider>
      <AppContent />
    </TaxProvider>
  );
}
