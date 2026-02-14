import { ProfileAvatar } from "@/features/profile/components/ProfileAvatar";
import type { TeamMember } from "../types";

interface MemberListItemProps {
  member: TeamMember;
  onManage: (member: TeamMember) => void;
}

export function MemberListItem({ member, onManage }: MemberListItemProps) {
  const surface2 = "var(--color-surface-2)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const terracotta = "var(--color-terracotta)";
  const fontBody = "var(--font-body)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        borderBottom: `1px solid ${border}`,
        transition: "background 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = surface2;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}
      >
        <ProfileAvatar
          profileIcon={member.profileIcon}
          fullName={member.fullName}
          size="lg"
        />
        <div>
          <div
            style={{
              fontFamily: fontBody,
              fontSize: "0.95rem",
              fontWeight: 600,
              color: textPrimary,
              marginBottom: "0.25rem",
            }}
          >
            {member.fullName}
          </div>
          <div
            style={{
              fontFamily: fontBody,
              fontSize: "0.8rem",
              color: textSecondary,
            }}
          >
            @{member.username} • {member.role.name}
          </div>
        </div>
      </div>

      <button
        onClick={() => onManage(member)}
        style={{
          fontFamily: fontBody,
          fontSize: "0.8rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          padding: "0.5rem 1rem",
          background: surface3,
          border: `1px solid ${border}`,
          borderRadius: "8px",
          color: textPrimary,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = terracotta;
          e.currentTarget.style.color = terracotta;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = border;
          e.currentTarget.style.color = textPrimary;
        }}
      >
        Manage
      </button>
    </div>
  );
}
