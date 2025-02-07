import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getPostsByAuthor, getUserFavorites } from "@/lib/db";
import { PostsTabs } from "@/components/posts-tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { DashboardSkeleton } from "@/components/skeleton-loader";

async function DashboardContent() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const [posts, favorites] = await Promise.all([
    getPostsByAuthor(userId, userId),
    getUserFavorites(userId),
  ]);

  return (
    <>
      {posts.length === 0 && favorites.length === 0 ? (
        <div className="text-center bg-muted rounded-lg p-8">
          <p className="text-muted-foreground mb-4">
            You haven&apos;t created any posts yet.
          </p>
          <Link href="/create">
            <Button>Create Your First Post</Button>
          </Link>
        </div>
      ) : (
        <PostsTabs posts={posts} favorites={favorites} />
      )}
    </>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
