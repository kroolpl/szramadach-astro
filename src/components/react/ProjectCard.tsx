import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  Download, 
  Layers
} from "lucide-react";

interface Spec {
  label: string;
  value: string;
  highlight?: boolean;
}

interface Callout {
  top: string;
  left: string;
  label: string;
  angle: number;
  length: number;
}

interface ProjectCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  specs: Spec[];
  reversed?: boolean;
  callouts?: Callout[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  id, 
  title, 
  location, 
  image, 
  specs, 
  reversed = false,
  callouts = []
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.section 
      ref={containerRef}
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
          <motion.div 
            style={{ y }}
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
          >
            <motion.img 
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              alt={title} 
              className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 transition-all duration-1000 grayscale-[20%] group-hover:grayscale-0" 
              src={image}
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          {/* Callouts */}
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
              <Download size={14} strokeWidth={2.5} />
              Download Specs
            </motion.button>
            <motion.button 
              whileHover={{ backgroundColor: "rgba(45, 62, 80, 0.08)", borderColor: "#1D2B3A" }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 border-2 border-slate-ink text-slate-ink font-black py-3 lg:py-4 text-[9px] lg:text-[11px] uppercase tracking-[0.1em] lg:tracking-[0.15em] transition-all flex items-center justify-center gap-2 lg:gap-3 rounded-sm"
            >
              <Layers size={12} strokeWidth={2.5} />
              Assembly Detail
            </motion.button>
          </div>
        </aside>
      </div>
    </motion.section>
  );
};
