import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const RecipeCardSkeleton = () => {
  const tags = () => (
    <>
      <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
    </>
  );
  return (
    <Card className="overflow-hidden h-full recipe-card-hover cursor-pointer relative animate-pulse">
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700 w-full">
        <div className="absolute top-2 right-2 w-9 h-9 bg-white/60 rounded-full" />
      </div>
      <CardContent className="p-4">
        {/*Title*/}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          <span className="ml-auto flex items-center gap-1">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          </span>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <div className="flex items-center text-xs space-x-2">{tags()}</div>
      </CardFooter>
    </Card>
  );
};

export default RecipeCardSkeleton;
