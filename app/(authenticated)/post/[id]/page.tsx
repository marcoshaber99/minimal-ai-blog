import { getPostWithFavorites } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { getAuthorDisplayName } from "@/lib/utils/user";
import { formatDate } from "@/lib/utils/date";
import { getDifficultyEmoji, formatDifficulty } from "@/lib/utils/difficulty";
import { ErrorMessage } from "@/components/error-message";
import { FavoriteButton } from "@/components/favorite-button";

import { GraduationCapIcon, Lock } from "lucide-react";
import { Suspense } from "react";
import { PostSkeleton } from "@/components/skeleton-loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
    <Card className="bg-inherit border-none">
      <CardHeader className="space-y-8">
        {/* Title and Metadata Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold leading-tight h-[72px]">
                {post.title}
              </CardTitle>
              <div className="flex items-center gap-3">
                {/* Author and Date */}
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={
                        post.author?.imageUrl ? post.author.imageUrl : undefined
                      }
                      alt={authorName || "Anonymous"}
                    />
                    <AvatarFallback className="text-xs font-medium bg-muted">
                      {authorName?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{authorName}</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                <time
                  dateTime={post.createdAt.toISOString()}
                  className="text-muted-foreground"
                >
                  {formatDate(post.createdAt)}
                </time>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="h-[72px] flex items-start">
                <FavoriteButton post={post} />
              </div>
              <div className="flex items-center gap-3">
                {post.isPrivate && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Lock className="h-3 w-3" />
                    Private
                  </Badge>
                )}
                <Badge variant="outline" className="flex items-center gap-1.5">
                  {getDifficultyEmoji(post.difficultyLevel)}
                  {formatDifficulty(post.difficultyLevel)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Post Status and Learning Outcomes */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <GraduationCapIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div className="flex flex-wrap gap-1.5">
                {post.learningOutcomes.map((outcome, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs px-2 py-[3px] bg-green-100/30 dark:bg-green-400/20 text-green-600 dark:text-green-300 border border-green-400/80 dark:border-green-600"
                  >
                    {outcome}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-5">
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
