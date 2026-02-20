import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Globe, Lock, Trash2 } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  FindProjectDocument,
  GetProjectsDocument,
  ToggleProjectVisibilityDocument,
  DeleteProjectDocument,
  type GetProjectsQuery,
} from "@/graphql/generated/graphql";
import { DeleteProjectModal } from "@/features/projects/components/settings/DeleteProjectModal";

interface ProjectNavPopupProps {
  projectId: string;
}

export function ProjectNavPopup({ projectId }: ProjectNavPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [togglingVisibility, setTogglingVisibility] = useState(false);
  const [showPublicConfirm, setShowPublicConfirm] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data } = useQuery(FindProjectDocument, {
    variables: { projectID: projectId },
    skip: !projectId,
    fetchPolicy: "cache-first",
  });

  const project = data?.findProject;
  const projectName = project?.name ?? "…";
  const isPublic = !!project?.publicOn;
  // The URL param is the shortId; mutations require the UUID from the query result
  const projectUUID = project?.id ?? "";

  const [toggleVisibility] = useMutation(ToggleProjectVisibilityDocument);
  const [deleteProject] = useMutation(DeleteProjectDocument);

  // Close popup on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const handleToggleVisibility = useCallback(async () => {
    if (!isPublic) {
      setShowPublicConfirm(true);
      return;
    }
    setTogglingVisibility(true);
    try {
      await toggleVisibility({
        variables: { projectID: projectUUID, isPublic: false },
      });
      showSuccess("Project is now private");
    } catch {
      showError("Failed to update visibility");
    } finally {
      setTogglingVisibility(false);
    }
  }, [isPublic, projectUUID, toggleVisibility]);

  const handleConfirmMakePublic = useCallback(async () => {
    setTogglingVisibility(true);
    try {
      await toggleVisibility({
        variables: { projectID: projectUUID, isPublic: true },
      });
      showSuccess("Project is now public");
      setShowPublicConfirm(false);
    } catch {
      showError("Failed to update visibility");
    } finally {
      setTogglingVisibility(false);
    }
  }, [projectUUID, toggleVisibility]);

  const handleDeleteProject = useCallback(async () => {
    try {
      await deleteProject({
        variables: { projectID: projectUUID },
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
                  (p) => p.id !== projectUUID,
                ),
              },
            });
          }
        },
      });
      showSuccess("Project deleted");
      navigate("/projects");
      return true;
    } catch {
      showError("Failed to delete project");
      return false;
    }
  }, [projectUUID, deleteProject, navigate]);

  // Colour tokens
  const surface1 = "var(--color-surface-1)";
  const surface2 = "var(--color-surface-2)";
  const surface3 = "var(--color-surface-3)";
  const borderWeak = "var(--color-border)";
  const borderStrong = "var(--color-border-strong)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const terracotta = "var(--color-terracotta)";
  const sage = "var(--color-sage)";
  const danger = "var(--color-danger)";
  const fontBody = "var(--font-body)";
  const fontHeading = "var(--font-heading)";

  return (
    <>
      {/* Trigger — project name in navbar */}
      <div style={{ position: "relative" }}>
        <button
          ref={triggerRef}
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: isOpen ? terracotta : textPrimary,
            fontFamily: fontHeading,
            fontSize: "0.95rem",
            fontWeight: 700,
            padding: "2px 4px",
            borderRadius: 4,
            transition: "color 0.2s ease",
            maxWidth: 220,
          }}
          onMouseEnter={(e) => {
            if (!isOpen) e.currentTarget.style.color = terracotta;
          }}
          onMouseLeave={(e) => {
            if (!isOpen) e.currentTarget.style.color = textPrimary;
          }}
          title="Project settings"
        >
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {projectName}
          </span>
          <ChevronDown
            size={14}
            style={{
              flexShrink: 0,
              opacity: 0.7,
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          />
        </button>

        {/* Popup dropdown */}
        {isOpen && (
          <div
            ref={popupRef}
            style={{
              position: "absolute",
              top: "calc(100% + 12px)",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 50,
              width: 260,
              background: surface1,
              border: `1px solid ${borderStrong}`,
              borderRadius: 10,
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
              fontFamily: fontBody,
              overflow: "hidden",
            }}
          >
            {/* Caret arrow */}
            <div
              style={{
                position: "absolute",
                top: -6,
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: 10,
                height: 10,
                background: surface1,
                border: `1px solid ${borderStrong}`,
                borderBottom: "none",
                borderRight: "none",
              }}
            />

            {/* Header */}
            <div
              style={{
                padding: "10px 14px",
                borderBottom: `1px solid ${borderWeak}`,
              }}
            >
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: textSecondary,
                }}
              >
                Project Settings
              </p>
            </div>

            {/* Visibility row */}
            <div style={{ padding: "10px 14px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderRadius: 6,
                  background: surface2,
                  border: `1px solid ${borderWeak}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {isPublic ? (
                    <Globe size={15} style={{ color: sage }} />
                  ) : (
                    <Lock size={15} style={{ color: terracotta }} />
                  )}
                  <div>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: textPrimary,
                        lineHeight: 1.2,
                      }}
                    >
                      {isPublic ? "Public" : "Private"}
                    </p>
                    <p
                      style={{
                        fontSize: "0.72rem",
                        color: textSecondary,
                      }}
                    >
                      {isPublic
                        ? "Anyone with link can view"
                        : "Only members can view"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleToggleVisibility}
                  disabled={togglingVisibility}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 5,
                    background: isPublic ? surface3 : terracotta,
                    color: isPublic ? textPrimary : "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    fontFamily: fontBody,
                    border: "none",
                    cursor: "pointer",
                    opacity: togglingVisibility ? 0.5 : 1,
                    transition: "opacity 0.15s ease",
                  }}
                >
                  {togglingVisibility
                    ? "…"
                    : isPublic
                      ? "Make Private"
                      : "Make Public"}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: borderWeak,
                margin: "0 14px",
              }}
            />

            {/* Danger zone */}
            <div style={{ padding: "10px 14px" }}>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowDeleteModal(true);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 10px",
                  borderRadius: 6,
                  background:
                    "color-mix(in srgb, var(--color-danger) 10%, transparent)",
                  border:
                    "1px solid color-mix(in srgb, var(--color-danger) 25%, transparent)",
                  cursor: "pointer",
                  color: danger,
                  fontSize: "0.85rem",
                  fontFamily: fontBody,
                  fontWeight: 500,
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "color-mix(in srgb, var(--color-danger) 18%, transparent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "color-mix(in srgb, var(--color-danger) 10%, transparent)";
                }}
              >
                <Trash2 size={14} />
                <span>Delete project…</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Make Public confirmation dialog */}
      {showPublicConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.65)",
            zIndex: 60,
          }}
          onClick={() => setShowPublicConfirm(false)}
        >
          <div
            style={{
              background: surface1,
              border: `1px solid ${borderStrong}`,
              borderRadius: 12,
              padding: "1.25rem",
              width: "100%",
              maxWidth: 340,
              margin: "0 1rem",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontFamily: fontHeading,
                color: textPrimary,
                marginBottom: "0.75rem",
              }}
            >
              Make project public?
            </h3>
            <p
              style={{
                fontFamily: fontBody,
                fontSize: "0.875rem",
                color: textSecondary,
                marginBottom: "1.25rem",
              }}
            >
              Anyone with a link to this project will be able to view it.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
              <button
                onClick={() => setShowPublicConfirm(false)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  color: textSecondary,
                  fontFamily: fontBody,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmMakePublic}
                disabled={togglingVisibility}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  background: terracotta,
                  color: "#fff",
                  fontFamily: fontBody,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  opacity: togglingVisibility ? 0.5 : 1,
                }}
              >
                {togglingVisibility ? "Updating…" : "Make Public"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      <DeleteProjectModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        projectName={projectName}
        onDelete={handleDeleteProject}
      />
    </>
  );
}
