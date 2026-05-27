import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GlassButton } from './GlassButton';
import { PremiumProduct } from '../data/premium-products';
import { useToast } from '@/hooks/use-toast';

interface CheckoutModalProps {
  product: PremiumProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ product, isOpen, onClose }: CheckoutModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      toast({
        title: "Order Received",
        description: "We'll be in touch via QuickBooks invoice within 24 hours.",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="m-4 bg-zinc-950 border border-white/10 shadow-2xl rounded-2xl overflow-hidden relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black transition-colors"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Product Summary */}
                <div className="bg-zinc-900 p-8 flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 bg-forge-gradient opacity-5" />
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="font-display uppercase tracking-widest text-sm text-forge-gradient mb-4">Order Summary</h3>
                    <div className="aspect-square rounded-xl overflow-hidden mb-6 border border-white/5">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-2xl font-display text-white mb-2 uppercase">{product.title}</h2>
                    <p className="text-white/60 text-sm mb-6">{product.description}</p>
                    <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-end">
                      <span className="text-white/60">Total</span>
                      <span className="text-2xl font-display text-white">{product.priceLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="p-8">
                  <h3 className="font-display uppercase tracking-widest text-sm text-white/50 mb-6">Contact Details</h3>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">Email</label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">Shipping Address</label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none"
                        placeholder="123 Forge Lane..."
                      />
                    </div>

                    <div className="mt-6">
                      <GlassButton 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? 'Processing...' : 'Submit Order'}
                      </GlassButton>
                    </div>
                    
                    <p className="text-center text-xs text-white/40 mt-4">
                      Secure checkout via QuickBooks coming soon.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
