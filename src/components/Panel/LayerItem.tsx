import { Element } from '../../types/element';

type LayerItemProps = Pick<Element, 'id' | 'type'>;

export default function LayerItem({ id, type }: LayerItemProps) {
  return <div className="cursor-pointer bg-white p-2">{type}</div>;
}
