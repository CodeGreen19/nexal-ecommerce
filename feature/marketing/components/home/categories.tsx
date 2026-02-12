const items = ["Chair", "Table", "Computer", "Monitor"];
export function Categories() {
  return (
    <ul className="p-4 xl:p-0 xl:py-6 grid grid-cols-2 md:grid-cols-4 gap-2">
      {items.map((item) => (
        <div
          key={item}
          className="aspect-video border flex items-center justify-center  rounded-2xl"
        >
          {item}
        </div>
      ))}
    </ul>
  );
}
