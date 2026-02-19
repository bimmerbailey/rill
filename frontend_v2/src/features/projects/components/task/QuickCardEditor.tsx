import { useState, useRef, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { DueDateManager } from "./DueDateManager";

interface TaskLabel {
  id: string;
  projectLabel?: {
    id?: string;
    name?: string | null;
    labelColor?: { colorHex: string } | null;
  } | null;
}

interface TaskAssigned {
  id: string;
  fullName: string;
  profileIcon?: { initials?: string | null; bgColor?: string | null } | null;
}

interface ProjectLabel {
  id: string;
  name?: string | null;
  labelColor?: { colorHex: string } | null;
}

interface ProjectMember {
  id: string;
  fullName: string;
  profileIcon?: { initials?: string | null; bgColor?: string | null } | null;
}

interface QuickCardTask {
  id: string;
  name: string;
  complete: boolean;
  dueDate?: { at?: string | null } | null;
  hasTime: boolean;
  labels?: readonly (TaskLabel | null)[] | null;
  assigned?: readonly (TaskAssigned | null)[] | null;
}

interface QuickCardEditorProps {
  task: QuickCardTask;
  targetRect: DOMRect;
  projectLabels: ProjectLabel[];
  projectMembers: ProjectMember[];
  onClose: () => void;
  onSaveName: (taskId: string, name: string) => Promise<void>;
  onToggleComplete: (taskId: string, complete: boolean) => Promise<void>;
  onToggleLabel: (taskId: string, projectLabelId: string) => Promise<void>;
  onAssign: (taskId: string, userId: string) => Promise<void>;
  onUnassign: (taskId: string, userId: string) => Promise<void>;
  onUpdateDueDate: (
    taskId: string,
    dueDate: string | null,
    hasTime: boolean,
  ) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
  onOpenModal: (taskShortId: string) => void;
  taskShortId: string;
}

type EditorPanel = "main" | "labels" | "members";

export function QuickCardEditor({
  task,
  targetRect,
  projectLabels,
  projectMembers,
  onClose,
  onSaveName,
  onToggleComplete,
  onToggleLabel,
  onAssign,
  onUnassign,
  onUpdateDueDate,
  onDelete,
  onOpenModal,
  taskShortId,
}: QuickCardEditorProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardName, setCardName] = useState(task.name);
  const [panel, setPanel] = useState<EditorPanel>("main");
  const [saving, setSaving] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const dueDateBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSaveName = useCallback(async () => {
    if (cardName.trim() === task.name || !cardName.trim()) return;
    setSaving(true);
    try {
      await onSaveName(task.id, cardName.trim());
    } finally {
      setSaving(false);
    }
  }, [cardName, task.id, task.name, onSaveName]);

  // ── Layout maths ─────────────────────────────────────────────────────────
  const CARD_WIDTH = Math.max(targetRect.width, 280);
  const SIDEBAR_WIDTH = 168;
  const GAP = 10;
  const cardTop = targetRect.top;
  const cardLeft = targetRect.left;

  const sidebarFitsRight =
    cardLeft + CARD_WIDTH + GAP + SIDEBAR_WIDTH <= window.innerWidth - 8;
  const sidebarLeft = sidebarFitsRight
    ? cardLeft + CARD_WIDTH + GAP
    : cardLeft - SIDEBAR_WIDTH - GAP;

  // ── Design tokens ─────────────────────────────────────────────────────────
  const surface0 = "var(--color-surface-0)";
  const surface1 = "var(--color-surface-1)";
  const surface2 = "var(--color-surface-2)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const borderStrong = "var(--color-border-strong)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const textTertiary = "var(--color-text-tertiary)";
  const terracotta = "var(--color-terracotta)";
  const danger = "var(--color-danger, #e57373)";
  const sage = "var(--color-sage)";
  const fontBody = "var(--font-body)";

  const isLabelActive = (labelId: string) =>
    task.labels?.some(
      (l) => l && (l.projectLabel?.id === labelId || l.id === labelId),
    ) ?? false;

  const isMemberAssigned = (memberId: string) =>
    task.assigned?.some((a) => a && a.id === memberId) ?? false;

  const isOverdue =
    task.dueDate?.at &&
    new Date(task.dueDate.at) < new Date() &&
    !task.complete;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(1px)",
        }}
      />

      {/* ── Card editor ─────────────────────────────────────────────────── */}
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: cardTop,
          left: cardLeft,
          width: CARD_WIDTH,
          zIndex: 101,
          background: surface2,
          border: `1px solid ${borderStrong}`,
          borderRadius: "14px",
          boxShadow:
            "0 0 0 1px rgba(255,235,210,0.04), 0 16px 48px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
      >
        {/* Name + complete toggle */}
        <div
          className="flex items-start gap-3 p-3 pb-2"
          style={{ borderBottom: `1px solid ${border}` }}
        >
          <button
            onClick={() => onToggleComplete(task.id, !task.complete)}
            title={task.complete ? "Mark incomplete" : "Mark complete"}
            style={{
              marginTop: "3px",
              width: "18px",
              height: "18px",
              flexShrink: 0,
              borderRadius: "50%",
              border: `2px solid ${task.complete ? sage : terracotta}`,
              background: task.complete ? sage : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.15s, border-color 0.15s",
            }}
          >
            {task.complete && (
              <svg
                width="9"
                height="9"
                viewBox="0 0 10 8"
                fill="none"
                stroke={surface0}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="1 4 4 7 9 1" />
              </svg>
            )}
          </button>
          <textarea
            autoFocus
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            onBlur={handleSaveName}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSaveName();
              }
              if (e.key === "Escape") onClose();
            }}
            rows={2}
            className="flex-1 resize-none"
            style={{
              background: "transparent",
              border: "none",
              color: textPrimary,
              fontFamily: fontBody,
              fontSize: "0.9rem",
              fontWeight: 500,
              lineHeight: 1.45,
              outline: "none",
              textDecoration: task.complete ? "line-through" : "none",
              opacity: task.complete ? 0.6 : 1,
            }}
          />
        </div>

        {/* Metadata badges */}
        {(task.dueDate?.at ||
          (task.labels && task.labels.length > 0) ||
          (task.assigned && task.assigned.length > 0)) && (
          <div
            className="flex flex-wrap items-center gap-2 px-3 py-2"
            style={{ borderBottom: `1px solid ${border}` }}
          >
            {task.dueDate?.at && (
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                style={{
                  background: isOverdue ? `${terracotta}22` : `${surface3}`,
                  color: isOverdue ? terracotta : textTertiary,
                  border: `1px solid ${isOverdue ? `${terracotta}44` : border}`,
                  fontFamily: fontBody,
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {dayjs(task.dueDate.at).format(
                  task.hasTime ? "MMM D, h:mm A" : "MMM D",
                )}
              </span>
            )}
            {task.labels && task.labels.length > 0 && (
              <div className="flex gap-1">
                {task.labels.map(
                  (l) =>
                    l && (
                      <span
                        key={l.id}
                        title={l.projectLabel?.name ?? ""}
                        style={{
                          display: "inline-block",
                          width: "28px",
                          height: "8px",
                          borderRadius: "4px",
                          background:
                            l.projectLabel?.labelColor?.colorHex ?? terracotta,
                          opacity: 0.85,
                        }}
                      />
                    ),
                )}
              </div>
            )}
            {task.assigned && task.assigned.length > 0 && (
              <div className="flex -space-x-1">
                {task.assigned.map(
                  (u) =>
                    u && (
                      <div
                        key={u.id}
                        title={u.fullName}
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                        style={{
                          background:
                            u.profileIcon?.bgColor ?? "var(--color-slate)",
                          color: "#fff",
                          border: `1.5px solid ${surface2}`,
                          fontSize: "0.6rem",
                          fontWeight: 600,
                        }}
                      >
                        {u.profileIcon?.initials ?? u.fullName.charAt(0)}
                      </div>
                    ),
                )}
              </div>
            )}
          </div>
        )}

        {/* Action row */}
        <div className="flex gap-2 p-3">
          <button
            onClick={() => {
              handleSaveName();
              onClose();
            }}
            disabled={saving}
            className="flex-1 py-1.5 rounded-lg text-sm font-semibold"
            style={{
              background: terracotta,
              color: "#fff",
              fontFamily: fontBody,
              letterSpacing: "0.01em",
              opacity: saving ? 0.7 : 1,
              transition: "opacity 0.15s",
            }}
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            onClick={() => {
              onOpenModal(taskShortId);
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg text-sm"
            style={{
              background: surface3,
              color: textSecondary,
              fontFamily: fontBody,
              border: `1px solid ${borderStrong}`,
            }}
          >
            Open
          </button>
        </div>
      </div>

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: cardTop,
          left: sidebarLeft,
          width: SIDEBAR_WIDTH,
          zIndex: 101,
          background: surface1,
          border: `1px solid ${borderStrong}`,
          borderRadius: "14px",
          boxShadow:
            "0 0 0 1px rgba(255,235,210,0.04), 0 16px 48px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
      >
        {panel === "main" && (
          <>
            {/* Header label */}
            <div
              className="px-3 pt-2.5 pb-1.5"
              style={{
                fontFamily: fontBody,
                fontSize: "0.65rem",
                fontWeight: 700,
                color: textTertiary,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Card actions
            </div>

            {/* Primary actions */}
            <div className="px-2 pb-1">
              <ActionBtn
                onClick={() => onToggleComplete(task.id, !task.complete)}
                surface2={surface2}
                textPrimary={textPrimary}
                fontBody={fontBody}
                icon={task.complete ? <UndoIcon /> : <CheckIcon color={sage} />}
              >
                {task.complete ? "Mark Incomplete" : "Mark Complete"}
              </ActionBtn>
              <ActionBtn
                onClick={() => setPanel("labels")}
                surface2={surface2}
                textPrimary={textPrimary}
                fontBody={fontBody}
                icon={<TagIcon />}
                hasArrow
              >
                Labels
              </ActionBtn>
              <ActionBtn
                onClick={() => setPanel("members")}
                surface2={surface2}
                textPrimary={textPrimary}
                fontBody={fontBody}
                icon={<MemberIcon />}
                hasArrow
              >
                Members
              </ActionBtn>
              <button
                ref={dueDateBtnRef}
                onClick={() => setShowDueDatePicker((v) => !v)}
                className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-left"
                style={{
                  color: showDueDatePicker ? terracotta : textPrimary,
                  fontFamily: fontBody,
                  background: showDueDatePicker
                    ? `${terracotta}18`
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!showDueDatePicker)
                    e.currentTarget.style.background = surface2;
                }}
                onMouseLeave={(e) => {
                  if (!showDueDatePicker)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ opacity: 0.55 }}>
                  <CalendarIcon />
                </span>
                <span className="flex-1">Due Date</span>
                {task.dueDate?.at && (
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: isOverdue ? terracotta : textTertiary,
                    }}
                  >
                    {dayjs(task.dueDate.at).format("MMM D")}
                  </span>
                )}
              </button>
            </div>

            {/* Divider */}
            <div
              style={{ height: "1px", background: border, margin: "4px 8px" }}
            />

            {/* Danger zone */}
            <div className="px-2 pb-2">
              <button
                onClick={async () => {
                  await onDelete(task.id);
                  onClose();
                }}
                className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-left"
                style={{
                  color: danger,
                  fontFamily: fontBody,
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${danger}18`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ opacity: 0.7 }}>
                  <TrashIcon />
                </span>
                Delete
              </button>
            </div>
          </>
        )}

        {/* ── Labels panel ──────────────────────────────────────────────── */}
        {panel === "labels" && (
          <>
            <PanelHeader
              title="Labels"
              onBack={() => setPanel("main")}
              textTertiary={textTertiary}
              fontBody={fontBody}
              border={border}
            />
            <div
              style={{ maxHeight: "240px", overflowY: "auto" }}
              className="px-2 pb-2"
            >
              {projectLabels.length === 0 ? (
                <p
                  className="py-3 text-center text-xs"
                  style={{ color: textTertiary, fontFamily: fontBody }}
                >
                  No labels on this project
                </p>
              ) : (
                projectLabels.map((label) => {
                  const active = isLabelActive(label.id);
                  return (
                    <button
                      key={label.id}
                      onClick={() => onToggleLabel(task.id, label.id)}
                      className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-left"
                      style={{
                        fontFamily: fontBody,
                        background: active ? `${surface3}` : "transparent",
                        color: textPrimary,
                        border: active
                          ? `1px solid ${borderStrong}`
                          : "1px solid transparent",
                        marginBottom: "2px",
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
                          width: "28px",
                          height: "10px",
                          borderRadius: "4px",
                          background: label.labelColor?.colorHex ?? terracotta,
                          flexShrink: 0,
                          opacity: 0.9,
                        }}
                      />
                      <span
                        className="flex-1 truncate"
                        style={{ fontSize: "0.82rem" }}
                      >
                        {label.name ?? "Unnamed"}
                      </span>
                      {active && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={terracotta}
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* ── Members panel ─────────────────────────────────────────────── */}
        {panel === "members" && (
          <>
            <PanelHeader
              title="Members"
              onBack={() => setPanel("main")}
              textTertiary={textTertiary}
              fontBody={fontBody}
              border={border}
            />
            <div
              style={{ maxHeight: "240px", overflowY: "auto" }}
              className="px-2 pb-2"
            >
              {projectMembers.length === 0 ? (
                <p
                  className="py-3 text-center text-xs"
                  style={{ color: textTertiary, fontFamily: fontBody }}
                >
                  No members on this project
                </p>
              ) : (
                projectMembers.map((member) => {
                  const assigned = isMemberAssigned(member.id);
                  return (
                    <button
                      key={member.id}
                      onClick={() =>
                        assigned
                          ? onUnassign(task.id, member.id)
                          : onAssign(task.id, member.id)
                      }
                      className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-left"
                      style={{
                        fontFamily: fontBody,
                        background: assigned ? surface3 : "transparent",
                        color: textPrimary,
                        border: assigned
                          ? `1px solid ${borderStrong}`
                          : "1px solid transparent",
                        marginBottom: "2px",
                      }}
                      onMouseEnter={(e) => {
                        if (!assigned)
                          e.currentTarget.style.background = surface2;
                      }}
                      onMouseLeave={(e) => {
                        if (!assigned)
                          e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div
                        className="flex-shrink-0 rounded-full flex items-center justify-center"
                        style={{
                          width: "22px",
                          height: "22px",
                          background:
                            member.profileIcon?.bgColor ?? "var(--color-slate)",
                          color: "#fff",
                          fontSize: "0.6rem",
                          fontWeight: 700,
                        }}
                      >
                        {member.profileIcon?.initials ??
                          member.fullName.charAt(0)}
                      </div>
                      <span
                        className="flex-1 truncate"
                        style={{ fontSize: "0.82rem" }}
                      >
                        {member.fullName}
                      </span>
                      {assigned && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={terracotta}
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>

      {/* Due date picker */}
      {showDueDatePicker && (
        <DueDateManager
          currentDueDate={task.dueDate?.at}
          hasTime={task.hasTime}
          anchorRef={dueDateBtnRef}
          onSave={async (date, hasTime) => {
            await onUpdateDueDate(task.id, date, hasTime);
            setShowDueDatePicker(false);
          }}
          onClose={() => setShowDueDatePicker(false)}
        />
      )}
    </>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

interface PanelHeaderProps {
  title: string;
  onBack: () => void;
  textTertiary: string;
  fontBody: string;
  border: string;
}

function PanelHeader({
  title,
  onBack,
  textTertiary,
  fontBody,
  border,
}: PanelHeaderProps) {
  return (
    <div
      className="flex items-center gap-1 px-3 py-2.5"
      style={{
        borderBottom: `1px solid ${border}`,
      }}
    >
      <button
        onClick={onBack}
        className="p-0.5 rounded"
        style={{ color: textTertiary }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <span
        style={{
          fontFamily: fontBody,
          fontSize: "0.78rem",
          fontWeight: 600,
          color: textTertiary,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>
    </div>
  );
}

interface ActionBtnProps {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
  hasArrow?: boolean;
  surface2: string;
  textPrimary: string;
  fontBody: string;
}

function ActionBtn({
  children,
  onClick,
  icon,
  hasArrow,
  surface2,
  textPrimary,
  fontBody,
}: ActionBtnProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-left"
      style={{
        color: textPrimary,
        fontFamily: fontBody,
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = surface2;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {icon && <span style={{ opacity: 0.55, flexShrink: 0 }}>{icon}</span>}
      <span className="flex-1">{children}</span>
      {hasArrow && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ opacity: 0.4, flexShrink: 0 }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </button>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function UndoIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="9 14 4 9 9 4" />
      <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg
      width="13"
      height="13"
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

function MemberIcon() {
  return (
    <svg
      width="13"
      height="13"
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
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}
