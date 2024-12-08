import { create } from 'zustand';

interface Element {
  id: string;
  type: 'div' | 'span' | 'p';
  style: {
    backgroundColor: string;
    width: number;
    height: number;
  };
}

interface ElementStore {
  elements: Element[];
  addElement: (type: 'div' | 'span' | 'p') => void;
}

export const useElementStore = create<ElementStore>((set) => ({
  elements: [],
  addElement: (type) => {
    set((state) => {
      const newElement: Element = {
        id: crypto.randomUUID(),
        type,
        style: {
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          width: 190,
          height: 190,
        },
      };

      return {
        elements: [...state.elements, newElement],
      };
    });
  },
}));
