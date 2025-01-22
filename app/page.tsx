import Link from "next/link";
import { getPosts } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Discover</h1>
        {user ? (
          <Link href="/create">
            <Button>Create Post</Button>
          </Link>
        ) : (
          <SignInButton mode="modal">
            <Button>Create Post</Button>
          </SignInButton>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-center">No posts yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
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
                <p className="text-sm">
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
