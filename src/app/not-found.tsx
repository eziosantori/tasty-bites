import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 text-center">
      <UtensilsCrossed className="h-16 w-16 mb-4 text-muted-foreground" />
      <h1 className="text-4xl font-bold mb-2">Recipe Not Found</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        We couldn&apos;t find the recipe you&apos;re looking for. It might have
        been removed or the URL might be incorrect.
      </p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
