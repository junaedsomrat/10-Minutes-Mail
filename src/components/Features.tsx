import { Shield, Clock, Trash2, Eye } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'No personal data required. Your identity stays anonymous.',
    color: 'from-green-400 to-emerald-500',
    shadow: 'shadow-green-500/20',
  },
  {
    icon: Clock,
    title: '10-Min Lifespan',
    description: 'Email auto-destructs after 10 minutes. No traces left.',
    color: 'from-indigo-400 to-purple-500',
    shadow: 'shadow-indigo-500/20',
  },
  {
    icon: Trash2,
    title: 'No Spam Ever',
    description: 'Use for sign-ups. Keep your real inbox clean & safe.',
    color: 'from-orange-400 to-red-500',
    shadow: 'shadow-orange-500/20',
  },
  {
    icon: Eye,
    title: 'Instant Inbox',
    description: 'Emails arrive in real-time. Read verification codes instantly.',
    color: 'from-cyan-400 to-blue-500',
    shadow: 'shadow-cyan-500/20',
  },
];

export default function Features() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
      {features.map((feature, i) => (
        <div
          key={feature.title}
          className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:scale-[1.03] transition-all duration-300 cursor-default group"
          style={{ animationDelay: `${0.4 + i * 0.1}s` }}
        >
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} ${feature.shadow} shadow-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
            <feature.icon className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-bold text-sm text-slate-700 mb-1">{feature.title}</h4>
          <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
