import { getPosts } from "@/lib/db";
import { DiscoverPostCard } from "@/components/discover-post-card";
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
      <div className="flex-grow">
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
