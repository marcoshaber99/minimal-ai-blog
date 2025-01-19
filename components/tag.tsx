import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TagProps {
  name: string;
  href?: string;
  active?: boolean;
  onRemove?: () => void;
}

export function Tag({ name, href, active = false, onRemove }: TagProps) {
  const variant = active ? "default" : "secondary";

  const TagContent = () => (
    <>
      {name}
      {onRemove && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onRemove();
          }}
          className="ml-1 hover:text-foreground/80"
          aria-label={`Remove tag ${name}`}
        >
          <X size={14} />
        </button>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} passHref>
        <Badge variant={variant} className="cursor-pointer">
          <TagContent />
        </Badge>
      </Link>
    );
  }

  return (
    <Badge variant={variant}>
      <TagContent />
    </Badge>
  );
}
