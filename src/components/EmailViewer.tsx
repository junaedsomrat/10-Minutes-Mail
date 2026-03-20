import { Email } from '../types';
import { ArrowLeft, Clock, User, Trash2 } from 'lucide-react';

interface EmailViewerProps {
  email: Email;
  onBack: () => void;
  onDelete: (id: string) => void;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function EmailViewer({ email, onBack, onDelete }: EmailViewerProps) {
  return (
    <div className="glass rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 animate-slide-in-right">
      {/* Toolbar */}
      <div className="px-4 sm:px-6 py-3 border-b border-slate-200/50 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Inbox</span>
        </button>
        
        <button
          onClick={() => {
            onDelete(email.id);
            onBack();
          }}
          className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
      
      {/* Email header */}
      <div className="px-4 sm:px-8 py-6 border-b border-slate-100">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">{email.subject}</h2>
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-xl shrink-0">
            {email.avatar}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-800">{email.fromName}</span>
              <span className="text-sm text-slate-400">&lt;{email.from}&gt;</span>
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>To: me</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(email.timestamp)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Email body */}
      <div className="px-4 sm:px-8 py-6 max-h-[400px] overflow-y-auto scrollbar-thin">
        <div
          className="prose prose-sm max-w-none text-slate-600"
          dangerouslySetInnerHTML={{ __html: email.body }}
        />
      </div>
    </div>
  );
}
