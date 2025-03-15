# react-stylized-html-to-image

A React hook for converting HTML elements to stylized images with high-quality output.

## Installation

```bash
# npm
npm install html-to-image

# yarn
yarn add html-to-image

# pnpm
pnpm add html-to-image
```

## Usage

```tsx
import { useRef } from "react";
import { useHtmlToImage } from "./hooks/useHtmlToImage";

export const Example = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { downloadImage, copyImage } = useHtmlToImage({
    ref: elementRef,
  });

  return <div ref={elementRef}>// Your content here</div>;
};
```

## Hook Implementation

Add this hook to your project:

```tsx
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
```

## Features

- Convert any HTML element to a high-quality PNG image
- Download images directly to the user's device
- Copy images to clipboard
- Configurable scale factor for higher resolution output
- Success and error callbacks for handling operation results

## License

MIT
