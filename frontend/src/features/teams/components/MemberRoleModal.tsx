import { useState } from "react";
import { RoleCode } from "@/graphql/generated/graphql";
import { ROLE_DESCRIPTIONS } from "../constants/roles";
import type { TeamMember } from "../types";

interface MemberRoleModalProps {
  member: TeamMember;
  currentUserId: string;
  isOnlyOwner: boolean;
  onChangeRole: (roleCode: RoleCode) => Promise<void>;
  onRemove: () => void;
  onClose: () => void;
}

type Screen = "main" | "change-role";

export function MemberRoleModal({
  member,
  currentUserId,
  isOnlyOwner,
  onChangeRole,
  onRemove,
  onClose,
}: MemberRoleModalProps) {
  const [screen, setScreen] = useState<Screen>("main");
  const [changing, setChanging] = useState(false);

  const surface1 = "var(--color-surface-1)";
  const surface2 = "var(--color-surface-2)";
  const border = "var(--color-border)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const textTertiary = "var(--color-text-tertiary)";
  const terracotta = "var(--color-terracotta)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  const isSelf = currentUserId === member.id;
  const currentRole = member.role.code.toLowerCase();

  const handleRoleChange = async (roleCode: RoleCode) => {
    if (roleCode.toLowerCase() === currentRole) {
      onClose();
      return;
    }

    setChanging(true);
    try {
      await onChangeRole(roleCode);
      onClose();
    } catch {
      setChanging(false);
    }
  };

  const roles: Array<{
    code: RoleCode;
    data: (typeof ROLE_DESCRIPTIONS)[RoleCode];
  }> = [
    { code: RoleCode.Owner, data: ROLE_DESCRIPTIONS[RoleCode.Owner] },
    { code: RoleCode.Admin, data: ROLE_DESCRIPTIONS[RoleCode.Admin] },
    { code: RoleCode.Member, data: ROLE_DESCRIPTIONS[RoleCode.Member] },
  ];

  // Filter out Owner option unless current user is already Owner
  const availableRoles =
    currentRole === "owner"
      ? roles
      : roles.filter((r) => r.code !== RoleCode.Owner);

  const canRemove = !isOnlyOwner;

  if (screen === "change-role") {
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
            padding: "1.5rem",
            animation: "d2dFadeUp 0.3s ease-out both",
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <h3
              style={{
                fontFamily: fontHeading,
                fontSize: "1.2rem",
                color: textPrimary,
              }}
            >
              Change Permissions
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

          <div>
            {availableRoles.map((role) => {
              const isCurrentRole = role.code.toLowerCase() === currentRole;
              const isDisabled = changing || (isOnlyOwner && isCurrentRole);

              return (
                <button
                  key={role.code}
                  onClick={() => handleRoleChange(role.code)}
                  disabled={isDisabled}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    padding: "1rem",
                    borderRadius: "8px",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    transition: "background 0.2s ease",
                    opacity: isDisabled && !isCurrentRole ? 0.5 : 1,
                    marginBottom: "0.5rem",
                  }}
                  onMouseEnter={(e) => {
                    if (!isDisabled) {
                      e.currentTarget.style.background = surface2;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div
                    style={{
                      fontFamily: fontBody,
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: textPrimary,
                      marginBottom: "0.35rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {role.data.name}
                    {isCurrentRole && (
                      <span
                        style={{
                          fontSize: "1rem",
                          color: terracotta,
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: fontBody,
                      fontSize: "0.8rem",
                      color: textSecondary,
                      lineHeight: 1.5,
                    }}
                  >
                    {role.data.description}
                  </div>
                </button>
              );
            })}
          </div>

          {isOnlyOwner && (
            <>
              <div
                style={{
                  height: "1px",
                  background: border,
                  margin: "1rem 0",
                }}
              />
              <p
                style={{
                  fontFamily: fontBody,
                  fontSize: "0.8rem",
                  color: textTertiary,
                  padding: "0.5rem 1rem",
                  lineHeight: 1.5,
                }}
              >
                ⚠ You cannot change roles because there must be an owner.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // Main screen
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-sm"
        style={{
          background: surface1,
          border: `1px solid ${border}`,
          borderRadius: "20px",
          overflow: "hidden",
          animation: "d2dFadeUp 0.3s ease-out both",
        }}
      >
        <button
          onClick={() => setScreen("change-role")}
          style={{
            width: "100%",
            textAlign: "left",
            background: "transparent",
            border: "none",
            padding: "1rem 1.5rem",
            fontFamily: fontBody,
            fontSize: "0.9rem",
            color: textPrimary,
            cursor: "pointer",
            transition: "background 0.2s ease",
            borderBottom: `1px solid ${border}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = surface2;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          Change permissions...
          <span
            style={{
              marginLeft: "0.5rem",
              color: textTertiary,
              fontSize: "0.85rem",
            }}
          >
            ({member.role.name})
          </span>
        </button>

        <button
          onClick={onRemove}
          disabled={!canRemove}
          style={{
            width: "100%",
            textAlign: "left",
            background: "transparent",
            border: "none",
            padding: "1rem 1.5rem",
            fontFamily: fontBody,
            fontSize: "0.9rem",
            color: canRemove ? textPrimary : textTertiary,
            cursor: canRemove ? "pointer" : "not-allowed",
            transition: "background 0.2s ease",
            opacity: canRemove ? 1 : 0.5,
          }}
          onMouseEnter={(e) => {
            if (canRemove) {
              e.currentTarget.style.background = surface2;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          {isSelf ? "Leave team..." : "Remove from team..."}
        </button>

        {!canRemove && (
          <>
            <div
              style={{
                height: "1px",
                background: border,
                margin: "0.25rem 0",
              }}
            />
            <p
              style={{
                fontFamily: fontBody,
                fontSize: "0.75rem",
                color: textTertiary,
                padding: "0.75rem 1.5rem",
                lineHeight: 1.5,
              }}
            >
              You can't {isSelf ? "leave" : "remove this member"} because{" "}
              {isSelf ? "you are" : "they are"} the only owner.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
