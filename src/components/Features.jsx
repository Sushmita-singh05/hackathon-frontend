import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, FileText, BarChart3, Gamepad2 } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Smart SMS Reminders',
    description:
      'Automated text reminders that reach patients on any phone — no app download needed. Boost adherence effortlessly.',
    gradient: 'from-blue-500 to-cyan-400',
    bgGlow: 'bg-blue-500/10',
  },
  {
    icon: FileText,
    title: 'Digital Patient Records',
    description:
      'Replace paper files with secure, searchable digital records. Access patient history instantly from any device.',
    gradient: 'from-primary to-secondary',
    bgGlow: 'bg-primary/10',
  },
  {
    icon: BarChart3,
    title: 'Medicine Adherence Tracking',
    description:
      'Real-time dashboards show which patients are on track and who needs follow-up. Data-driven care decisions.',
    gradient: 'from-purple-500 to-pink-400',
    bgGlow: 'bg-purple-500/10',
  },
  {
    icon: Gamepad2,
    title: 'Gamified Recovery Progress',
    description:
      'Patients grow a virtual flower as they complete doses. Streaks, rewards, and gentle motivation keep them engaged.',
    gradient: 'from-accent to-orange-400',
    bgGlow: 'bg-accent/10',
  },
];

const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="relative bg-white rounded-3xl p-8 shadow-lg shadow-primary/5 border border-primary/5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/15 transition-all duration-500 h-full">
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-3xl ${feature.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`} />

        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <feature.icon size={24} className="text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-text-light leading-relaxed text-sm">
          {feature.description}
        </p>

        {/* Hover arrow */}
        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2">
          Learn more →
        </div>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' });

  return (
    <section id="features" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Everything Your Clinic{' '}
            <span className="gradient-text">Needs</span>
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Simple, powerful tools designed specifically for small clinics to
            improve patient outcomes.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
