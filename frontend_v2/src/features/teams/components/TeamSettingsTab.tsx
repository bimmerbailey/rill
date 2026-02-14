import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { useTeamDetail } from "../hooks";
import { DeleteTeamModal } from "./DeleteTeamModal";

export function TeamSettingsTab() {
  const { teamId } = useParams<{ teamId: string }>();
  const { team, projects, loading } = useTeamDetail(teamId || "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const surface1 = "#231f1c";
  const surface2 = "#2c2724";
  const border = "rgba(255,235,210,0.06)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const textSecondary = "rgba(245,238,230,0.5)";
  const textTertiary = "rgba(255,235,210,0.32)";
  const danger = "#d97070";

  if (loading || !team) {
    return (
      <div>
        <div
          className="animate-pulse"
          style={{
            background: surface2,
            height: "200px",
            borderRadius: "20px",
          }}
        />
      </div>
    );
  }

  const createdDate = new Date(team.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="space-y-8">
        {/* Team Information */}
        <div
          style={{
            background: surface1,
            borderRadius: "20px",
            border: `1px solid ${border}`,
            padding: "2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: "1.4rem",
              color: textPrimary,
              marginBottom: "1.5rem",
            }}
          >
            Team Information
          </h2>

          <div className="space-y-4">
            <div>
              <label
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: textTertiary,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Team Name
              </label>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  color: textPrimary,
                }}
              >
                {team.name}
              </div>
            </div>

            <div>
              <label
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: textTertiary,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Created
              </label>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  color: textPrimary,
                }}
              >
                {createdDate}
              </div>
            </div>

            <div>
              <label
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: textTertiary,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Members
              </label>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  color: textPrimary,
                }}
              >
                {team.members.length}
              </div>
            </div>

            <div>
              <label
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: textTertiary,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Projects
              </label>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  color: textPrimary,
                }}
              >
                {projects.length}
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div
          style={{
            background: `rgba(${parseInt(danger.slice(1, 3), 16)}, ${parseInt(danger.slice(3, 5), 16)}, ${parseInt(danger.slice(5, 7), 16)}, 0.05)`,
            border: `2px solid rgba(${parseInt(danger.slice(1, 3), 16)}, ${parseInt(danger.slice(3, 5), 16)}, ${parseInt(danger.slice(5, 7), 16)}, 0.3)`,
            borderRadius: "16px",
            padding: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>🔴</span>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  fontSize: "1.2rem",
                  color: danger,
                  marginBottom: "0.75rem",
                }}
              >
                Danger Zone
              </h3>
              <h4
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: textPrimary,
                  marginBottom: "0.5rem",
                }}
              >
                Delete this team
              </h4>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  color: textSecondary,
                  lineHeight: 1.6,
                  marginBottom: "1.5rem",
                }}
              >
                Once deleted, there is no going back. All projects and tasks
                will be permanently deleted.
              </p>
              <Button
                onClick={() => setShowDeleteModal(true)}
                style={{
                  background: danger,
                  border: "none",
                  color: "#fff",
                  padding: "0.75rem 1.5rem",
                }}
              >
                Delete Team
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Team Modal */}
      {showDeleteModal && (
        <DeleteTeamModal
          teamId={teamId || ""}
          teamName={team.name}
          projectCount={projects.length}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
