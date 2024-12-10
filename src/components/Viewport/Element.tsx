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
    <div
      className="relative"
      style={style}
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="absolute inset-0 border-2 border-dashed border-gray-400" />
      <div className="flex flex-wrap">
        {children?.map((childId) => {
          const originalElement = groupedElements.find(
            (el) => el.id === childId
          );
          return originalElement ? (
            <Element key={childId} {...originalElement} />
          ) : null;
        })}
      </div>
    </div>
  ) : (
    <div
      className={`cursor-pointer select-none ${
        selectedIds.includes(id) ? 'border-2 border-orange-600' : ''
      }`}
      style={style}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {type}
    </div>
  );
}
