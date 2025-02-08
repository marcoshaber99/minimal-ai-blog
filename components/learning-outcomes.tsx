import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
      <div className="flex flex-wrap gap-3">
        <AnimatePresence>
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex-none"
            >
              <div className="group relative flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {index + 1}
                </span>
                <Input
                  value={outcome}
                  onChange={(e) => handleOutcomeChange(index, e.target.value)}
                  placeholder="Add outcome..."
                  className="h-6 w-[180px] border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
                />
                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveOutcome(index)}
                    className="h-5 w-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div whileHover={{ scale: 1.02 }} className="flex-none">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddOutcome}
            className="h-[38px] border-dashed"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </motion.div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-destructive"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
