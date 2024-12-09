import type { Element as ElementType } from '../../types/element';
import { useElementStore } from '../../store/elementStore';

type ElementProps = ElementType;

export default function Element({ id, type, style }: ElementProps) {
  const selectedId = useElementStore((state) => state.selectedId);
  const selectElement = useElementStore((state) => state.selectElement);

  return (
    <div
      className={`cursor-pointer ${
        selectedId === id ? 'border-2 border-orange-600' : ''
      }`}
      style={{
        backgroundColor: style.backgroundColor,
        width: style.width,
        height: style.height,
      }}
      onClick={() => selectElement(id)}
    >
      {type}
    </div>
  );
}
