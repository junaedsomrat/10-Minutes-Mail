import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface EmailAddressProps {
  email: string;
  onRefresh: () => void;
}

export default function EmailAddress({ email, onRefresh }: EmailAddressProps) {
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for clipboard API not available
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    onRefresh();
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <div className="animate-slide-up">
      <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
        Your Temporary Email
      </label>
      <div className="glass rounded-2xl p-1.5 shadow-xl shadow-indigo-500/5">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gradient-to-r from-slate-50 to-white rounded-xl px-5 py-4">
            <span className="text-lg sm:text-xl font-mono font-semibold text-slate-800 tracking-tight select-all break-all">
              {email}
            </span>
          </div>
          
          <button
            onClick={handleCopy}
            className={`shrink-0 h-14 px-5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-300 ${
              copied
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleRefresh}
            className="shrink-0 h-14 w-14 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-300 hover:scale-[1.05] active:scale-[0.95]"
            title="Generate new email"
          >
            <RefreshCw className={`w-5 h-5 text-slate-600 transition-transform duration-500 ${refreshing ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
