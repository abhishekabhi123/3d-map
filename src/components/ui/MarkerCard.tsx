'use client';

import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sword, Shield, TrendingUp } from 'lucide-react';

export default function MarkerCard() {
    const { selectedMarker, setSelectedMarker } = useStore();

    if (!selectedMarker) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="relative p-[2px] rounded-xl bg-gradient-to-b from-yellow-600 to-amber-900 shadow-2xl"
            >
                <div className="bg-slate-950 rounded-xl p-6 min-w-[280px] text-white">
                    <button
                        onClick={() => setSelectedMarker(null)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
                                {selectedMarker.name}
                            </h3>
                            <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                                <TrendingUp size={14} className="text-yellow-500" />
                                <span>Level {selectedMarker.level}</span>
                                <span className="mx-1">•</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] uppercase font-bold tracking-wider">
                                    {selectedMarker.element}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                <Sword className="text-red-500" size={18} />
                                <div>
                                    <div className="text-[10px] uppercase text-slate-500 font-bold">Attack</div>
                                    <div className="text-lg font-bold">{selectedMarker.attack}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                <Shield className="text-blue-500" size={18} />
                                <div>
                                    <div className="text-[10px] uppercase text-slate-500 font-bold">Defense</div>
                                    <div className="text-lg font-bold">{selectedMarker.defense}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
