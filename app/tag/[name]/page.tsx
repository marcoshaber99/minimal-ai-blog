import { getPosts } from "@/lib/db";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type TagPageProps = {
  params: Promise<{ name: string }>;
};

export default async function TagPage({ params }: TagPageProps) {
  const { name } = await params;

  const posts = await getPosts();
  const filteredPosts = posts.filter((post) =>
    post.tags.some((tag) => tag.name === name)
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Posts tagged with &quot;{name}&quot;
      </h1>

      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground text-center">
          No posts found with this tag.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredPosts.map((post) => (
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
