import { create } from 'zustand';

interface ConfettiStore {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
}

export const useConfettiStore = create<ConfettiStore>((set) => ({
  isVisible: false,
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
}));

export const useConfetti = () => {
    const { show, hide } = useConfettiStore();
    
    const launch = () => {
        show();
        setTimeout(() => {
            hide();
        }, 4000); // Corresponds to animation duration
    }

    return { launch };
}
