import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CopyIcon,
  Download04Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";

export const ExampleWrapper = ({
  handleCopyImage,
  handleDownloadImage,
  title,
  subtitle,
  content,
  sidebar,
}: {
  handleCopyImage: () => void;
  handleDownloadImage: () => void;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  sidebar: React.ReactNode;
}) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex gap-1">
          <Button onClick={handleCopyImage} variant="ghost">
            <HugeiconsIcon icon={CopyIcon} className="!w-3 !h-3" />
            Copy
          </Button>
          <Button onClick={handleDownloadImage} variant="ghost">
            <HugeiconsIcon icon={Download04Icon} className="!w-3 !h-3" />
            Download
          </Button>
          <Button
            onClick={() => setShowSidebar(!showSidebar)}
            variant="ghost"
            className={showSidebar ? "text-primary" : ""}
          >
            <HugeiconsIcon icon={Settings01Icon} className="!w-3 !h-3" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start">
        <div className="flex-grow rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden relative transition-all duration-300 ease-in-out">
          {content}
        </div>

        <div
          className={`
          transition-all duration-300 ease-in-out
          ${showSidebar ? "w-full md:w-[calc(250px+theme(spacing.4))]" : "w-0"}
        `}
        >
          <div
            className={`
              w-full md:w-[calc(250px+theme(spacing.4))] rounded-xl border border-neutral-200 dark:border-neutral-700 
              flex-shrink-0 p-4 bg-white dark:bg-neutral-800
              transition-opacity duration-300 ease-in-out ml-4
              ${showSidebar ? "opacity-100" : "opacity-0"}
            `}
          >
            {sidebar}
          </div>
        </div>
      </div>
    </div>
  );
};
