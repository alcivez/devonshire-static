"use client";

import { useState, useRef, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = "Start typing...", height = "400px" }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateFormatState();
  };

  const updateFormatState = () => {
    setIsBold(document.queryCommandState('bold'));
    setIsItalic(document.queryCommandState('italic'));
    setIsUnderline(document.queryCommandState('underline'));
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      updateFormatState();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if ((e.metaKey || e.ctrlKey) && !e.shiftKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
        case 'k':
          e.preventDefault();
          const url = prompt('Enter URL:');
          if (url) {
            execCommand('createLink', url);
          }
          break;
      }
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "4px", overflow: "hidden" }}>
      {/* Toolbar */}
      <div style={{
        backgroundColor: "#f9fafb",
        borderBottom: "1px solid #e5e7eb",
        padding: "8px 12px",
        display: "flex",
        gap: "4px",
        flexWrap: "wrap",
        alignItems: "center"
      }}>
        {/* Text Formatting */}
        <div style={{ display: "flex", gap: "2px", borderRight: "1px solid #e5e7eb", paddingRight: "8px" }}>
          <button
            type="button"
            onClick={() => execCommand('bold')}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: "6px 10px",
              backgroundColor: isBold ? "#e5e7eb" : "transparent",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Lato, sans-serif"
            }}
            title="Bold (Cmd+B)"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => execCommand('italic')}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: "6px 10px",
              backgroundColor: isItalic ? "#e5e7eb" : "transparent",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontStyle: "italic",
              fontFamily: "Lato, sans-serif"
            }}
            title="Italic (Cmd+I)"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => execCommand('underline')}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: "6px 10px",
              backgroundColor: isUnderline ? "#e5e7eb" : "transparent",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              textDecoration: "underline",
              fontFamily: "Lato, sans-serif"
            }}
            title="Underline (Cmd+U)"
          >
            U
          </button>
        </div>

        {/* Font Size */}
        <div style={{ display: "flex", gap: "2px", borderRight: "1px solid #e5e7eb", paddingRight: "8px" }}>
          <select
            onChange={(e) => execCommand('fontSize', e.target.value)}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: "6px 8px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "13px",
              fontFamily: "Lato, sans-serif",
              cursor: "pointer"
            }}
            title="Font Size"
          >
            <option value="1">Small</option>
            <option value="3" selected>Normal</option>
            <option value="5">Large</option>
            <option value="7">Huge</option>
          </select>
        </div>

        {/* Headings */}
        <div style={{ display: "flex", gap: "2px", borderRight: "1px solid #e5e7eb", paddingRight: "8px" }}>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h1')}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: "6px 10px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Lato, sans-serif"
            }}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h2')}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: "6px 10px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Lato, sans-serif"
            }}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', 'h3')}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: "6px 10px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Lato, sans-serif"
            }}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "2px", borderRight: "1px solid #e5e7eb", paddingRight: "8px" }}>
          <button
            type="button"
            onClick={insertLink}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: "6px 10px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "Lato, sans-serif"
            }}
            title="Insert Link (Cmd+K)"
          >
            🔗 Link
          </button>
          <button
            type="button"
            onClick={() => execCommand('unlink')}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: "6px 10px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "Lato, sans-serif"
            }}
            title="Remove Link"
          >
            🔗 Unlink
          </button>
        </div>

        {/* Lists */}
        <div style={{ display: "flex", gap: "2px", borderRight: "1px solid #e5e7eb", paddingRight: "8px" }}>
          <button
            type="button"
            onClick={() => execCommand('insertUnorderedList')}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: "6px 10px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontFamily: "Lato, sans-serif"
            }}
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => execCommand('insertOrderedList')}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: "6px 10px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontFamily: "Lato, sans-serif"
            }}
            title="Numbered List"
          >
            1. List
          </button>
        </div>

        {/* Alignment */}
        <div style={{ display: "flex", gap: "2px" }}>
          <button
            type="button"
            onClick={() => execCommand('justifyLeft')}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: "6px 10px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontFamily: "Lato, sans-serif"
            }}
            title="Align Left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => execCommand('justifyCenter')}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: "6px 10px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontFamily: "Lato, sans-serif"
            }}
            title="Align Center"
          >
            ↔
          </button>
          <button
            type="button"
            onClick={() => execCommand('justifyRight')}
            onMouseDown={(e) => e.preventDefault()}
            style={{
              padding: "6px 10px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontFamily: "Lato, sans-serif"
            }}
            title="Align Right"
          >
            →
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        style={{
          minHeight: height,
          padding: "16px",
          fontSize: "14px",
          lineHeight: "1.6",
          fontFamily: "Lato, sans-serif",
          outline: "none",
          overflow: "auto"
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />

      {/* Empty state placeholder */}
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}