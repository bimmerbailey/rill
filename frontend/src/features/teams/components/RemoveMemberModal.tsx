import { useState } from "react";
import { Button } from "@/components/common/Button";
import type { TeamMember } from "../types";

interface RemoveMemberModalProps {
  member: TeamMember;
  teamMembers: TeamMember[];
  onRemove: (newOwnerId: string | null) => Promise<void>;
  onClose: () => void;
}

export function RemoveMemberModal({
  member,
  teamMembers,
  onRemove,
  onClose,
}: RemoveMemberModalProps) {
  const [selectedNewOwner, setSelectedNewOwner] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);

  const surface1 = "var(--color-surface-1)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const textTertiary = "var(--color-text-tertiary)";
  const danger = "var(--color-danger)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  const ownedProjects = member.owned?.projects || [];
  const hasOwnedProjects = ownedProjects.length > 0;

  // Get other members for ownership transfer
  const otherMembers = teamMembers.filter((m) => m.id !== member.id);

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await onRemove(selectedNewOwner);
      onClose();
    } catch {
      setRemoving(false);
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
              color: textPrimary,
            }}
          >
            Remove from Team?
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
            The member will be removed from all team project tasks. They will
            receive a notification.
          </p>

          {hasOwnedProjects && (
            <>
              <p
                style={{
                  fontFamily: fontBody,
                  fontSize: "0.9rem",
                  color: textPrimary,
                  lineHeight: 1.6,
                  marginTop: "1.5rem",
                }}
              >
                ⚠ The member is the owner of {ownedProjects.length} project
                {ownedProjects.length > 1 ? "s" : ""}. You can give the project
                {ownedProjects.length > 1 ? "s" : ""} a new owner but it is not
                needed.
              </p>

              <div style={{ marginTop: "1rem" }}>
                <label
                  style={{
                    fontFamily: fontBody,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: textSecondary,
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  New projects owner (optional)
                </label>
                <select
                  value={selectedNewOwner || ""}
                  onChange={(e) => setSelectedNewOwner(e.target.value || null)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: surface3,
                    border: `1px solid ${border}`,
                    borderRadius: "8px",
                    color: textPrimary,
                    fontFamily: fontBody,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  <option value="">None (leave orphaned)</option>
                  {otherMembers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.fullName}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div style={{ marginTop: "2rem" }}>
            <Button
              onClick={handleRemove}
              disabled={removing}
              style={{
                width: "100%",
                background: danger,
                border: "none",
                color: "#fff",
                padding: "0.75rem 1.5rem",
              }}
            >
              {removing ? "Removing..." : "Remove Member"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
