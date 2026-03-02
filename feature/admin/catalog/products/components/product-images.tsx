export function ProductImages() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="aspect-video border rounded-md">
          {}
        </div>
      ))}
    </div>
  );
}
