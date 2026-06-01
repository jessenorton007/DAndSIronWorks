import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Phone } from 'lucide-react';
import { useLocation, useParams } from 'wouter';
import { Navigation } from '@/components/Navigation';
import { FloatingContactBanner } from '@/components/FloatingContactBanner';
import { Embers } from '@/components/Embers';
import { GlassButton } from '@/components/GlassButton';
import { getService } from '@/data/services';
import { useSeo } from '@/lib/seo';
import NotFound from './not-found';

export function ServiceDetailPage() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const service = getService(params.slug);

  useSeo({
    title: service?.metaTitle ?? 'Custom Ironwork Services | D&S Iron Works',
    description: service?.metaDescription ?? 'Custom ironwork, forged metal art, fire pits, signs, railings, and blacksmith commissions by D&S Iron Works.',
    path: service ? `/services/${service.slug}` : '/services',
    image: service?.heroImage,
    jsonLd: service
      ? {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.metaDescription,
          provider: {
            '@type': 'LocalBusiness',
            name: 'D&S Iron Works',
            telephone: '+1-435-421-9033',
            areaServed: 'Utah',
          },
          areaServed: 'Utah',
          serviceType: service.title,
        }
      : undefined,
  });

  if (!service) return <NotFound />;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <FloatingContactBanner />
      <Embers />

      <main className="relative pt-28 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,77,0,0.06)_0%,transparent_62%)] pointer-events-none" />
        <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10">
          <button
            onClick={() => navigate('/services')}
            className="flex items-center gap-2 text-white/35 hover:text-white transition-colors mb-10 group font-display tracking-wider text-sm uppercase"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            All Services
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center mb-16">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-xs font-display tracking-[0.3em] uppercase text-orange-400/70 block mb-4">
                {service.eyebrow}
              </span>
              <h1 className="font-display text-5xl md:text-7xl tracking-widest uppercase leading-none text-white mb-6">
                {service.title}
              </h1>
              <p className="text-white/60 font-sans font-light leading-relaxed text-lg max-w-xl mb-8">
                {service.summary}
              </p>
              <div className="flex flex-wrap gap-4">
                <GlassButton href="tel:+14354219033">
                  <Phone size={15} className="mr-2" />
                  Call Dallan
                </GlassButton>
                <GlassButton onClick={() => navigate('/contact')} className="bg-white/3">
                  Start a Project
                </GlassButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,140,26,0.16)', boxShadow: '0 24px 80px rgba(0,0,0,0.45)' }}
            >
              <img src={service.heroImage} alt={`${service.title} example from D&S Iron Works`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12">
            <section
              className="rounded-xl p-6 sm:p-8"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-widest text-white mb-6">
                What This Includes
              </h2>
              <div className="space-y-4">
                {service.details.map((detail) => (
                  <div key={detail} className="flex gap-3">
                    <CheckCircle size={17} className="text-orange-400 mt-0.5 shrink-0" />
                    <p className="text-white/60 font-sans leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="rounded-xl p-6 sm:p-8"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-widest text-white mb-6">
                Common Projects
              </h2>
              <div className="flex flex-wrap gap-2">
                {service.examples.map((example) => (
                  <span
                    key={example}
                    className="rounded-full border border-orange-500/20 bg-orange-500/8 px-3 py-1.5 text-xs font-display tracking-widest uppercase text-orange-200/75"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
