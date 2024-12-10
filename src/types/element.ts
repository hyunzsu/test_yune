export type ElementType = 'div' | 'span' | 'p' | 'group';

export interface ElementStyle {
  backgroundColor: string;
  width: number;
  height: number;
}

export interface BaseElement {
  id: string;
  type: ElementType;
  style?: ElementStyle;
  children: string[];
}
