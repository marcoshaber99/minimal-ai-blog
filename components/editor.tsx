"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
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

interface EditorProps {
  content?: string;
  onChange?: (content: string) => void;
  className?: string;
}

export function Editor({ content, onChange, className }: EditorProps) {
  const editor = useEditor(
    {
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
          bulletList: {
            HTMLAttributes: {
              class: "list-disc ml-4",
            },
            keepMarks: true,
            keepAttributes: false,
          },
          orderedList: {
            HTMLAttributes: {
              class: "list-decimal ml-4",
            },
            keepMarks: true,
            keepAttributes: false,
          },
          codeBlock: {
            HTMLAttributes: {
              class:
                "bg-muted text-muted-foreground p-2 rounded-md font-mono text-sm",
            },
          },
        }),
        Placeholder.configure({
          placeholder: "Start writing your blog post...",
          emptyEditorClass:
            "before:content-[attr(data-placeholder)] before:text-muted-foreground before:float-left before:pointer-events-none",
        }),
      ],
      content: content || "",
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
      immediatelyRender: false,
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
          <div className="flex items-center p-2 gap-1 border-b bg-muted/50">
            <ToolbarProvider editor={editor}>
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
