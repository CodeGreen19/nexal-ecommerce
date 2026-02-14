import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function DataTableSkeleton({
  length = 10,
  column = 4,
}: {
  length?: number;
  column?: number;
}) {
  return (
    <div className="border rounded-md">
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center gap-4 justify-between p-4 border-b first:bg-muted ",
          )}
        >
          {Array.from({ length: column }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}
