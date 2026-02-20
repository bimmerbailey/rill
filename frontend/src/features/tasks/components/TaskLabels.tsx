import { useState, useRef, useEffect } from "react";
import { Tag, Check, Plus, Pencil, X, Trash2 } from "lucide-react";
import { cn } from "@/utils";
import type {
  FindTaskQuery,
  FindProjectQuery,
} from "@/graphql/generated/graphql";

// labelColors lives at the root of FindProjectQuery, not on findProject
type LabelColor = FindProjectQuery["labelColors"][number];

const theme = {
  surface1: "var(--color-surface-1)",
  surface2: "var(--color-surface-2)",
  surface3: "var(--color-surface-3)",
  border: "var(--color-border)",
  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  terracotta: "var(--color-terracotta)",
  success: "var(--color-success)",
  danger: "var(--color-danger)",
};

type ProjectLabel = NonNullable<FindProjectQuery["findProject"]>["labels"][0];

interface TaskLabelsProps {
  taskLabels: NonNullable<FindTaskQuery["findTask"]>["labels"];
  projectLabels: ProjectLabel[];
  labelColors?: LabelColor[];
  onToggleLabel: (projectLabelID: string) => Promise<void>;
  onCreateLabel?: (name: string, labelColorId: string) => Promise<void>;
  onUpdateLabel?: (
    labelId: string,
    name: string,
    labelColorId: string,
  ) => Promise<void>;
  onDeleteLabel?: (labelId: string) => Promise<void>;
  loading?: boolean;
}

export function TaskLabels({
  taskLabels,
  projectLabels,
  labelColors,
  onToggleLabel,
  onCreateLabel,
  onUpdateLabel,
  onDeleteLabel,
  loading = false,
}: TaskLabelsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"list" | "editor">("list");
  const [editingLabel, setEditingLabel] = useState<ProjectLabel | null>(null);
  const [editorName, setEditorName] = useState("");
  const [editorColorId, setEditorColorId] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
        setView("list");
        setEditingLabel(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLabelActive = (projectLabelId: string): boolean => {
    return (
      taskLabels?.some((l) => l.projectLabel.id === projectLabelId) ?? false
    );
  };

  const handleToggle = async (projectLabelId: string) => {
    if (loading || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onToggleLabel(projectLabelId);
    } finally {
      setIsSubmitting(false);
    }
  };

  // First available non-"no_color" color id, used as fallback
  const firstColorId =
    labelColors?.find((c) => c.name !== "no_color")?.id ??
    labelColors?.[0]?.id ??
    "";

  const handleOpenEditor = (label?: ProjectLabel) => {
    if (label) {
      setEditingLabel(label);
      setEditorName(label.name || "");
      setEditorColorId(label.labelColor?.id || firstColorId);
    } else {
      setEditingLabel(null);
      setEditorName("");
      setEditorColorId(firstColorId);
    }
    setView("editor");
  };

  // Resolve the color to send: prefer explicitly chosen id, fall back to first
  const resolvedColorId = editorColorId || firstColorId;

  const handleSaveLabel = async () => {
    if (!editorName.trim() || isSubmitting) return;
    if (!onCreateLabel && !onUpdateLabel) return;
    if (!resolvedColorId) return; // no colors loaded yet — shouldn't happen

    setIsSubmitting(true);
    try {
      if (editingLabel && onUpdateLabel) {
        await onUpdateLabel(
          editingLabel.id,
          editorName.trim(),
          resolvedColorId,
        );
      } else if (!editingLabel && onCreateLabel) {
        await onCreateLabel(editorName.trim(), resolvedColorId);
      }
      setView("list");
      setEditingLabel(null);
      setEditorName("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLabel = async () => {
    if (!editingLabel || !onDeleteLabel || isSubmitting) return;
    if (!confirm("Are you sure you want to delete this label?")) return;

    setIsSubmitting(true);
    try {
      await onDeleteLabel(editingLabel.id);
      setView("list");
      setEditingLabel(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEditor = () => {
    setView("list");
    setEditingLabel(null);
    setEditorName("");
  };

  const filteredLabels = projectLabels.filter((label) => {
    if (!searchQuery.trim()) return true;
    return label.name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const hasAdvancedFeatures = onCreateLabel || onUpdateLabel || onDeleteLabel;

  return (
    <div>
      <div
        className="flex items-center gap-2 mb-2 text-sm font-medium"
        style={{ color: theme.textSecondary }}
      >
        <Tag size={16} />
        Labels
      </div>

      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full p-2 rounded text-sm text-left flex items-center gap-2 transition-colors",
            "hover:bg-[rgba(255,235,210,0.05)]",
          )}
          style={{
            backgroundColor: theme.surface2,
            color:
              taskLabels && taskLabels.length > 0
                ? theme.textPrimary
                : theme.textSecondary,
          }}
        >
          {taskLabels && taskLabels.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {taskLabels.map((label) => (
                <span
                  key={label.id}
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    backgroundColor: label.projectLabel.labelColor.colorHex,
                    color: "#fff",
                  }}
                >
                  {label.projectLabel.name || "Unnamed"}
                </span>
              ))}
            </div>
          ) : (
            "Add labels..."
          )}
        </button>

        {isOpen && (
          <div
            className="absolute top-full left-0 mt-1 rounded shadow-lg z-20 min-w-[280px]"
            style={{
              backgroundColor: theme.surface2,
              border: `1px solid ${theme.border}`,
            }}
          >
            {view === "list" ? (
              <>
                {hasAdvancedFeatures && (
                  <div
                    className="p-2 border-b"
                    style={{ borderColor: theme.border }}
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search labels..."
                      className="w-full p-2 rounded text-sm"
                      style={{
                        backgroundColor: theme.surface1,
                        color: theme.textPrimary,
                        border: `1px solid ${theme.border}`,
                      }}
                      autoFocus
                    />
                  </div>
                )}

                <div className="max-h-[250px] overflow-y-auto">
                  {filteredLabels.length === 0 ? (
                    <div
                      className="px-3 py-4 text-sm text-center"
                      style={{ color: theme.textSecondary }}
                    >
                      {searchQuery
                        ? "No labels match your search"
                        : "No labels available"}
                    </div>
                  ) : (
                    <div className="py-1">
                      {filteredLabels.map((label) => {
                        const isActive = isLabelActive(label.id);
                        return (
                          <div
                            key={label.id}
                            className={cn(
                              "px-2 py-1.5 flex items-center gap-2 transition-colors group",
                              "hover:bg-[rgba(255,235,210,0.05)]",
                            )}
                          >
                            <button
                              onClick={() => handleToggle(label.id)}
                              disabled={isSubmitting}
                              className="flex-1 flex items-center gap-2 text-left"
                            >
                              <div
                                className="w-4 h-4 rounded flex-shrink-0"
                                style={{
                                  backgroundColor: label.labelColor.colorHex,
                                }}
                              />
                              <span
                                className="text-sm"
                                style={{ color: theme.textPrimary }}
                              >
                                {label.name || "Unnamed"}
                              </span>
                              {isActive && (
                                <Check
                                  size={14}
                                  style={{ color: theme.success }}
                                />
                              )}
                            </button>
                            {hasAdvancedFeatures && onUpdateLabel && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenEditor(label);
                                }}
                                className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[rgba(255,235,210,0.1)]"
                                style={{ color: theme.textSecondary }}
                              >
                                <Pencil size={12} />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {hasAdvancedFeatures && onCreateLabel && (
                  <div
                    className="p-2 border-t"
                    style={{ borderColor: theme.border }}
                  >
                    <button
                      onClick={() => handleOpenEditor()}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded text-sm transition-colors hover:bg-[rgba(255,235,210,0.05)]"
                      style={{ color: theme.terracotta }}
                    >
                      <Plus size={14} />
                      Create new label
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={handleCancelEditor}
                    className="p-1 rounded hover:bg-[rgba(255,235,210,0.1)]"
                    style={{ color: theme.textSecondary }}
                  >
                    <X size={16} />
                  </button>
                  <span
                    className="text-sm font-medium"
                    style={{ color: theme.textPrimary }}
                  >
                    {editingLabel ? "Edit Label" : "Create Label"}
                  </span>
                  <div className="w-6" />
                </div>

                <div className="space-y-3">
                  <div>
                    <label
                      className="block text-xs mb-1"
                      style={{ color: theme.textSecondary }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={editorName}
                      onChange={(e) => setEditorName(e.target.value)}
                      placeholder="Label name..."
                      className="w-full p-2 rounded text-sm"
                      style={{
                        backgroundColor: theme.surface1,
                        color: theme.textPrimary,
                        border: `1px solid ${theme.border}`,
                      }}
                      autoFocus
                    />
                  </div>

                  {labelColors && labelColors.length > 0 && (
                    <div>
                      <label
                        className="block text-xs mb-2"
                        style={{ color: theme.textSecondary }}
                      >
                        Color
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {labelColors
                          .filter((c) => c.name !== "no_color")
                          .map((color) => (
                            <button
                              key={color.id}
                              onClick={() => setEditorColorId(color.id)}
                              className="w-6 h-6 rounded flex items-center justify-center transition-transform"
                              style={{
                                backgroundColor: color.colorHex,
                                outline:
                                  resolvedColorId === color.id
                                    ? `2px solid ${theme.terracotta}`
                                    : "none",
                                outlineOffset: "2px",
                              }}
                            >
                              {resolvedColorId === color.id && (
                                <Check size={14} className="text-white" />
                              )}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    {editingLabel && onDeleteLabel ? (
                      <button
                        onClick={handleDeleteLabel}
                        disabled={isSubmitting}
                        className="flex items-center gap-1 text-xs"
                        style={{ color: theme.danger }}
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    ) : (
                      <div />
                    )}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCancelEditor}
                        className="px-3 py-1.5 rounded text-xs"
                        style={{
                          backgroundColor: theme.surface3,
                          color: theme.textSecondary,
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveLabel}
                        disabled={!editorName.trim() || isSubmitting}
                        className="px-3 py-1.5 rounded text-xs"
                        style={{
                          backgroundColor: theme.terracotta,
                          color: "#fff",
                          opacity: !editorName.trim() ? 0.5 : 1,
                        }}
                      >
                        {isSubmitting ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
