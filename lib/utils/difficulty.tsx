import { Flame, Lightbulb, Sprout } from "lucide-react";

export const getDifficultyEmoji = (level: string | undefined) => {
  switch (level) {
    case "beginner":
      return (
        <Sprout className="h-4 w-4 text-emerald-500 dark:text-emerald-400 fill-emerald-500 dark:fill-emerald-400" />
      );
    case "intermediate":
      return (
        <Lightbulb className="h-4 w-4 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
      );
    case "advanced":
      return (
        <Flame className="h-4 w-4 text-rose-500 dark:text-rose-400 fill-rose-500 dark:fill-rose-400" />
      );
    default:
      return (
        <Sprout className="h-4 w-4 text-emerald-500 dark:text-emerald-400 fill-emerald-500 dark:fill-emerald-400" />
      );
  }
};

export const formatDifficulty = (level: string | undefined) => {
  if (!level) return "Beginner";
  return level.charAt(0).toUpperCase() + level.slice(1);
};
