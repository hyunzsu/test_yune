import { create } from 'zustand';
import { ElementType, BaseElement } from '../types/element';

interface ElementStore {
  elements: BaseElement[];
  selectedIds: string[];
  groupedElements: BaseElement[];
  containerStyle: {
    display: 'flex';
    flexDirection: 'column' | 'row';
  } | null;
  addElement: (type: ElementType) => void;
  selectElement: (id: string, isMultiSelect?: boolean) => void;
  reorderElement: (dragId: string, dropId: string) => void;
  createGroup: () => void;
  unGroup: () => void;
  alignElements: (
    direction: 'vertical' | 'horizontal',
    scope: 'all' | 'group'
  ) => void;
}

export const useElementStore = create<ElementStore>((set) => ({
  elements: [],
  selectedIds: [],
  groupedElements: [],
  containerStyle: null,
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
        children: [],
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

      // 원래 순서대로 정렬된 선택된 요소들의 ID 배열 생성
      const orderedSelectedIds = state.elements
        .filter((element) => state.selectedIds.includes(element.id))
        .map((element) => element.id);

      // 1. 새로운 그룹 요소 생성 (정렬된 ID 배열 사용)
      const groupElement: BaseElement = {
        id: crypto.randomUUID(),
        type: 'group',
        children: orderedSelectedIds,
      };

      // 2. 새로운 elements 배열 생성 (선택된 요소 제외하고 그룹 추가)
      const newElements = state.elements.reduce((acc, element) => {
        if (element.id === state.selectedIds[0]) {
          acc.push(groupElement);
        }
        if (!state.selectedIds.includes(element.id)) {
          acc.push(element);
        }
        return acc;
      }, [] as BaseElement[]);

      // 3. 상태 업데이트
      return {
        elements: newElements,
        selectedIds: [groupElement.id],
        groupedElements: [
          ...state.groupedElements,
          ...state.elements.filter((el) => state.selectedIds.includes(el.id)),
        ],
      };
    });
  },
  unGroup: () => {
    set((state) => {
      // 1. 선택된 요소가 그룹인지 확인
      const groupElement = state.elements.find(
        (el) => el.id === state.selectedIds[0] && el.type === 'group'
      );
      if (!groupElement || !groupElement.children) return state;

      // 2. 그룹의 자식 요소들을 elements에 추가
      const newElements = state.elements.reduce((acc, element) => {
        if (element.id === groupElement.id) {
          // 그룹 요소를 자식 요소들로 대체
          const childElements = groupElement.children
            .map((childId) =>
              state.groupedElements.find((el) => el.id === childId)
            )
            .filter(Boolean) as BaseElement[];
          acc.push(...childElements);
        } else {
          acc.push(element);
        }
        return acc;
      }, [] as BaseElement[]);

      // 3. 상태 업데이트
      return {
        elements: newElements,
        selectedIds: groupElement.children,
        groupedElements: state.groupedElements.filter(
          (el) => !groupElement.children.includes(el.id)
        ),
      };
    });
  },
  alignElements: (direction, scope) => {
    set((state) => {
      // 1. 전체 정렬인 경우
      if (scope === 'all') {
        return {
          containerStyle: {
            display: 'flex',
            flexDirection: direction === 'vertical' ? 'column' : 'row',
          },
        };
      }

      // 2. 그룹 정렬인 경우
      const newElements = [...state.elements];
      // 모든 그룹 요소를 찾아서 정렬 (선택 여부와 관계없이)
      newElements.forEach((element, index) => {
        if (element.type === 'group') {
          newElements[index] = {
            ...element,
            style: {
              ...element.style,
              display: 'flex',
              flexDirection: direction === 'vertical' ? 'column' : 'row',
            },
          };
        }
      });

      return { elements: newElements };
    });
  },
}));
