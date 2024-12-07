export default function Viewport() {
  return (
    <article className="relative flex-1 border-2 border-red-400">
      <button className="absolute left-2 top-2 border border-black bg-orange-600 p-2">
        Download as SVG
      </button>
      <section className="h-full w-full">{/* 요소들이 배치될 영역 */}</section>
    </article>
  );
}
