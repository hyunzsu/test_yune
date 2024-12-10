import { create } from 'zustand';
import { ElementType, BaseElement } from '../types/element';

interface ElementStore {
  elements: BaseElement[];
  selectedIds: string[];
  groupedElements: BaseElement[];
  addElement: (type: ElementType) => void;
  selectElement: (id: string, isMultiSelect?: boolean) => void;
  reorderElement: (dragId: string, dropId: string) => void;
  createGroup: () => void;
}

export const useElementStore = create<ElementStore>((set) => ({
  elements: [],
  selectedIds: [],
  groupedElements: [],
  addElement: (type) => {
    set((state) => {
      const newElement: BaseElement = {
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
  selectElement: (id, isMultiSelect = false) => {
    set((state) => {
      if (isMultiSelect) {
        // 다중 선택, 이미 선택된 경우 제거
        const newSelectedIds = state.selectedIds.includes(id)
          ? state.selectedIds.filter((selectedId) => selectedId !== id)
          : [...state.selectedIds, id];
        return { selectedIds: newSelectedIds };
      }
      // 단일 선택
      return { selectedIds: [id] };
    });
  },
  reorderElement: (dragId: string, dropId: string) => {
    set((state) => {
      const elements = [...state.elements]; // 1. 기존 배열 복사

      // 2. 드래그한 요소와 드롭할 위치의 인덱스 찾기
      const dragIndex = elements.findIndex((el) => el.id === dragId);
      const dropIndex = elements.findIndex((el) => el.id === dropId);

      // 3. dragIndex 위치의 요소를 제거하고 그 요소를 반환
      const [draggedElement] = elements.splice(dragIndex, 1);

      // 4. 드롭할 위치에 드래그한 요소 삽입
      elements.splice(dropIndex, 0, draggedElement);

      // 5. 새로운 순서의 배열로 상태 업데이트
      return { elements };
    });
  },
  createGroup: () => {
    set((state) => {
      if (state.selectedIds.length < 2) return state;

      // 1. 선택된 요소들 찾기
      const selectedElements = state.elements.filter((el) =>
        state.selectedIds.includes(el.id)
      );

      // 2. 첫 번째 선택된 요소의 인덱스 찾기
      const firstSelectedIndex = Math.min(
        ...selectedElements.map((el) => state.elements.indexOf(el))
      );

      // 3. 새로운 그룹 요소 생성
      const groupElement: BaseElement = {
        id: crypto.randomUUID(),
        type: 'group',
        children: state.selectedIds,
        style: {
          backgroundColor: 'transparent',
          width: selectedElements[0].style.width * selectedElements.length,
          height: selectedElements[0].style.height,
        },
      };

      // 4. 그룹화되지 않은 요소들 필터링
      const nonGroupedElements = state.elements.filter(
        (el) => !state.selectedIds.includes(el.id)
      );

      // 5. 새로운 elements 배열 생성
      const newElements = [...nonGroupedElements];
      newElements.splice(firstSelectedIndex, 0, groupElement);

      return {
        elements: newElements,
        selectedIds: [groupElement.id],
        groupedElements: [...state.groupedElements, ...selectedElements], // 그룹화된 요소들 저장
      };
    });
  },
}));
