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

        const handleScroll = () => {
            showEstimateButton.set(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {$showEstimateButton && (
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
                        onClick={() => isFormOpen.set(true)}
                        className="bg-accent-orange hover:bg-orange-600 text-white font-black py-6 px-2 lg:px-3 shadow-2xl transition-all flex items-center gap-2 writing-v-rl tracking-[0.2em] uppercase text-[9px] lg:text-[11px] border-y border-l border-white/30 rounded-l-sm"
                    >
                        <Calculator size={14} />
                        bezpłatna wycena
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
