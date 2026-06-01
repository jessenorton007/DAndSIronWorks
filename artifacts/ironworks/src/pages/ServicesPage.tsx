import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import { useLocation } from 'wouter';
import { Navigation } from '@/components/Navigation';
import { FloatingContactBanner } from '@/components/FloatingContactBanner';
import { Embers } from '@/components/Embers';
import { GlassButton } from '@/components/GlassButton';
import { services } from '@/data/services';
import { useSeo } from '@/lib/seo';

export function ServicesPage() {
  const [, navigate] = useLocation();

  useSeo({
    title: 'Custom Ironwork Services in Utah | D&S Iron Works',
    description: 'Explore D&S Iron Works services: custom ironwork, fire pits, forged railings, metal signs, forged metal art, and blacksmith commissions in Utah.',
    path: '/services',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'D&S Iron Works services',
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.title,
        url: typeof window === 'undefined' ? `/services/${service.slug}` : `${window.location.origin}/services/${service.slug}`,
      })),
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <FloatingContactBanner />
      <Embers />

      <main className="relative pt-28 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,77,0,0.06)_0%,transparent_62%)] pointer-events-none" />
        <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/35 hover:text-white transition-colors mb-10 group font-display tracking-wider text-sm uppercase"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <span className="text-xs font-display tracking-[0.3em] uppercase text-orange-400/70 block mb-4">
                Custom Metalwork Services
              </span>
              <h1 className="font-display text-5xl md:text-7xl tracking-widest uppercase leading-none text-white">
                Utah <span className="text-forge-gradient">Ironwork</span>
              </h1>
            </div>
            <p className="text-white/55 max-w-md font-sans font-light leading-relaxed">
              D&S Iron Works builds custom fire pits, forged railings, personalized metal signs,
              sculptural ironwork, and one-of-a-kind blacksmith commissions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16">
            {services.map((service, i) => (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.06 }}
                className="group rounded-xl overflow-hidden bg-white/[0.025]"
                style={{ border: '1px solid rgba(255,255,255,0.09)' }}
              >
                <button onClick={() => navigate(`/services/${service.slug}`)} className="block w-full text-left">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.heroImage}
                      alt={`${service.title} by D&S Iron Works`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading={i < 3 ? 'eager' : 'lazy'}
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <span className="text-[10px] font-display tracking-[0.24em] uppercase text-orange-400/65 block mb-2">
                      {service.eyebrow}
                    </span>
                    <h2 className="font-display text-xl uppercase tracking-wider text-white mb-3">
                      {service.title}
                    </h2>
                    <p className="text-white/50 text-sm font-sans leading-relaxed mb-5">
                      {service.summary}
                    </p>
                    <span className="nav-link inline-flex items-center gap-2 text-xs font-display tracking-widest uppercase">
                      View Service <ArrowRight size={13} />
                    </span>
                  </div>
                </button>
              </motion.article>
            ))}
          </div>

          <div
            className="rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,140,26,0.16)' }}
          >
            <div>
              <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-widest text-white mb-2">
                Start a Custom Ironwork Project
              </h2>
              <p className="text-white/50 font-sans text-sm leading-relaxed max-w-2xl">
                Bring a sketch, photo, dimensions, or rough idea. Dallan will talk through what can be built.
              </p>
            </div>
            <GlassButton href="tel:+14354219033" className="shrink-0">
              <Phone size={15} className="mr-2" />
              Call Dallan
            </GlassButton>
          </div>
        </div>
      </main>
    </div>
  );
}
