import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [loading, setLoading] = useState(false);

  const handleLaunch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <section id="cta" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary-dark to-emerald-700 p-12 lg:p-20 text-center"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 animate-float" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-white/5 animate-float-reverse" />
          </div>
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white/90 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Sparkles size={16} />
              Ready to Transform Your Clinic?
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              Transform Patient Care<br />
              <span className="text-accent">Continuity Today</span>
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of small clinics already improving treatment completion rates. Start your free trial — no credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLaunch}
                disabled={loading}
                className="group inline-flex items-center gap-3 px-10 py-4 text-lg font-bold text-primary bg-white rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 disabled:opacity-80"
                id="launch-demo-btn"
              >
                {loading ? (
                  <><Loader2 size={20} className="animate-spin" /> Launching...</>
                ) : (
                  <>Launch Demo <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </motion.button>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-10 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Contact Sales
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
