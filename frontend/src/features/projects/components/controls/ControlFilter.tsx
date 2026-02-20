import { useState, useRef, useEffect } from "react";
import {
  type TaskFilters,
  type MemberFilter,
  type LabelFilter,
  DueDateFilterType,
} from "@/features/projects/types";

type TaskMember = {
  id: string;
  fullName: string;
  username?: string | null;
  profileIcon?: { initials?: string | null; bgColor?: string | null } | null;
};

type TaskLabel = {
  id: string;
  name?: string | null;
  labelColor?: { colorHex: string } | null;
};

interface ControlFilterProps {
  filters: TaskFilters;
  currentUserId?: string;
  members: TaskMember[];
  labels: TaskLabel[];
  onChange: (filters: TaskFilters) => void;
}

type FilterTab = "main" | "labels" | "members" | "dueDate";

const DUE_DATE_OPTIONS: { type: DueDateFilterType; label: string }[] = [
  { type: DueDateFilterType.TODAY, label: "Today" },
  { type: DueDateFilterType.TOMORROW, label: "In the next day" },
  { type: DueDateFilterType.THIS_WEEK, label: "This week" },
  { type: DueDateFilterType.NEXT_WEEK, label: "Due next week" },
  { type: DueDateFilterType.ONE_WEEK, label: "In the next week" },
  { type: DueDateFilterType.TWO_WEEKS, label: "In the next two weeks" },
  { type: DueDateFilterType.THREE_WEEKS, label: "In the next three weeks" },
  { type: DueDateFilterType.OVERDUE, label: "Overdue" },
  { type: DueDateFilterType.NO_DUE_DATE, label: "Has no due date" },
];

export function ControlFilter({
  filters,
  currentUserId,
  members,
  labels,
  onChange,
}: ControlFilterProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<FilterTab>("main");
  const [nameInput, setNameInput] = useState(filters.taskName ?? "");
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
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
        setTab("main");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const activeCount =
    (filters.taskName ? 1 : 0) +
    filters.members.length +
    filters.labels.length +
    (filters.dueDate ? 1 : 0);

  const handleNameChange = (val: string) => {
    setNameInput(val);
    onChange({ ...filters, taskName: val || null });
  };

  const toggleMember = (member: TaskMember) => {
    const existing = filters.members.find((m) => m.id === member.id);
    if (existing) {
      onChange({
        ...filters,
        members: filters.members.filter((m) => m.id !== member.id),
      });
    } else {
      const newMember: MemberFilter = {
        id: member.id,
        username: member.username ?? member.fullName,
      };
      onChange({ ...filters, members: [...filters.members, newMember] });
    }
  };

  const toggleLabel = (label: TaskLabel) => {
    const existing = filters.labels.find((l) => l.id === label.id);
    if (existing) {
      onChange({
        ...filters,
        labels: filters.labels.filter((l) => l.id !== label.id),
      });
    } else {
      const newLabel: LabelFilter = {
        id: label.id,
        name: label.name ?? "",
        color: label.labelColor?.colorHex ?? "#888",
      };
      onChange({ ...filters, labels: [...filters.labels, newLabel] });
    }
  };

  const toggleDueDate = (type: DueDateFilterType, label: string) => {
    if (filters.dueDate?.type === type) {
      onChange({ ...filters, dueDate: null });
    } else {
      onChange({ ...filters, dueDate: { type, label } });
    }
  };

  const toggleJustMyTasks = () => {
    if (!currentUserId) return;
    const me = members.find((m) => m.id === currentUserId);
    const alreadyActive = filters.members.find((m) => m.id === currentUserId);
    if (alreadyActive) {
      onChange({
        ...filters,
        members: filters.members.filter((m) => m.id !== currentUserId),
      });
    } else if (me) {
      onChange({
        ...filters,
        members: [
          ...filters.members,
          { id: currentUserId, username: me.username ?? me.fullName },
        ],
      });
    }
  };

  const clearAll = () => {
    setNameInput("");
    onChange({ taskName: null, members: [], labels: [], dueDate: null });
  };

  const surface1 = "var(--color-surface-1)";
  const surface2 = "var(--color-surface-2)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const borderStrong = "var(--color-border-strong)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const textTertiary = "var(--color-text-tertiary)";
  const terracotta = "var(--color-terracotta)";
  const fontBody = "var(--font-body)";

  const isMyTasksActive =
    !!currentUserId && !!filters.members.find((m) => m.id === currentUserId);

  return (
    <div style={{ position: "relative" }}>
      <button
        ref={buttonRef}
        onClick={() => {
          setOpen((o) => !o);
          setTab("main");
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors"
        style={{
          background: open || activeCount > 0 ? surface3 : surface2,
          border: `1px solid ${activeCount > 0 ? terracotta : border}`,
          color: activeCount > 0 ? terracotta : textSecondary,
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
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filter
        {activeCount > 0 && (
          <span
            className="rounded-full px-1.5 py-0 text-xs"
            style={{
              background: terracotta,
              color: "var(--color-surface-0)",
              fontFamily: fontBody,
              minWidth: "18px",
              textAlign: "center",
            }}
          >
            {activeCount}
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
            minWidth: "240px",
            background: surface1,
            border: `1px solid ${borderStrong}`,
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.32)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-3 py-2"
            style={{ borderBottom: `1px solid ${border}` }}
          >
            {tab !== "main" ? (
              <button
                onClick={() => setTab("main")}
                className="flex items-center gap-1 text-sm"
                style={{ color: textSecondary, fontFamily: fontBody }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
              </button>
            ) : (
              <span
                style={{
                  fontFamily: fontBody,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: textSecondary,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Filter
              </span>
            )}
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                style={{
                  fontFamily: fontBody,
                  fontSize: "0.75rem",
                  color: terracotta,
                }}
              >
                Clear all
              </button>
            )}
          </div>

          {/* Main tab */}
          {tab === "main" && (
            <div className="p-2">
              <input
                autoFocus
                type="text"
                placeholder="Task name..."
                value={nameInput}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm mb-2"
                style={{
                  background: surface2,
                  border: `1px solid ${border}`,
                  color: textPrimary,
                  fontFamily: fontBody,
                  outline: "none",
                }}
              />

              <div
                style={{
                  fontFamily: fontBody,
                  fontSize: "0.7rem",
                  color: textTertiary,
                  padding: "4px 8px 2px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Quick Add
              </div>

              {currentUserId && (
                <FilterRow
                  label="Just my tasks"
                  active={isMyTasksActive}
                  onClick={toggleJustMyTasks}
                  icon={<UserIcon />}
                />
              )}
              <FilterRow
                label="Due this week"
                active={filters.dueDate?.type === DueDateFilterType.THIS_WEEK}
                onClick={() =>
                  toggleDueDate(DueDateFilterType.THIS_WEEK, "Due this week")
                }
                icon={<CalendarIcon />}
              />
              <FilterRow
                label="Due next week"
                active={filters.dueDate?.type === DueDateFilterType.NEXT_WEEK}
                onClick={() =>
                  toggleDueDate(DueDateFilterType.NEXT_WEEK, "Due next week")
                }
                icon={<CalendarIcon />}
              />

              <div
                style={{
                  height: "1px",
                  background: border,
                  margin: "4px 0",
                }}
              />

              <FilterRow
                label="By Label"
                active={filters.labels.length > 0}
                count={filters.labels.length}
                onClick={() => setTab("labels")}
                icon={<TagIcon />}
                hasArrow
              />
              <FilterRow
                label="By Member"
                active={filters.members.length > 0}
                count={filters.members.length}
                onClick={() => setTab("members")}
                icon={<UserIcon />}
                hasArrow
              />
              <FilterRow
                label="By Due Date"
                active={!!filters.dueDate}
                onClick={() => setTab("dueDate")}
                icon={<ClockIcon />}
                hasArrow
              />
            </div>
          )}

          {/* Labels tab */}
          {tab === "labels" && (
            <div
              className="p-2"
              style={{ maxHeight: "280px", overflowY: "auto" }}
            >
              {labels.length === 0 ? (
                <p
                  className="px-2 py-3 text-center text-sm"
                  style={{ color: textTertiary, fontFamily: fontBody }}
                >
                  No labels
                </p>
              ) : (
                labels.map((label) => {
                  const active = !!filters.labels.find(
                    (l) => l.id === label.id,
                  );
                  return (
                    <button
                      key={label.id}
                      onClick={() => toggleLabel(label)}
                      className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-left transition-colors"
                      style={{
                        fontFamily: fontBody,
                        color: textPrimary,
                        background: active ? surface2 : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!active)
                          e.currentTarget.style.background = surface2;
                      }}
                      onMouseLeave={(e) => {
                        if (!active)
                          e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "3px",
                          background: label.labelColor?.colorHex ?? terracotta,
                          flexShrink: 0,
                        }}
                      />
                      <span className="flex-1 truncate">
                        {label.name ?? "Unnamed"}
                      </span>
                      {active && (
                        <span
                          style={{ color: terracotta, fontSize: "0.85rem" }}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          )}

          {/* Members tab */}
          {tab === "members" && (
            <div
              className="p-2"
              style={{ maxHeight: "280px", overflowY: "auto" }}
            >
              {members.length === 0 ? (
                <p
                  className="px-2 py-3 text-center text-sm"
                  style={{ color: textTertiary, fontFamily: fontBody }}
                >
                  No members
                </p>
              ) : (
                members.map((member) => {
                  const active = !!filters.members.find(
                    (m) => m.id === member.id,
                  );
                  return (
                    <button
                      key={member.id}
                      onClick={() => toggleMember(member)}
                      className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-left transition-colors"
                      style={{
                        fontFamily: fontBody,
                        color: textPrimary,
                        background: active ? surface2 : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!active)
                          e.currentTarget.style.background = surface2;
                      }}
                      onMouseLeave={(e) => {
                        if (!active)
                          e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                        style={{
                          background:
                            member.profileIcon?.bgColor ?? "var(--color-slate)",
                          color: "#fff",
                        }}
                      >
                        {member.profileIcon?.initials ??
                          member.fullName.charAt(0)}
                      </div>
                      <span className="flex-1 truncate">{member.fullName}</span>
                      {active && (
                        <span
                          style={{ color: terracotta, fontSize: "0.85rem" }}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          )}

          {/* Due Date tab */}
          {tab === "dueDate" && (
            <div className="p-2">
              {DUE_DATE_OPTIONS.map((opt) => {
                const active = filters.dueDate?.type === opt.type;
                return (
                  <FilterRow
                    key={opt.type}
                    label={opt.label}
                    active={active}
                    onClick={() => toggleDueDate(opt.type, opt.label)}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface FilterRowProps {
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
  icon?: React.ReactNode;
  hasArrow?: boolean;
}

function FilterRow({
  label,
  active,
  count,
  onClick,
  icon,
  hasArrow,
}: FilterRowProps) {
  const surface2 = "var(--color-surface-2)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const terracotta = "var(--color-terracotta)";
  const fontBody = "var(--font-body)";

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-left transition-colors"
      style={{
        fontFamily: fontBody,
        color: active ? textPrimary : textSecondary,
        background: "transparent",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = surface2;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {icon && <span style={{ opacity: 0.6, flexShrink: 0 }}>{icon}</span>}
      <span className="flex-1">{label}</span>
      {count !== undefined && count > 0 && (
        <span
          className="rounded-full px-1.5 text-xs"
          style={{
            background: terracotta,
            color: "var(--color-surface-0)",
            fontFamily: fontBody,
            minWidth: "18px",
            textAlign: "center",
          }}
        >
          {count}
        </span>
      )}
      {active && !count && !hasArrow && (
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
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </button>
  );
}

function UserIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
