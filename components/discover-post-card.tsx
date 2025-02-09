import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, User } from "lucide-react";
import { formatDate } from "@/lib/utils/date";
import { getAuthorDisplayName } from "@/lib/utils/user";
import { getDifficultyEmoji } from "@/lib/utils/difficulty";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

export function DiscoverPostCard({ post }: PostCardProps) {
  const outcomes = post.learningOutcomes || [];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden">
      <Link href={`/post/${post.id}`} className="block">
        <CardContent className="p-6 space-y-4">
          {/* Title & Difficulty */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors duration-300 line-clamp-2 max-w-[200px]">
              {post.title}
            </h2>
            <Badge
              variant="outline"
              className="flex items-center gap-1.5 border-none bg-transparent p-0"
            >
              {getDifficultyEmoji(post.difficultyLevel)}
            </Badge>
          </div>

          {/* Author & Date */}
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-2" />
            <span className="mr-4">
              {post.author
                ? getAuthorDisplayName(post.author)
                : "Unknown Author"}
            </span>
            <span>{formatDate(post.createdAt)}</span>
          </div>

          {/* Learning Outcomes & Favorites */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {outcomes.slice(0, 3).map((outcome, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs px-2 py-[3px] bg-green-100/30 dark:bg-green-400/20 text-green-600 dark:text-green-300 border border-green-400/80 dark:border-green-600"
                >
                  {outcome}
                </Badge>
              ))}
            </div>
            <div className="flex items-center text-sm">
              <StarIcon className="h-4 w-4 mr-1 text-orange-600 dark:text-yellow-500" />
              <span className="font-medium">{post.favoritesCount || 0}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
