import FavoritesList from "@/components/FavoritesList";
import type { Metadata } from "next";

import GridLayout from "../grid-layout";

export const metadata: Metadata = {
  title: "Favorites Recipes",
  description: "Your favorite recipes saved for easy access",
};

export default async function FavoritesPage() {
  // should be avaible only for logged users

  return (
    <GridLayout pageTitle="Favorites Recipes">
      <FavoritesList />
    </GridLayout>
  );
}
