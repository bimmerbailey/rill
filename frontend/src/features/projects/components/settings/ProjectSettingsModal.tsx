import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { VisibilityToggle } from "./VisibilityToggle";
import { DeleteProjectModal } from "./DeleteProjectModal";
import { useMutation } from "@apollo/client/react";
import {
  GetProjectsDocument,
  ToggleProjectVisibilityDocument,
  DeleteProjectDocument,
  type GetProjectsQuery,
} from "@/graphql/generated/graphql";

interface ProjectSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  publicOn: string | null | undefined;
  onSettingsChanged?: () => void;
}

export function ProjectSettingsModal({
  isOpen,
  onClose,
  projectId,
  projectName,
  publicOn,
  onSettingsChanged,
}: ProjectSettingsModalProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const [toggleVisibility] = useMutation(ToggleProjectVisibilityDocument);
  const [deleteProject] = useMutation(DeleteProjectDocument);

  const surface1 = "var(--color-surface-0)";
  const border = "var(--color-border-strong)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const danger = "var(--color-danger)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  const handleToggleVisibility = async (isPublic: boolean) => {
    try {
      await toggleVisibility({
        variables: {
          projectID: projectId,
          isPublic,
        },
      });
      showSuccess(
        isPublic ? "Project is now public" : "Project is now private",
      );
      onSettingsChanged?.();
      return true;
    } catch (err) {
      showError("Failed to update visibility");
      console.error(err);
      return false;
    }
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject({
        variables: {
          projectID: projectId,
        },
        update: (cache, result) => {
          if (!result.data?.deleteProject?.ok) return;

          const projectsData = cache.readQuery<GetProjectsQuery>({
            query: GetProjectsDocument,
          });

          if (projectsData?.projects) {
            cache.writeQuery({
              query: GetProjectsDocument,
              data: {
                ...projectsData,
                projects: projectsData.projects.filter(
                  (p: { id: string }) => p.id !== projectId,
                ),
              },
            });
          }
        },
      });
      showSuccess("Project deleted successfully");
      navigate("/projects");
      return true;
    } catch (err) {
      showError("Failed to delete project");
      console.error(err);
      return false;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-40"
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
                fontFamily: fontHeading,
                fontSize: "1.25rem",
                color: textPrimary,
              }}
            >
              Project Settings
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded hover:opacity-70 transition-opacity"
            >
              <X size={20} style={{ color: textSecondary }} />
            </button>
          </div>

          <div className="p-4 space-y-6">
            <div>
              <h3
                style={{
                  fontFamily: fontBody,
                  fontSize: "0.85rem",
                  color: textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.75rem",
                }}
              >
                Visibility
              </h3>
              <VisibilityToggle
                isPublic={!!publicOn}
                onToggle={handleToggleVisibility}
              />
            </div>

            <div
              style={{
                paddingTop: "1rem",
                borderTop: `1px solid ${border}`,
              }}
            >
              <h3
                style={{
                  fontFamily: fontBody,
                  fontSize: "0.85rem",
                  color: textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.75rem",
                }}
              >
                Danger Zone
              </h3>
              <div
                className="p-4 rounded-lg"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-danger) 10%, transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--color-danger) 30%, transparent)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      style={{
                        fontFamily: fontBody,
                        fontSize: "0.9rem",
                        color: textPrimary,
                      }}
                    >
                      Delete this project
                    </p>
                    <p
                      style={{
                        fontFamily: fontBody,
                        fontSize: "0.8rem",
                        color: textSecondary,
                      }}
                    >
                      Permanently delete and all its data
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded transition-colors"
                    style={{
                      background: danger,
                      color: "#fff",
                      fontFamily: fontBody,
                      fontSize: "0.85rem",
                    }}
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteProjectModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        projectName={projectName}
        onDelete={handleDeleteProject}
      />
    </>
  );
}
