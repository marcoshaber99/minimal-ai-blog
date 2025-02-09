"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/types";

interface PostsTabsProps {
  posts: Post[];
}

export function PostsTabs({ posts }: PostsTabsProps) {
  const publicPosts = posts.filter((post) => !post.isPrivate);
  const privatePosts = posts.filter((post) => post.isPrivate);

  return (
    <Tabs defaultValue="posts" className="w-full space-y-6">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="posts" className="font-medium">
          Your Posts
        </TabsTrigger>
        <TabsTrigger value="private" className="font-medium">
          Private
        </TabsTrigger>
      </TabsList>

      {["posts", "private"].map((tab) => (
        <TabsContent key={tab} value={tab} className="space-y-4">
          {(tab === "posts" ? publicPosts : privatePosts).length === 0 ? (
            <div className="text-center bg-muted/50 rounded-lg py-8">
              <p className="text-muted-foreground">
                {tab === "posts"
                  ? "Share your knowledge with the world! Create your first public post."
                  : "Keep your drafts and personal posts private. Create your first private post!"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
              {(tab === "posts" ? publicPosts : privatePosts).map((post) => (
                <PostCard key={post.id} post={post} showEditDelete />
              ))}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
