import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-custom flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
      <h2 className="text-4xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground text-lg max-w-lg mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild size="lg">
        <Link href="/">
          Return Home
        </Link>
      </Button>
    </div>
  );
}