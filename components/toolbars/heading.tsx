"use client";

import { Heading1, Heading2, Heading3 } from "lucide-react";
import { useToolbar } from "./toolbar-provider";
import { ToolbarButton } from "./toolbar-button";

export function HeadingToolbar() {
  const { editor } = useToolbar();

  const toggleHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <>
      <ToolbarButton
        tooltip="Heading 1"
        isActive={editor.isActive("heading", { level: 1 })}
        onClick={() => toggleHeading(1)}
      >
        <Heading1 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        tooltip="Heading 2"
        isActive={editor.isActive("heading", { level: 2 })}
        onClick={() => toggleHeading(2)}
      >
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        tooltip="Heading 3"
        isActive={editor.isActive("heading", { level: 3 })}
        onClick={() => toggleHeading(3)}
      >
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>
    </>
  );
}
