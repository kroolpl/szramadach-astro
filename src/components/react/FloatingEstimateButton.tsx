import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator } from "lucide-react";
import { isFormOpen, showEstimateButton } from "../../stores/uiStore";

export const FloatingEstimateButton: React.FC = () => {
    const $showEstimateButton = useStore(showEstimateButton);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => { showEstimateButton.set(window.scrollY > 300); };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {$showEstimateButton && (
                <>
                    {/* MOBILE: compact circular FAB in bottom-right corner */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 200 }}
                        className="fixed bottom-5 right-5 z-[100] lg:hidden"
                    >
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => isFormOpen.set(true)}
                            className="bg-accent-orange hover:bg-orange-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border border-white/30 transition-colors"
                            aria-label="Bezpłatna wycena"
                        >
                            <Calculator size={20} />
                        </motion.button>
                        {/* Pulsing ring to draw attention */}
                        <span className="absolute -inset-1 rounded-full bg-accent-orange/25 animate-ping pointer-events-none" />
                    </motion.div>

                    {/* DESKTOP: full vertical pill on right edge */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] hidden lg:block"
                    >
                        <motion.button
                            whileHover={{ x: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => isFormOpen.set(true)}
                            className="bg-accent-orange hover:bg-orange-600 text-white font-black py-6 px-3 shadow-2xl transition-all flex items-center gap-2 writing-v-rl tracking-[0.2em] uppercase text-[11px] border-y border-l border-white/30 rounded-l-sm"
                        >
                            <Calculator size={14} />
                            bezpłatna wycena
                        </motion.button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
