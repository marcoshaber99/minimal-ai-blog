import { getPostWithFavorites } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { getAuthorDisplayName } from "@/lib/utils/user";
import { formatDate } from "@/lib/utils/date";
import { ErrorMessage } from "@/components/error-message";
import { FavoriteButton } from "@/components/favorite-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap, Lock, Edit } from "lucide-react";
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
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <Link href="/discover">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Discover
            </Button>
          </Link>
          {isAuthor && (
            <Link href={`/edit/${post.id}`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          )}
        </div>
        <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
          <span>
            By{" "}
            <strong className="font-semibold text-foreground">
              {authorName}
            </strong>
          </span>
          <span>•</span>
          <time dateTime={post.createdAt.toISOString()}>
            {formatDate(post.createdAt)}
          </time>
          {post.isPrivate && (
            <>
              <span>•</span>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Private
              </Badge>
            </>
          )}
          <span className="ml-auto">
            <FavoriteButton post={post} />
          </span>
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
