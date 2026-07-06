import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Smartphone, GraduationCap, Zap, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: Building2,
    title: 'Built for Small Clinics',
    description: 'Designed specifically for clinics with 1-5 doctors. No complex enterprise features you don\'t need.',
  },
  {
    icon: Smartphone,
    title: 'Works on Basic Smartphones',
    description: 'SMS-based system works on any phone. Patients don\'t need to download apps or have internet.',
  },
  {
    icon: GraduationCap,
    title: 'No Technical Training Needed',
    description: 'Intuitive interface that doctors and staff can learn in under 10 minutes. Zero learning curve.',
  },
  {
    icon: Zap,
    title: 'Fast Doctor Workflow',
    description: 'Add patients and generate prescriptions in seconds. Built for speed during busy clinic hours.',
  },
  {
    icon: TrendingUp,
    title: 'Improves Treatment Completion',
    description: 'Proven to increase medication adherence by up to 40% through smart reminders and gamification.',
  },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Why KlinikApp
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Why Choose{' '}
              <span className="gradient-text">KlinikApp?</span>
            </h2>
            <p className="text-text-light text-lg mb-10 leading-relaxed">
              We understand the challenges small clinics face. KlinikApp is
              purpose-built to be simple, affordable, and effective.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '40%', label: 'Better Adherence' },
                { value: '10min', label: 'Setup Time' },
                { value: '500+', label: 'Patients Helped' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10"
                >
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-text-muted mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Cards */}
          <div className="space-y-4">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-primary/5 shadow-sm hover:shadow-lg hover:shadow-primary/5 hover:border-primary/15 transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                  <reason.icon
                    size={22}
                    className="text-primary group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-text-light leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
