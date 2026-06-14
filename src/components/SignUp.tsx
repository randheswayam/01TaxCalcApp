import React, { useState } from 'react';
import { useTax } from '../context/TaxContext';
import { Eye, EyeOff, Lock, Mail, User, Check, X, ArrowLeft, ShieldCheck } from 'lucide-react';

export const SignUp: React.FC = () => {
  const { signUp, setCurrentStep } = useTax();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Interaction states
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, password: false });

  // Field validation
  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password criteria checks
  const passCriteria = [
    { id: 'length', label: 'Minimum 8 characters', met: password.length >= 8 },
    { id: 'number', label: 'At least 1 number', met: /\d/.test(password) },
    { id: 'upper', label: 'At least 1 uppercase letter', met: /[A-Z]/.test(password) },
    { id: 'special', label: 'At least 1 special character (!@#$ etc.)', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const metCriteriaCount = passCriteria.filter((c) => c.met).length;
  const isPasswordValid = metCriteriaCount === passCriteria.length;

  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  const handleBlur = (field: 'name' | 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTouched({ name: true, email: true, password: true });

    if (isFormValid) {
      setSuccess(true);
      // Simulate API call and state storage
      setTimeout(() => {
        signUp(name, email);
        setCurrentStep(1); // Proceed straight to the first step of tax check
      }, 1500);
    }
  };

  // Get password strength visual configurations
  const getStrengthConfig = () => {
    switch (metCriteriaCount) {
      case 0:
        return { color: 'bg-slate-200', width: 'w-0', label: 'None', textColor: 'text-slate-400' };
      case 1:
        return { color: 'bg-red-500', width: 'w-1/4', label: 'Weak', textColor: 'text-red-500' };
      case 2:
        return { color: 'bg-orange-500', width: 'w-2/4', label: 'Fair', textColor: 'text-orange-500' };
      case 3:
        return { color: 'bg-amber-500', width: 'w-3/4', label: 'Good', textColor: 'text-amber-500' };
      case 4:
        return { color: 'bg-emerald-500', width: 'w-full', label: 'Strong', textColor: 'text-emerald-500' };
      default:
        return { color: 'bg-slate-200', width: 'w-0', label: 'None', textColor: 'text-slate-400' };
    }
  };

  const strength = getStrengthConfig();

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

        {/* Card container */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-premium relative overflow-hidden">
          {/* Top visual line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500"></div>

          {success ? (
            /* Success State Animation */
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100 shadow-md shadow-emerald-500/10">
                <ShieldCheck className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-outfit font-black text-slate-900">
                  Account Created!
                </h2>
                <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                  Welcome aboard, <strong className="text-slate-700 font-bold">{name}</strong>. Redirecting you to the tax wizard...
                </p>
              </div>
              <div className="flex justify-center space-x-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse delay-100"></span>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse delay-200"></span>
              </div>
            </div>
          ) : (
            /* Sign Up Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Header */}
              <div className="space-y-2 text-center">
                <h2 className="text-2xl sm:text-3xl font-outfit font-black text-slate-900 tracking-tight">
                  Start Your Tax Check
                </h2>
                <p className="text-sm text-slate-500">
                  Create a secure client-side profile to manage your tax estimations.
                </p>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <User className="w-4.5 h-4.5" />
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="e.g. Rajesh Kumar"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                        touched.name && !isNameValid
                          ? 'border-red-300 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-slate-200 bg-slate-50/35 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500'
                      }`}
                    />
                  </div>
                  {touched.name && !isNameValid && (
                    <p className="text-[11px] font-semibold text-red-500 animate-fade-in">
                      Please enter your name.
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <Mail className="w-4.5 h-4.5" />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="e.g. rajesh@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                        touched.email && !isEmailValid
                          ? 'border-red-300 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-slate-200 bg-slate-50/35 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500'
                      }`}
                    />
                  </div>
                  {touched.email && !isEmailValid && (
                    <p className="text-[11px] font-semibold text-red-500 animate-fade-in">
                      Please enter a valid email address.
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <Lock className="w-4.5 h-4.5" />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => handleBlur('password')}
                      placeholder="Create a strong password"
                      className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                        touched.password && !isPasswordValid
                          ? 'border-red-300 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-slate-200 bg-slate-50/35 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                </div>

                {/* Password Strength Meter & Guidelines */}
                <div className="space-y-3 pt-1 text-left">
                  {/* Strength Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
                      <span className="text-slate-400">Password Strength</span>
                      <span className={strength.textColor}>{strength.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300 rounded-full`}></div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 bg-slate-50/60 border border-slate-100 p-3 rounded-xl text-left">
                    {passCriteria.map((criterion) => (
                      <div key={criterion.id} className="flex items-center space-x-1.5 text-xs">
                        {criterion.met ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
                        )}
                        <span className={criterion.met ? 'text-slate-600 font-semibold' : 'text-slate-400'}>
                          {criterion.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitted && !isFormValid}
                className={`w-full py-3.5 font-semibold rounded-xl text-white font-outfit shadow-md transition-all text-center flex items-center justify-center cursor-pointer ${
                  isFormValid 
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 active:scale-[0.98]' 
                    : 'bg-slate-300 shadow-none cursor-not-allowed opacity-80'
                }`}
              >
                Create Account & Start Check
              </button>

              {/* Footer text */}
              <p className="text-[11px] text-slate-400 leading-relaxed text-center">
                🔒 All credentials remain strictly client-side in your local browser cache. We never transmit your password or personal data to any external server.
              </p>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
