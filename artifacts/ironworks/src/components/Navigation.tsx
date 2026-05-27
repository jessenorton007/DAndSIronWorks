import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Custom Designs', id: 'custom-designs' },
    { name: 'Shop', id: 'shop' },
    { name: 'Premium', id: 'premium' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-5xl rounded-full backdrop-blur-md bg-black/40 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] px-6 py-3 flex items-center justify-between">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollTo('hero')}>
            <img 
              src="/brand/logo.png" 
              alt="Ironworks Logo" 
              className="h-8 w-auto invert opacity-90 brightness-150"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector('span')) {
                  const span = document.createElement('span');
                  span.className = 'font-display font-bold text-xl tracking-wider text-white';
                  span.innerText = 'IRONWORKS';
                  parent.appendChild(span);
                }
              }}
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium tracking-widest uppercase text-white/70 hover:text-white transition-colors hover:text-forge-gradient"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/70 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 px-4 md:hidden"
          >
            <div className="rounded-2xl backdrop-blur-xl bg-black/80 border border-white/10 shadow-2xl p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-lg font-display tracking-widest uppercase text-white hover:text-primary transition-colors py-2 border-b border-white/5 last:border-0"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
