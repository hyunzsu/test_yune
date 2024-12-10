import ButtonPanel from './ButtonPanel';
import LayerPanel from './LayerPanel';

export default function Panel() {
  return (
    <aside className="flex w-1/6 shrink-0 flex-col bg-zinc-600">
      <ButtonPanel />
      <LayerPanel />
    </aside>
  );
}
