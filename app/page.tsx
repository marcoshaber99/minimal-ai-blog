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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">
            {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>
        <Link href="/create">
          <Button>Create Post</Button>
        </Link>
      </div>

      {/* Tags Section */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <h2 className="text-sm font-semibold mb-3">Filter by topic:</h2>
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

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found.</p>
          {tag && (
            <Link
              href="/"
              className="text-sm text-primary hover:underline mt-2 block"
            >
              Clear filter
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardHeader>
                <div className="space-y-1">
                  <CardTitle>
                    <Link href={`/post/${post.id}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="mb-4 line-clamp-2 flex-1">{post.content}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
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
