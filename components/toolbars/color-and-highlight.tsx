"use client";

import { Palette } from "lucide-react";
import { useToolbar } from "./toolbar-provider";
import { ToolbarButton } from "./toolbar-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const TEXT_COLORS = [
  { name: "Default", value: "var(--text-default)" },
  { name: "Gray", value: "var(--text-gray)" },
  { name: "Brown", value: "var(--text-brown)" },
  { name: "Orange", value: "var(--text-orange)" },
  { name: "Yellow", value: "var(--text-yellow)" },
  { name: "Green", value: "var(--text-green)" },
  { name: "Blue", value: "var(--text-blue)" },
  { name: "Purple", value: "var(--text-purple)" },
  { name: "Pink", value: "var(--text-pink)" },
  { name: "Red", value: "var(--text-red)" },
];

const HIGHLIGHT_COLORS = [
  {
    name: "Default",
    value: "var(--highlight-default)",
    text: "var(--text-default)",
  },
  { name: "Gray", value: "var(--highlight-gray)", text: "var(--text-default)" },
  { name: "Brown", value: "var(--highlight-brown)", text: "var(--text-brown)" },
  {
    name: "Orange",
    value: "var(--highlight-orange)",
    text: "var(--text-orange)",
  },
  {
    name: "Yellow",
    value: "var(--highlight-yellow)",
    text: "var(--text-yellow)",
  },
  { name: "Green", value: "var(--highlight-green)", text: "var(--text-green)" },
  { name: "Blue", value: "var(--highlight-blue)", text: "var(--text-blue)" },
  {
    name: "Purple",
    value: "var(--highlight-purple)",
    text: "var(--text-purple)",
  },
  { name: "Pink", value: "var(--highlight-pink)", text: "var(--text-pink)" },
  { name: "Red", value: "var(--highlight-red)", text: "var(--text-red)" },
];

export function ColorAndHighlightToolbar() {
  const { editor } = useToolbar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton tooltip="Text & Highlight Colors">
          <Palette className="h-4 w-4" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40 p-2">
        <div className="mb-2 text-xs font-medium text-muted-foreground">
          Text Color
        </div>
        <div className="grid grid-cols-5 gap-1 mb-2">
          {TEXT_COLORS.map((color) => (
            <button
              key={color.value}
              className="w-6 h-6 rounded-md border border-border/50"
              style={{ backgroundColor: color.value }}
              onClick={() => {
                if (color.name === "Default") {
                  editor.chain().focus().unsetColor().run();
                } else {
                  editor.chain().focus().setColor(color.value).run();
                }
              }}
              title={color.name}
            />
          ))}
        </div>

        <DropdownMenuSeparator />

        <div className="mb-2 text-xs font-medium text-muted-foreground">
          Highlight Color
        </div>
        <div className="grid grid-cols-5 gap-1">
          {HIGHLIGHT_COLORS.map((color) => (
            <button
              key={color.value}
              className="w-6 h-6 rounded-md border border-border/50 relative overflow-hidden"
              onClick={() => {
                if (color.name === "Default") {
                  editor.chain().focus().unsetHighlight().run();
                } else {
                  editor
                    .chain()
                    .focus()
                    .setHighlight({ color: color.value })
                    .run();
                }
              }}
              title={color.name}
            >
              <div
                className="absolute inset-0"
                style={{ backgroundColor: color.value }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center text-[8px] font-bold"
                style={{ color: color.text }}
              >
                Aa
              </div>
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
