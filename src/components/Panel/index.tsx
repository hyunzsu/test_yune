import ButtonPanel from './ButtonPanel';
import LayerPanel from './LayerPanel';

export default function Panel() {
  return (
    <aside className="flex h-full w-1/5 flex-col">
      <ButtonPanel />
      <LayerPanel />
    </aside>
  );
}
