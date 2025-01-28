import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getPostsByAuthor, getUserFavorites } from "@/lib/db";
import { PostsTabs } from "@/components/posts-tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function UserPostsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const [posts, favorites] = await Promise.all([
    getPostsByAuthor(userId, userId),
    getUserFavorites(userId),
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/create">
          <Button className="gap-2 font-semibold dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700">
            <PlusCircle className="h-4 w-4" />
            Create Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 && favorites.length === 0 ? (
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            You haven&apos;t created any posts yet.
          </p>
        </div>
      ) : (
        <PostsTabs posts={posts} favorites={favorites} />
      )}
    </div>
  );
}
