import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Embers } from "@/components/Embers";
import { GlassButton } from "@/components/GlassButton";
import { CheckoutModal } from "@/components/CheckoutModal";
import { FloatingContactBanner } from "@/components/FloatingContactBanner";
import { etsyProducts } from "@/data/etsy-products";
import { premiumProducts, PremiumProduct } from "@/data/premium-products";

export function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1, 1.06]);
  const [checkoutProduct, setCheckoutProduct] = useState<PremiumProduct | null>(null);
  const [, navigate] = useLocation();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
      <Navigation />
      <Embers />
      <FloatingContactBanner />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section id="hero" className="relative h-screen flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="absolute inset-0 bg-[#0d0a07]/70 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 z-10" />
          <img
            src="/images/hero-bg.png"
            alt="Forge interior"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-3"
            >
              <span className="text-xs font-display tracking-[0.3em] uppercase text-orange-400/80">
                D &amp; S Iron Works — Dallan Goff
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="font-display text-6xl md:text-7xl lg:text-8xl tracking-widest uppercase text-white leading-none mb-6"
            >
              Forged<br />
              in <span className="text-forge-gradient" style={{ textShadow: '0 0 40px rgba(255,77,0,0.35)' }}>Fire</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="text-white/60 text-lg leading-relaxed mb-10 font-sans font-light max-w-md"
            >
              Bespoke metal craft, architectural ironwork, and heavy steel made beautiful.
              Raw, confident, built to last generations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <GlassButton onClick={() => scrollTo('custom-designs')}>
                View Custom Work
              </GlassButton>
              <GlassButton onClick={() => scrollTo('shop')} className="bg-white/3">
                Shop Now
              </GlassButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:flex flex-col items-end gap-4"
          >
            <div
              className="relative w-64 h-64 rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,140,26,0.15)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}
            >
              <img src="/images/portfolio-gate.png" alt="Custom Gate" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs font-display tracking-widest uppercase text-white/70">Architectural Gates</div>
            </div>
            <div
              className="relative w-48 h-48 rounded-2xl overflow-hidden self-start ml-12"
              style={{ border: '1px solid rgba(255,140,26,0.12)', boxShadow: '0 16px 60px rgba(0,0,0,0.4)' }}
            >
              <img src="/images/portfolio-fireplace.png" alt="Custom Fireplace" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs font-display tracking-widest uppercase text-white/70">Fireplaces</div>
            </div>
            <div
              className="relative w-56 h-40 rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,140,26,0.1)', boxShadow: '0 12px 48px rgba(0,0,0,0.4)' }}
            >
              <img src="/images/portfolio-railing.png" alt="Railings" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs font-display tracking-widest uppercase text-white/70">Forged Railings</div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={() => scrollTo('custom-designs')}
            className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
          >
            <span className="text-xs font-display tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
            />
          </motion.button>
        </div>
      </section>

      {/* ── CUSTOM DESIGNS ───────────────────────────────────────────── */}
      <section id="custom-designs" className="relative py-32 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="text-xs font-display tracking-[0.3em] uppercase text-orange-400/70 block mb-3">
                The Heart of the Shop
              </span>
              <h2 className="font-display text-5xl md:text-6xl tracking-widest uppercase leading-none">
                <span className="text-forge-gradient">Bespoke</span><br />Craft
              </h2>
            </div>
            <p className="text-white/50 max-w-sm font-sans font-light leading-relaxed">
              Custom gates, sculptural fireplaces, architectural railings, and one-of-a-kind metalwork.
              Each piece is heavy, honest, and built to last generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {[
              { src: '/images/portfolio-gate.png', label: 'Architectural Gates', desc: 'Custom entry gates, driveway gates, and garden arches' },
              { src: '/images/portfolio-fireplace.png', label: 'Heavy Steel Fireplaces', desc: 'Indoor and outdoor custom fireplace surrounds and inserts' },
              { src: '/images/portfolio-railing.png', label: 'Forged Railings', desc: 'Stair railings, balcony guards, and interior handrails' },
              { src: '/images/portfolio-sculpture.png', label: 'Abstract Sculpture', desc: 'Site-specific sculptural commissions for any space' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-display text-xl uppercase tracking-wider text-white mb-1">{item.label}</h3>
                  <p className="text-white/50 text-sm font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.desc}</p>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(255,140,26,0.2)' }} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl px-8 py-12 md:py-16 md:px-16 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,77,0,0.06) 0%, rgba(14,10,6,0.8) 60%)',
              border: '1px solid rgba(255,140,26,0.18)',
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,77,0,0.12),transparent_60%)] pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <h3 className="font-display text-3xl md:text-4xl tracking-widest uppercase text-white mb-4">
                  Commission a Piece
                </h3>
                <p className="text-white/55 font-sans font-light leading-relaxed">
                  Discuss your project directly with Dallan. We take on select bespoke commissions —
                  bring your idea, a photo, a sketch, or just a feeling, and we'll build it.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-center shrink-0">
                <p className="text-xs font-display tracking-widest uppercase text-orange-400/60 mb-2">
                  Talk to Dallan directly
                </p>
                <div className="text-2xl font-display tracking-wider text-white">
                  (435) 421-9033
                </div>
                <p className="text-xs text-white/30 font-sans">Call or text — goes straight to the forge</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PREMIUM PRE-MADE ─────────────────────────────────────────── */}
      <section id="premium" className="relative py-32 z-10 border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,77,0,0.04)_0%,transparent_65%)] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-xs font-display tracking-[0.3em] uppercase text-orange-400/70 block mb-3">Ready to Order</span>
              <h2 className="font-display text-5xl md:text-6xl tracking-widest uppercase leading-none">
                Signature <span className="text-forge-gradient">Pieces</span>
              </h2>
            </div>
            <p className="text-white/50 max-w-sm font-sans font-light">
              Heavy, high-end works available now. Secure checkout coming soon via QuickBooks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {premiumProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,140,26,0.2)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 48px rgba(255,77,0,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.4)] pointer-events-none" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-display text-xl uppercase tracking-wider text-white mb-2">{product.title}</h3>
                  <p className="text-white/50 text-sm mb-6 flex-1 font-sans leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-display text-2xl tracking-wider text-forge-gradient">{product.priceLabel}</span>
                    <GlassButton onClick={() => setCheckoutProduct(product)} className="px-5 py-2.5 text-sm">
                      Order
                    </GlassButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ETSY SHOP ────────────────────────────────────────────────── */}
      <section id="shop" className="relative py-32 z-10 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <span className="text-xs font-display tracking-[0.3em] uppercase text-orange-400/70 block mb-3">Hand-Forged Goods</span>
              <h2 className="font-display text-5xl md:text-6xl tracking-widest uppercase leading-none">
                Forge <span className="text-forge-gradient">Shop</span>
              </h2>
            </div>
            <div className="flex flex-col gap-3 text-right">
              <p className="text-white/45 max-w-xs font-sans font-light text-sm leading-relaxed">
                Small-batch iron goods. Candle holders, hooks, fire tools, and home accents.
              </p>
              <a
                href="https://www.etsy.com/shop/dandsironworks"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-sm font-display tracking-widest uppercase self-end"
              >
                View Full Etsy Shop →
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {etsyProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/shop/${product.id}`)}
              >
                <div
                  className="aspect-square mb-4 overflow-hidden rounded-xl relative"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'border-color 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,140,26,0.25)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 opacity-85 group-hover:opacity-100"
                    style={{ transition: 'transform 0.5s ease, opacity 0.3s ease' }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="font-display text-sm uppercase tracking-widest text-white border border-white/30 rounded-full px-5 py-2.5 bg-white/5">
                      View Details
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-display tracking-wider uppercase text-white/85 group-hover:text-white transition-colors text-sm">
                    {product.title}
                  </h3>
                  <p className="text-orange-400/70 mt-1 font-sans text-sm">{product.priceLabel}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer id="contact" className="border-t border-white/8 py-16 relative overflow-hidden"
        style={{ background: 'rgba(10,7,4,0.95)' }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-orange-600/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="flex flex-col items-start">
              <img
                src="/brand/logo.png"
                alt="D&S Iron Works"
                className="h-14 mb-4"
                style={{ filter: 'invert(1) brightness(0.7)' }}
              />
              <p className="text-white/30 text-sm font-sans leading-relaxed max-w-xs">
                D &amp; S Iron Works — hand-forged metal craft from Utah.
              </p>
            </div>
            <div>
              <h4 className="font-display text-xs tracking-[0.3em] uppercase text-orange-400/60 mb-5">Contact</h4>
              <div className="space-y-3">
                <a href="tel:+14354219033" className="block text-white/50 hover:text-white transition-colors font-sans text-sm">
                  (435) 421-9033
                </a>
                <a href="mailto:dandsiron@yahoo.com" className="block text-white/50 hover:text-white transition-colors font-sans text-sm">
                  dandsiron@yahoo.com
                </a>
                <a
                  href="https://www.facebook.com/DallanGoffBlacksmith"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white/50 hover:text-white transition-colors font-sans text-sm"
                >
                  @DallanGoffBlacksmith
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-display text-xs tracking-[0.3em] uppercase text-orange-400/60 mb-5">Navigate</h4>
              <div className="space-y-3">
                {['custom-designs', 'premium', 'shop'].map(id => (
                  <button
                    key={id}
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="nav-link block text-sm font-display tracking-widest uppercase"
                  >
                    {id === 'custom-designs' ? 'Custom Designs' : id === 'premium' ? 'Signature Pieces' : 'Forge Shop'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-white/25 text-xs font-sans">
              &copy; {new Date().getFullYear()} D &amp; S Iron Works. All rights reserved.
            </p>
            <a
              href="https://www.etsy.com/shop/dandsironworks"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link text-xs font-display tracking-widest uppercase"
            >
              Shop on Etsy
            </a>
          </div>
        </div>
      </footer>

      <CheckoutModal
        product={checkoutProduct}
        isOpen={!!checkoutProduct}
        onClose={() => setCheckoutProduct(null)}
      />
    </div>
  );
}
