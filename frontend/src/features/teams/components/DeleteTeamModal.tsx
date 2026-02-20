import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { useMutation } from "@apollo/client/react";
import {
  DeleteTeamDocument,
  GetProjectsDocument,
  type GetProjectsQuery,
} from "@/graphql/generated/graphql";
import { showSuccess, showError } from "@/utils/toast";

interface DeleteTeamModalProps {
  teamId: string;
  teamName: string;
  projectCount: number;
  onClose: () => void;
}

export function DeleteTeamModal({
  teamId,
  teamName,
  projectCount,
  onClose,
}: DeleteTeamModalProps) {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const [deleteTeam] = useMutation(DeleteTeamDocument, {
    update: (cache, { data }) => {
      if (!data?.deleteTeam) return;

      const deletedTeamId = data.deleteTeam.team.id;

      // Remove team and its projects from cache
      const existingData = cache.readQuery<GetProjectsQuery>({
        query: GetProjectsDocument,
      });

      if (existingData) {
        cache.writeQuery<GetProjectsQuery>({
          query: GetProjectsDocument,
          data: {
            ...existingData,
            teams: existingData.teams.filter((t) => t.id !== deletedTeamId),
            projects: existingData.projects.filter(
              (p) => p.team?.id !== deletedTeamId,
            ),
          },
        });
      }
    },
  });

  const surface1 = "var(--color-surface-1)";
  const border = "var(--color-border)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const textTertiary = "var(--color-text-tertiary)";
  const danger = "var(--color-danger)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteTeam({
        variables: { teamID: teamId },
      });
      showSuccess("Team deleted successfully");
      navigate("/teams");
    } catch {
      showError("Failed to delete team");
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-md"
        style={{
          background: surface1,
          border: `1px solid ${border}`,
          borderRadius: "24px",
          padding: "2rem",
          animation: "d2dFadeUp 0.5s ease-out both",
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <h3
            style={{
              fontFamily: fontHeading,
              fontSize: "1.3rem",
              color: danger,
            }}
          >
            Delete "{teamName}"?
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: textTertiary,
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "0",
              lineHeight: 1,
            }}
            className="hover:opacity-80 transition-opacity"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <p
            style={{
              fontFamily: fontBody,
              fontSize: "0.9rem",
              color: textSecondary,
              lineHeight: 1.6,
            }}
          >
            This will permanently delete:
          </p>

          <ul
            style={{
              fontFamily: fontBody,
              fontSize: "0.9rem",
              color: textPrimary,
              lineHeight: 1.8,
              paddingLeft: "1.5rem",
              listStyle: "disc",
            }}
          >
            <li>
              {projectCount} project{projectCount !== 1 ? "s" : ""}
            </li>
            <li>All tasks within these projects</li>
            <li>All task comments and attachments</li>
            <li>Team member associations</li>
          </ul>

          <p
            style={{
              fontFamily: fontBody,
              fontSize: "0.9rem",
              color: danger,
              fontWeight: 600,
              marginTop: "1.5rem",
            }}
          >
            This action cannot be undone.
          </p>

          <div
            className="flex items-center gap-3"
            style={{ marginTop: "2rem" }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={deleting}
              style={{
                flex: 1,
                background: "none",
                border: `1px solid ${border}`,
                color: textSecondary,
                fontFamily: fontBody,
                fontSize: "0.85rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                cursor: deleting ? "not-allowed" : "pointer",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                transition: "all 0.2s ease",
              }}
              className="hover:opacity-80"
            >
              Cancel
            </button>
            <Button
              onClick={handleDelete}
              disabled={deleting}
              style={{
                flex: 1,
                background: danger,
                border: "none",
                color: "#fff",
                padding: "0.75rem 1.5rem",
              }}
            >
              {deleting ? "Deleting..." : "Delete Team"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
