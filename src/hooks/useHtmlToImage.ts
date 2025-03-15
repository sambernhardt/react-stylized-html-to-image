import { RefObject, useCallback } from "react";
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
};
