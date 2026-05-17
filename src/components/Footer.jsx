import React from 'react';
import { Heart, Globe, ExternalLink, Link, Mail } from 'lucide-react';
import Logo from './Logo';

const quickLinks = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'About', href: '#about' },
  { name: 'Demo', href: '#demo' },
];

const socialLinks = [
  { icon: Globe, href: '#', label: 'Website' },
  { icon: ExternalLink, href: '#', label: 'Twitter' },
  { icon: Link, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-to-b from-transparent to-primary/5 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo size={36} />
            <p className="mt-4 text-text-light text-sm leading-relaxed max-w-md">
              MedBloom helps small clinics improve patient treatment completion
              through digital records, smart reminders, and gamification. Built
              with care for healthcare providers.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-text">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-text-light hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-text">Get in Touch</h4>
            <p className="text-sm text-text-light mb-4">
              hello@medbloom.health
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-primary/5 hover:bg-primary hover:text-white text-text-light flex items-center justify-center transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-primary/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © 2026 MedBloom. All rights reserved.
          </p>
          <p className="text-sm text-text-muted flex items-center gap-1">
            Made with <Heart size={14} className="text-red-400 fill-red-400" /> for better healthcare
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
