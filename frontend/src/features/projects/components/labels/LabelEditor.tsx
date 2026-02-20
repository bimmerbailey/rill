import { useState, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import type {
  ProjectLabel,
  LabelColor,
  LabelFormData,
} from "@/features/projects/types";
import { ColorPicker } from "./ColorPicker";

interface LabelEditorProps {
  label?: ProjectLabel | null;
  labelColors: LabelColor[];
  onSave: (data: LabelFormData) => Promise<void>;
  onDelete?: () => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function LabelEditor({
  label,
  labelColors,
  onSave,
  onDelete,
  onCancel,
  loading,
}: LabelEditorProps) {
  const [name, setName] = useState(label?.name || "");
  const [selectedColorId, setSelectedColorId] = useState(
    label?.labelColor?.id || labelColors[0]?.id || "",
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (label) {
      setName(label.name || "");
      setSelectedColorId(label.labelColor?.id || labelColors[0]?.id || "");
    }
  }, [label, labelColors]);

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Label name is required");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSave({ name: name.trim(), labelColorId: selectedColorId });
    } catch {
      setError("Failed to save label");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!confirm("Are you sure you want to delete this label?")) return;
    setDeleting(true);
    try {
      await onDelete();
    } catch {
      setError("Failed to delete label");
    } finally {
      setDeleting(false);
    }
  };

  const surface1 = "var(--color-surface-0)";
  const surface3 = "var(--color-surface-2)";
  const border = "var(--color-border-strong)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const terracotta = "var(--color-terracotta)";
  const danger = "var(--color-danger)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3
          style={{
            fontFamily: fontHeading,
            fontSize: "1.1rem",
            color: textPrimary,
          }}
        >
          {label ? "Edit Label" : "Create Label"}
        </h3>
        <button
          onClick={onCancel}
          className="p-1 rounded hover:opacity-70 transition-opacity"
        >
          <X size={18} style={{ color: textSecondary }} />
        </button>
      </div>

      {error && (
        <div
          className="px-3 py-2 rounded"
          style={{
            background:
              "color-mix(in srgb, var(--color-danger) 10%, transparent)",
            border:
              "1px solid color-mix(in srgb, var(--color-danger) 40%, transparent)",
          }}
        >
          <p style={{ color: danger, fontSize: "0.85rem" }}>{error}</p>
        </div>
      )}

      <div>
        <label
          style={{
            fontFamily: fontBody,
            fontSize: "0.8rem",
            color: textSecondary,
            marginBottom: "0.5rem",
            display: "block",
          }}
        >
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Label name..."
          className="w-full px-3 py-2 rounded-lg"
          style={{
            background: surface3,
            border: `1px solid ${border}`,
            color: textPrimary,
            fontFamily: fontBody,
          }}
          autoFocus
        />
      </div>

      <ColorPicker
        colors={labelColors}
        selectedColorId={selectedColorId}
        onColorSelect={setSelectedColorId}
      />

      <div className="flex items-center justify-between pt-4">
        {label && onDelete ? (
          <button
            onClick={handleDelete}
            disabled={deleting || loading}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
            style={{
              color: danger,
              opacity: deleting ? 0.5 : 1,
            }}
          >
            <Trash2 size={16} />
            <span style={{ fontFamily: fontBody }}>
              {deleting ? "Deleting..." : "Delete"}
            </span>
          </button>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              color: textSecondary,
              fontFamily: fontBody,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              background: terracotta,
              color: surface1,
              fontFamily: fontBody,
              fontWeight: 500,
              opacity: saving ? 0.5 : 1,
            }}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
