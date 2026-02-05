'use client';

import { useStore } from '@/store/useStore';

const SIDES = [0, 1, 2, 3, 4, 5];

export default function Compass() {
    const { currentSide, setSide } = useStore();

    return (
        <div className="relative w-32 h-32 md:w-40 md:h-40">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                {SIDES.map((side) => {
                    const angle = side * 60 - 90; // Rotate to align with segments
                    const rad1 = (angle - 30) * (Math.PI / 180);
                    const rad2 = (angle + 30) * (Math.PI / 180);

                    const x1 = 50 + 45 * Math.cos(rad1);
                    const y1 = 50 + 45 * Math.sin(rad1);
                    const x2 = 50 + 45 * Math.cos(rad2);
                    const y2 = 50 + 45 * Math.sin(rad2);

                    const isActive = currentSide === side;

                    return (
                        <path
                            key={side}
                            d={`M 50 50 L ${x1} ${y1} A 45 45 0 0 1 ${x2} ${y2} Z`}
                            className={`cursor-pointer transition-all duration-300 stroke-gold-500/20 stroke-1
                ${isActive ? 'fill-yellow-500/80' : 'fill-slate-800/80 hover:fill-slate-700'}
              `}
                            onClick={() => setSide(side)}
                        />
                    );
                })}
                {/* Center hole for aesthetic */}
                <circle cx="50" cy="50" r="10" className="fill-slate-900" />
            </svg>

            {/* Labels or indicators can be added here */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest">
                    {currentSide + 1}
                </div>
            </div>
        </div>
    );
}
