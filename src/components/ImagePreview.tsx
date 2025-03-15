import { ReactNode, useRef } from "react";
import { useCopyImage } from "../hooks/useCopyImage";
import { useDownloadImage } from "../hooks/useHtmlToImage";
import { useKeyPress } from "../hooks/useKeyPress";

interface ImagePreviewProps {
  children: ReactNode;
  title: string;
  filename?: string;
}

export const ImagePreview = ({
  children,
  title,
  filename,
}: ImagePreviewProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { copyImage } = useCopyImage(contentRef);
  const { downloadImage } = useDownloadImage(contentRef);

  // Set up Cmd+C shortcut for copying
  useKeyPress({ key: "c", metaKey: true }, () => {
    if (document.activeElement === document.body) {
      copyImage();
    }
  });

  return (
    <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => copyImage()}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Copy (⌘+C)
          </button>
          <button
            onClick={() => downloadImage(filename)}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
          >
            Download
          </button>
        </div>
      </div>
      <div className="p-6 bg-white" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};
