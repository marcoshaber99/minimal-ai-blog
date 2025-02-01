import Link from "next/link";
import { Lock, StarIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeletePostButton } from "@/components/delete-post-button";
import { formatDate } from "@/lib/utils/date";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  showEditDelete?: boolean;
}

export function PostCard({ post, showEditDelete = false }: PostCardProps) {
  return (
    <Card
      key={post.id}
      className="hover:shadow-md transition-shadow duration-300"
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Link href={`/post/${post.id}`} className="hover:underline">
            <h3 className="text-lg font-semibold">{post.title}</h3>
          </Link>
          <div className="flex items-center gap-3">
            {post.isPrivate && (
              <Lock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            )}
            <div className="flex items-center gap-1">
              <StarIcon
                className={`h-4 w-4 ${
                  post.isFavorited
                    ? "fill-orange-500 text-orange-500"
                    : "text-muted-foreground"
                }`}
              />
              <span className="text-sm text-muted-foreground">
                {post.favoritesCount}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p
          className="text-sm text-muted-foreground line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <time dateTime={post.createdAt.toISOString()}>
            {formatDate(post.createdAt)}
          </time>
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
      </CardFooter>
    </Card>
  );
}
