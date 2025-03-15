import { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dracula,
  solarizedlight,
  nord,
  duotoneSea,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useHtmlToImage } from "../hooks/useHtmlToImage";
import { useSystemTheme } from "../hooks/useSystemTheme";
import { Button } from "@/components/ui/button";
import { ExampleWrapper } from "./ExampleWrapper";
import { toast } from "sonner";

const codeString = `
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;
`;

const themes = {
  dracula: {
    style: dracula,
    isDark: true,
    pattern: "bg-gradient-to-br from-[#44475A] to-[#282A36]",
    displayName: "Dracula",
    customStyle: {},
  },
  solarizedlight: {
    style: solarizedlight,
    isDark: false,
    pattern: "bg-gradient-to-br from-[#EEE8D5] to-[#FDF6E3]",
    displayName: "Solarized Light",
    customStyle: {
      borderRadius: "8px",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
  },
  nord: {
    style: nord,
    isDark: true,
    pattern: "bg-gradient-to-br from-[#3B4252] to-[#2E3440] ",
    displayName: "Nord",
    customStyle: {},
  },
  duotoneSea: {
    style: duotoneSea,
    isDark: true,
    pattern:
      "bg-[url('https://images.unsplash.com/photo-1738869786881-c13c7898bc49?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center",
    displayName: "Duotone Sea",
    customStyle: {},
  },
};

export const CodeSnippetExample = () => {
  const { theme: systemTheme } = useSystemTheme();
  const [selectedTheme, setSelectedTheme] =
    useState<keyof typeof themes>("dracula");
  const [padding, setPadding] = useState(32);
  const contentRef = useRef<HTMLDivElement>(null);
  const { copyImage, downloadImage } = useHtmlToImage({
    ref: contentRef,
    onSuccess: () => toast.success("Image copied to clipboard"),
    onError: () => toast.error("Failed to copy image"),
  });

  // Prefetch background image
  useEffect(() => {
    const img = new Image();
    img.src =
      "https://images.unsplash.com/photo-1738869786881-c13c7898bc49?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }, []);

  const currentTheme = themes[selectedTheme];
  const isDarkMode = systemTheme === "dark";

  const content = (
    <div
      ref={contentRef}
      className={`h-full ${currentTheme.pattern} ${isDarkMode ? "dark" : ""}`}
      style={{ padding: `${padding}px` }}
    >
      <div className="w-full rounded-md overflow-hidden">
        <SyntaxHighlighter
          language="jsx"
          style={currentTheme.style}
          showLineNumbers
          customStyle={{
            margin: 0,
            borderRadius: "0.375rem",
            fontSize: "14px",
            ...currentTheme.customStyle,
          }}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );

  const sidebar = (
    <>
      <div className="mb-6">
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
          Theme
        </p>
        <div className="flex flex-col gap-2">
          {Object.entries(themes).map(([key, theme]) => (
            <Button
              key={key}
              onClick={() => setSelectedTheme(key as keyof typeof themes)}
              variant={selectedTheme === key ? "default" : "outline"}
              size="sm"
            >
              {theme.displayName}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm block text-neutral-700 dark:text-neutral-300 mb-2">
          Padding
        </label>
        <div className="flex gap-2 flex-wrap">
          {[8, 16, 24, 32, 48].map((value) => (
            <Button
              key={value}
              onClick={() => setPadding(value)}
              variant={padding === value ? "default" : "outline"}
              size="sm"
            >
              {value}px
            </Button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <ExampleWrapper
      handleCopyImage={copyImage}
      handleDownloadImage={() => downloadImage("code-snippet.png")}
      title="Code snippets"
      subtitle="Share stylized code snippets"
      content={content}
      sidebar={sidebar}
    />
  );
};
