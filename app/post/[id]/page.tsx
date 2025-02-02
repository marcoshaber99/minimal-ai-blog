import { getPostWithFavorites } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { getAuthorDisplayName } from "@/lib/utils/user";
import { formatDate } from "@/lib/utils/date";
import { ErrorMessage } from "@/components/error-message";
import { FavoriteButton } from "@/components/favorite-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap, Lock, Pencil } from "lucide-react";
import { Suspense } from "react";
import { PostSkeleton } from "@/components/skeleton-loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PostPageProps = {
  params: Promise<{ id: string }>;
};

async function PostContent({ params }: PostPageProps) {
  const { userId } = await auth();
  const resolvedParams = await params;
  const post = await getPostWithFavorites(resolvedParams.id, userId);

  if (!post) {
    return (
      <div className="container max-w-2xl mx-auto mt-16">
        <ErrorMessage
          title="Post Not Available"
          message="This post either does not exist or is private."
        />
      </div>
    );
  }

  const isAuthor = userId === post.authorId;
  const authorName = isAuthor
    ? "You"
    : post.author
    ? getAuthorDisplayName(post.author)
    : "Unknown";

  return (
    <Card className="max-w-3xl mx-auto bg-inherit border-none">
      <CardHeader className="space-y-6">
        <div className="flex justify-between items-center">
          <Link href="/discover">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground -ml-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Discover
            </Button>
          </Link>
          {isAuthor && (
            <Link href={`/edit/${post.id}`}>
              <Button variant="outline" size="sm">
                <Pencil className="h-2 w-2 mr-1" />
                Edit
              </Button>
            </Link>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-3xl font-bold leading-tight">
              {post.title}
            </CardTitle>
            <FavoriteButton post={post} />
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <div className="flex items-center ml-1">
              <span className="font-medium text-foreground">{authorName}</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
            <time
              dateTime={post.createdAt.toISOString()}
              className="text-muted-foreground"
            >
              {formatDate(post.createdAt)}
            </time>
            {post.isPrivate && (
              <>
                <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Private
                </Badge>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-4 rounded-lg mb-8 border-none bg-muted ">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Learning Outcomes
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            {post.learningOutcomes.map((outcome, index) => (
              <li key={index}>{outcome}</li>
            ))}
          </ul>
        </div>

        <div
          className="prose max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </CardContent>
    </Card>
  );
}

export default function PostPage(props: PostPageProps) {
  return (
    <Suspense fallback={<PostSkeleton />}>
      <PostContent params={props.params} />
    </Suspense>
  );
}
