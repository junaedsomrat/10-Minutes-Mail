import { Mail, Shield, Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TempMail
            </h1>
            <p className="text-[10px] text-slate-400 -mt-0.5 font-medium tracking-wider uppercase">Disposable Email</p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Instant</span>
          </div>
        </div>
      </div>
    </header>
  );
}
