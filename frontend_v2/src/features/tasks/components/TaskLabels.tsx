import { useState, useRef, useEffect } from "react";
import { Tag, Check } from "lucide-react";
import { cn } from "@/utils";
import type {
  FindTaskQuery,
  FindProjectQuery,
} from "@/graphql/generated/graphql";

const theme = {
  surface1: "var(--color-surface-1)",
  surface2: "var(--color-surface-2)",
  surface3: "var(--color-surface-3)",
  border: "var(--color-border)",
  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  terracotta: "var(--color-terracotta)",
  success: "var(--color-success)",
};

type ProjectLabel = NonNullable<FindProjectQuery["findProject"]>["labels"][0];

interface TaskLabelsProps {
  taskLabels: NonNullable<FindTaskQuery["findTask"]>["labels"];
  projectLabels: ProjectLabel[];
  onToggleLabel: (projectLabelID: string) => Promise<void>;
  loading?: boolean;
}

export function TaskLabels({
  taskLabels,
  projectLabels,
  onToggleLabel,
  loading = false,
}: TaskLabelsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
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
            className="absolute top-full left-0 mt-1 py-2 rounded shadow-lg z-20 min-w-[200px] max-h-[300px] overflow-y-auto"
            style={{
              backgroundColor: theme.surface2,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div
              className="px-2 pb-2 mb-2 border-b"
              style={{ borderColor: theme.border }}
            >
              <span
                className="text-xs font-medium"
                style={{ color: theme.textSecondary }}
              >
                Project Labels
              </span>
            </div>

            {projectLabels.length === 0 ? (
              <div
                className="px-3 py-2 text-sm"
                style={{ color: theme.textSecondary }}
              >
                No labels available. Create labels in project settings.
              </div>
            ) : (
              <div className="space-y-1 px-1">
                {projectLabels.map((label) => {
                  const isActive = isLabelActive(label.id);
                  return (
                    <button
                      key={label.id}
                      onClick={() => handleToggle(label.id)}
                      disabled={isSubmitting}
                      className={cn(
                        "w-full px-2 py-2 rounded flex items-center gap-2 transition-colors",
                        "hover:bg-[rgba(255,235,210,0.05)] disabled:opacity-50",
                      )}
                    >
                      <div
                        className="w-4 h-4 rounded flex-shrink-0"
                        style={{ backgroundColor: label.labelColor.colorHex }}
                      />
                      <span
                        className="flex-1 text-sm text-left"
                        style={{ color: theme.textPrimary }}
                      >
                        {label.name || "Unnamed"}
                      </span>
                      {isActive && (
                        <Check size={14} style={{ color: theme.success }} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
