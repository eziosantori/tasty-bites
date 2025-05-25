import React from "react";
import { useInView } from "react-intersection-observer";

import RecipeCardSkeleton from "./RecipeCardSkeleton";

/**
 * Lazily hydrates its children based on their visibility in the viewport using the Intersection Observer API.
 *
 * This component leverages `react-intersection-observer` to detect when its content enters the viewport.
 * While the content is not in view, it displays a `RecipeCardSkeleton` as a placeholder.
 * Once the content is in view, it renders the provided `children` function, passing the `inView` state.
 *
 * @param children - A render prop function that receives the `inView` boolean and returns React nodes to render.
 *
 * @example
 * <RecipeLazyHydrator>
 *   {(inView) => inView ? <RecipeCard {...props} /> : null}
 * </RecipeLazyHydrator>
 */
const RecipeLazyHydrator = ({
  children,
}: {
  children: (inView?: boolean) => React.ReactNode;
}) => {
  // Use react-intersection-observer with a lower threshold and rootMargin
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
    rootMargin: "50px 0px 50px 0px",
  });

  // Show a skeleton or fallback while loading or not in view
  if (!inView) {
    return (
      <div ref={ref}>
        <RecipeCardSkeleton />
      </div>
    );
  }

  // If details are loaded, use them, otherwise fallback to base
  return <div ref={ref}>{children(inView)}</div>;
};

export default RecipeLazyHydrator;
