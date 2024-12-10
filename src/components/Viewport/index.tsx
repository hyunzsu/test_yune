import { useElementStore } from '../../store/elementStore';
import Element from './Element';
import { useDownloadSvg } from '../../hooks/useDownloadSvg';

export default function Viewport() {
  const elements = useElementStore((state) => state.elements);
  const containerStyle = useElementStore((state) => state.containerStyle);
  const downloadAsSvg = useDownloadSvg();

  return (
    <article className="relative flex-1">
      <button
        onClick={downloadAsSvg}
        className="absolute left-2 top-2 border border-black bg-orange-600 p-2"
      >
        Download as SVG
      </button>
      <section
        className="elements-container mx-2 mt-16"
        style={{
          display: containerStyle?.display || 'flex',
          flexDirection: containerStyle?.flexDirection || 'row',
        }}
      >
        {/* 요소들이 배치될 영역 */}
        {elements.map((el) => (
          <Element key={el.id} {...el} />
        ))}
      </section>
    </article>
  );
}
