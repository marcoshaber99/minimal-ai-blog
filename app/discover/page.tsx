import Link from "next/link";
import { getPosts } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils/date";
import { Button } from "@/components/ui/button";
import { PlusCircle, StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAuthorDisplayName } from "@/lib/utils/user";

export default async function DiscoverPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
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
        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-md transition-shadow duration-300"
            >
              <Link href={`/post/${post.id}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-semibold hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h2>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <StarIcon className="h-4 w-4 mr-1" />
                      <span className="mr-3">{post.favoritesCount}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium mr-2">
                        {getAuthorDisplayName(post.author)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(post.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.learningOutcomes
                        .slice(0, 2)
                        .map((outcome, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {outcome}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
