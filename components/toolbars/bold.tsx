"use client";

import { Bold } from "lucide-react";
import { useToolbar } from "./toolbar-provider";
import { ToolbarButton } from "./toolbar-button";

export function BoldToolbar() {
  const { editor } = useToolbar();

  return (
    <ToolbarButton
      tooltip="Bold"
      isActive={editor.isActive("bold")}
      onClick={() => editor.chain().focus().toggleBold().run()}
    >
      <Bold className="h-4 w-4" />
    </ToolbarButton>
  );
}
