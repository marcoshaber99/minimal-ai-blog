import Link from "next/link";
import { getPosts } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Recent Posts</h1>
        <Link href="/create">
          <Button>Create New Post</Button>
        </Link>
      </div>
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
              <p className="mt-2  line-clamp-3">{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
