import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, CheckCircle } from 'lucide-react';
import { etsyProducts } from '@/data/etsy-products';
import { GlassButton } from '@/components/GlassButton';
import { Navigation } from '@/components/Navigation';
import { FloatingContactBanner } from '@/components/FloatingContactBanner';

export function ProductPage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const product = etsyProducts.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <p className="font-display text-4xl tracking-widest text-white/30 mb-6">Product not found</p>
          <GlassButton onClick={() => navigate('/')}>Back to Shop</GlassButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <FloatingContactBanner />

      <div className="pt-28 pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 group font-display tracking-wider text-sm uppercase"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div
                className="aspect-square rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,140,26,0.05)',
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)] pointer-events-none rounded-2xl" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-8 bg-orange-500/10 blur-2xl rounded-full pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col"
            >
              <div className="mb-2">
                <span className="text-xs font-display tracking-widest uppercase text-orange-400/70">Hand-Forged</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl tracking-wider text-white mb-4 leading-tight">
                {product.title}
              </h1>
              <div className="text-3xl font-display tracking-wider mb-6 text-forge-gradient">
                {product.priceLabel}
              </div>

              <div
                className="w-full h-px mb-8"
                style={{ background: 'linear-gradient(90deg, rgba(255,140,26,0.3), transparent)' }}
              />

              <p className="text-white/65 leading-relaxed mb-8 text-base font-sans">
                {product.description}
              </p>

              {product.details && product.details.length > 0 && (
                <div className="mb-10 space-y-3">
                  {product.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle size={15} className="text-orange-500 flex-shrink-0" />
                      <span className="text-white/60 text-sm font-sans">{detail}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <GlassButton
                  href={product.etsyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 justify-center"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Buy on Etsy
                </GlassButton>
              </div>

              <p className="text-xs text-white/30 tracking-wide mt-5 font-sans">
                Purchase securely through our Etsy shop. Questions? Call or text Dallan directly.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
