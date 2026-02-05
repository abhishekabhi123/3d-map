'use client';

import { useEffect, useState } from 'react';
import MapScene from '@/components/3d/MapScene';
import Compass from '@/components/ui/Compass';
import NavigationControls from '@/components/ui/NavigationControls';
import MarkerCard from '@/components/ui/MarkerCard';

export default function CityMapPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-yellow-500/30">
      {/* Header / Info Section */}
      <header className="p-6 md:p-10 flex justify-between items-center z-20">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">
            City <span className="text-yellow-500">Explorer</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base mt-1">Interactive 3D Guild Territory Map</p>
        </div>

        {/* Desktop Compass Placement */}
        <div className="hidden md:block absolute top-10 right-10">
          <Compass />
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Mobile Compass Placement (Centered above map) */}
        <div className="md:hidden flex justify-center py-4 z-20">
          <Compass />
        </div>

        {/* 3D Map Container */}
        <div className="relative w-full h-[300px] md:h-[calc(100vh-200px)] min-h-[300px] md:min-h-[600px] z-10">
          <MapScene />

          {/* Snap Navigation Controls (Bottom Center) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
            <NavigationControls />
          </div>
        </div>

        {/* Detail Card Placement */}
        <div className="p-6 md:p-0 md:absolute md:bottom-10 md:left-10 z-30 flex justify-center md:block">
          <MarkerCard />
        </div>
      </div>

      {/* Background Decorative elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_#eab30822_0%,_transparent_70%)] z-0" />
    </main>
  );
}
