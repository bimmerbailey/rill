import { useState, useRef, useEffect, useCallback } from "react";

interface CardComposerProps {
  /** Called with the new task name when the user confirms */
  onCreateCard: (name: string) => Promise<void>;
}

export function CardComposer({ onCreateCard }: CardComposerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cardName, setCardName] = useState("");
  const [saving, setSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);

  // Auto-focus textarea when opened
  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        composerRef.current &&
        !composerRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setCardName("");
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!cardName.trim() || saving) return;
    setSaving(true);
    try {
      await onCreateCard(cardName.trim());
      setCardName("");
      // keep composer open for rapid entry
      textareaRef.current?.focus();
    } finally {
      setSaving(false);
    }
  }, [cardName, onCreateCard, saving]);

  const surface2 = "var(--color-surface-2)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const borderStrong = "var(--color-border-strong)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const textTertiary = "var(--color-text-tertiary)";
  const terracotta = "var(--color-terracotta)";
  const fontBody = "var(--font-body)";

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
        style={{
          color: textTertiary,
          fontFamily: fontBody,
          border: `1px dashed ${border}`,
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = surface2;
          e.currentTarget.style.color = textSecondary;
          e.currentTarget.style.borderColor = borderStrong;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = textTertiary;
          e.currentTarget.style.borderColor = border;
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add a card
      </button>
    );
  }

  return (
    <div ref={composerRef} className="flex flex-col gap-2">
      {/* Card preview while typing */}
      <div
        style={{
          background: surface2,
          border: `1px solid ${borderStrong}`,
          borderRadius: "12px",
          padding: "10px 12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <textarea
          ref={textareaRef}
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
            if (e.key === "Escape") handleClose();
          }}
          placeholder="Enter a title for this card…"
          rows={2}
          className="w-full resize-none text-sm"
          style={{
            background: "transparent",
            border: "none",
            color: textPrimary,
            fontFamily: fontBody,
            fontWeight: 500,
            outline: "none",
            lineHeight: 1.5,
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSubmit}
          disabled={!cardName.trim() || saving}
          className="px-3 py-1.5 rounded-lg text-sm font-medium"
          style={{
            background: cardName.trim() ? terracotta : surface3,
            color: cardName.trim() ? "var(--color-surface-0)" : textTertiary,
            fontFamily: fontBody,
            cursor: cardName.trim() ? "pointer" : "default",
            transition: "background 0.15s",
          }}
        >
          {saving ? "Adding…" : "Add card"}
        </button>
        <button
          onClick={handleClose}
          className="p-1.5 rounded-lg"
          style={{
            color: textSecondary,
          }}
          title="Cancel"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <span
          style={{
            fontFamily: fontBody,
            fontSize: "0.7rem",
            color: textTertiary,
            marginLeft: "auto",
          }}
        >
          Enter to add · Shift+Enter for newline
        </span>
      </div>

      {/* Hint: keyboard shortcut hint only if name is non-empty */}
      {cardName.trim() && (
        <p
          style={{
            fontFamily: fontBody,
            fontSize: "0.7rem",
            color: textTertiary,
          }}
        >
          Press Enter to add · type another to add more
        </p>
      )}
    </div>
  );
}
