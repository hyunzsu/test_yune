import type { Element as ElementType } from '../../types/element';

type ElementProps = ElementType;

export default function Element({ id, type, style }: ElementProps) {
  return (
    <div
      className="cursor-pointer border border-gray-300"
      style={{
        backgroundColor: style.backgroundColor,
        width: style.width,
        height: style.height,
      }}
    >
      {type}
    </div>
  );
}
