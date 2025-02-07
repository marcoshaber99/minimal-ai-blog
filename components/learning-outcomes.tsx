import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";

interface LearningOutcomesProps {
  outcomes: string[];
  setOutcomes: React.Dispatch<React.SetStateAction<string[]>>;
  error?: string;
}

export function LearningOutcomes({
  outcomes,
  setOutcomes,
  error,
}: LearningOutcomesProps) {
  const handleAddOutcome = () => {
    setOutcomes([...outcomes, ""]);
  };

  const handleRemoveOutcome = (index: number) => {
    setOutcomes(outcomes.filter((_, i) => i !== index));
  };

  const handleOutcomeChange = (index: number, value: string) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    setOutcomes(newOutcomes);
  };

  return (
    <div className="space-y-4">
      {outcomes.map((outcome, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            value={outcome}
            onChange={(e) => handleOutcomeChange(index, e.target.value)}
            placeholder={`Learning outcome ${index + 1}`}
            className="flex-grow"
          />
          {index > 0 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleRemoveOutcome(index)}
              className="flex-shrink-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
          )}
          {index === outcomes.length - 1 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleAddOutcome}
              className="flex-shrink-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
