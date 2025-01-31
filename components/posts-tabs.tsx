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
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="posts">Your Posts</TabsTrigger>
        <TabsTrigger value="private">Private</TabsTrigger>
        <TabsTrigger value="favorites">Favorites</TabsTrigger>
      </TabsList>

      {["posts", "private", "favorites"].map((tab) => (
        <TabsContent key={tab} value={tab}>
          <div className="space-y-6">
            {(tab === "posts"
              ? publicPosts
              : tab === "private"
              ? privatePosts
              : favorites
            ).length === 0 ? (
              <p className="text-muted-foreground text-center bg-muted p-8 rounded-lg">
                {tab === "posts"
                  ? "You haven't created any public posts yet."
                  : tab === "private"
                  ? "You haven't created any private posts yet."
                  : "You haven't favorited any posts yet."}
              </p>
            ) : (
              (tab === "posts"
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
              ))
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
