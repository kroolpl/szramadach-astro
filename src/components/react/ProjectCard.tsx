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

interface ProjectCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  specs: Spec[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  location,
  image,
  specs
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-sheet-white border flex flex-col border-sheet-border technical-sheet-shadow rounded-sm overflow-hidden min-h-full"
    >
      {/* ID Badge */}
      <div className="absolute top-4 left-4 z-10 bg-slate-ink/90 backdrop-blur-sm text-white px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-2 rounded-sm shadow-md">
        <div className="w-1.5 h-1.5 bg-accent-orange rounded-full animate-pulse" />
        REF: {id}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 border-b border-sheet-border">
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <img
            alt={title}
            className="w-full h-full object-cover mix-blend-multiply opacity-95 group-hover:opacity-100 transition-all duration-1000 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105"
            src={image}
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>

      {/* Info Section */}
      <div className="p-6 lg:p-8 flex flex-col flex-grow bg-gray-50/20">
        <div className="flex flex-col gap-3 mb-6">
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="inline-block bg-accent-orange text-white text-[9px] font-black px-3 py-1 w-max tracking-[0.2em] uppercase shadow-sm"
          >
            Project Status: Completed
          </motion.div>
          <h2 className="text-2xl lg:text-3xl font-black uppercase leading-[1.1] text-slate-ink tracking-tight">{title}</h2>
          <p className="text-[10px] lg:text-[11px] font-mono text-slate-ink uppercase tracking-[0.15em] font-bold opacity-70">Loc: {location}</p>
        </div>

        <div className="border-t-2 border-slate-ink/10 flex-grow">
          {specs.map((spec, idx) => (
            <div key={idx} className="border-b border-dashed border-gray-200 py-3 flex justify-between items-center text-[10px] lg:text-[11px]">
              <span className="text-slate-ink/60 uppercase font-mono font-bold max-w-[50%] truncate pr-2">{spec.label.replace(/_/g, ' ')}</span>
              <span className={`font-black uppercase tracking-tight text-right ${spec.highlight ? 'text-accent-orange' : 'text-slate-ink'}`}>
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#1D2B3A" }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-slate-ink text-white font-black py-4 lg:py-4 text-[9px] lg:text-[10px] uppercase tracking-[0.15em] shadow-lg transition-all flex items-center justify-center gap-2 rounded-sm"
          >
            <Download size={14} strokeWidth={2.5} />
            Specs
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: "rgba(45, 62, 80, 0.08)" }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 border-2 border-slate-ink text-slate-ink font-black py-3 lg:py-3 text-[9px] lg:text-[10px] uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 rounded-sm"
          >
            <Layers size={14} strokeWidth={2.5} />
            Detail
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

