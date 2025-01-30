import Link from "next/link";
import { getPosts } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils/date";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default async function DiscoverPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Discover</h1>
        <Link href="/create">
          <Button variant="outline" className="gap-2 font-semibold">
            <PlusCircle className="h-4 w-4" />
            Create Post
          </Button>
        </Link>
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
                <p className="text-sm">{formatDate(post.createdAt)}</p>
                <p
                  className="mt-2 line-clamp-3 prose max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
