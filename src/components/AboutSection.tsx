import React from 'react';
import { ShieldCheck, Target, Heart, Award, Sparkles, Star, Milestone, Clock } from 'lucide-react';

export default function AboutSection() {
  const values = [
    {
      title: 'Patient-First Integrity',
      desc: 'Every clinical decision, therapy path, and research standard is motivated purely by patient safety and medical ethics.',
      icon: ShieldCheck,
      color: 'bg-teal-50 text-teal-600'
    },
    {
      title: 'Empathetic Clinical Care',
      desc: 'We treat people, not just diseases. We ensure our patients feel comforted, listened to, and respected at every step.',
      icon: Heart,
      color: 'bg-rose-50 text-rose-600'
    },
    {
      title: 'Pioneering Innovation',
      desc: 'We invest in advanced clinical tech, robotic-assisted surgery platforms, and continuous medical staff education.',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Healthcare Accessibility',
      desc: 'Partnering with major health insurance networks to provide transparent pricing, clear bills, and optimal medical care.',
      icon: Award,
      color: 'bg-blue-50 text-blue-600'
    }
  ];

  const milestones = [
    { year: '2008', title: 'WeCare Foundation', desc: 'Opened our first 100-bed general multi-specialty medical facility.' },
    { year: '2013', title: 'Cardiac Wing Expansion', desc: 'Inaugurated our 24/7 Cardiology critical care wing with dual angiography suites.' },
    { year: '2018', title: 'Robotics & Advanced Neurosurgery', desc: 'Introduced AI-navigated spinal robotic surgeries and microsurgical platforms.' },
    { year: '2022', title: 'Level III NICU & Pediatric Center', desc: 'Opened our comprehensive children healthcare and critical neonatal facility.' },
    { year: '2025', title: 'JCI Golden Seal Accreditation', desc: 'Achieved the Joint Commission International Gold Seal for superior care standards.' }
  ];

  return (
    <div id="about-section" className="space-y-16 sm:space-y-24">
      {/* 1. Header Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-xs uppercase font-bold tracking-widest text-teal-600 font-mono">Our Heritage & Future</h1>
        <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Pioneering Medical Excellence
        </p>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          At WeCare Hospitals, we are dedicated to transforming patient experiences. For over 18 years, we have provided advanced medical sciences with unmatched personal empathy.
        </p>
      </section>

      {/* 2. Visual Story Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-50/50 p-6 sm:p-10 rounded-3xl border border-slate-100">
        <div className="space-y-6">
          <div className="bg-teal-600 text-white p-3 rounded-2xl w-fit">
            <Target className="h-6 w-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Our Mission & Clinical Vision</h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            WeCare exists to provide comprehensive, state-of-the-art medical services in an environment shaped by compassion. We believe that true healing occurs when cutting-edge technology matches deep patient-physician understanding.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-1">
              <span className="text-3xl font-extrabold text-teal-600">99.4%</span>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">Patient Satisfaction</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-extrabold text-teal-600">30 min</span>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">Avg Emergency Response</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-teal-50 rounded-full blur-2xl -z-10" />
          <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
            <Award className="h-5 w-5 text-teal-600" />
            <span>Accredited Clinical Standards</span>
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            We hold ourselves to rigorous clinical benchmarks. WeCare is accredited by the Joint Commission International (JCI), certifying that our hospital processes, critical care safety systems, and treatment methodologies meet pristine global healthcare criteria.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="text-xs bg-teal-50 border border-teal-100 text-teal-800 px-3 py-1.5 rounded-lg font-semibold">JCI Gold Seal</span>
            <span className="text-xs bg-blue-50 border border-blue-100 text-blue-800 px-3 py-1.5 rounded-lg font-semibold">ISO 9001:2015</span>
            <span className="text-xs bg-emerald-50 border border-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg font-semibold">FDA Approved Labs</span>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xs uppercase font-bold tracking-widest text-teal-600 font-mono">Our Belief System</h2>
          <p className="text-3xl font-bold text-slate-900 tracking-tight">The Values That Shape Our Care</p>
          <p className="text-sm text-slate-500">Every clinician, nurse, administrator, and support team member lives by these core concepts daily.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {values.map((val) => (
            <div 
              key={val.title} 
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col space-y-4"
            >
              <div className={`p-3 rounded-xl w-fit ${val.color}`}>
                <val.icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{val.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-1">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Timeline Milestones */}
      <section className="bg-slate-50 py-16 sm:py-20 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 rounded-3xl">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-xs uppercase font-bold tracking-widest text-teal-600 font-mono">Our History</h2>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">Timeline of Medical Milestones</p>
            <p className="text-sm text-slate-500">From our humble beginnings to a leading clinical super-center.</p>
          </div>

          <div className="relative border-l border-teal-200 ml-4 md:ml-32 space-y-10 py-2">
            {milestones.map((milestone, idx) => (
              <div key={milestone.year} className="relative pl-6 md:pl-8 group">
                {/* Year Badge on Left for larger screens */}
                <span className="hidden md:block absolute -left-28 top-0.5 text-right font-extrabold text-teal-600 font-mono text-lg w-20">
                  {milestone.year}
                </span>

                {/* Bullet node */}
                <span className="absolute -left-1.5 top-2 h-3 w-3 rounded-full border-2 border-teal-600 bg-white group-hover:bg-teal-600 transition-colors" />

                {/* Milestone Details */}
                <div className="space-y-1.5">
                  <span className="inline-block md:hidden text-xs font-extrabold text-teal-600 font-mono bg-teal-50 px-2 py-0.5 rounded-md mb-1">
                    {milestone.year}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                    {milestone.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
