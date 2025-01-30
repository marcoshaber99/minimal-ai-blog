import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip: string;
  isActive?: boolean;
}

export function ToolbarButton({
  tooltip,
  isActive,
  className,
  children,
  ...props
}: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className={cn(
            "h-8 w-8",
            isActive && "bg-accent text-accent-foreground",
            className
          )}
          {...props}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
