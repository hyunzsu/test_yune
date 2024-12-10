import Panel from './components/Panel';
import Viewport from './components/Viewport';
import { useElementStore } from './store/elementStore';
import { useEffect } from 'react';

function App() {
  const createGroup = useElementStore((state) => state.createGroup);
  const unGroup = useElementStore((state) => state.unGroup);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === 'KeyG') {
        if (e.shiftKey) {
          // Ctrl+Shift+G를 눌렀을 때 그룹 해제
          e.preventDefault();
          unGroup();
        } else {
          // Ctrl+G를 눌렀을 때 그룹 생성
          e.preventDefault();
          createGroup();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [createGroup, unGroup]);

  return (
    <main className="flex min-h-screen w-full">
      <Panel />
      <Viewport />
    </main>
  );
}

export default App;
