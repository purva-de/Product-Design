import React from 'react';
import { PRODUCT_CONFIG } from '../config/productConfig';
import { ContactForm } from '../components/ContactForm';
import { Layers, Monitor, ShoppingBag } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const serviceIcons = [Layers, Monitor, ShoppingBag];

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-24 z-10 bg-gradient-to-b from-transparent via-[#0b0c10] to-[#08090b]"
      aria-label="Lead Flow Tech Digital Experience Agency and Contact"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-accent-champagne)] font-bold">
            06 / Agency & Inquiries
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] uppercase text-[var(--color-text-primary)] mt-2 leading-tight">
            Your Product. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--color-accent-silver)] to-[var(--color-accent-champagne)]">
              A New Dimension.
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[var(--color-text-secondary)] font-light">
            {PRODUCT_CONFIG.agency.tagline}
          </p>
        </div>

        {/* 3 Service Capabilities Minimal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {PRODUCT_CONFIG.agency.services.map((service, idx) => {
            const IconComponent = serviceIcons[idx] || Layers;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl border border-[var(--color-border)] bg-[rgba(19,21,25,0.7)] backdrop-blur-xl hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-accent-champagne)]">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono uppercase text-[var(--color-accent-silver)]">
                    {service.metric}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white tracking-tight mb-1 truncate">
                  {service.title}
                </h3>

                <p className="text-xs text-[var(--color-text-secondary)] font-light truncate">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Conversion Form */}
        <div className="my-6">
          <ContactForm />
        </div>
      </div>

      {/* Agency Footer */}
      <footer className="mt-16 pt-8 border-t border-white/10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--color-text-tertiary)] font-mono">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white uppercase">Lead Flow Tech</span>
          <span>//</span>
          <span>3D Web Experiences</span>
        </div>

        <div>
          <span>© {new Date().getFullYear()} Lead Flow Tech.</span>
        </div>
      </footer>
    </section>
  );
};
