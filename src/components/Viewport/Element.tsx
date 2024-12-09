import type { Element as ElementType } from '../../types/element';
import { useElementStore } from '../../store/elementStore';

type ElementProps = ElementType;

export default function Element({ id, type, style }: ElementProps) {
  const selectedIds = useElementStore((state) => state.selectedIds);
  const selectElement = useElementStore((state) => state.selectElement);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    selectElement(id, e.shiftKey);
  };

  return (
    <div
      className={`cursor-pointer select-none ${
        selectedIds.includes(id) ? 'border-2 border-orange-600' : ''
      }`}
      style={{
        backgroundColor: style.backgroundColor,
        width: style.width,
        height: style.height,
      }}
      onClick={handleClick}
    >
      {type}
    </div>
  );
}
