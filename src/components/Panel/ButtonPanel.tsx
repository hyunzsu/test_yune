import Button from '../@common/Button';

export default function ButtonPanel() {
  return (
    <section className="min-h-80 shrink-0 p-2.5">
      {/* Align 그룹 */}
      <section className="mb-2 bg-gray-300 p-2">
        <h3 className="mb-2 text-center font-semibold">Align</h3>
        <div className="space-y-2">
          <Button>All Vertically</Button>
          <Button>All Horizontally</Button>
          <Button>Group Vertically</Button>
          <Button>Group Horizontally</Button>
        </div>
      </section>

      {/* Add 그룹 */}
      <section className="bg-gray-300 p-2">
        <h3 className="mb-2 text-center font-semibold">Add</h3>
        <div className="space-y-2">
          <Button>Div</Button>
          <Button>Span</Button>
          <Button>Paragraph</Button>
        </div>
      </section>
    </section>
  );
}
