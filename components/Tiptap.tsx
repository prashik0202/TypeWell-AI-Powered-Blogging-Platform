"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Typography from "@tiptap/extension-typography";
import TextAlign from "@tiptap/extension-text-align";
import ToolBar from "./ToolBar";
import { useEffect } from "react";
import { Markdown } from "tiptap-markdown";

function Tiptap({
  content,
  onChange,
}: {
  content: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: content,
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[600px] border-input bg-background focus:ring-offset-2 disabled:cursor-not-allows disabled:opacity-50 p-2 whitespace-pre-wrap",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getText());
      console.log(editor.getText());
    },
  });

  // Update editor content when the `content` prop changes
  useEffect(() => {
    if (editor && content !== editor.getText()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default Tiptap;
