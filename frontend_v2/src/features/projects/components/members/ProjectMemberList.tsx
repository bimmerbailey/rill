import { ProfileAvatar } from "@/features/profile/components/ProfileAvatar";
import type { InvitedMember, ProjectMember } from "@/features/projects/types";

interface ProjectMemberListProps {
  members: ProjectMember[];
  invitedMembers?: InvitedMember[];
  currentUserId?: string;
  onManageMember: (memberId: string) => void;
  onManageInvitedMember?: (email: string) => void;
}

export function ProjectMemberList({
  members,
  invitedMembers,
  currentUserId,
  onManageMember,
  onManageInvitedMember,
}: ProjectMemberListProps) {
  const surface1 = "#1c1917";
  const surface2 = "#231f1c";
  const border = "rgba(255,235,210,0.1)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const textSecondary = "rgba(245,238,230,0.6)";
  const textTertiary = "rgba(245,238,230,0.32)";
  const terracotta = "#c9805e";
  const sage = "#7fa67f";
  const slate = "#7992b0";

  const getRoleBadgeColor = (code: string) => {
    switch (code) {
      case "owner":
        return terracotta;
      case "admin":
        return sage;
      case "member":
        return slate;
      default:
        return textTertiary;
    }
  };

  return (
    <div className="space-y-2">
      {members.map((member) => {
        const isCurrentUser = member.id === currentUserId;
        return (
          <div
            key={member.id}
            className="flex items-center justify-between p-3 rounded-lg"
            style={{
              background: surface2,
              border: `1px solid ${border}`,
            }}
          >
            <div className="flex items-center gap-3">
              <ProfileAvatar
                profileIcon={member.profileIcon}
                fullName={member.fullName}
                size="md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: textPrimary,
                    }}
                  >
                    {member.fullName}
                  </span>
                  {isCurrentUser && (
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.7rem",
                        color: textTertiary,
                        fontStyle: "italic",
                      }}
                    >
                      (you)
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: textSecondary,
                  }}
                >
                  @{member.username}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  background: `${getRoleBadgeColor(member.role.code)}20`,
                  color: getRoleBadgeColor(member.role.code),
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {member.role.name}
              </span>
              <button
                onClick={() => onManageMember(member.id)}
                className="px-3 py-1 rounded transition-colors"
                style={{
                  color: terracotta,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                }}
              >
                Manage
              </button>
            </div>
          </div>
        );
      })}

      {invitedMembers && invitedMembers.length > 0 && (
        <>
          <div
            className="py-2 mt-4"
            style={{ borderBottom: `1px solid ${border}` }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.8rem",
                color: textSecondary,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Pending Invites
            </span>
          </div>
          {invitedMembers.map((invited) => (
            <div
              key={invited.email}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{
                background: surface2,
                border: `1px solid ${border}`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: surface1 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={textTertiary}
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: textPrimary,
                    }}
                  >
                    {invited.email}
                  </span>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: textTertiary,
                    }}
                  >
                    Invited {new Date(invited.invitedOn).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {onManageInvitedMember && (
                <button
                  onClick={() => onManageInvitedMember(invited.email)}
                  className="px-3 py-1 rounded transition-colors"
                  style={{
                    color: terracotta,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
