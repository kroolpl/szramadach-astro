import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

export const BackgroundElements: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const bgTextYReverse = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
    const bgNumberY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
    const bgDriftX = useTransform(scrollYProgress, [0, 1], ["0px", "150px"]);
    const bgDriftXReverse = useTransform(scrollYProgress, [0, 1], ["0px", "-150px"]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <motion.div
                style={{ y: bgTextY }}
                className="absolute -left-20 top-20 text-[20vw] font-black text-slate-ink/[0.02] leading-none select-none uppercase"
            >
                SzramaDach
            </motion.div>
            <motion.div
                style={{ y: bgTextYReverse }}
                className="absolute -right-20 bottom-40 text-[15vw] font-black text-slate-ink/[0.02] leading-none select-none uppercase text-right"
            >
                Dekarstwo
            </motion.div>

            {/* Floating Background Numbers */}
            <motion.div
                style={{ y: bgNumberY }}
                className="absolute left-[10%] top-[40%] text-[30vw] font-black text-slate-ink/[0.01] leading-none select-none"
            >
                01
            </motion.div>
            <motion.div
                style={{ y: bgTextY }}
                className="absolute right-[5%] top-[70%] text-[25vw] font-black text-slate-ink/[0.01] leading-none select-none"
            >
                02
            </motion.div>

            {/* Decorative Floating Shapes */}
            <motion.div
                style={{ x: bgDriftX, y: bgNumberY }}
                className="absolute left-[20%] top-[15%] w-64 h-64 border border-accent-orange/[0.03] rounded-full"
            />
            <motion.div
                style={{ x: bgDriftXReverse, y: bgTextYReverse }}
                className="absolute right-[15%] top-[50%] w-96 h-96 border border-slate-ink/[0.02] rotate-45"
            />
        </div>
    );
};
