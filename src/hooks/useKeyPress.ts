import { useEffect, useCallback } from "react";

type KeyCombo = {
  key: string;
  metaKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
};

export const useKeyPress = (
  keyCombo: KeyCombo,
  callback: () => void,
  deps: React.DependencyList = []
) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = keyCombo;

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        (!keyCombo.metaKey || event.metaKey) &&
        (!keyCombo.ctrlKey || event.ctrlKey) &&
        (!keyCombo.altKey || event.altKey) &&
        (!keyCombo.shiftKey || event.shiftKey)
      ) {
        event.preventDefault();
        callback();
      }
    },
    [keyCombo, callback, ...deps]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};
