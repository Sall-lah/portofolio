import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { SectionContainer } from '../ui/SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { siteConfig } from '../../data/siteConfig';
import { ContactFormData } from '../../types';
import { toTelHref } from '../../utils/tel';

const INFO_ICON_BOX_CLASS =
  'w-10 h-10 rounded-md bg-surface border border-border flex items-center justify-center text-primary shrink-0';
const LABEL_CLASS = 'block text-[14px] font-medium text-brand-text';
const INPUT_CLASS =
  'w-full px-4 py-2.5 text-[15px] bg-white border border-border rounded-md text-brand-text placeholder:text-brand-muted/70 transition-all duration-fast focus-visible:outline-2 focus-visible:outline-primary';

/**
 * Contact section featuring an accessible message form and direct contact info.
 * Why: Dispatches inquiries directly to the developer inbox via Web3Forms with email and phone fallbacks.
 *
 * @returns Contact section JSX element
 */
export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam bot check
    if (botcheck) {
      return;
    }

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields before sending.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Inquiry from ${formData.name}`,
          from_name: 'Developer Portfolio Contact Form',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setErrorMessage('');
      } else {
        setStatus('error');
        setErrorMessage(
          result.message ||
            'Unable to send message via Web3Forms. Please email me directly below.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'A network connection error occurred while sending your message. Please reach out directly via email.'
      );
    }
  };

  return (
    <section id="contact" className="min-h-screen py-16 md:py-24 bg-surface/30 flex flex-col justify-center">
      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <SectionHeading>Contact</SectionHeading>
            </div>

            <p className="text-[16px] text-brand-muted leading-[1.65]">
              Whether you have an open engineering role, a software project in mind, or want to discuss technical architecture, feel free to reach out.
            </p>

            <div className="space-y-4 pt-4 border-t border-border">
              {siteConfig.phone && (
                <div className="flex items-center gap-3 text-[15px] text-brand-text">
                  <div className={INFO_ICON_BOX_CLASS}>
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[12px] font-mono uppercase text-brand-muted">Phone / WhatsApp</div>
                    <a
                      href={toTelHref(siteConfig.phone)}
                      className="font-medium hover:text-primary transition-colors duration-fast"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-[15px] text-brand-text">
                <div className={INFO_ICON_BOX_CLASS}>
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-mono uppercase text-brand-muted">Email Directly</div>
                  <a
                    href={siteConfig.socialLinks.email}
                    className="font-medium hover:text-primary transition-colors duration-fast"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-border shadow-card">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {status === 'success' && (
                  <div
                    role="alert"
                    className="flex items-center gap-3 p-4 rounded-md bg-emerald-50 border border-status-success/30 text-status-success text-[14px]"
                  >
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span>Thank you! Your message has been received. I'll get back to you soon.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-md bg-red-50 border border-status-danger/30 text-status-danger text-[14px]"
                  >
                    <div className="flex items-center gap-2.5">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                    <a
                      href={siteConfig.socialLinks.email}
                      className="inline-flex items-center gap-1.5 font-medium underline hover:text-primary transition-colors text-[13px] self-start sm:self-auto"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Directly</span>
                    </a>
                  </div>
                )}

                {/* Honeypot Botcheck (Hidden from humans) */}
                <input
                  type="checkbox"
                  name="botcheck"
                  checked={botcheck}
                  onChange={(e) => setBotcheck(e.target.checked)}
                  className="hidden"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className={LABEL_CLASS}
                  >
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Connor"
                    className={INPUT_CLASS}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className={LABEL_CLASS}
                  >
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. sarah@company.com"
                    className={INPUT_CLASS}
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className={LABEL_CLASS}
                  >
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about the role, project, or collaboration..."
                    className={`${INPUT_CLASS} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-[15px] font-medium rounded-md bg-primary text-white hover:bg-primary-hover active:bg-primary-hover transition-colors duration-fast shadow-sm min-h-[44px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};
