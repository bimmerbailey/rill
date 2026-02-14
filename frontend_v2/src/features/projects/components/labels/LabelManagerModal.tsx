import { useState } from "react";
import { X } from "lucide-react";
import type {
  ProjectLabel,
  LabelColor,
  LabelFormData,
} from "@/features/projects/types";
import { LabelManager } from "./LabelManager";
import { LabelEditor } from "./LabelEditor";
import {
  useCreateProjectLabelMutation,
  useUpdateProjectLabelMutation,
  useDeleteProjectLabelMutation,
  useToggleTaskLabelMutation,
} from "@/graphql/generated/graphql";

interface LabelManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  labels: ProjectLabel[];
  labelColors: LabelColor[];
  taskId?: string;
  taskLabels?: string[];
  onLabelChanged?: () => void;
}

export function LabelManagerModal({
  isOpen,
  onClose,
  projectId,
  labels,
  labelColors,
  taskId,
  taskLabels,
  onLabelChanged,
}: LabelManagerModalProps) {
  const [view, setView] = useState<"manager" | "editor">("manager");
  const [editingLabel, setEditingLabel] = useState<ProjectLabel | null>(null);
  const [loading, setLoading] = useState(false);

  const [createLabel] = useCreateProjectLabelMutation();
  const [updateLabel] = useUpdateProjectLabelMutation();
  const [deleteLabel] = useDeleteProjectLabelMutation();
  const [toggleLabel] = useToggleTaskLabelMutation();

  const surface1 = "#1c1917";
  const border = "rgba(255,235,210,0.1)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const textSecondary = "rgba(245,238,230,0.6)";

  const handleCreateNew = () => {
    setEditingLabel(null);
    setView("editor");
  };

  const handleEditLabel = (label: ProjectLabel) => {
    setEditingLabel(label);
    setView("editor");
  };

  const handleSaveLabel = async (data: LabelFormData) => {
    setLoading(true);
    try {
      if (editingLabel) {
        await updateLabel({
          variables: {
            projectLabelID: editingLabel.id,
            name: data.name,
            labelColorID: data.labelColorId,
          },
        });
      } else {
        await createLabel({
          variables: {
            projectID: projectId,
            name: data.name,
            labelColorID: data.labelColorId,
          },
        });
      }
      onLabelChanged?.();
      setView("manager");
      setEditingLabel(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLabel = async () => {
    if (!editingLabel) return;
    setLoading(true);
    try {
      await deleteLabel({
        variables: {
          projectLabelID: editingLabel.id,
        },
      });
      onLabelChanged?.();
      setView("manager");
      setEditingLabel(null);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLabel = async (labelId: string) => {
    if (!taskId) return;
    setLoading(true);
    try {
      await toggleLabel({
        variables: {
          taskID: taskId,
          projectLabelID: labelId,
        },
      });
      onLabelChanged?.();
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setView("manager");
    setEditingLabel(null);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="rounded-xl w-full max-w-md mx-4 shadow-2xl"
        style={{
          background: surface1,
          border: `1px solid ${border}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between p-4"
          style={{ borderBottom: `1px solid ${border}` }}
        >
          <h2
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "1.25rem",
              color: textPrimary,
            }}
          >
            Labels
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:opacity-70 transition-opacity"
          >
            <X size={20} style={{ color: textSecondary }} />
          </button>
        </div>

        <div className="p-4">
          {view === "manager" ? (
            <LabelManager
              labels={labels}
              taskLabels={taskId ? taskLabels : undefined}
              onLabelToggle={handleToggleLabel}
              onLabelEdit={handleEditLabel}
              onCreateNew={handleCreateNew}
              loading={loading}
            />
          ) : (
            <LabelEditor
              label={editingLabel}
              labelColors={labelColors}
              onSave={handleSaveLabel}
              onDelete={editingLabel ? handleDeleteLabel : undefined}
              onCancel={handleCancel}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
