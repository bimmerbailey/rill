import type { ProjectLabel } from "@/features/projects/types";

interface LabelChipProps {
  label: ProjectLabel;
  checked?: boolean;
  onToggle?: () => void;
  onEdit?: () => void;
  showEditButton?: boolean;
}

export function LabelChip({
  label,
  checked,
  onToggle,
  onEdit,
  showEditButton = false,
}: LabelChipProps) {
  const surface1 = "#1c1917";
  const surface2 = "#231f1c";
  const border = "rgba(255,235,210,0.1)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const textSecondary = "rgba(245,238,230,0.5)";
  const terracotta = "#c9805e";

  return (
    <div
      className="flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition-colors"
      style={{
        background: surface2,
        border: `1px solid ${border}`,
      }}
      onClick={onToggle}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = surface1;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = surface2;
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-4 h-4 rounded"
          style={{ background: label.labelColor?.colorHex || "#888" }}
        />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            color: textPrimary,
          }}
        >
          {label.name || "Unnamed label"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {checked !== undefined && (
          <span
            style={{
              color: terracotta,
              fontSize: "0.9rem",
            }}
          >
            {checked ? "✓" : ""}
          </span>
        )}
        {showEditButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            className="p-1 rounded opacity-50 hover:opacity-100 transition-opacity"
            style={{ color: textSecondary }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
