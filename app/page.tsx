import Link from "next/link";
import { getPosts, getAllTags } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/tag";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const posts = await getPosts();
  const tags = await getAllTags();
  const { tag } = await searchParams;

  const filteredPosts = tag
    ? posts.filter((post) => post.tags.some((postTag) => postTag.name === tag))
    : posts;
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Discover</h1>
        <Button>
          <Link href="/create">Create Post</Link>
        </Button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Filter by tag:</h2>
        <div className="flex flex-wrap gap-2">
          <Tag name="All" href="/" active={!tag} />
          {tags.map((tagItem) => (
            <Tag
              key={tagItem.id}
              name={tagItem.name}
              href={`/?tag=${tagItem.name}`}
              active={tag === tagItem.name}
            />
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground text-center">No posts found.</p>
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
                <p className="text-sm mb-2">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="mb-4 line-clamp-3">{post.content}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((postTag) => (
                      <Tag
                        key={postTag.id}
                        name={postTag.name}
                        href={`/?tag=${postTag.name}`}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
