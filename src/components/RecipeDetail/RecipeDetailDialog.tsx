// import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/types/recipe";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

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
  // p-0 max-w-none w-screen h-screen rounded-none flex items-stretch justify-center dark:bg-neutral-900 pt-12
  // <Dialog open={open} onOpenChange={onOpenChange}>
  //   <DialogTitle className="sr-only">
  //     {recipe ? `${recipe.strMeal} | Tasty Bites` : "Recipe Detail"}
  //   </DialogTitle>
  //   <DialogContent className="p-0 max-w-none w-screen h-screen rounded-none flex items-stretch justify-center dark:bg-neutral-900 pt-12">
  //     <div className="w-full h-full flex flex-col dark:bg-neutral-900 overflow-y-auto">
  //       {recipe && <RecipeDetail recipe={recipe} showBackButton={false} />}
  //     </div>
  //   </DialogContent>
  // </Dialog>
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      {/* Overlay - lo sfondo semi-trasparente dietro la dialog */}
      <Dialog.Overlay
        className="
            fixed inset-0 z-50 bg-black/80 
            data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
          "
      />

      {/* Contenuto della Dialog - Qui è dove applichiamo le classi fullscreen */}
      <Dialog.Content
        className="
            fixed inset-0 z-50
            h-full max-h-none
            w-full max-w-none
            rounded-none 
            /* max-w-2xl mx-auto */
            p-0 
            flex flex-col 
            bg-background text-foreground 
            data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
          "
      >
        {/* Header Fissato con gestione Safe Area */}
        <div
          className="
              flex items-center justify-between 
              fixed top-0 left-0 right-0 z-[51] 
              bg-background 
              p-2 
              pt-[calc(1rem+env(safe-area-inset-top))] 
            "
        >
          <Dialog.Title className="sr-only">
            {recipe ? `${recipe.strMeal} | Tasty Bites` : "Recipe Detail"}
          </Dialog.Title>
          <Dialog.Close asChild>
            <Button
              variant="ghost"
              size="icon"
              className="
                  rounded-sm opacity-70 ring-offset-background transition-opacity
                  hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground
                "
            >
              <XIcon size={32} className="h-16" />
              <span className="sr-only">Close</span>
            </Button>
          </Dialog.Close>
        </div>

        {/* Contenuto scorrevole principale */}
        <div
          className="
              flex-1 overflow-y-auto 
              p-4 
              pt-[calc(4rem+env(safe-area-inset-top))] 
              pb-[env(safe-area-inset-bottom)] 
            "
        >
          {recipe && <RecipeDetail recipe={recipe} showBackButton={false} />}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default RecipeDetailDialog;
