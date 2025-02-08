import { Flame, Lightbulb, Sprout } from "lucide-react";

export const getDifficultyEmoji = (level: string | undefined) => {
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

export const formatDifficulty = (level: string | undefined) => {
  if (!level) return "Beginner";
  return level.charAt(0).toUpperCase() + level.slice(1);
};
