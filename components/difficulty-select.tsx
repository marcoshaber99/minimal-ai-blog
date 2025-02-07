"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DifficultyLevel } from "@/lib/validations";

interface DifficultySelectProps {
  defaultValue?: DifficultyLevel | "all";
  name?: string;
  onChange?: (value: string) => void;
}

const ALL_LEVELS = "all" as const;

export function DifficultySelect({
  defaultValue,
  name,
  onChange,
}: DifficultySelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleDifficultyChange(value: string) {
    if (onChange) {
      onChange(value);
    } else if (value === ALL_LEVELS || !name) {
      // URL filtering mode
      const params = new URLSearchParams(searchParams);
      if (value === ALL_LEVELS) {
        params.delete("difficulty");
      } else {
        params.set("difficulty", value);
      }
      router.push(`?${params.toString()}`);
    }
  }

  return (
    <div className="space-y-2">
      <Select
        name={name}
        defaultValue={defaultValue}
        onValueChange={handleDifficultyChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select difficulty level" />
        </SelectTrigger>
        <SelectContent>
          {!name && <SelectItem value={ALL_LEVELS}>All levels</SelectItem>}
          <SelectItem value={DifficultyLevel.BEGINNER}>Beginner</SelectItem>
          <SelectItem value={DifficultyLevel.INTERMEDIATE}>
            Intermediate
          </SelectItem>
          <SelectItem value={DifficultyLevel.ADVANCED}>Advanced</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
