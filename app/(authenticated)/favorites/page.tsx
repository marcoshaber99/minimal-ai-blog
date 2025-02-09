import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserFavorites } from "@/lib/db";
import { PostCard } from "@/components/post-card";
import { Suspense } from "react";
import { DashboardSkeleton } from "@/components/skeleton-loader";
import { Star } from "lucide-react";

async function FavoritesContent() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const favorites = await getUserFavorites(userId);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3 pb-2 border-b">
        <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
        <h1 className="text-2xl font-bold">Your Favorite Posts</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <Star className="h-12 w-12 text-muted-foreground/30" />
          <div>
            <p className="text-xl font-semibold mb-2">No favorites yet</p>
            <p className="text-muted-foreground max-w-sm">
              When you find posts you love, star them to save them here for
              quick access
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {favorites.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <FavoritesContent />
    </Suspense>
  );
}
