interface ElementProps {
  id: string;
  type: 'div' | 'span' | 'p';
  style: {
    backgroundColor: string;
    width: number;
    height: number;
  };
}

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
