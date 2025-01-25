import Image from "next/image";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  title?: string;
  message: string;
  className?: string;
}

export function ErrorMessage({
  title = "Access Denied",
  message,
  className,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-red-200/30 bg-red-50/50 p-8 dark:bg-red-950/10",
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative h-16 w-16 mb-4">
          <Image
            src="/assets/locked.svg"
            alt="Locked"
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
          {title}
        </h3>
        <p className="text-red-600/90 dark:text-red-300/90">{message}</p>
      </div>
    </div>
  );
}
