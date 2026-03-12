import React from "react";
import { motion } from "motion/react";
import { Home, Menu } from "lucide-react";
import { isMenuOpen } from "../../stores/uiStore";

export const Navigation: React.FC = () => {
    return (
        <motion.header
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-sheet-white border border-sheet-border technical-sheet-shadow mb-8 lg:mb-12 overflow-hidden rounded-sm sticky top-4 z-40"
        >
            <div className="flex flex-col lg:flex-row items-stretch divide-y lg:divide-y-0 lg:divide-x divide-sheet-border">
                <div className="px-5 py-3 lg:px-8 lg:py-4 flex items-center justify-between lg:justify-start gap-4 lg:gap-6 flex-1 bg-gray-50/30">
                    <a href="/" className="flex items-center gap-4 lg:gap-6 group/logo">
                        <motion.div
                            whileHover={{ rotate: 90, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="flex w-10 h-10 lg:w-12 lg:h-12 border-[2px] border-slate-ink items-center justify-center text-slate-ink shadow-inner shrink-0"
                        >
                            <Home size={20} strokeWidth={1.5} />
                        </motion.div>
                        <div>
                            <h1 className="text-xl lg:text-2xl font-black uppercase tracking-tight leading-none text-slate-ink group-hover/logo:text-accent-orange transition-colors">SzramaDach</h1>
                            <p className="font-mono text-[8px] lg:text-[9px] mt-1 text-slate-ink/60 uppercase tracking-[0.15em] font-medium">Dachy Tarnów</p>
                        </div>
                    </a>

                    <button
                        type="button"
                        onClick={() => isMenuOpen.set(true)}
                        className="lg:hidden w-10 h-10 border border-slate-ink flex items-center justify-center text-slate-ink hover:bg-slate-ink hover:text-white active:scale-95 transition-all"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                <nav className="hidden lg:flex px-5 py-3 lg:px-10 lg:py-4 items-center gap-6 lg:gap-8 uppercase font-bold text-[9px] lg:text-[10px] text-slate-ink tracking-widest overflow-x-auto no-scrollbar">
                    {[
                        { label: 'Start', href: '/' },
                        { label: 'Oferta', href: '/oferta' },
                        { label: 'Realizacje', href: '/realizacje' },
                        { label: 'Porady', href: '/porady' }
                    ].map((item, idx) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group transition-all hover:text-accent-orange shrink-0"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-orange transition-all group-hover:w-full" />
                        </motion.a>
                    ))}
                </nav>
            </div>
        </motion.header>
    );
};
