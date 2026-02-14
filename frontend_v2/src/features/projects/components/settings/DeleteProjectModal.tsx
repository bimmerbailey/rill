import { useState } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  onDelete: () => Promise<boolean>;
}

export function DeleteProjectModal({
  isOpen,
  onClose,
  projectName,
  onDelete,
}: DeleteProjectModalProps) {
  const [deleting, setDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const surface1 = "#1c1917";
  const surface3 = "#2c2724";
  const border = "rgba(255,235,210,0.1)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const textSecondary = "rgba(245,238,230,0.6)";
  const danger = "#e57373";

  const canDelete = confirmText === projectName;

  const handleDelete = async () => {
    if (!canDelete) return;
    setDeleting(true);
    const success = await onDelete();
    setDeleting(false);
    if (success) {
      onClose();
    }
  };

  const handleClose = () => {
    setConfirmText("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={handleClose}
    >
      <div
        className="rounded-xl w-full max-w-md mx-4 shadow-2xl"
        style={{
          background: surface1,
          border: `1px solid ${danger}40`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between p-4"
          style={{ borderBottom: `1px solid ${danger}40` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-full"
              style={{ background: `${danger}20` }}
            >
              <Trash2 size={20} style={{ color: danger }} />
            </div>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "1.25rem",
                color: danger,
              }}
            >
              Delete Project
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded hover:opacity-70 transition-opacity"
          >
            <X size={20} style={{ color: textSecondary }} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div
            className="p-4 rounded-lg"
            style={{
              background: `${danger}10`,
              border: `1px solid ${danger}30`,
            }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle
                size={18}
                style={{ color: danger, marginTop: "2px" }}
              />
              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: textPrimary,
                    marginBottom: "0.5rem",
                  }}
                >
                  This will permanently delete the project{" "}
                  <strong style={{ color: danger }}>"{projectName}"</strong>{" "}
                  and:
                </p>
                <ul
                  className="list-disc list-inside"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: textSecondary,
                  }}
                >
                  <li>All task groups and tasks</li>
                  <li>All comments and checklists</li>
                  <li>All labels</li>
                  <li>Member associations</li>
                </ul>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: danger,
                    marginTop: "0.5rem",
                    fontWeight: 500,
                  }}
                >
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                color: textSecondary,
                marginBottom: "0.5rem",
                display: "block",
              }}
            >
              Type the project name to confirm:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={projectName}
              className="w-full px-3 py-2 rounded-lg"
              style={{
                background: surface3,
                border: `1px solid ${border}`,
                color: textPrimary,
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg"
              style={{
                color: textSecondary,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={!canDelete || deleting}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                background: danger,
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                opacity: canDelete ? 1 : 0.5,
              }}
            >
              {deleting ? "Deleting..." : "Delete Project"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
