"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { DifficultyLevel } from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Brain } from "lucide-react";
import { Card } from "@/components/ui/card";

const ALL_LEVELS = "all" as const;

export function DiscoverSidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleDifficultyChange(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value === ALL_LEVELS) {
      params.delete("difficulty");
    } else {
      params.set("difficulty", value);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-lg font-semibold">
          <Brain className="h-5 w-5" />
          Filters
        </Label>
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">
            Difficulty Level
          </Label>
          <Select
            value={searchParams.get("difficulty") || ALL_LEVELS}
            onValueChange={handleDifficultyChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_LEVELS}>All levels</SelectItem>
              <SelectItem value={DifficultyLevel.BEGINNER}>Beginner</SelectItem>
              <SelectItem value={DifficultyLevel.INTERMEDIATE}>
                Intermediate
              </SelectItem>
              <SelectItem value={DifficultyLevel.ADVANCED}>Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
