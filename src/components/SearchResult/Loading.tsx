import { Utensils } from "lucide-react";

const Loading = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12">
      <span className="relative inline-block animate-spin-slow">
        <Utensils className="text-primary" size={48} strokeWidth={3} />
        {/* You can add more icons or SVGs for more complex animation */}
      </span>
      <span className="mt-4 text-neutral-400 text-sm">Loading recipes...</span>
    </div>
  );
};
export default Loading;
// This component is used to show a loading state while fetching data.
