export type ElementType = 'div' | 'span' | 'p';

export interface ElementStyle {
  backgroundColor: string;
  width: number;
  height: number;
}

export interface Element {
  id: string;
  type: ElementType;
  style: ElementStyle;
}
