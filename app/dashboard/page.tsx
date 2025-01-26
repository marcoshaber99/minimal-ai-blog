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

export default async function UserPostsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const posts = await getPostsByAuthor(userId, userId);

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
        <div className="grid gap-6">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    <Link href={`/post/${post.id}`} className="hover:underline">
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
                <Link href={`/edit/${post.id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
