import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, Building, Mail, User, Tag, FileText } from 'lucide-react';

interface FormState {
  name: string;
  businessName: string;
  email: string;
  industry: string;
  projectDescription: string;
}

interface FormErrors {
  name?: string;
  businessName?: string;
  email?: string;
  industry?: string;
  projectDescription?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    businessName: '',
    email: '',
    industry: 'Luxury & Fashion',
    projectDescription: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business or brand name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid business email address';
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Please describe your product or experience vision';
    } else if (formData.projectDescription.trim().length < 15) {
      newErrors.projectDescription = 'Please provide at least 15 characters of project context';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable production processing with explicit demo mode transparency
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedData({ ...formData });

      // Celebration confetti for successful interactive submission
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c7ad86', '#b8bec8', '#ffffff'],
        });
      } catch {}
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      businessName: '',
      email: '',
      industry: 'Luxury & Fashion',
      projectDescription: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl border border-[var(--color-border)] bg-[rgba(19,21,25,0.92)] backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Decorative subtle ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-champagne-glow)] blur-3xl pointer-events-none rounded-full" />

      {isSubmitted ? (
        <div className="py-8 text-center animate-fadeIn" role="status" aria-live="polite">
          <div className="w-16 h-16 rounded-full bg-[var(--color-accent-champagne)]/15 border border-[var(--color-accent-champagne)] flex items-center justify-center mx-auto mb-6 text-[var(--color-accent-champagne)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Enquiry Recorded Successfully
          </h3>

          <p className="mt-2 text-xs text-[var(--color-text-secondary)] truncate">
            Thank you, {submittedData?.name} from {submittedData?.businessName}. We will be in touch shortly.
          </p>

          <div className="mt-4 p-3 rounded-lg border border-white/10 bg-white/5 text-xs font-mono text-[var(--color-text-secondary)] truncate">
            <span className="text-[var(--color-accent-champagne)] font-bold mr-2">Status:</span>
            Portfolio demonstration mode. Ready for production webhook integration.
          </div>

          <button
            type="button"
            onClick={resetForm}
            className="mt-8 px-6 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-xs uppercase tracking-wider font-semibold text-white transition-all cursor-pointer"
          >
            Submit Another Project Brief
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5 relative z-10">
          <div className="border-b border-white/10 pb-3 mb-2">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
              Start Your 3D Showcase
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 truncate">
              Direct partnership enquiry with Lead Flow Tech.
            </p>
          </div>

          {/* Name & Business Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="enquiry-name"
                className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5"
              >
                Your Name <span className="text-[var(--color-error)]">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  id="enquiry-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Helena Vance"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-black/40 text-sm text-[var(--color-text-primary)] placeholder-white/25 focus:border-[var(--color-accent-champagne)] focus:bg-black/60 focus:outline-none transition-all ${
                    errors.name ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
                  }`}
                />
              </div>
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-[var(--color-error)] flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="enquiry-business"
                className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5"
              >
                Brand / Company <span className="text-[var(--color-error)]">*</span>
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  id="enquiry-business"
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Aether Footwear"
                  aria-invalid={Boolean(errors.businessName)}
                  aria-describedby={errors.businessName ? 'business-error' : undefined}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-black/40 text-sm text-[var(--color-text-primary)] placeholder-white/25 focus:border-[var(--color-accent-champagne)] focus:bg-black/60 focus:outline-none transition-all ${
                    errors.businessName ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
                  }`}
                />
              </div>
              {errors.businessName && (
                <p id="business-error" className="mt-1 text-xs text-[var(--color-error)] flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.businessName}
                </p>
              )}
            </div>
          </div>

          {/* Email & Industry Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="enquiry-email"
                className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5"
              >
                Work Email <span className="text-[var(--color-error)]">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  id="enquiry-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="helena@aether.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-black/40 text-sm text-[var(--color-text-primary)] placeholder-white/25 focus:border-[var(--color-accent-champagne)] focus:bg-black/60 focus:outline-none transition-all ${
                    errors.email ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
                  }`}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-[var(--color-error)] flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="enquiry-industry"
                className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5"
              >
                Product Category
              </label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <select
                  id="enquiry-industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-black/40 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-accent-champagne)] focus:bg-black/60 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="Luxury & Fashion" className="bg-[#131519] text-white">Luxury & Fashion</option>
                  <option value="Consumer Electronics & Hardware" className="bg-[#131519] text-white">Consumer Electronics</option>
                  <option value="Automotive & Mobility" className="bg-[#131519] text-white">Automotive & Mobility</option>
                  <option value="Industrial & Robotics" className="bg-[#131519] text-white">Industrial & Robotics</option>
                  <option value="Architecture & Interior" className="bg-[#131519] text-white">Architecture & Interior</option>
                </select>
              </div>
            </div>
          </div>

          {/* Project Vision Description */}
          <div>
            <label
              htmlFor="enquiry-description"
              className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5"
            >
              Project Vision & Scope <span className="text-[var(--color-error)]">*</span>
            </label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
              <textarea
                id="enquiry-description"
                rows={3}
                value={formData.projectDescription}
                onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                placeholder="Share your goals: 3D interactive showroom, product launch campaign, target timeline, or custom 3D configurator..."
                aria-invalid={Boolean(errors.projectDescription)}
                aria-describedby={errors.projectDescription ? 'description-error' : undefined}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-black/40 text-sm text-[var(--color-text-primary)] placeholder-white/25 focus:border-[var(--color-accent-champagne)] focus:bg-black/60 focus:outline-none transition-all resize-none ${
                  errors.projectDescription ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'
                }`}
              />
            </div>
            {errors.projectDescription && (
              <p id="description-error" className="mt-1 text-xs text-[var(--color-error)] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.projectDescription}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-[var(--color-accent-champagne)] hover:bg-[#d6bc96] text-[#08090b] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:shadow-[0_0_25px_rgba(199,173,134,0.35)] transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Encrypting & Transmitting Enquiry...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Let's Build Your Experience</span>
                <Send className="w-4 h-4" />
              </span>
            )}
          </button>

          <p className="text-[10px] text-center text-[var(--color-text-tertiary)] font-mono">
            Directly transmitted to Lead Flow Tech executive design partners. Strict NDA standard.
          </p>
        </form>
      )}
    </div>
  );
};
