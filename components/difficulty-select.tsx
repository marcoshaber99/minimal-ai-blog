"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DifficultyLevel } from "@/lib/validations";
import { Brain } from "lucide-react";

interface DifficultySelectProps {
  defaultValue?: DifficultyLevel;
  error?: string;
}

export function DifficultySelect({
  defaultValue,
  error,
}: DifficultySelectProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <Brain className="h-4 w-4" />
        Difficulty Level
      </Label>
      <Select
        name="difficultyLevel"
        defaultValue={defaultValue || DifficultyLevel.BEGINNER}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select difficulty level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={DifficultyLevel.BEGINNER}>Beginner</SelectItem>
          <SelectItem value={DifficultyLevel.INTERMEDIATE}>
            Intermediate
          </SelectItem>
          <SelectItem value={DifficultyLevel.ADVANCED}>Advanced</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
