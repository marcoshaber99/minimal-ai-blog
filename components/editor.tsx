"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToolbarProvider } from "@/components/toolbars/toolbar-provider";
import { BoldToolbar } from "@/components/toolbars/bold";
import { ItalicToolbar } from "@/components/toolbars/italic";
import { StrikeThroughToolbar } from "@/components/toolbars/strikethrough";
import { BulletListToolbar } from "@/components/toolbars/bullet-list";
import { OrderedListToolbar } from "@/components/toolbars/ordered-list";
import { BlockquoteToolbar } from "@/components/toolbars/blockquote";
import { CodeBlockToolbar } from "@/components/toolbars/code-block";
import { HeadingToolbar } from "@/components/toolbars/heading";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

const lowlight = createLowlight(common);

interface EditorProps {
  content?: string;
  onChange?: (content: string) => void;
  className?: string;
  placeholder?: string;
}

export function Editor({
  content,
  onChange,
  className,
  placeholder = "Start writing...",
}: EditorProps) {
  const editor = useEditor(
    {
      immediatelyRender: false,
      editable: true,
      editorProps: {
        attributes: {
          class: cn(
            "prose prose-stone dark:prose-invert max-w-none min-h-[150px] p-4 focus:outline-none",
            className
          ),
        },
      },
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
            HTMLAttributes: {
              class: "font-bold",
              "data-level": (level: number) => level.toString(),
            },
          },
          paragraph: {
            HTMLAttributes: {
              class: "mb-4",
            },
          },
          bulletList: {
            HTMLAttributes: {
              class: "list-disc ml-4 mb-4",
            },
            keepMarks: true,
            keepAttributes: false,
          },
          orderedList: {
            HTMLAttributes: {
              class: "list-decimal ml-4 mb-4",
            },
            keepMarks: true,
            keepAttributes: false,
          },
          codeBlock: {
            HTMLAttributes: {
              class:
                "bg-muted text-muted-foreground p-2 rounded-md text-sm mb-4",
            },
          },
        }),
        Placeholder.configure({
          placeholder: placeholder,
        }),

        Typography,
        CodeBlockLowlight.configure({
          lowlight,
          HTMLAttributes: {
            class:
              "bg-muted text-muted-foreground p-4 rounded-lg font-mono text-sm my-4",
          },
        }),
        Color,
        TextStyle,
      ],
      content: content || "",
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
    },
    [content]
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="relative w-full border rounded-lg">
      <div onClick={(e) => e.preventDefault()}>
        <TooltipProvider>
          <div className="flex flex-wrap items-center p-2 gap-1 border-b bg-muted/50">
            <ToolbarProvider editor={editor}>
              <div className="flex items-center gap-1">
                <HeadingToolbar />
              </div>
              <Separator orientation="vertical" className="mx-1 h-6" />
              <div className="flex items-center gap-1">
                <BoldToolbar />
                <ItalicToolbar />
                <StrikeThroughToolbar />
              </div>
              <Separator orientation="vertical" className="mx-1 h-6" />
              <div className="flex items-center gap-1">
                <BulletListToolbar />
                <OrderedListToolbar />
              </div>
              <Separator orientation="vertical" className="mx-1 h-6" />
              <div className="flex items-center gap-1">
                <BlockquoteToolbar />
                <CodeBlockToolbar />
              </div>
            </ToolbarProvider>
          </div>
        </TooltipProvider>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
