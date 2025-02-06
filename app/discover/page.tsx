import Link from "next/link";
import { getPosts } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { RiQuillPenLine } from "react-icons/ri";
import { DiscoverPostCard } from "@/components/discover-post-card";
import { DiscoverSidebar } from "@/components/discover-sidebar";
import type { Post } from "@/types";
import { DifficultyLevel } from "@/lib/validations";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DiscoverPage({ searchParams }: PageProps) {
  const difficulty = (await searchParams).difficulty as
    | DifficultyLevel
    | undefined;
  const posts = (await getPosts()) as Post[];

  const filteredPosts = difficulty
    ? posts.filter((post) => post.difficultyLevel === difficulty)
    : posts;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="lg:sticky lg:top-8">
          <DiscoverSidebar />
        </div>
      </div>

      <div className="flex-grow">
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

        {filteredPosts.length === 0 ? (
          <p className="text-muted-foreground text-center text-lg">
            {posts.length === 0
              ? "No posts yet."
              : "No posts match the selected filters."}
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <DiscoverPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
