"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/types";

interface PostsTabsProps {
  posts: Post[];
  favorites: Post[];
}

export function PostsTabs({ posts, favorites }: PostsTabsProps) {
  const publicPosts = posts.filter((post) => !post.isPrivate);
  const privatePosts = posts.filter((post) => post.isPrivate);

  return (
    <Tabs defaultValue="posts" className="w-full space-y-6">
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="posts" className="font-medium">
          Your Posts
        </TabsTrigger>
        <TabsTrigger value="private" className="font-medium">
          Private
        </TabsTrigger>
        <TabsTrigger value="favorites" className="font-medium">
          Favorites
        </TabsTrigger>
      </TabsList>

      {["posts", "private", "favorites"].map((tab) => (
        <TabsContent key={tab} value={tab} className="space-y-4">
          {(tab === "posts"
            ? publicPosts
            : tab === "private"
            ? privatePosts
            : favorites
          ).length === 0 ? (
            <div className="text-center bg-muted/50 rounded-lg py-8">
              <p className="text-muted-foreground">
                {tab === "posts"
                  ? "Share your knowledge with the world! Create your first public post."
                  : tab === "private"
                  ? "Keep your drafts and personal posts private. Create your first private post!"
                  : "Discover and save inspiring posts to revisit later. Start exploring!"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
              {(tab === "posts"
                ? publicPosts
                : tab === "private"
                ? privatePosts
                : favorites
              ).map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  showEditDelete={tab !== "favorites"}
                />
              ))}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
