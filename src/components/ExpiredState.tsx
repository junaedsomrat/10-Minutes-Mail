import { TimerOff, RefreshCw } from 'lucide-react';

interface ExpiredStateProps {
  onReset: () => void;
}

export default function ExpiredState({ onReset }: ExpiredStateProps) {
  return (
    <div className="glass rounded-2xl p-8 sm:p-12 text-center animate-slide-up">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center mx-auto mb-6">
        <TimerOff className="w-10 h-10 text-red-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-slate-800 mb-2">Session Expired</h3>
      <p className="text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
        Your temporary email address has expired and all messages have been permanently deleted for your privacy.
      </p>
      
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
      >
        <RefreshCw className="w-5 h-5" />
        Generate New Email
      </button>
    </div>
  );
}
