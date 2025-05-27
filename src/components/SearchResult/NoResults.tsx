import { SearchX } from "lucide-react";
import { memo } from "react";

export const NoResults = ({ query }: { query: string }) => {
  return (
    <div className="text-center col-span-full">
      <SearchX className="mx-auto h-12 w-12 text-muted-foreground" />
      <h2 className="text-xl font-medium mt-4">No recipes found</h2>
      <p className="text-muted-foreground mt-2">
        We couldn&apos;t find any recipes matching &apos;{query}&apos;. Try
        different keywords or ingredients.
      </p>
    </div>
  );
};
export default memo(NoResults);
