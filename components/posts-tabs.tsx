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
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="posts">Your Posts</TabsTrigger>
        <TabsTrigger value="private">Private</TabsTrigger>
        <TabsTrigger value="favorites">Favorites</TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="mt-6">
        {publicPosts.length === 0 ? (
          <p className="text-muted-foreground text-center">
            You haven&apos;t created any public posts yet.
          </p>
        ) : (
          <div className="grid gap-6">
            {publicPosts.map((post) => (
              <PostCard key={post.id} post={post} showEditDelete={true} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="private" className="mt-6">
        {privatePosts.length === 0 ? (
          <p className="text-muted-foreground text-center">
            You haven&apos;t created any private posts yet.
          </p>
        ) : (
          <div className="grid gap-6">
            {privatePosts.map((post) => (
              <PostCard key={post.id} post={post} showEditDelete={true} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="favorites" className="mt-6">
        {favorites.length === 0 ? (
          <p className="text-muted-foreground text-center">
            You haven&apos;t favorited any posts yet.
          </p>
        ) : (
          <div className="grid gap-6">
            {favorites.map((post) => (
              <PostCard key={post.id} post={post} showEditDelete={false} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
