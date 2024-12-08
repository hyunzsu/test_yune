import { create } from 'zustand';
import { Element, ElementType } from '../types/element';

interface ElementStore {
  elements: Element[];
  addElement: (type: ElementType) => void;
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
