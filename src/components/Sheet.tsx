import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  side?: "left" | "right";
}

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  side = "right",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-ink/40 backdrop-blur-sm z-[150]"
          />

          {/* Sheet Content */}
          <motion.div
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed ${
              side === "right" ? "right-0" : "left-0"
            } top-0 bottom-0 w-full max-w-[320px] bg-sheet-white z-[160] shadow-2xl border-${
              side === "right" ? "l" : "r"
            } border-sheet-border flex flex-col`}
          >
            {/* Header */}
            <div className="p-6 border-b border-sheet-border bg-gray-50/50 flex justify-between items-center">
              <div>
                {title && (
                  <h2 className="text-xl font-black uppercase tracking-tight text-slate-ink">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="font-mono text-[9px] uppercase text-slate-ink/60 tracking-widest mt-1">
                    {description}
                  </p>
                )}
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 border border-sheet-border flex items-center justify-center text-slate-ink hover:bg-white transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>

            {/* Footer / Info */}
            <div className="p-6 border-t border-sheet-border bg-gray-50/30">
              <div className="flex flex-col gap-2 font-mono text-[8px] text-slate-ink/40 uppercase tracking-widest">
                <p>© {new Date().getFullYear()} SzramaDach // Tarnów</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
