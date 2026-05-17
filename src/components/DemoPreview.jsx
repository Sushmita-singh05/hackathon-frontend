import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, Pill, Flame, Flower2 } from 'lucide-react';

const medicines = [
  { name: 'Amoxicillin 500mg', time: 'Morning — 8:00 AM', taken: true },
  { name: 'Ibuprofen 200mg', time: 'Afternoon — 2:00 PM', taken: true },
  { name: 'Paracetamol 650mg', time: 'Evening — 6:00 PM', taken: false },
  { name: 'Vitamin D3', time: 'Night — 9:00 PM', taken: false },
];

const DemoPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [meds, setMeds] = useState(medicines);

  const handleTake = (index) => {
    setMeds((prev) =>
      prev.map((m, i) => (i === index ? { ...m, taken: true } : m))
    );
  };

  const takenCount = meds.filter((m) => m.taken).length;
  const streakDays = 7;

  return (
    <section id="demo" className="py-24 lg:py-32 bg-gradient-to-b from-transparent via-primary/3 to-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Live Demo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            See It <span className="gradient-text">In Action</span>
          </h2>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Experience the patient-facing app — track medicines, build streaks, and watch your flower grow.
          </p>
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Phone frame */}
            <div className="w-[320px] sm:w-[360px] bg-white rounded-[3rem] shadow-2xl shadow-primary/15 border-[8px] border-gray-800 overflow-hidden relative">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-800 rounded-b-2xl z-20" />

              {/* Screen content */}
              <div className="pt-10 pb-8 px-5 min-h-[600px] bg-gradient-to-b from-bg to-white">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-text-muted">Good Morning 👋</p>
                    <h3 className="text-lg font-bold">Priya Sharma</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                    PS
                  </div>
                </div>

                {/* Streak card */}
                <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Flame size={20} className="text-accent" />
                      <span className="font-semibold text-sm">{streakDays} Day Streak!</span>
                    </div>
                    <span className="text-xs text-text-muted">{takenCount}/{meds.length} today</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent to-orange-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(takenCount / meds.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Flower */}
                <div className="flex justify-center mb-5">
                  <div className="relative w-24 h-24">
                    {/* Stem */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={isInView ? { height: '50%' } : {}}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-t from-primary to-secondary rounded-full origin-bottom"
                    />
                    {/* Leaves */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 1.2, type: 'spring' }}
                      className="absolute bottom-6 left-1/2 -translate-x-full"
                    >
                      <div className="w-5 h-3 bg-secondary rounded-full -rotate-30" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 1.4, type: 'spring' }}
                      className="absolute bottom-10 left-1/2"
                    >
                      <div className="w-5 h-3 bg-primary-light rounded-full rotate-30" />
                    </motion.div>
                    {/* Flower petals */}
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 0.7 } : {}}
                        transition={{ delay: 1.5 + i * 0.1, type: 'spring' }}
                        className="absolute top-4 left-1/2"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-12px)`,
                        }}
                      >
                        <div className="w-4 h-6 rounded-full bg-primary" />
                      </motion.div>
                    ))}
                    {/* Center */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 2.1, type: 'spring' }}
                      className="absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-accent shadow-lg"
                    />
                  </div>
                </div>

                {/* Medicine list */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                    Today's Medicines
                  </h4>
                  {meds.map((med, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                        med.taken
                          ? 'bg-primary/5 border-primary/20'
                          : 'bg-white border-gray-100 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                            med.taken
                              ? 'bg-primary text-white'
                              : 'bg-gray-50 text-gray-400'
                          }`}
                        >
                          {med.taken ? (
                            <CheckCircle size={18} />
                          ) : (
                            <Pill size={18} />
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${med.taken ? 'line-through text-text-muted' : ''}`}>
                            {med.name}
                          </p>
                          <p className="text-xs text-text-muted">{med.time}</p>
                        </div>
                      </div>
                      {!med.taken && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleTake(i)}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-primary to-primary-dark rounded-full shadow-md hover:shadow-lg transition-all"
                        >
                          Mark as Taken
                        </motion.button>
                      )}
                      {med.taken && (
                        <span className="text-xs text-primary font-medium">✓ Done</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-b from-primary/20 to-accent/20 blur-3xl scale-90 opacity-30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoPreview;
