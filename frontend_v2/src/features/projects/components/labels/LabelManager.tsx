import { useState } from "react";
import { Search, Plus } from "lucide-react";
import type { ProjectLabel } from "@/features/projects/types";
import { LabelChip } from "./LabelChip";

interface LabelManagerProps {
  labels: ProjectLabel[];
  taskLabels?: string[];
  onLabelToggle?: (labelId: string) => Promise<void>;
  onLabelEdit: (label: ProjectLabel) => void;
  onCreateNew: () => void;
  loading?: boolean;
}

export function LabelManager({
  labels,
  taskLabels,
  onLabelToggle,
  onLabelEdit,
  onCreateNew,
  loading,
}: LabelManagerProps) {
  const [search, setSearch] = useState("");

  const surface2 = "#231f1c";
  const surface3 = "#2c2724";
  const border = "rgba(255,235,210,0.1)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const textSecondary = "rgba(245,238,230,0.5)";
  const textTertiary = "rgba(245,238,230,0.32)";
  const terracotta = "#c9805e";

  const filteredLabels = labels.filter((label) => {
    if (!search.trim()) return true;
    return label.name?.toLowerCase().includes(search.toLowerCase());
  });

  const sortedLabels = [...filteredLabels].sort((a, b) => {
    const aName = a.name?.toLowerCase() || "";
    const bName = b.name?.toLowerCase() || "";
    return aName.localeCompare(bName);
  });

  const handleToggle = async (labelId: string) => {
    if (onLabelToggle) {
      await onLabelToggle(labelId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search
          size={16}
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: textSecondary,
          }}
        />
        <input
          type="text"
          placeholder="Search labels..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-lg"
          style={{
            background: surface3,
            border: `1px solid ${border}`,
            color: textPrimary,
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {loading ? (
          <div className="text-center py-4">
            <p style={{ color: textSecondary }}>Loading labels...</p>
          </div>
        ) : sortedLabels.length === 0 ? (
          <div className="text-center py-4">
            <p style={{ color: textTertiary }}>
              {search ? "No labels match your search" : "No labels yet"}
            </p>
          </div>
        ) : (
          sortedLabels.map((label) => {
            const isAssigned = taskLabels?.includes(label.id);
            return (
              <LabelChip
                key={label.id}
                label={label}
                checked={taskLabels !== undefined ? isAssigned : undefined}
                onToggle={() => handleToggle(label.id)}
                onEdit={() => onLabelEdit(label)}
                showEditButton={true}
              />
            );
          })
        )}
      </div>

      <button
        onClick={onCreateNew}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors"
        style={{
          background: surface2,
          border: `1px solid ${border}`,
          color: terracotta,
        }}
      >
        <Plus size={16} />
        <span style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Create new label
        </span>
      </button>
    </div>
  );
}
