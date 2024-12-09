import { Element } from '../../types/element';
import { useElementStore } from '../../store/elementStore';

type LayerItemProps = Pick<Element, 'id' | 'type'>;

export default function LayerItem({ id, type }: LayerItemProps) {
  const selectedIds = useElementStore((state) => state.selectedIds);
  const selectElement = useElementStore((state) => state.selectElement);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    selectElement(id, e.shiftKey);
  };

  return (
    <div
      className={`cursor-pointer select-none bg-white p-2 ${
        selectedIds.includes(id) ? 'border-2 border-orange-600' : ''
      }`}
      onClick={handleClick}
    >
      {type}
    </div>
  );
}
