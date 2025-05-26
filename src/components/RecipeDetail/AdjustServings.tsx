import { Minus, Plus } from "lucide-react";

const AdjustServings = ({
  servings,
  onIncrease: increase,
  onDecrease: decrease,
}: {
  servings: number;
  onIncrease(): void;
  onDecrease(): void;
}) => {
  return (
    <div className="flex justify-between items-center">
      <label htmlFor="servings" className="text-neutral-500">
        Servings:
      </label>
      <div
        className="flex items-center"
        role="group"
        aria-label="Adjust servings"
      >
        <button
          type="button"
          className="w-8 h-8 bg-neutral-100 rounded-l-lg flex items-center justify-center text-neutral-400 hover:bg-primary hover:text-white transition-all"
          onClick={decrease}
          aria-label="Decrease servings"
        >
          <Minus />
        </button>
        <span
          id="servings"
          className="w-10 h-8 bg-white border-y border-neutral-100 flex items-center justify-center text-neutral-500 font-medium"
          aria-live="polite"
          aria-atomic="true"
        >
          {servings}
        </span>
        <button
          type="button"
          className="w-8 h-8 bg-neutral-100 rounded-r-lg flex items-center justify-center text-neutral-400 hover:bg-primary hover:text-white transition-all"
          onClick={increase}
          aria-label="Increase servings"
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default AdjustServings;
