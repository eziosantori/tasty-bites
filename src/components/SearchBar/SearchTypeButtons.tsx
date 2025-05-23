import { CookingPot, ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";
import { SearchType } from "@/types/search";

const SearchTypeButtons = ({
  onTypeChange,
  searchType,
}: {
  searchType?: SearchType;
  onTypeChange: (searchType: SearchType) => void;
}) => {
  // quick exit should avoid SSR mismatch, to evaluate to use a store
  if (!searchType) {
    return (
      <>
        <Button
          type="button"
          variant="outline"
          className="rounded-r-none w-40 text-neutral-500"
          disabled
        >
          <CookingPot /> By Recipe
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-l-none w-40 text-neutral-500"
          disabled
        >
          <ShoppingBasket /> By Ingredient
        </Button>
      </>
    );
  }
  return (
    <>
      <Button
        type="button"
        variant={searchType === "name" ? "default" : "outline"}
        onClick={() => onTypeChange("name")}
        className={`rounded-r-none w-40 ${
          searchType === "name"
            ? "bg-secondary hover:bg-secondary/90 "
            : "text-neutral-500 "
        }`}
        aria-pressed={searchType === "name"}
      >
        <CookingPot /> By Recipe
      </Button>
      <Button
        type="button"
        variant={searchType === "ingredient" ? "default" : "outline"}
        onClick={() => onTypeChange("ingredient")}
        className={`rounded-l-none w-40 ${
          searchType === "ingredient"
            ? "bg-secondary hover:bg-secondary/90"
            : "text-neutral-500 "
        }`}
        aria-pressed={searchType === "ingredient"}
      >
        <ShoppingBasket /> By Ingredient
      </Button>
    </>
  );
};

export default SearchTypeButtons;
