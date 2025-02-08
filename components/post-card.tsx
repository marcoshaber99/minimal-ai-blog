import Link from "next/link";
import { Lock, StarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeletePostButton } from "@/components/delete-post-button";
import { formatDate } from "@/lib/utils/date";
import { getDifficultyEmoji, formatDifficulty } from "@/lib/utils/difficulty";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  showEditDelete?: boolean;
}

export function PostCard({ post, showEditDelete = false }: PostCardProps) {
  const difficulty = formatDifficulty(post.difficultyLevel);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden">
      <CardContent className="p-6 space-y-4">
        {/* Title & Difficulty */}
        <div className="flex items-center justify-between">
          <Link href={`/post/${post.id}`} className="block flex-1">
            <h2 className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors duration-300 line-clamp-2 pr-4">
              {post.title}
            </h2>
          </Link>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              variant="outline"
              className="flex items-center gap-1.5 border-none bg-transparent p-0"
            >
              {getDifficultyEmoji(post.difficultyLevel)}
              {difficulty}
            </Badge>
            {post.isPrivate && (
              <Lock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            )}
          </div>
        </div>

        {/* Content Preview */}
        <Link href={`/post/${post.id}`} className="block">
          <div
            className="text-sm text-muted-foreground line-clamp-2 hover:text-muted-foreground/80 transition-colors duration-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Link>

        {/* Date & Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <time dateTime={post.createdAt.toISOString()}>
              {formatDate(post.createdAt)}
            </time>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm">
              <StarIcon
                className={`h-4 w-4 mr-1 ${
                  post.isFavorited
                    ? "dark:fill-yellow-500 dark:text-yellow-500 fill-orange-600 text-orange-600"
                    : "text-muted-foreground"
                }`}
              />
              <span className="font-medium">{post.favoritesCount}</span>
            </div>
            {showEditDelete && (
              <div className="flex gap-2">
                <Link href={`/edit/${post.id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
                <DeletePostButton postId={post.id} postTitle={post.title} />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
