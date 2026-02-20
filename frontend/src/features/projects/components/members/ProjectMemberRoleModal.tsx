import { useState } from "react";
import { X, ChevronLeft, Shield, UserCog, Eye, Trash2 } from "lucide-react";
import type { ProjectMember, ProjectRoleCode } from "@/features/projects/types";
import { PROJECT_ROLES } from "@/features/projects/constants";

interface ProjectMemberRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: ProjectMember | null;
  isLastOwner: boolean;
  onChangeRole: (roleCode: ProjectRoleCode) => Promise<boolean>;
  onRemove: () => Promise<boolean>;
}

export function ProjectMemberRoleModal({
  isOpen,
  onClose,
  member,
  isLastOwner,
  onChangeRole,
  onRemove,
}: ProjectMemberRoleModalProps) {
  const [screen, setScreen] = useState<"menu" | "role">("menu");
  const [loading, setLoading] = useState(false);

  const surface1 = "var(--color-surface-0)";
  const surface2 = "var(--color-surface-1)";
  const border = "var(--color-border-strong)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const terracotta = "var(--color-terracotta)";
  const danger = "var(--color-danger)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  const handleClose = () => {
    setScreen("menu");
    onClose();
  };

  const handleChangeRole = async (roleCode: ProjectRoleCode) => {
    setLoading(true);
    const success = await onChangeRole(roleCode);
    setLoading(false);
    if (success) {
      handleClose();
    }
  };

  const handleRemove = async () => {
    if (
      !confirm("Are you sure you want to remove this member from the project?")
    )
      return;
    setLoading(true);
    const success = await onRemove();
    setLoading(false);
    if (success) {
      handleClose();
    }
  };

  if (!isOpen || !member) return null;

  const roleIcons: Record<string, React.ReactNode> = {
    owner: <Shield size={18} />,
    admin: <UserCog size={18} />,
    member: <UserCog size={18} />,
    observer: <Eye size={18} />,
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={handleClose}
    >
      <div
        className="rounded-xl w-full max-w-sm mx-4 shadow-2xl"
        style={{
          background: surface1,
          border: `1px solid ${border}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center gap-3 p-4"
          style={{ borderBottom: `1px solid ${border}` }}
        >
          {screen === "role" && (
            <button
              onClick={() => setScreen("menu")}
              className="p-1 rounded hover:opacity-70"
            >
              <ChevronLeft size={20} style={{ color: textSecondary }} />
            </button>
          )}
          <h2
            className="flex-1"
            style={{
              fontFamily: fontHeading,
              fontSize: "1.1rem",
              color: textPrimary,
            }}
          >
            {screen === "menu" ? "Member Actions" : "Change Role"}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded hover:opacity-70 transition-opacity"
          >
            <X size={20} style={{ color: textSecondary }} />
          </button>
        </div>

        <div className="p-4">
          {screen === "menu" ? (
            <div className="space-y-2">
              <button
                onClick={() => setScreen("role")}
                disabled={isLastOwner}
                className="w-full flex items-center justify-between p-3 rounded-lg transition-colors"
                style={{
                  background: surface2,
                  border: `1px solid ${border}`,
                  opacity: isLastOwner ? 0.5 : 1,
                }}
              >
                <div className="flex items-center gap-3">
                  <Shield size={18} style={{ color: terracotta }} />
                  <span
                    style={{
                      fontFamily: fontBody,
                      color: textPrimary,
                    }}
                  >
                    Change permissions...
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: fontBody,
                    fontSize: "0.85rem",
                    color: textSecondary,
                  }}
                >
                  {member.role.name}
                </span>
              </button>

              {isLastOwner && (
                <div
                  className="px-3 py-2 rounded"
                  style={{
                    background:
                      "color-mix(in srgb, var(--color-danger) 10%, transparent)",
                    border:
                      "1px solid color-mix(in srgb, var(--color-danger) 25%, transparent)",
                  }}
                >
                  <p style={{ color: danger, fontSize: "0.8rem" }}>
                    Cannot change role of the last owner
                  </p>
                </div>
              )}

              <button
                onClick={handleRemove}
                disabled={isLastOwner || loading}
                className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors"
                style={{
                  background: surface2,
                  border: `1px solid ${border}`,
                  opacity: isLastOwner ? 0.5 : 1,
                }}
              >
                <Trash2 size={18} style={{ color: danger }} />
                <span
                  style={{
                    fontFamily: fontBody,
                    color: danger,
                  }}
                >
                  Remove from project
                </span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {Object.values(PROJECT_ROLES).map((role) => {
                const isCurrent = role.code === member.role.code;
                return (
                  <button
                    key={role.code}
                    onClick={() => handleChangeRole(role.code)}
                    disabled={isCurrent || loading}
                    className="w-full flex items-start gap-3 p-3 rounded-lg transition-colors text-left"
                    style={{
                      background: isCurrent ? `${terracotta}15` : surface2,
                      border: `1px solid ${isCurrent ? terracotta : border}`,
                      opacity: loading ? 0.5 : 1,
                    }}
                  >
                    <div style={{ color: terracotta, marginTop: "2px" }}>
                      {roleIcons[role.code]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          style={{
                            fontFamily: fontBody,
                            fontWeight: 500,
                            color: textPrimary,
                          }}
                        >
                          {role.name}
                        </span>
                        {isCurrent && (
                          <span
                            style={{ color: terracotta, fontSize: "0.9rem" }}
                          >
                            ✓
                          </span>
                        )}
                      </div>
                      <p
                        style={{
                          fontFamily: fontBody,
                          fontSize: "0.8rem",
                          color: textSecondary,
                          marginTop: "0.25rem",
                        }}
                      >
                        {role.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
