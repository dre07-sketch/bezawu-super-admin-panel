
import React, { useState } from 'react';
import { AuthView } from '../../types';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import OTPVerification from './OTPVerification';
import ResetPassword from './ResetPassword';
import { Sparkles, CheckCircle } from 'lucide-react';

interface AuthFlowProps {
  onLoginSuccess: (token: string, admin: any) => void;
}

const AuthFlow: React.FC<AuthFlowProps> = ({ onLoginSuccess }) => {
  const [view, setView] = useState<AuthView>('LOGIN');
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePasswordResetSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setView('LOGIN');
      setEmail('');
      setResetToken('');
    }, 3000);
  };

  const renderView = () => {
    if (showSuccess) {
      return (
        <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white font-poppins mb-3">Password Reset Complete!</h2>
          <p className="text-white/60 text-sm">You can now login with your new password</p>
        </div>
      );
    }

    switch (view) {
      case 'LOGIN':
        return <Login onLogin={onLoginSuccess} onForgot={() => setView('FORGOT')} />;
      case 'FORGOT':
        return (
          <ForgotPassword
            onNext={(e) => { setEmail(e); setView('OTP'); }}
            onBack={() => setView('LOGIN')}
          />
        );
      case 'OTP':
        return (
          <OTPVerification
            email={email}
            onVerified={(token) => { setResetToken(token); setView('RESET'); }}
            onBack={() => setView('FORGOT')}
          />
        );
      case 'RESET':
        return <ResetPassword resetToken={resetToken} onSuccess={handlePasswordResetSuccess} />;
      default:
        return <Login onLogin={onLoginSuccess} onForgot={() => setView('FORGOT')} />;
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-[#020617]">
      {/* Animated Background Blobs */}
      <div className="mesh-blob blob-1"></div>
      <div className="mesh-blob blob-2"></div>

      <div className="w-full max-w-[440px] z-10">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 glass-card flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden group border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-400 opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Sparkles className="text-white w-8 h-8 relative z-10" />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight font-poppins">Bezaw</h1>
          <p className="text-emerald-400/60 text-xs font-bold uppercase tracking-[0.3em] mt-3">Advanced Admin Terminal</p>
        </div>

        <div className="glass-card w-full p-10 relative overflow-hidden shadow-2xl bg-white/[0.03] border-white/5">
          {renderView()}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">
            Tech-Forward Logistics Engine v6.1
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthFlow;
