import { Toaster } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, SunIcon } from "@hugeicons/core-free-icons";
import { ChartExample } from "./examples/ChartExample";
import { CodeSnippetExample } from "./examples/CodeSnippetExample";
import { BlogPostExample } from "./examples/BlogPostExample";
import { useSystemTheme } from "./hooks/useSystemTheme";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CopyIcon,
  Tick02Icon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@hugeicons/core-free-icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const exampleUsage = `import { useRef } from "react";
import { useHtmlToImage } from "./hooks/useHtmlToImage";

export const Example = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { downloadImage, copyImage } = useHtmlToImage({
    ref: elementRef,
  });

  return (
    <div ref={elementRef}>
      // Your content here
    </div>
  );
};`;

const hookContents = `import { RefObject, useCallback } from "react";
import { toPng } from "html-to-image";

export const useHtmlToImage = <T extends HTMLElement>({
  ref,
  scale = 4,
  onSuccess,
  onError,
}: {
  ref: RefObject<T | null>;
  scale?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const downloadImage = useCallback(
    async (filename = "download.png") => {
      if (!ref.current) {
        onError?.(new Error("Element not found"));
        return;
      }

      try {
        const dataUrl = await toPng(ref.current, {
          quality: 1,
          pixelRatio: scale,
        });

        // Create a link element and trigger download
        const link = document.createElement("a");
        link.download = filename;
        link.href = dataUrl;
        link.click();

        onSuccess?.();
      } catch (error) {
        console.error("Error downloading image:", error);
        onError?.(error as Error);
      }
    },
    [ref, scale, onSuccess, onError]
  );

  const copyImage = useCallback(async () => {
    if (!ref.current) {
      onError?.(new Error("Element not found"));
      return;
    }

    try {
      const dataUrl = await toPng(ref.current, {
        quality: 1,
        pixelRatio: scale,
      });

      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Copy to clipboard using Clipboard API
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);

      onSuccess?.();
    } catch (error) {
      console.error("Error copying image:", error);
      onError?.(error as Error);
    }
  }, [ref, scale, onSuccess, onError]);

  return { downloadImage, copyImage };
};`;

const installationCommands: Record<string, string> = {
  npm: "npm install html-to-image",
  yarn: "yarn add html-to-image",
  pnpm: "pnpm add html-to-image",
};

const App = () => {
  const { theme, setTheme } = useSystemTheme();
  const [activeSection, setActiveSection] = useState("installation");
  const [packageManager, setPackageManager] = useState("npm");
  const [isInstallCopied, setIsInstallCopied] = useState(false);
  const [isHookCopied, setIsHookCopied] = useState(false);
  const [isExampleCopied, setIsExampleCopied] = useState(false);
  const installationCommand = installationCommands[packageManager];
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          // Add padding to scroll position
          const position = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: position, behavior: "smooth" });
        }
        setActiveSection(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [activeSection]);

  const handleCopy = (text: string, setCopied: (copied: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-200`}
    >
      <Toaster
        position="top-right"
        theme={theme === "dark" ? "dark" : "light"}
      />

      <div className="flex flex-col md:flex-row">
        <header className="md:w-[300px] md:sticky top-0 md:h-screen p-4 w-full md:p-[50px]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-base font-medium text-neutral-900 dark:text-white">
                react-html-to-image
              </h1>
              <Button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                variant="ghost"
              >
                <HugeiconsIcon
                  icon={theme === "light" ? SunIcon : Moon02Icon}
                />
              </Button>
            </div>

            <nav className="flex flex-col gap-1">
              {[
                { id: "installation", label: "Installation" },
                { id: "source-code", label: "Usage" },
                { id: "examples", label: "Gallery" },
              ].map(({ id, label }) => (
                <a key={id} href={`#${id}`} className="flex items-center">
                  <div
                    className={`w-0.5 h-6 flex-shrink-0 rounded-sm mr-[1px] ${
                      activeSection === id
                        ? "bg-neutral-900 dark:bg-white"
                        : "bg-transparent"
                    }`}
                  />
                  <span
                    className={`px-2 py-1 w-full text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-sm ${
                      activeSection === id
                        ? "text-neutral-900 dark:text-white font-medium"
                        : "text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {label}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 p-4 max-w-[1000px] mx-auto py-8 md:py-[50px] flex flex-col gap-6 md:gap-10">
          {/* Add anchor points 100px above each section */}
          <div
            id="installation"
            style={{ position: "relative", top: "-20px" }}
          />
          <section>
            <h2 className="text-2xl font-medium text-neutral-900 dark:text-white mb-6">
              Installation
            </h2>
            <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <div className="bg-neutral-100 dark:bg-neutral-800 p-3 flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    className={`text-sm text-neutral-500 ${
                      packageManager === "npm"
                        ? "text-neutral-700 dark:text-neutral-200"
                        : ""
                    }`}
                    onClick={() => setPackageManager("npm")}
                  >
                    npm
                  </button>
                  <button
                    className={`text-sm text-neutral-500 ${
                      packageManager === "yarn"
                        ? "text-neutral-700 dark:text-neutral-200"
                        : ""
                    }`}
                    onClick={() => setPackageManager("yarn")}
                  >
                    yarn
                  </button>
                  <button
                    className={`text-sm text-neutral-500 ${
                      packageManager === "pnpm"
                        ? "text-neutral-700 dark:text-neutral-200"
                        : ""
                    }`}
                    onClick={() => setPackageManager("pnpm")}
                  >
                    pnpm
                  </button>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() =>
                          handleCopy(installationCommand, setIsInstallCopied)
                        }
                        variant="ghost"
                        className="h-4 w-4 p-0"
                      >
                        <HugeiconsIcon
                          icon={isInstallCopied ? Tick02Icon : CopyIcon}
                          className="h-4 w-4"
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <SyntaxHighlighter
                language="bash"
                style={theme === "dark" ? materialDark : materialLight}
                customStyle={{
                  margin: 0,
                  fontSize: "12px",
                }}
              >
                {installationCommand}
              </SyntaxHighlighter>
            </div>
            <br />
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                To use this hook in your project, copy the following code to
                your codebase:
              </p>
              <div
                className={`rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden relative ${
                  !isExpanded ? "max-h-[300px]" : ""
                }`}
              >
                <div className="bg-neutral-100 dark:bg-neutral-800 p-3 flex justify-between items-center">
                  <span className="text-sm text-neutral-500">
                    useHtmlToImage.ts
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() =>
                            handleCopy(hookContents, setIsHookCopied)
                          }
                          variant="ghost"
                          className="h-4 w-4 p-0"
                        >
                          <HugeiconsIcon
                            icon={isHookCopied ? Tick02Icon : CopyIcon}
                            className="h-4 w-4"
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy to clipboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <SyntaxHighlighter
                  language="typescript"
                  style={theme === "dark" ? materialDark : materialLight}
                  customStyle={{
                    margin: 0,
                    fontSize: "12px",
                  }}
                >
                  {hookContents}
                </SyntaxHighlighter>
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-neutral-900 to-transparent flex items-end justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(true)}
                      className="mb-2 text-neutral-600 dark:text-neutral-400"
                    >
                      <HugeiconsIcon
                        icon={ArrowDownIcon}
                        className="mr-2 h-4 w-4"
                      />
                      Show more
                    </Button>
                  </div>
                )}
                {isExpanded && (
                  <div className="flex justify-center p-2 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(false)}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      <HugeiconsIcon
                        icon={ArrowUpIcon}
                        className="mr-2 h-4 w-4"
                      />
                      Show less
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>

          <div
            id="source-code"
            style={{ position: "relative", top: "-20px" }}
          />
          <section>
            <h2 className="text-2xl font-medium text-neutral-900 dark:text-white mb-6">
              Usage
            </h2>
            <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <div className="bg-neutral-100 dark:bg-neutral-800 p-3 flex justify-between items-center">
                <span className="text-sm text-neutral-500">Example.tsx</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() =>
                          handleCopy(exampleUsage, setIsExampleCopied)
                        }
                        variant="ghost"
                        className="h-4 w-4 p-0"
                      >
                        <HugeiconsIcon
                          icon={isExampleCopied ? Tick02Icon : CopyIcon}
                          className="h-4 w-4"
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <SyntaxHighlighter
                language="typescript"
                style={theme === "dark" ? materialDark : materialLight}
                customStyle={{
                  margin: 0,
                  fontSize: "12px",
                }}
              >
                {exampleUsage}
              </SyntaxHighlighter>
            </div>
          </section>

          <div id="examples" style={{ position: "relative", top: "-20px" }} />
          <section>
            <h2 className="text-2xl font-medium text-neutral-900 dark:text-white mb-6">
              Gallery
            </h2>
            <div className="flex flex-col gap-10">
              <ChartExample />
              <CodeSnippetExample />
              <BlogPostExample />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
