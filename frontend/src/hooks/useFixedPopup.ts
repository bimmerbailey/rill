import { useState, useEffect, useCallback, useRef } from "react";

interface PopupPos {
  top: number;
  left: number;
}

/**
 * Positions a popup with `position: fixed` anchored below a trigger element,
 * keeping it within the viewport horizontally.
 *
 * Usage:
 *   const { anchorRef, popupRef, pos, isOpen, open, close } = useFixedPopup<HTMLButtonElement>();
 *
 *   // On the trigger:
 *   <button ref={anchorRef} onClick={open} />
 *
 *   // On the popup:
 *   {isOpen && (
 *     <div ref={popupRef} style={{ position: "fixed", top: pos?.top, left: pos?.left, visibility: pos ? "visible" : "hidden" }}>
 *       ...
 *     </div>
 *   )}
 */
export function useFixedPopup<A extends HTMLElement = HTMLElement>(
  onClose?: () => void,
) {
  const anchorRef = useRef<A>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState<PopupPos | null>(null);

  const measure = useCallback(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const GAP = 6;
    const POPUP_WIDTH = 280;
    const left = Math.min(rect.left, window.innerWidth - POPUP_WIDTH - 8);
    setPos({ top: rect.bottom + GAP, left: Math.max(8, left) });
  }, []);

  const open = useCallback(() => {
    setPos(null); // hide until measured
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setPos(null);
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  // Measure position after the popup mounts
  useEffect(() => {
    if (isOpen) measure();
  }, [isOpen, measure]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        popupRef.current &&
        !popupRef.current.contains(target) &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, close]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  return { anchorRef, popupRef, pos, isOpen, open, close, toggle };
}
