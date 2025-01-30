import Link from "next/link";
import { Lock, Heart } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
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
    <Card key={post.id}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            <Link href={`/post/${post.id}`} className="hover:underline">
              {post.title}
            </Link>
          </CardTitle>
          <div className="flex items-center gap-2">
            {post.isPrivate && (
              <Lock className="h-4 w-4 text-blue-600 dark:text-yellow-500" />
            )}
            <div className="flex items-center gap-1">
              <Heart
                className={`h-4 w-4 ${
                  post.isFavorited
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500"
                }`}
              />
              <span className="text-sm text-muted-foreground">
                {post.favoritesCount}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          <time dateTime={post.createdAt.toISOString()}>
            {formatDate(post.createdAt)}
          </time>
        </p>
        <p
          className="prose max-w-none dark:prose-invert mt-2 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </CardContent>
      {showEditDelete && (
        <CardFooter>
          <div className="flex gap-2">
            <Link href={`/edit/${post.id}`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <DeletePostButton postId={post.id} postTitle={post.title} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
