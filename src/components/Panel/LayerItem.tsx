import { Element } from '../../types/element';
import { useElementStore } from '../../store/elementStore';

type LayerItemProps = Pick<Element, 'id' | 'type'>;

export default function LayerItem({ id, type }: LayerItemProps) {
  const selectedIds = useElementStore((state) => state.selectedIds);
  const selectElement = useElementStore((state) => state.selectElement);
  const reorderElement = useElementStore((state) => state.reorderElement);

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

  return (
    <div
      className={`cursor-pointer select-none bg-white p-2 ${
        selectedIds.includes(id) ? 'border-2 border-orange-600' : ''
      }`}
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
