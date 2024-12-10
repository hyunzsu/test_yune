import { useElementStore } from '../../store/elementStore';
import Element from './Element';
import { useDownloadImage } from '../../hooks/useDownloadImage';

export default function Viewport() {
  const elements = useElementStore((state) => state.elements);
  const containerStyle = useElementStore((state) => state.containerStyle);
  const { downloadAsSvg } = useDownloadImage();

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
        {elements.map((el) => (
          <Element key={el.id} {...el} />
        ))}
      </section>
    </article>
  );
}
