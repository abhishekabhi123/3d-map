'use client';

import { useStore } from '@/store/useStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function NavigationControls() {
    const { nextSide, prevSide } = useStore();

    return (
        <div className="flex gap-4">
            <button
                onClick={prevSide}
                className="p-3 rounded-full bg-slate-900/80 border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSide}
                className="p-3 rounded-full bg-slate-900/80 border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
}
