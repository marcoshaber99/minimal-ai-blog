import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, User, Flame, Lightbulb, Sprout } from "lucide-react";
import { formatDate } from "@/lib/utils/date";
import { getAuthorDisplayName } from "@/lib/utils/user";
import type { Post } from "@/types";

const getDifficultyEmoji = (level: string | undefined) => {
  switch (level) {
    case "beginner":
      return <Sprout className="h-4 w-4 text-green-400 fill-green-400" />;
    case "intermediate":
      return <Lightbulb className="h-4 w-4 text-yellow-500 fill-yellow-500" />;
    case "advanced":
      return <Flame className="h-4 w-4 text-red-400 fill-red-400" />;
    default:
      return <Sprout className="h-4 w-4 text-green-400 fill-green-400" />;
  }
};

const formatDifficulty = (level: string | undefined) => {
  if (!level) return "Beginner";
  return level.charAt(0).toUpperCase() + level.slice(1);
};

interface PostCardProps {
  post: Post;
}

export function DiscoverPostCard({ post }: PostCardProps) {
  const difficulty = formatDifficulty(post.difficultyLevel);
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
            <Badge variant="outline" className="flex items-center gap-1.5">
              {getDifficultyEmoji(post.difficultyLevel)}
              {difficulty}
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
                  className="text-xs px-2 py-1"
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
