import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UserPlus, ClipboardList, MessageCircle, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Doctor Adds Patient',
    description: 'Quick registration with basic details — name, phone, condition.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: ClipboardList,
    title: 'Prescription Generated',
    description: 'Digital prescription with dosage, timing, and duration recorded.',
    color: 'from-primary to-primary-dark',
  },
  {
    icon: MessageCircle,
    title: 'SMS Reminder Sent',
    description: 'Automated reminders sent at scheduled times to patient phones.',
    color: 'from-accent to-orange-500',
  },
  {
    icon: TrendingUp,
    title: 'Patient Tracks Progress',
    description: 'Patients mark doses as taken, building streaks and growing flowers.',
    color: 'from-purple-500 to-pink-500',
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-gradient-to-b from-transparent via-primary/3 to-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Simple <span className="gradient-text">4-Step</span> Process
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            From patient registration to recovery tracking — streamlined for busy clinics.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-20 left-[12.5%] right-[12.5%] h-0.5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-400 via-primary via-50% to-purple-400 origin-left rounded-full"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                className="relative text-center"
              >
                {/* Step number */}
                <div className="relative inline-flex mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg relative z-10`}
                  >
                    <step.icon size={28} className="text-white" />
                  </motion.div>
                  {/* Step badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center z-20">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  {/* Pulse ring */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-20 animate-pulse-soft`} />
                </div>

                {/* Arrow - mobile between items */}
                {index < steps.length - 1 && (
                  <div className="hidden sm:block lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary/30">
                      <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}

                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-text-light leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
