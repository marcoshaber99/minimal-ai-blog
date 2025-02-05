import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getPostsByAuthor, getUserFavorites } from "@/lib/db";
import { PostsTabs } from "@/components/posts-tabs";
import { Button } from "@/components/ui/button";
import { RiQuillPenLine } from "react-icons/ri";
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/create">
          <Button variant="outline" className="gap-2 font-semibold">
            <RiQuillPenLine className="h-4 w-4" />
            Create
          </Button>
        </Link>
      </div>

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
