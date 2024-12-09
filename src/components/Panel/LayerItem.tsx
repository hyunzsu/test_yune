import { Element } from '../../types/element';
import { useElementStore } from '../../store/elementStore';

type LayerItemProps = Pick<Element, 'id' | 'type'>;

export default function LayerItem({ id, type }: LayerItemProps) {
  const selectedId = useElementStore((state) => state.selectedId);
  const selectElement = useElementStore((state) => state.selectElement);

  return (
    <div
      className={`cursor-pointer bg-white p-2 ${
        selectedId === id ? 'border-2 border-orange-600' : ''
      }`}
      onClick={() => selectElement(id)}
    >
      {type}
    </div>
  );
}
