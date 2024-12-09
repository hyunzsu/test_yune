import { create } from 'zustand';
import { Element, ElementType } from '../types/element';

interface ElementStore {
  elements: Element[];
  selectedId: string | null;
  addElement: (type: ElementType) => void;
  selectElement: (id: string) => void;
}

export const useElementStore = create<ElementStore>((set) => ({
  elements: [],
  selectedId: null,
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
  selectElement: (id) => {
    set({ selectedId: id });
  },
}));
