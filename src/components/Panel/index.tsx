import ButtonPanel from './ButtonPanel';
import LayerPanel from './LayerPanel';

export default function Panel() {
  return (
    <aside className="flex h-full w-1/6 flex-col bg-zinc-600">
      <ButtonPanel />
      <LayerPanel />
    </aside>
  );
}
