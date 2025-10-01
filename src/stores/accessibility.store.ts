
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const FONT_SIZES = [100, 110, 120, 130, 140, 150];

interface AccessibilityState {
  fontSize: number;
  isMotionReduced: boolean;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  setFontSize: (size: number) => void;
  toggleMotionReduced: () => void;
  setMotionReduced: (value: boolean) => void;
}

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      fontSize: 100,
      isMotionReduced: false,

      increaseFontSize: () => {
        set((state) => {
            const currentIndex = FONT_SIZES.findIndex(size => size >= state.fontSize);
            const nextIndex = Math.min(currentIndex + 1, FONT_SIZES.length - 1);
            return { fontSize: FONT_SIZES[nextIndex] };
        });
      },
      decreaseFontSize: () => {
        set((state) => {
            const currentIndex = FONT_SIZES.findIndex(size => size >= state.fontSize);
            const nextIndex = Math.max(currentIndex - 1, 0);
            return { fontSize: FONT_SIZES[nextIndex] };
        });
      },
      resetFontSize: () => set({ fontSize: 100 }),
      setFontSize: (size) => set({ fontSize: size }),
      
      toggleMotionReduced: () => set((state) => ({ isMotionReduced: !state.isMotionReduced })),
      setMotionReduced: (value) => set({ isMotionReduced: value }),
    }),
    {
      name: 'accessibility-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
