"use client";

import { useOptimistic, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toggleFavorite } from "@/app/actions/post";
import type { Post } from "@/types";

interface FavoriteButtonProps {
  post: Omit<Post, "author"> & { author?: Post["author"] };
}

export function FavoriteButton({ post }: FavoriteButtonProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [optimisticPost, addOptimistic] = useOptimistic(
    post,
    (
      state: FavoriteButtonProps["post"],
      newFavorited: boolean
    ): FavoriteButtonProps["post"] => ({
      ...state,
      isFavorited: newFavorited,
      favoritesCount: newFavorited
        ? state.favoritesCount + 1
        : state.favoritesCount - 1,
    })
  );

  async function handleClick() {
    const newFavorited = !optimisticPost.isFavorited;

    startTransition(async () => {
      addOptimistic(newFavorited);

      try {
        const result = await toggleFavorite(post.id);

        if (!result.success) {
          toast({
            title: "Error",
            description: result.message || "Something went wrong",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to update favorite status",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2"
      onClick={handleClick}
      disabled={isPending}
    >
      <Heart
        className={`h-4 w-4 ${
          optimisticPost.isFavorited
            ? "fill-red-500 text-red-500"
            : "text-gray-500"
        }`}
      />
      <span className="text-sm">{optimisticPost.favoritesCount}</span>
    </Button>
  );
}
