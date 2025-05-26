import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Recipe } from "@/types/recipe";
import { DialogTitle } from "@radix-ui/react-dialog";

import RecipeDetail from "./RecipeDetail";

interface RecipeDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: Recipe | null;
}

const RecipeDetailDialog = ({
  open,
  onOpenChange,
  recipe,
}: RecipeDetailDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTitle className="sr-only">
      {recipe ? `${recipe.strMeal} | Tasty Bites` : "Recipe Detail"}
    </DialogTitle>
    <DialogContent className="p-0 max-w-none w-screen h-screen rounded-none flex items-stretch justify-center dark:bg-neutral-900 pt-12">
      <div className="w-full h-full flex flex-col dark:bg-neutral-900 overflow-y-auto">
        {recipe && <RecipeDetail recipe={recipe} />}
      </div>
    </DialogContent>
  </Dialog>
);

export default RecipeDetailDialog;
