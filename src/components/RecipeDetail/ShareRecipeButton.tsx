"use client";
import { useRef, useEffect, useState, memo } from "react";
import { Share2 } from "lucide-react";
import { slugify } from "@/lib/utils";
import { Recipe, RecipeBase } from "@/types/recipe";
import { toast } from "sonner";

const ShareRecipeButton = ({ recipe }: { recipe: Recipe | RecipeBase }) => {
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/recipes/${slugify(recipe)}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Recipe link copied to clipboard!");
      setShareStatus("Link copied!");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShareStatus(null), 2000);
    } catch {
      toast.error("Failed to copy link to clipboard");
      setShareStatus("Failed to copy");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShareStatus(null), 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        className="p-2 bg-white/60 backdrop-blur-sm rounded-full transition-colors hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Copy recipe link to clipboard"
        title="Share recipe"
      >
        <Share2 size={24} className="text-gray-700" aria-hidden="true" />
      </button>
      {/* Visually hidden live region for screen readers */}
      <span aria-live="polite" aria-atomic="true" className="sr-only">
        {shareStatus}
      </span>
    </>
  );
};

export default memo(ShareRecipeButton);
