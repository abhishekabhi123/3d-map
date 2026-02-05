import { create } from 'zustand';

interface MapState {
    currentSide: number;
    nextSide: () => void;
    prevSide: () => void;
    setSide: (side: number) => void;
    selectedMarker: MarkerData | null;
    setSelectedMarker: (marker: MarkerData | null) => void;
}

export interface MarkerData {
    id: string;
    name: string;
    level: number;
    element: string;
    attack: number;
    defense: number;
    position: [number, number, number];
}

export const useStore = create<MapState>((set) => ({
    currentSide: 0,
    nextSide: () => set((state) => ({ currentSide: (state.currentSide + 1) % 6 })),
    prevSide: () => set((state) => ({ currentSide: (state.currentSide + 5) % 6 })),
    setSide: (side) => set({ currentSide: side }),
    selectedMarker: null,
    setSelectedMarker: (marker) => set({ selectedMarker: marker }),
}));
