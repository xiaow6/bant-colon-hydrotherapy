import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { BUSINESS_NAME, BUSINESS_PHONE, BUSINESS_ADDRESS, BUSINESS_EMAIL, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-aqua-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand & Quick Links */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo/logo only.jpeg"
                alt="BANT Colon Hydrotherapy"
                width={48}
                height={48}
                className="h-12 w-12 object-contain rounded-lg"
              />
            </div>
            <p className="text-sm text-aqua-200/80 mb-6">
              Professional colon hydrotherapy in a calm, private, and professional environment.
            </p>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-aqua-200/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/book" className="text-sm text-aqua-300 font-semibold hover:text-white transition-colors">
                Book Now
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-aqua-400 mt-0.5 shrink-0" />
                <span className="text-sm text-aqua-200/80">{BUSINESS_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-aqua-400 shrink-0" />
                <a href={`tel:${BUSINESS_PHONE.replace(/\s/g, '')}`} className="text-sm text-aqua-200/80 hover:text-white transition-colors">
                  {BUSINESS_PHONE}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-aqua-400 shrink-0" />
                <a href={`mailto:${BUSINESS_EMAIL}`} className="text-sm text-aqua-200/80 hover:text-white transition-colors">
                  {BUSINESS_EMAIL}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-aqua-400 mt-0.5 shrink-0" />
                <div className="text-sm text-aqua-200/80">
                  <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p>Saturday: By appointment</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Find Us</h3>
            <div className="rounded-lg overflow-hidden h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.5!2d27.906!3d-26.107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCascades+Shopping+Centre+Little+Falls!5e0!3m2!1sen!2sza!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BANT Colon Hydrotherapy Location"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-aqua-800 text-center">
          <p className="text-xs text-aqua-200/50">
            &copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
            Colon hydrotherapy is not a medical treatment and does not replace medical care.
          </p>
        </div>
      </div>
    </footer>
  );
}
