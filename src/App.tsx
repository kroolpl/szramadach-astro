/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Quote, 
  BadgeCheck, 
  Mail, 
  Phone, 
  Globe, 
  Download, 
  Layers,
  ChevronRight,
  Maximize2,
  Activity,
  Calculator,
  X,
  Send,
  Clock,
  MapPin,
  ShieldCheck,
  Hammer,
  Zap,
  Droplets,
  Ruler,
  FileText,
  CheckCircle2,
  UserCheck,
  Menu,
  Home
} from "lucide-react";
import { Sheet } from "./components/Sheet";

const APP_URL = process.env.APP_URL || "";

const ProjectCard = ({ 
  id, 
  title, 
  location, 
  image, 
  specs, 
  reversed = false,
  callouts = []
}: { 
  id: string; 
  title: string; 
  location: string; 
  image: string; 
  specs: { label: string; value: string; highlight?: boolean }[];
  reversed?: boolean;
  callouts?: { top: string; left: string; label: string; angle: number; length: number }[];
}) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-sheet-white border border-sheet-border technical-sheet-shadow mt-12 lg:mt-16 rounded-sm overflow-hidden"
    >
      <div className="absolute -top-[28px] lg:-top-[32px] left-4 lg:left-8 h-[28px] lg:h-[32px] w-32 lg:w-48 bg-sheet-white border border-sheet-border border-b-0 sheet-tab-clip px-3 lg:px-4 flex items-center text-[9px] lg:text-[11px] font-mono text-slate-ink font-bold tracking-wider shadow-[-4px_-4px_10px_rgba(0,0,0,0.05)]">
        REF: {id}
      </div>

      <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
        {/* Image Section */}
        <div className="relative overflow-hidden group bg-gray-200 aspect-[4/3] lg:aspect-auto lg:w-2/3 lg:min-h-[640px]">
          <motion.img 
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            alt={title} 
            className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 transition-all duration-1000 grayscale-[20%] group-hover:grayscale-0" 
            src={image}
            referrerPolicy="no-referrer"
          />
          
          {/* Callouts - Hidden on very small screens to avoid clutter, visible from md up */}
          <div className="hidden md:block">
            {callouts.map((callout, idx) => (
              <div 
                key={idx}
                className="absolute z-20" 
                style={{ top: callout.top, left: callout.left }}
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  className="w-2 h-2 bg-slate-ink rounded-full absolute -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(45,62,80,0.4)]" 
                />
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="h-px bg-slate-ink origin-left"
                  style={{ 
                    width: `${callout.length}px`, 
                    transform: `rotate(${callout.angle}deg)` 
                  }}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="absolute whitespace-nowrap bg-sheet-white border border-slate-ink px-3 lg:px-4 py-1.5 lg:py-2 text-[9px] lg:text-[11px] font-mono uppercase text-slate-ink font-black shadow-xl border-l-4 border-l-accent-orange"
                  style={{
                    top: `${Math.sin(callout.angle * Math.PI / 180) * callout.length + 15}px`,
                    left: `${Math.cos(callout.angle * Math.PI / 180) * callout.length + 15}px`
                  }}
                >
                  {callout.label}
                </motion.div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 font-mono text-[8px] lg:text-[10px] text-slate-ink bg-white/90 px-2 lg:px-3 py-1 lg:py-1.5 border border-slate-ink/20 shadow-sm backdrop-blur-sm font-bold">
            COORD_X: {(Math.random() * 100).toFixed(3)} // COORD_Y: {(Math.random() * 100).toFixed(3)}
          </div>
        </div>

        {/* Info Section */}
        <aside className={`p-6 lg:p-12 flex flex-col justify-between lg:w-1/3 ${reversed ? 'lg:border-r' : 'lg:border-l'} border-sheet-border bg-gray-50/20`}>
          <div>
            <div className="flex flex-col gap-4 lg:gap-6 mb-8 lg:mb-12">
              <motion.div 
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="inline-block bg-accent-orange text-white text-[9px] lg:text-[11px] font-black px-3 lg:px-4 py-1 lg:py-1.5 w-max tracking-[0.15em] lg:tracking-[0.2em] uppercase shadow-md"
              >
                Project Status: Completed
              </motion.div>
              <h2 className="text-3xl lg:text-5xl font-black uppercase leading-[0.9] text-slate-ink tracking-tighter drop-shadow-sm">{title}</h2>
              <p className="text-[10px] lg:text-[11px] font-mono text-slate-ink mt-1 lg:mt-2 uppercase tracking-[0.1em] lg:tracking-[0.15em] font-bold opacity-70">Location: {location}</p>
            </div>

            <div className="border-t-2 border-slate-ink/10">
              {specs.map((spec, idx) => (
                <div key={idx} className="border-b border-dashed border-gray-200 py-3 lg:py-4 flex justify-between items-center text-[10px] lg:text-[12px]">
                  <span className="text-slate-ink/60 uppercase font-mono font-bold">{spec.label}</span>
                  <span className={`font-black uppercase tracking-tight ${spec.highlight ? 'text-accent-orange' : 'text-slate-ink'}`}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 lg:mt-16 flex flex-col sm:flex-row lg:flex-col gap-3 lg:gap-4">
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "#1D2B3A" }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-slate-ink text-white font-black py-4 lg:py-5 text-[10px] lg:text-xs uppercase tracking-[0.15em] lg:tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2 lg:gap-3 rounded-sm"
            >
              <Download size={14} lg:size={16} strokeWidth={2.5} />
              Download Specs
            </motion.button>
            <motion.button 
              whileHover={{ backgroundColor: "rgba(45, 62, 80, 0.08)", borderColor: "#1D2B3A" }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 border-2 border-slate-ink text-slate-ink font-black py-3 lg:py-4 text-[9px] lg:text-[11px] uppercase tracking-[0.1em] lg:tracking-[0.15em] transition-all flex items-center justify-center gap-2 lg:gap-3 rounded-sm"
            >
              <Layers size={12} lg:size={14} strokeWidth={2.5} />
              Assembly Detail
            </motion.button>
          </div>
        </aside>
      </div>
    </motion.section>
  );
};

export default function App() {
  const [showEstimate, setShowEstimate] = React.useState(false);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowEstimate(true);
      } else {
        setShowEstimate(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen pb-24 font-sans selection:bg-accent-orange selection:text-white relative">
      <div className="noise-overlay" />
      
      {/* Background Labels */}
      <div className="fixed inset-0 pointer-events-none z-50 p-4 flex justify-between opacity-40 text-[9px] font-mono uppercase text-slate-ink/40">
        <div className="flex flex-col justify-between h-full">
          <span>REF_ARC_01 // SYSTEM_READY</span>
          <span>REF_ARC_02 // BUFFER_LOADED</span>
          <span>REF_ARC_03 // ASSET_SYNC</span>
          <span>REF_ARC_04 // STABLE_BUILD</span>
        </div>
        <div className="flex flex-col justify-between h-full text-right">
          <span>COORD_X // 50.012</span>
          <span>COORD_Y // 20.988</span>
          <span>COORD_Z // 4.8.2</span>
          <span>COORD_W // 0xBF4492</span>
        </div>
      </div>

      {/* Floating Action Button */}
      <AnimatePresence>
        {showEstimate && (
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-[100]"
          >
            <motion.button 
              whileHover={{ x: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsFormOpen(true)}
              className="bg-accent-orange hover:bg-orange-600 text-white font-black py-6 px-2 lg:px-3 shadow-2xl transition-all flex items-center gap-2 writing-v-rl tracking-[0.2em] uppercase text-[9px] lg:text-[11px] border-y border-l border-white/30 rounded-l-sm"
            >
              <Calculator size={14} lg:size={16} />
              bezpłatna wycena
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Sheet */}
      <Sheet
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="Nawigacja"
        description="Wybierz sekcję dokumentacji // v2.0"
        side="right"
      >
        <nav className="flex flex-col gap-4">
          {[
            { label: 'Start', href: '#hero' },
            { label: 'O nas', href: '#o-nas' },
            { label: 'Usługi', href: '#uslugi' },
            { label: 'Proces', href: '#proces' },
            { label: 'Realizacje', href: '#realizacje' }
          ].map((item) => (
            <a 
              key={item.label}
              href={item.href} 
              onClick={() => setIsMenuOpen(false)}
              className="p-4 border border-sheet-border bg-gray-50/50 text-slate-ink font-black uppercase text-xs tracking-widest hover:bg-accent-orange hover:text-white transition-all flex justify-between items-center group"
            >
              {item.label}
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
          
          <div className="mt-8 pt-8 border-t border-sheet-border space-y-4">
            <p className="font-mono text-[10px] uppercase text-slate-ink/40 font-bold tracking-widest">Szybki Kontakt</p>
            <a href="tel:+48123456789" className="flex items-center gap-3 text-slate-ink font-bold text-sm">
              <Phone size={16} className="text-accent-orange" />
              +48 123 456 789
            </a>
            <a href="mailto:biuro@szramadach.pl" className="flex items-center gap-3 text-slate-ink font-bold text-sm">
              <Mail size={16} className="text-accent-orange" />
              biuro@szramadach.pl
            </a>
          </div>
        </nav>
      </Sheet>

      {/* Estimate Form Sheet */}
      <Sheet
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Bezpłatna Wycena"
        description="Złóż zapytanie o audyt techniczny // v2.0"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase font-bold text-slate-ink/60 tracking-wider">Imię_i_Nazwisko</label>
              <input 
                type="text" 
                placeholder="np. JAN KOWALSKI"
                className="w-full bg-gray-50 border border-sheet-border p-3 lg:p-4 text-sm font-bold uppercase tracking-tight focus:outline-none focus:border-accent-orange focus:ring-1 focus:ring-accent-orange/20 transition-all"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase font-bold text-slate-ink/60 tracking-wider">Email_Kontaktowy</label>
              <input 
                type="email" 
                placeholder="ARCHIWUM@PRZYKLAD.PL"
                className="w-full bg-gray-50 border border-sheet-border p-3 lg:p-4 text-sm font-bold uppercase tracking-tight focus:outline-none focus:border-accent-orange focus:ring-1 focus:ring-accent-orange/20 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase font-bold text-slate-ink/60 tracking-wider">Numer_Telefonu</label>
              <input 
                type="tel" 
                placeholder="+48 000 000 000"
                className="w-full bg-gray-50 border border-sheet-border p-3 lg:p-4 text-sm font-bold uppercase tracking-tight focus:outline-none focus:border-accent-orange focus:ring-1 focus:ring-accent-orange/20 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase font-bold text-slate-ink/60 tracking-wider">Lokalizacja_Inwestycji</label>
              <select className="w-full bg-gray-50 border border-sheet-border p-3 lg:p-4 text-sm font-bold uppercase tracking-tight focus:outline-none focus:border-accent-orange transition-all appearance-none cursor-pointer">
                <option>Tarnów (Centrum)</option>
                <option>Tarnów (Okolice)</option>
                <option>Województwo Małopolskie</option>
                <option>Inna Lokalizacja</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase font-bold text-slate-ink/60 tracking-wider">Uwagi_Techniczne</label>
              <textarea 
                rows={4}
                placeholder="OPISZ SWOJE WYMAGANIA DOTYCZĄCE DACHU..."
                className="w-full bg-gray-50 border border-sheet-border p-3 lg:p-4 text-sm font-bold uppercase tracking-tight focus:outline-none focus:border-accent-orange focus:ring-1 focus:ring-accent-orange/20 transition-all resize-none"
              />
            </div>
          </div>

          <div className="p-4 bg-accent-orange/5 border border-accent-orange/20 rounded-sm">
            <p className="font-mono text-[9px] text-accent-orange font-bold uppercase leading-relaxed">
              Uwaga: Nasz zespół techniczny przeanalizuje Twoje zgłoszenie i skontaktuje się w ciągu 24 godzin w celu umówienia szczegółowego audytu na miejscu.
            </p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: "#E65A00" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-accent-orange text-white font-black py-4 lg:py-5 text-xs lg:text-sm uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-3 rounded-sm"
          >
            <Send size={18} />
            Wyślij Zgłoszenie
          </motion.button>
        </div>
      </Sheet>

      <div className="max-w-[1440px] mx-auto p-4 lg:p-8 relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-sheet-white border border-sheet-border technical-sheet-shadow mb-8 lg:mb-12 overflow-hidden rounded-sm sticky top-4 z-40"
        >
          <div className="flex flex-col lg:flex-row items-stretch divide-y lg:divide-y-0 lg:divide-x divide-sheet-border">
            <div className="px-5 py-3 lg:px-8 lg:py-4 flex items-center justify-between lg:justify-start gap-4 lg:gap-6 flex-1 bg-gray-50/30">
              <div className="flex items-center gap-4 lg:gap-6">
                <motion.div 
                  whileHover={{ rotate: 90 }}
                  className="flex w-10 h-10 lg:w-12 lg:h-12 border-[2px] border-slate-ink items-center justify-center text-slate-ink shadow-inner shrink-0"
                >
                  <Home size={20} lg:size={24} strokeWidth={1.5} />
                </motion.div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-black uppercase tracking-tight leading-none text-slate-ink">SzramaDach</h1>
                  <p className="font-mono text-[8px] lg:text-[9px] mt-1 text-slate-ink/60 uppercase tracking-[0.15em] font-medium">Dachy Tarnów // Phase: SLATE_ORANGE</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden w-10 h-10 border border-slate-ink flex items-center justify-center text-slate-ink hover:bg-slate-ink hover:text-white transition-all"
              >
                <Menu size={20} />
              </motion.button>
            </div>
            
            <nav className="hidden lg:flex px-5 py-3 lg:px-10 lg:py-4 items-center gap-6 lg:gap-8 uppercase font-bold text-[9px] lg:text-[10px] text-slate-ink tracking-widest overflow-x-auto no-scrollbar">
              {[
                { label: 'Start', href: '#hero' },
                { label: 'O nas', href: '#o-nas' },
                { label: 'Usługi', href: '#uslugi' },
                { label: 'Proces', href: '#proces' },
                { label: 'Realizacje', href: '#realizacje' }
              ].map((item) => (
                <a 
                  key={item.label}
                  href={item.href} 
                  className="relative group transition-all hover:text-accent-orange shrink-0"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden xl:flex px-6 py-4 font-mono text-[9px] items-center gap-6 bg-gray-50/50 text-slate-ink border-l border-sheet-border">
              <p className="flex gap-2"><span>LOC:</span> <span className="text-accent-orange font-bold uppercase">Tarnów, PL</span></p>
              <p className="flex gap-2"><span>STATUS:</span> <span className="text-accent-orange font-bold uppercase">Archive_Ready</span></p>
              <p className="flex gap-2"><span>REV:</span> <span className="font-bold text-slate-ink uppercase">v2.0.Slate</span></p>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="space-y-24 lg:space-y-40">
          {/* 1. Hero Section */}
          <section id="hero" className="relative pt-12 lg:pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-3 px-4 py-2 bg-slate-ink text-white font-mono text-[10px] uppercase tracking-[0.2em] rounded-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                  System Status: Active // Tarnów_Region
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl lg:text-8xl font-black uppercase leading-[0.85] tracking-tighter text-slate-ink"
                >
                  Twój dach – <span className="text-accent-orange">nasza pasja.</span> Solidne dekarstwo.
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg lg:text-xl text-slate-ink/70 max-w-2xl font-medium leading-relaxed"
                >
                  Od drobnych napraw po kompleksowe krycie dachów. Zapewniamy bezpieczeństwo nad Twoją głową na lata w Tarnowie i okolicach.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsFormOpen(true)}
                    className="bg-accent-orange text-white font-black px-8 py-5 uppercase text-sm tracking-widest shadow-xl flex items-center gap-3 rounded-sm"
                  >
                    <Calculator size={18} />
                    Darmowa wycena
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(45, 62, 80, 0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => document.getElementById('realizacje')?.scrollIntoView({ behavior: 'smooth' })}
                    className="border-2 border-slate-ink text-slate-ink font-black px-8 py-5 uppercase text-sm tracking-widest flex items-center gap-3 rounded-sm"
                  >
                    Nasze realizacje
                  </motion.button>
                </motion.div>
              </div>
              
              <div className="lg:col-span-5 relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="aspect-square bg-gray-100 border border-sheet-border relative overflow-hidden rounded-sm technical-sheet-shadow"
                >
                  <img 
                    src="https://picsum.photos/seed/roofing/800/800" 
                    alt="Roofing Detail" 
                    className="w-full h-full object-cover mix-blend-multiply opacity-80 grayscale-[30%]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
                  <div className="absolute top-4 right-4 font-mono text-[10px] text-slate-ink/40 uppercase">
                    IMG_REF: DT_HERO_01
                  </div>
                </motion.div>
                
                {/* Floating Tech Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-white border border-slate-ink p-6 shadow-2xl z-20 hidden lg:block"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent-orange flex items-center justify-center text-white">
                      <BadgeCheck size={24} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase text-slate-ink/40 font-bold">Quality_Seal</p>
                      <p className="font-black uppercase text-slate-ink leading-none">100% Gwarancja</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 2. O nas Section */}
          <section id="o-nas" className="space-y-16 relative bg-sheet-white border border-sheet-border technical-sheet-shadow p-8 lg:p-16 rounded-sm">
            <div className="absolute -top-[32px] left-8 h-[32px] w-48 bg-sheet-white border border-sheet-border border-b-0 sheet-tab-clip px-4 flex items-center text-[11px] font-mono text-slate-ink font-bold tracking-wider">
              REF: ABOUT_US_01
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sheet-border pb-8">
              <div className="space-y-4">
                <p className="font-mono text-accent-orange font-black uppercase tracking-[0.3em] text-[11px]">01 // DLACZEGO MY?</p>
                <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-slate-ink">Doświadczenie, któremu <br/>możesz zaufać</h2>
              </div>
              <p className="max-w-md text-slate-ink/60 font-medium text-lg">
                Jesteśmy tarnowską firmą z wieloletnim stażem. Wiemy, że dach to najważniejsza inwestycja w Twoim domu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: <UserCheck className="text-accent-orange" />, 
                  title: "Lokalna ekipa", 
                  desc: "Działamy w Tarnowie, Brzesku, Dębicy i okolicach. Jesteśmy zawsze blisko Ciebie." 
                },
                { 
                  icon: <Clock className="text-accent-orange" />, 
                  title: "Terminowość", 
                  desc: "Szanujemy Twój czas. Umówiony termin to dla nas świętość." 
                },
                { 
                  icon: <ShieldCheck className="text-accent-orange" />, 
                  title: "Gwarancja jakości", 
                  desc: "Na każdą naszą usługę otrzymasz pisemną gwarancję." 
                },
                { 
                  icon: <BadgeCheck className="text-accent-orange" />, 
                  title: "Brak kompromisów", 
                  desc: "Nie uznajemy kompromisów w kwestii jakości materiałów i wykonania." 
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="p-8 bg-sheet-white border border-sheet-border technical-sheet-shadow space-y-6 rounded-sm"
                >
                  <div className="w-12 h-12 border border-sheet-border flex items-center justify-center bg-gray-50">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-slate-ink">{item.title}</h3>
                  <p className="text-sm text-slate-ink/60 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 3. Usługi Section */}
          <section id="uslugi" className="space-y-16 relative bg-sheet-white border border-sheet-border technical-sheet-shadow p-8 lg:p-16 rounded-sm">
            <div className="absolute -top-[32px] left-8 h-[32px] w-48 bg-sheet-white border border-sheet-border border-b-0 sheet-tab-clip px-4 flex items-center text-[11px] font-mono text-slate-ink font-bold tracking-wider">
              REF: SERVICES_02
            </div>
            <div className="space-y-4 text-center">
              <p className="font-mono text-accent-orange font-black uppercase tracking-[0.3em] text-[11px]">02 // NASZA OFERTA</p>
              <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-slate-ink">Kompleksowe rozwiązania dachowe</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {[
                { id: "SRV-01", icon: <Hammer size={20} />, title: "Montaż pokryć", desc: "Układamy dachówkę ceramiczną, betonową, blachodachówkę oraz gonty bitumiczne." },
                { id: "SRV-02", icon: <Layers size={20} />, title: "Remonty i modernizacje", desc: "Wymiana starego dachu na nowy (np. usuwanie eternitu) oraz wzmacnianie więźby." },
                { id: "SRV-03", icon: <Zap size={20} />, title: "Pogotowie dekarskie", desc: "Szybka naprawa nieszczelności po wichurach i ulewach w regionie Tarnowa." },
                { id: "SRV-04", icon: <Droplets size={20} />, title: "Obróbki blacharskie", desc: "Montaż rynien, okien dachowych oraz wykańczanie kominów." }
              ].map((row, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 4 }}
                  className="bg-sheet-white border border-sheet-border p-6 lg:p-8 flex flex-col gap-6 group relative overflow-hidden rounded-sm technical-sheet-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 border border-slate-ink flex items-center justify-center text-slate-ink group-hover:bg-accent-orange group-hover:text-white group-hover:border-accent-orange transition-all duration-300">
                        {row.icon}
                      </div>
                      <div>
                        <h3 className="text-lg lg:text-xl font-black uppercase tracking-tight text-slate-ink">{row.title}</h3>
                        <p className="font-mono text-[9px] text-slate-ink/40 uppercase tracking-widest font-bold">{row.id} // TECHNICAL_SPEC</p>
                      </div>
                    </div>
                    <div className="hidden sm:block font-mono text-[8px] text-accent-orange font-bold border border-accent-orange/20 px-2 py-1 rounded-full bg-accent-orange/5">
                      STATUS: ACTIVE
                    </div>
                  </div>
                  
                  <div className="h-px bg-sheet-border w-full relative">
                    <div className="absolute top-0 left-0 h-full w-12 bg-accent-orange/30" />
                  </div>

                  <p className="text-slate-ink/70 font-medium text-sm lg:text-base leading-relaxed">
                    {row.desc}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-dashed border-sheet-border">
                    <span className="font-mono text-[9px] text-slate-ink/30 uppercase">Revision: 2.0.4</span>
                    <motion.button 
                      whileHover={{ x: 2 }}
                      className="text-accent-orange font-black uppercase text-[10px] tracking-widest flex items-center gap-2"
                    >
                      Szczegóły <ChevronRight size={14} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 4. Jak działamy Section */}
          <section id="proces" className="space-y-16 relative bg-sheet-white border border-sheet-border technical-sheet-shadow p-8 lg:p-16 rounded-sm">
            <div className="absolute -top-[32px] left-8 h-[32px] w-48 bg-sheet-white border border-sheet-border border-b-0 sheet-tab-clip px-4 flex items-center text-[11px] font-mono text-slate-ink font-bold tracking-wider">
              REF: PROCESS_03
            </div>
            <div className="space-y-4">
              <p className="font-mono text-accent-orange font-black uppercase tracking-[0.3em] text-[11px]">03 // WORKFLOW</p>
              <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-slate-ink">Jak działamy?</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-sheet-border border border-sheet-border technical-sheet-shadow rounded-sm overflow-hidden">
              {[
                { 
                  step: "01", 
                  title: "Bezpłatny obmiar", 
                  icon: <Ruler />,
                  desc: "Przyjeżdżamy na miejsce, oceniamy stan dachu i doradzamy materiały." 
                },
                { 
                  step: "02", 
                  title: "Przejrzysta wycena", 
                  icon: <FileText />,
                  desc: "Otrzymujesz kosztorys bez ukrytych kosztów." 
                },
                { 
                  step: "03", 
                  title: "Realizacja", 
                  icon: <Hammer />,
                  desc: "Pracujemy sprawnie, dbając o czystość na placu budowy." 
                },
                { 
                  step: "04", 
                  title: "Odbiór", 
                  icon: <CheckCircle2 />,
                  desc: "Sprawdzasz efekt końcowy, a my sprzątamy po sobie." 
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-sheet-white p-10 space-y-8 relative group hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-4xl font-black text-slate-ink/10 group-hover:text-accent-orange/20 transition-colors">{item.step}</span>
                    <div className="text-accent-orange">{item.icon}</div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-ink">{item.title}</h3>
                    <p className="text-sm text-slate-ink/60 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Realizacje Section */}
          <section id="realizacje" className="space-y-16">
            <div className="space-y-4">
              <p className="font-mono text-accent-orange font-black uppercase tracking-[0.3em] text-[11px]">04 // PORTFOLIO</p>
              <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-slate-ink">Nasze realizacje</h2>
            </div>

            <div className="space-y-24 lg:space-y-40">
              <ProjectCard 
                id="TRN_MOŚ_01"
                title="Willa Mościce"
                location="Tarnów / Sektor Mieszkalny"
                image="https://picsum.photos/seed/roof1/1200/800"
                specs={[
                  { label: "Materiał_Pokrycia", value: "Dachówka Ceramiczna Premium" },
                  { label: "Nachylenie_Połaci", value: "35.0° Zweryfikowane" },
                  { label: "Audyt_Techniczny", value: "Pozytywny / Certyfikowany", highlight: true },
                  { label: "Powierzchnia_Całkowita", value: "240 m²" }
                ]}
                callouts={[
                  { top: "25%", left: "35%", label: "Podwójny rąbek stojący", angle: 145, length: 120 },
                  { top: "65%", left: "55%", label: "Zintegrowany system rynnowy", angle: -30, length: 110 }
                ]}
              />

              <ProjectCard 
                id="TRN_STOD_37"
                title="Nowoczesna Stodoła"
                location="Okolice Tarnowa / Podmiejska"
                reversed
                image="https://picsum.photos/seed/roof2/1200/800"
                specs={[
                  { label: "Typ_Elewacji", value: "Blacha na Rąbek Antracyt" },
                  { label: "Rdzeń_Izolacji", value: "PIR 120mm Sztywny" },
                  { label: "ID_Gwarancji", value: "DT-2024-WAR-09", highlight: true }
                ]}
                callouts={[
                  { top: "40%", left: "70%", label: "Profil retencyjny śniegu", angle: 25, length: 140 }
                ]}
              />
            </div>
          </section>
        </main>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 lg:mt-40 bg-sheet-white border border-sheet-border p-8 lg:p-16 technical-sheet-shadow rounded-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            <div className="space-y-6 lg:space-y-8">
              <h3 className="text-lg lg:text-xl font-black uppercase text-slate-ink border-l-[4px] lg:border-l-[6px] border-accent-orange pl-4 lg:pl-6 tracking-tight">Ramy Prawne</h3>
              <p className="text-[10px] lg:text-[11px] font-mono text-slate-ink/80 leading-relaxed font-medium">
                Wszystkie schematy techniczne i dane architektoniczne prezentowane w tym archiwum pozostają wyłączną własnością intelektualną firmy Dachy Tarnów. Jakiekolwiek powielanie lub cytowanie musi zawierać identyfikator archiwum: DT-TRN-2024.
              </p>
            </div>
            
            <div className="space-y-6 lg:space-y-8">
              <h3 className="text-lg lg:text-xl font-black uppercase text-slate-ink border-l-[4px] lg:border-l-[6px] border-accent-orange pl-4 lg:pl-6 tracking-tight">Wsparcie Archiwum</h3>
              <div className="font-mono text-[10px] lg:text-[11px] space-y-3 lg:space-y-4 text-slate-ink">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="opacity-60">EMAIL:</span> 
                  <span className="text-slate-ink font-bold hover:text-accent-orange transition-colors cursor-pointer">archiwum@dachytarnow.pl</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="opacity-60">TELEFON:</span> 
                  <span className="text-slate-ink font-bold">+48 14 600 00 00</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="opacity-60">DOSTĘP:</span> 
                  <span className="text-slate-ink font-bold">Synchronizacja Cyfrowa 24/7</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-0 md:border-l border-sheet-border pt-8 md:pt-0 md:pl-16">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-24 h-24 lg:w-32 lg:h-32 border-2 border-slate-ink p-2 lg:p-3 mb-4 lg:mb-6 relative flex items-center justify-center bg-gray-50/50 shadow-inner"
              >
                <div className="absolute inset-1 border-dashed border border-slate-ink/30" />
                <BadgeCheck className="text-slate-ink" size={48} lg:size={64} strokeWidth={1.5} />
                <span className="absolute top-1 left-2 lg:top-1.5 lg:left-2.5 text-[7px] lg:text-[8px] font-mono text-slate-ink font-bold opacity-40">OFICJALNA PIECZĘĆ</span>
              </motion.div>
              <p className="font-mono text-[9px] lg:text-[10px] text-center text-slate-ink uppercase tracking-[0.15em] lg:tracking-[0.2em] font-bold">
                Uwierzytelnione Archiwum<br/>Rewizja: SLATE-03
              </p>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-16 pt-8 lg:pt-10 border-t border-sheet-border flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] lg:text-[10px] font-mono text-slate-ink/40 uppercase tracking-widest font-bold text-center md:text-left">
            <span>© 2024 Dachy Tarnów // Dział Techniczny // Wszelkie Prawa Zastrzeżone</span>
            <span className="bg-gray-100 px-3 lg:px-4 py-1.5 lg:py-2 rounded-sm border border-gray-200">Wersja Systemu: 4.8.2 // STABLE_REL</span>
          </div>
        </motion.footer>
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 w-full h-auto lg:h-12 glass-panel z-[70] flex flex-col lg:flex-row items-center px-4 lg:px-8 py-2 lg:py-0 font-mono text-[9px] lg:text-[11px] text-slate-ink shadow-[0_-10px_20px_rgba(0,0,0,0.1)] gap-2 lg:gap-10">
        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
          <div className="flex items-center gap-2 lg:gap-3">
            <motion.span 
              animate={{ 
                opacity: [1, 0.3, 1],
                scale: [1, 1.2, 1]
              }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-accent-orange shadow-[0_0_10px_rgba(255,107,0,0.5)]" 
            />
            <span className="font-bold text-slate-ink uppercase tracking-wider">Live Sync</span>
          </div>
          <span className="h-4 lg:h-5 w-px bg-sheet-border hidden lg:block" />
          <span className="uppercase opacity-70 hidden sm:block">Node: Tarnów_Master_01</span>
          <span className="h-4 lg:h-5 w-px bg-sheet-border hidden lg:block" />
          <span className="uppercase opacity-70">Session: <span className="text-accent-orange font-bold">0xBF4492</span></span>
        </div>
        
        <div className="flex items-center justify-between w-full lg:w-auto lg:ml-auto gap-4 lg:gap-6">
          <div className="flex items-center gap-2 opacity-60">
            <Activity size={12} lg:size={14} />
            <span>12ms</span>
          </div>
          <span className="bg-slate-ink text-white px-3 lg:px-4 py-1 lg:py-1.5 text-[8px] lg:text-[10px] uppercase font-bold tracking-[0.1em] lg:tracking-[0.2em] shadow-lg rounded-sm">Slate Variant 2/3</span>
        </div>
      </div>
    </div>
  );
}
