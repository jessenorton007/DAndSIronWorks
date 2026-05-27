import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Embers } from "@/components/Embers";
import { GlassButton } from "@/components/GlassButton";
import { CheckoutModal } from "@/components/CheckoutModal";
import { etsyProducts } from "@/data/etsy-products";
import { premiumProducts, PremiumProduct } from "@/data/premium-products";

export function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  const [checkoutProduct, setCheckoutProduct] = useState<PremiumProduct | null>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 overflow-x-hidden">
      <Navigation />
      <Embers />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10" />
          <img 
            src="/images/hero-bg.png" 
            alt="Forge interior" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <motion.img 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            src="/brand/logo.png" 
            alt="Ironworks" 
            className="h-24 md:h-32 mb-8 invert opacity-90 brightness-150 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-widest uppercase text-white mb-6 drop-shadow-2xl max-w-4xl"
          >
            Forged in <span className="text-forge-gradient font-bold drop-shadow-[0_0_30px_rgba(255,77,0,0.5)]">Fire</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mb-12"
          >
            Bespoke metal craft, architectural ironwork, and heavy steel made beautiful. 
            Raw, confident, and handcrafted.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <GlassButton onClick={() => scrollToSection('custom-designs')}>
              View Custom Work
            </GlassButton>
          </motion.div>
        </div>
      </section>

      {/* Custom Designs Section */}
      <section id="custom-designs" className="relative py-32 bg-black z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-6xl tracking-widest uppercase mb-4">
              <span className="text-forge-gradient">Bespoke</span> Craft
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We design and forge custom gates, sculptural fireplaces, architectural railings, and unique metalwork. Each piece is heavy, honest, and built to last generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10"
            >
              <img src="/images/portfolio-gate.png" alt="Custom Gate" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="font-display text-2xl uppercase tracking-wider text-white">Architectural Gates</h3>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10"
            >
              <img src="/images/portfolio-fireplace.png" alt="Custom Fireplace" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="font-display text-2xl uppercase tracking-wider text-white">Heavy Steel Fireplaces</h3>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10"
            >
              <img src="/images/portfolio-railing.png" alt="Custom Railing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="font-display text-2xl uppercase tracking-wider text-white">Forged Railings</h3>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10"
            >
              <img src="/images/portfolio-sculpture.png" alt="Abstract Sculpture" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="font-display text-2xl uppercase tracking-wider text-white">Abstract Sculpture</h3>
              </div>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto text-center border-t border-b border-white/10 py-16">
            <h3 className="font-display text-3xl tracking-widest uppercase mb-6">Commission a Piece</h3>
            <p className="text-white/60 mb-10 max-w-xl mx-auto">
              Discuss your project directly with the owner. We take on select bespoke commissions for discerning clients.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <GlassButton as="a" href="tel:+15555555555" className="w-full sm:w-auto min-w-[200px]">
                Call
              </GlassButton>
              <GlassButton as="a" href="sms:+15555555555" className="w-full sm:w-auto min-w-[200px]">
                Text
              </GlassButton>
            </div>
            <p className="text-xs text-white/40 mt-6 tracking-wide uppercase">
              Calls and texts go directly to the forge floor
            </p>
          </div>
        </div>
      </section>

      {/* Premium Pre-Made */}
      <section id="premium" className="relative py-32 bg-zinc-950 z-10 border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,77,0,0.03)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl tracking-widest uppercase mb-4">
                Signature <span className="text-forge-gradient">Pieces</span>
              </h2>
              <p className="text-white/60 max-w-xl">
                Heavy, high-end works available for immediate order. Secure checkout via QuickBooks coming soon.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {premiumProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-black border border-white/10 rounded-xl overflow-hidden flex flex-col group hover:border-white/20 transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden relative border-b border-white/10">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0" 
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-display text-2xl uppercase tracking-wider text-white mb-2">{product.title}</h3>
                  <p className="text-white/60 text-sm mb-8 flex-1">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-display text-xl tracking-wider text-forge-gradient">{product.priceLabel}</span>
                    <GlassButton 
                      onClick={() => setCheckoutProduct(product)}
                      className="px-6 py-2 text-sm"
                    >
                      Order
                    </GlassButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Etsy Shop Section */}
      <section id="shop" className="relative py-32 bg-black z-10 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl tracking-widest uppercase mb-4">
              Forge <span className="text-forge-gradient">Goods</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              Small batch hand-forged goods. Iron candle holders, hooks, brackets, and home accents.
            </p>
            <div className="inline-block bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <p className="text-xs tracking-wider text-white/50 uppercase">
                Live Etsy sync coming soon — products shown below are placeholders
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {etsyProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
                onClick={() => window.open(product.etsyUrl, '_blank')}
              >
                <div className="aspect-square bg-zinc-900 border border-white/10 rounded-lg mb-4 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <GlassButton className="scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                      View on Etsy
                    </GlassButton>
                  </div>
                </div>
                <div>
                  <h3 className="font-display tracking-widest uppercase text-white/90 group-hover:text-white transition-colors">{product.title}</h3>
                  <p className="text-white/50 mt-1">{product.priceLabel}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-zinc-950 border-t border-white/10 py-16 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-forge-gradient blur-[150px] opacity-10 rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <img 
              src="/brand/logo.png" 
              alt="Ironworks" 
              className="h-16 mb-8 invert opacity-50"
            />
            <div className="flex gap-8 mb-12">
              <a href="tel:+15555555555" className="text-white/60 hover:text-white transition-colors font-display tracking-widest">
                +1 (555) 555-5555
              </a>
              <a href="mailto:forge@example.com" className="text-white/60 hover:text-white transition-colors font-display tracking-widest">
                forge@example.com
              </a>
            </div>
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} Ironworks. Master Forged Goods.
            </p>
          </div>
        </div>
      </footer>

      {/* Checkout Modal */}
      <CheckoutModal 
        product={checkoutProduct} 
        isOpen={!!checkoutProduct} 
        onClose={() => setCheckoutProduct(null)} 
      />
    </div>
  );
}
