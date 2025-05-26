import React from "react";

const RecipeDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="animate-pulse">
        <div className="h-10 bg-neutral-200 max-w-md mb-4"></div>
        <div className="h-6 bg-neutral-200 max-w-sm mb-8"></div>
        <div className="h-80 bg-neutral-200 mb-6 rounded-lg"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="h-8 bg-neutral-200 max-w-xs mb-4"></div>
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-neutral-200"></div>
              <div className="h-4 bg-neutral-200"></div>
              <div className="h-4 bg-neutral-200 max-w-md"></div>
            </div>
          </div>
          <div>
            <div className="h-8 bg-neutral-200 max-w-xs mb-4"></div>
            <div className="space-y-4 mb-6">
              <div className="h-6 bg-neutral-200"></div>
              <div className="h-6 bg-neutral-200"></div>
              <div className="h-6 bg-neutral-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailSkeleton;
