import { useState, useRef, useEffect } from "react";
import {
  type TaskStatusFilter,
  TaskStatus,
  TaskSince,
} from "@/features/projects/types";

interface ControlStatusProps {
  filter: TaskStatusFilter;
  onChange: (filter: TaskStatusFilter) => void;
}

const SINCE_OPTIONS: { value: TaskSince; label: string }[] = [
  { value: TaskSince.ALL, label: "All completed tasks" },
  { value: TaskSince.TODAY, label: "Today" },
  { value: TaskSince.YESTERDAY, label: "Yesterday" },
  { value: TaskSince.ONE_WEEK, label: "1 week" },
  { value: TaskSince.TWO_WEEKS, label: "2 weeks" },
  { value: TaskSince.THREE_WEEKS, label: "3 weeks" },
];

const STATUS_LABEL: Record<TaskStatus, string> = {
  [TaskStatus.ALL]: "All Tasks",
  [TaskStatus.INCOMPLETE]: "Incomplete",
  [TaskStatus.COMPLETE]: "Complete",
};

export function ControlStatus({ filter, onChange }: ControlStatusProps) {
  const [open, setOpen] = useState(false);
  const [showSince, setShowSince] = useState(false);
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
        setShowSince(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const isNonDefault = filter.status !== TaskStatus.ALL;

  const surface1 = "var(--color-surface-1)";
  const surface2 = "var(--color-surface-2)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const borderStrong = "var(--color-border-strong)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const terracotta = "var(--color-terracotta)";
  const fontBody = "var(--font-body)";

  const handleStatusClick = (status: TaskStatus) => {
    if (status === TaskStatus.COMPLETE) {
      // Toggle the since sub-menu
      if (filter.status === TaskStatus.COMPLETE) {
        setShowSince((s) => !s);
      } else {
        onChange({ status: TaskStatus.COMPLETE, since: TaskSince.ALL });
        setShowSince(true);
      }
    } else {
      onChange({ status, since: TaskSince.ALL });
      setShowSince(false);
    }
  };

  const handleSinceClick = (since: TaskSince) => {
    onChange({ status: TaskStatus.COMPLETE, since });
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        ref={buttonRef}
        onClick={() => {
          setOpen((o) => !o);
          setShowSince(false);
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors"
        style={{
          background: open || isNonDefault ? surface3 : surface2,
          border: `1px solid ${isNonDefault ? terracotta : border}`,
          color: isNonDefault ? terracotta : textSecondary,
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
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
        {STATUS_LABEL[filter.status]}
        {filter.status === TaskStatus.COMPLETE &&
          filter.since !== TaskSince.ALL && (
            <span
              style={{
                fontFamily: fontBody,
                fontSize: "0.75rem",
                opacity: 0.7,
              }}
            >
              · {SINCE_OPTIONS.find((s) => s.value === filter.since)?.label}
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
            minWidth: "220px",
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
            Task Status
          </div>
          <div className="p-2">
            {/* Incomplete */}
            <StatusRow
              label="Incomplete Tasks"
              active={filter.status === TaskStatus.INCOMPLETE}
              onClick={() => handleStatusClick(TaskStatus.INCOMPLETE)}
              surface3={surface3}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
              terracotta={terracotta}
              fontBody={fontBody}
            />

            {/* Complete */}
            <div>
              <StatusRow
                label="Complete Tasks"
                active={filter.status === TaskStatus.COMPLETE}
                onClick={() => handleStatusClick(TaskStatus.COMPLETE)}
                hasArrow
                surface3={surface3}
                textPrimary={textPrimary}
                textSecondary={textSecondary}
                terracotta={terracotta}
                fontBody={fontBody}
              />
              {/* Since sub-options */}
              {showSince && filter.status === TaskStatus.COMPLETE && (
                <div
                  style={{
                    marginLeft: "12px",
                    borderLeft: `2px solid ${border}`,
                    paddingLeft: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: fontBody,
                      fontSize: "0.7rem",
                      color: textSecondary,
                      padding: "2px 8px 4px",
                      opacity: 0.7,
                    }}
                  >
                    Marked complete since
                  </div>
                  {SINCE_OPTIONS.map((opt) => {
                    const active = filter.since === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSinceClick(opt.value)}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-left"
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
                        {active && (
                          <span
                            style={{ color: terracotta, fontSize: "0.85rem" }}
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* All */}
            <StatusRow
              label="All Tasks"
              active={filter.status === TaskStatus.ALL}
              onClick={() => handleStatusClick(TaskStatus.ALL)}
              surface3={surface3}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
              terracotta={terracotta}
              fontBody={fontBody}
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface StatusRowProps {
  label: string;
  active: boolean;
  onClick: () => void;
  hasArrow?: boolean;
  surface3: string;
  textPrimary: string;
  textSecondary: string;
  terracotta: string;
  fontBody: string;
}

function StatusRow({
  label,
  active,
  onClick,
  hasArrow,
  surface3,
  textPrimary,
  textSecondary,
  terracotta,
  fontBody,
}: StatusRowProps) {
  return (
    <button
      onClick={onClick}
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
      <span className="flex-1">{label}</span>
      {active && !hasArrow && (
        <span style={{ color: terracotta, fontSize: "0.85rem" }}>✓</span>
      )}
      {hasArrow && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: textSecondary, flexShrink: 0 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )}
    </button>
  );
}
