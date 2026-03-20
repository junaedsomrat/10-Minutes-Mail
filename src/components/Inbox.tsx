import { Email } from '../types';
import { Inbox as InboxIcon, ChevronRight, Clock } from 'lucide-react';

interface InboxProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
  selectedEmailId: string | null;
}

function timeAgo(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diff < 5) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function Inbox({ emails, onSelectEmail, selectedEmailId }: InboxProps) {
  if (emails.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 sm:p-12 text-center animate-fade-in">
        <div className="relative inline-block mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center animate-float">
            <InboxIcon className="w-10 h-10 text-indigo-400" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center animate-pulse-ring">
            <Clock className="w-3 h-3 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-700 mb-2">Waiting for emails...</h3>
        <p className="text-slate-400 max-w-sm mx-auto leading-relaxed">
          Use the temporary email address above to sign up for services. Incoming emails will appear here automatically.
        </p>
        
        {/* Loading dots animation */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-indigo-400 rounded-full"
              style={{
                animation: 'pulse-ring 1.5s ease-in-out infinite',
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 animate-fade-in">
      {/* Inbox header */}
      <div className="px-6 py-4 border-b border-slate-200/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-slate-700">Inbox</h3>
          <span className="bg-indigo-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {emails.filter(e => !e.read).length}
          </span>
        </div>
        <span className="text-sm text-slate-400">{emails.length} message{emails.length !== 1 ? 's' : ''}</span>
      </div>
      
      {/* Email list */}
      <div className="divide-y divide-slate-100 max-h-[480px] overflow-y-auto scrollbar-thin">
        {emails.map((email, index) => (
          <button
            key={email.id}
            onClick={() => onSelectEmail(email)}
            className={`email-row w-full text-left px-6 py-4 flex items-center gap-4 transition-all duration-200 hover:bg-indigo-50/50 group animate-email-arrive ${
              selectedEmailId === email.id ? 'bg-indigo-50/70' : ''
            } ${!email.read ? 'bg-white' : 'bg-slate-50/30'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Avatar */}
            <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
              !email.read
                ? 'bg-gradient-to-br from-indigo-100 to-purple-100 shadow-sm'
                : 'bg-slate-100'
            }`}>
              {email.avatar}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className={`text-sm truncate ${!email.read ? 'font-bold text-slate-800' : 'font-medium text-slate-500'}`}>
                  {email.fromName}
                </span>
                <span className="text-xs text-slate-400 shrink-0 tabular-nums">{timeAgo(email.timestamp)}</span>
              </div>
              <p className={`text-sm truncate ${!email.read ? 'font-semibold text-slate-700' : 'text-slate-500'}`}>
                {email.subject}
              </p>
              <p className="text-xs text-slate-400 truncate mt-0.5">{email.from}</p>
            </div>
            
            {/* Indicators */}
            <div className="shrink-0 flex items-center gap-2">
              {!email.read && (
                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse-ring" />
              )}
              <ChevronRight className="email-arrow w-4 h-4 text-slate-300 opacity-0 transition-all duration-200" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
