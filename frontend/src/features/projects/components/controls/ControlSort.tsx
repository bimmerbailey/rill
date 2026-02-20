import { useState, useRef, useEffect } from "react";
import {
  type TaskSorting,
  TaskSortingType,
  TaskSortingDirection,
} from "@/features/projects/types";

interface ControlSortProps {
  sorting: TaskSorting;
  onChange: (sorting: TaskSorting) => void;
}

const SORT_OPTIONS: { type: TaskSortingType; label: string }[] = [
  { type: TaskSortingType.NONE, label: "None (default)" },
  { type: TaskSortingType.DUE_DATE, label: "Due date" },
  { type: TaskSortingType.NAME, label: "Task title" },
  { type: TaskSortingType.MEMBERS, label: "Members" },
  { type: TaskSortingType.LABELS, label: "Labels" },
  { type: TaskSortingType.COMPLETE, label: "Complete" },
];

export function ControlSort({ sorting, onChange }: ControlSortProps) {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const isActive = sorting.type !== TaskSortingType.NONE;
  const activeLabel = SORT_OPTIONS.find((o) => o.type === sorting.type)?.label;

  const surface1 = "var(--color-surface-1)";
  const surface2 = "var(--color-surface-2)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const borderStrong = "var(--color-border-strong)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const terracotta = "var(--color-terracotta)";
  const fontBody = "var(--font-body)";

  const select = (type: TaskSortingType) => {
    // Toggle direction if clicking the already-active sort
    if (sorting.type === type && type !== TaskSortingType.NONE) {
      onChange({
        type,
        direction:
          sorting.direction === TaskSortingDirection.ASC
            ? TaskSortingDirection.DESC
            : TaskSortingDirection.ASC,
      });
    } else {
      onChange({ type, direction: TaskSortingDirection.ASC });
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors"
        style={{
          background: open || isActive ? surface3 : surface2,
          border: `1px solid ${isActive ? terracotta : border}`,
          color: isActive ? terracotta : textSecondary,
          fontFamily: fontBody,
          cursor: "pointer",
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
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="15" y2="12" />
          <line x1="3" y1="18" x2="9" y2="18" />
        </svg>
        Sort
        {isActive && (
          <span
            style={{
              fontFamily: fontBody,
              fontSize: "0.75rem",
              color: terracotta,
              opacity: 0.8,
            }}
          >
            · {activeLabel}
            {sorting.direction === TaskSortingDirection.DESC ? " ↓" : " ↑"}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={popupRef}
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 50,
            minWidth: "200px",
            background: surface1,
            border: `1px solid ${borderStrong}`,
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.32)",
            overflow: "hidden",
          }}
        >
          <div
            className="px-3 py-2"
            style={{
              borderBottom: `1px solid ${border}`,
              fontFamily: fontBody,
              fontSize: "0.8rem",
              fontWeight: 600,
              color: textSecondary,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Sort by
          </div>
          <div className="p-2">
            {SORT_OPTIONS.map((opt) => {
              const active = sorting.type === opt.type;
              const showDir = active && opt.type !== TaskSortingType.NONE;
              return (
                <button
                  key={opt.type}
                  onClick={() => select(opt.type)}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-left"
                  style={{
                    fontFamily: fontBody,
                    color: active ? textPrimary : textSecondary,
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = surface3;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span className="flex-1">{opt.label}</span>
                  {showDir && (
                    <span style={{ color: terracotta, fontSize: "0.8rem" }}>
                      {sorting.direction === TaskSortingDirection.ASC
                        ? "↑ Asc"
                        : "↓ Desc"}
                    </span>
                  )}
                  {active && opt.type === TaskSortingType.NONE && (
                    <span style={{ color: terracotta, fontSize: "0.85rem" }}>
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div style={{ borderTop: `1px solid ${border}`, padding: "6px 8px" }}>
            <p
              style={{
                fontFamily: fontBody,
                fontSize: "0.7rem",
                color: textSecondary,
                opacity: 0.6,
              }}
            >
              Click active sort to toggle direction
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
