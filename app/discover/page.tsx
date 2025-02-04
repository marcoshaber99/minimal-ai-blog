import Link from "next/link";
import { getPosts } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { RiQuillPenLine } from "react-icons/ri";
import { DiscoverPostCard } from "@/components/discover-post-card";
import type { Post } from "@/types";

export default async function DiscoverPage() {
  const posts = (await getPosts()) as Post[];

  return (
    <>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">
          Discover
        </h1>
        <Link href="/create">
          <Button variant="outline" className="gap-2 font-semibold">
            <RiQuillPenLine className="h-4 w-4" />
            Create
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-center text-lg">
          No posts yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {posts.map((post) => (
            <DiscoverPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
