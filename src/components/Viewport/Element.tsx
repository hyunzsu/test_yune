import React from 'react';
import type { BaseElement } from '../../types/element';
import { useElementStore } from '../../store/elementStore';

type ElementProps = BaseElement;

export default function Element({ id, type, style, children }: ElementProps) {
  const selectedIds = useElementStore((state) => state.selectedIds);
  const selectElement = useElementStore((state) => state.selectElement);
  const reorderElement = useElementStore((state) => state.reorderElement);
  const groupedElements = useElementStore((state) => state.groupedElements);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    selectElement(id, e.shiftKey);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dragId = e.dataTransfer.getData('text/plain');
    if (dragId !== id) {
      reorderElement(dragId, id);
    }
  };

  return type === 'group' ? (
    <section
      className="cursor-pointer border-2 border-dashed border-gray-700 p-1"
      style={{
        display: style?.display || 'flex',
        flexDirection: style?.flexDirection || 'row',
        backgroundColor: style?.backgroundColor,
        width: 'fit-content',
        height: 'fit-content',
      }}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {/* 재귀적 렌더링: 그룹 내부의 각 요소를 렌더링 */}
      {children?.map((childId) => {
        // 1. 그룹에 포함된 원본 요소 찾기
        const childElement = groupedElements.find((el) => el.id === childId);
        return childElement ? (
          // 2. 재귀적으로 Element 컴포넌트 렌더링
          <Element
            key={childId}
            id={childId}
            type={childElement.type}
            style={childElement.style}
            children={childElement.children}
          />
        ) : null;
      })}
    </section>
  ) : (
    React.createElement(
      type,
      {
        className: `cursor-pointer select-none ${
          selectedIds.includes(id) ? 'border-2 border-orange-600' : ''
        }`,
        style: {
          backgroundColor: style?.backgroundColor,
          width: style?.width,
          height: style?.height,
          display: type === 'span' ? 'inline-block' : undefined,
        },
        draggable: true,
        onDragStart: handleDragStart,
        onDragOver: handleDragOver,
        onDrop: handleDrop,
        onClick: handleClick,
      },
      type
    )
  );
}
