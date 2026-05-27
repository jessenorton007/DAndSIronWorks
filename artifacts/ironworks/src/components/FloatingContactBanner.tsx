import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const PHONE = '4354219033';
const PHONE_DISPLAY = '(435) 421-9033';

export function FloatingContactBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
          style={{ width: 'max-content', maxWidth: 'calc(100vw - 2rem)' }}
        >
          <div
            className="relative flex items-center gap-3 px-4 py-3 rounded-full overflow-hidden"
            style={{
              background: 'rgba(20,16,12,0.72)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,140,26,0.28)',
              boxShadow: '0 8px 48px rgba(255,77,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none rounded-full" style={{
              background: 'linear-gradient(135deg, rgba(255,77,0,0.06) 0%, transparent 60%)'
            }} />
            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-orange-500/10 blur-2xl rounded-full pointer-events-none" />

            <span className="hidden sm:block text-xs uppercase tracking-widest text-white/50 font-display pl-1 pr-2 border-r border-white/10 whitespace-nowrap">
              Talk to Dallan
            </span>

            <motion.a
              href={`tel:+1${PHONE}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-display uppercase tracking-wider text-sm transition-all duration-200 group"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,77,0,0.18)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,140,26,0.45)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 16px rgba(255,77,0,0.25)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
              }}
            >
              <Phone size={14} className="text-orange-400" />
              <span className="hidden sm:inline">Call</span>
              <span className="hidden md:inline text-white/60 font-sans font-normal normal-case tracking-normal text-xs">{PHONE_DISPLAY}</span>
            </motion.a>

            <motion.a
              href={`sms:+1${PHONE}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-display uppercase tracking-wider text-sm transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,77,0,0.18)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,140,26,0.45)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 16px rgba(255,77,0,0.25)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
              }}
            >
              <MessageSquare size={14} className="text-orange-400" />
              <span className="hidden sm:inline">Text</span>
            </motion.a>

            <button
              onClick={() => setDismissed(true)}
              className="ml-1 p-1.5 rounded-full text-white/30 hover:text-white/70 transition-colors"
              aria-label="Dismiss"
            >
              <X size={12} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
