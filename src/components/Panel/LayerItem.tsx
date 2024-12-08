interface LayerItemProps {
  id: string;
  type: 'div' | 'span' | 'p';
}

export default function LayerItem({ id, type }: LayerItemProps) {
  return <div className="cursor-pointer bg-white p-2">{type}</div>;
}
