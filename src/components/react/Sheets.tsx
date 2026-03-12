import React from "react";
import { useStore } from "@nanostores/react";
import { isFormOpen, isMenuOpen } from "../../stores/uiStore";
import { Sheet } from "./Sheet";
import {
    ChevronRight,
    Phone,
    Mail,
    Send
} from "lucide-react";
import { motion } from "motion/react";

export const Sheets: React.FC = () => {
    const $isMenuOpen = useStore(isMenuOpen);
    const $isFormOpen = useStore(isFormOpen);

    return (
        <>
            {/* Mobile Menu Sheet */}
            <Sheet
                isOpen={$isMenuOpen}
                onClose={() => isMenuOpen.set(false)}
                title="Nawigacja"
                description="Wybierz sekcję"
                side="right"
            >
                <nav className="flex flex-col gap-4">
                    {[
                        { label: 'Start', href: '/' },
                        { label: 'Oferta', href: '/oferta' },
                        { label: 'Realizacje', href: '/realizacje' },
                        { label: 'Porady', href: '/porady' }
                    ].map((item) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => isMenuOpen.set(false)}
                            className="p-4 border border-sheet-border bg-gray-50/50 text-slate-ink font-black uppercase text-xs tracking-widest hover:bg-accent-orange hover:text-white transition-all flex justify-between items-center group"
                        >
                            {item.label}
                            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.a>
                    ))}

                    <div className="mt-8 pt-8 border-t border-sheet-border space-y-4">
                        <p className="font-mono text-[10px] uppercase text-slate-ink/40 font-bold tracking-widest">Szybki Kontakt</p>
                        <motion.a 
                            whileHover={{ x: 5 }}
                            href="tel:+48123456789" 
                            className="flex items-center gap-3 text-slate-ink font-bold text-sm transition-colors hover:text-accent-orange"
                        >
                            <Phone size={16} className="text-accent-orange" />
                            +48 123 456 789
                        </motion.a>
                        <motion.a 
                            whileHover={{ x: 5 }}
                            href="mailto:biuro@szramadach.pl" 
                            className="flex items-center gap-3 text-slate-ink font-bold text-sm transition-colors hover:text-accent-orange"
                        >
                            <Mail size={16} className="text-accent-orange" />
                            biuro@szramadach.pl
                        </motion.a>
                    </div>
                </nav>
            </Sheet>

            {/* Estimate Form Sheet */}
            <Sheet
                isOpen={$isFormOpen}
                onClose={() => isFormOpen.set(false)}
                title="Bezpłatna Wycena"
                description="Złóż zapytanie o wycenę"
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
        </>
    );
};
