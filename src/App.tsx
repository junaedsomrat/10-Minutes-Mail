import { useState, useEffect, useCallback, useRef } from 'react';
import { Email } from './types';
import { generateEmailAddress } from './utils/emailGenerator';
import { generateMockEmail, getRandomDelay } from './data/mockEmails';
import Header from './components/Header';
import EmailAddress from './components/EmailAddress';
import CircularTimer from './components/CircularTimer';
import Inbox from './components/Inbox';
import EmailViewer from './components/EmailViewer';
import ExpiredState from './components/ExpiredState';
import Features from './components/Features';

const TOTAL_SECONDS = 600; // 10 minutes

export default function App() {
  const [emailAddress, setEmailAddress] = useState(() => generateEmailAddress());
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(TOTAL_SECONDS);
  const [expired, setExpired] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const mockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Countdown timer
  useEffect(() => {
    if (expired) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expired]);

  // Simulate incoming emails
  const scheduleNextEmail = useCallback(() => {
    if (expired) return;

    const delay = getRandomDelay();
    mockTimerRef.current = setTimeout(() => {
      const newEmail = generateMockEmail();
      setEmails((prev) => [newEmail, ...prev]);

      // Show notification
      setNotificationText(newEmail.subject);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);

      // Schedule next one
      scheduleNextEmail();
    }, delay);
  }, [expired]);

  useEffect(() => {
    // Send first email after 3-6 seconds
    const initialDelay = Math.floor(Math.random() * 3000) + 3000;
    mockTimerRef.current = setTimeout(() => {
      const newEmail = generateMockEmail();
      setEmails((prev) => [newEmail, ...prev]);
      setNotificationText(newEmail.subject);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      scheduleNextEmail();
    }, initialDelay);

    return () => {
      if (mockTimerRef.current) clearTimeout(mockTimerRef.current);
    };
  }, [scheduleNextEmail]);

  const handleExpired = useCallback(() => {
    setExpired(true);
    setEmails([]);
    setSelectedEmail(null);
    if (mockTimerRef.current) clearTimeout(mockTimerRef.current);
  }, []);

  const handleReset = () => {
    setEmailAddress(generateEmailAddress());
    setEmails([]);
    setSelectedEmail(null);
    setRemainingSeconds(TOTAL_SECONDS);
    setExpired(false);
  };

  const handleRefreshEmail = () => {
    setEmailAddress(generateEmailAddress());
    setEmails([]);
    setSelectedEmail(null);
    setRemainingSeconds(TOTAL_SECONDS);
  };

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
    setEmails((prev) =>
      prev.map((e) => (e.id === email.id ? { ...e, read: true } : e))
    );
  };

  const handleDeleteEmail = (id: string) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/40 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-200/40 to-purple-200/40 rounded-full blur-3xl animate-blob" />
        <div
          className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute -bottom-40 right-1/3 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: '4s' }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Notification toast */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-500 ${
          showNotification
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
        }`}
      >
        <div className="glass-dark rounded-xl px-5 py-3 shadow-2xl flex items-center gap-3 max-w-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <div>
            <p className="text-xs text-indigo-300 font-semibold">New Email</p>
            <p className="text-sm text-white truncate max-w-[250px]">
              {notificationText}
            </p>
          </div>
        </div>
      </div>

      <Header />

      <main className="relative z-10 max-w-4xl mx-auto px-4 pb-12">
        {/* Hero section with timer */}
        <div className="text-center pt-6 sm:pt-10 pb-8 sm:pb-10">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/80 text-indigo-600 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              Free • No Sign-up Required
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 mb-3 tracking-tight">
              Disposable Email
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                in Seconds
              </span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-base sm:text-lg leading-relaxed">
              Protect your privacy with a temporary email that self-destructs.
              No registration needed.
            </p>
          </div>
        </div>

        {/* Timer + Email Address */}
        {!expired ? (
          <div className="space-y-6 sm:space-y-8">
            {/* Timer */}
            <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
              <CircularTimer
                totalSeconds={TOTAL_SECONDS}
                remainingSeconds={remainingSeconds}
                onExpired={handleExpired}
              />
            </div>

            {/* Email Address */}
            <div style={{ animationDelay: '0.2s', opacity: 0 }} className="animate-slide-up">
              <EmailAddress email={emailAddress} onRefresh={handleRefreshEmail} />
            </div>

            {/* Inbox / Email Viewer */}
            <div className="mt-6 sm:mt-8 animate-slide-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              {selectedEmail ? (
                <EmailViewer
                  email={selectedEmail}
                  onBack={() => setSelectedEmail(null)}
                  onDelete={handleDeleteEmail}
                />
              ) : (
                <Inbox
                  emails={emails}
                  onSelectEmail={handleSelectEmail}
                  selectedEmailId={selectedEmail ? (selectedEmail as Email).id : null}
                />
              )}
            </div>
          </div>
        ) : (
          <ExpiredState onReset={handleReset} />
        )}

        {/* Features */}
        <div className="mt-10 sm:mt-14">
          <Features />
        </div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 text-center pb-4">
          <div className="glass rounded-2xl px-6 py-5 inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <p className="text-sm text-slate-400">
              🔒 All emails are encrypted and auto-deleted after expiry
            </p>
            <div className="hidden sm:block w-px h-4 bg-slate-200" />
            <p className="text-sm text-slate-400">
              Made with <span className="text-red-400">♥</span> for privacy
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
