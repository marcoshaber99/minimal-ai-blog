import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getPostsByAuthor } from "@/lib/db";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeletePostButton } from "@/components/delete-post-button";
import { Lock } from "lucide-react";

export default async function UserPostsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const posts = await getPostsByAuthor(userId, userId);
  const publicPosts = posts.filter((post) => !post.isPrivate);
  const privatePosts = posts.filter((post) => post.isPrivate);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Posts</h1>
      </div>

      {posts.length === 0 ? (
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            You haven&apos;t created any posts yet.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {publicPosts.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Public Posts</h2>
              <div className="grid gap-6">
                {publicPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>
                          <Link
                            href={`/post/${post.id}`}
                            className="hover:underline"
                          >
                            {post.title}
                          </Link>
                        </CardTitle>
                        {post.isPrivate && (
                          <span className="text-sm font-semibold text-red-500 dark:text-yellow-400">
                            Private
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <p className="mt-2 line-clamp-3">{post.content}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2">
                        <Link href={`/edit/${post.id}`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <DeletePostButton
                          postId={post.id}
                          postTitle={post.title}
                        />
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {privatePosts.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Private Posts</h2>
              <div className="grid gap-6">
                {privatePosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>
                          <Link
                            href={`/post/${post.id}`}
                            className="hover:underline"
                          >
                            {post.title}
                          </Link>
                        </CardTitle>
                        {post.isPrivate && (
                          <Lock className="h-4 w-4 text-blue-600 dark:text-yellow-500" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <p className="mt-2 line-clamp-3">{post.content}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex gap-2">
                        <Link href={`/edit/${post.id}`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <DeletePostButton
                          postId={post.id}
                          postTitle={post.title}
                        />
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
