import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getPostsByAuthor } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function UserPostsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const posts = await getPostsByAuthor(userId);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Posts</h1>
        <Link href="/create">
          <Button>Create New Post</Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            You haven&apos;t created any posts yet.
          </p>
          <Link href="/create">
            <Button>Create Your First Post</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>
                  <Link href={`/post/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-2 line-clamp-3">{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
