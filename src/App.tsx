import Panel from './components/Panel';
import Viewport from './components/Viewport';
import { useElementStore } from './store/elementStore';
import { useEffect } from 'react';

function App() {
  const createGroup = useElementStore((state) => state.createGroup);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === 'KeyG') {
        e.preventDefault();
        createGroup();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [createGroup]);

  return (
    <main className="flex min-h-screen w-full">
      <Panel />
      <Viewport />
    </main>
  );
}

export default App;
