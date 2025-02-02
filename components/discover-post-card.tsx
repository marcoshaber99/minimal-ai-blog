import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, User } from "lucide-react";
import { formatDate } from "@/lib/utils/date";
import { getAuthorDisplayName } from "@/lib/utils/user";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

export function DiscoverPostCard({ post }: PostCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <Link href={`/post/${post.id}`}>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-primary hover:text-primary/80 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-2" />
            <span className="mr-4">
              {post.author
                ? getAuthorDisplayName(post.author)
                : "Unknown Author"}
            </span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {post.learningOutcomes.slice(0, 3).map((outcome, index) => (
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
              <StarIcon className="h-5 w-5 mr-1 text-orange-600 dark:text-yellow-500" />
              <span className="font-medium">{post.favoritesCount}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
