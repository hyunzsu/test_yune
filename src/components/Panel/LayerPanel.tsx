import { useElementStore } from '../../store/elementStore';
import LayerItem from './LayerItem';

export default function LayerPanel() {
  const elements = useElementStore((state) => state.elements);

  return (
    <section className="flex-1 p-2">
      <div className="space-y-2">
        {elements.map((el) => (
          <LayerItem key={el.id} {...el} />
        ))}
      </div>
    </section>
  );
}
