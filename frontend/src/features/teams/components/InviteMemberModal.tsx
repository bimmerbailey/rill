import { useState } from "react";
import { Input } from "@/components/common/Input";
import { ProfileAvatar } from "@/features/profile/components/ProfileAvatar";

interface User {
  id: string;
  fullName: string;
  email: string;
  username: string;
  profileIcon: {
    url?: string | null;
    initials?: string | null;
    bgColor?: string | null;
  };
}

interface InviteMemberModalProps {
  users: User[];
  existingMemberIds: string[];
  onInvite: (userId: string) => Promise<void>;
  onClose: () => void;
}

export function InviteMemberModal({
  users,
  existingMemberIds,
  onInvite,
  onClose,
}: InviteMemberModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [inviting, setInviting] = useState(false);

  const surface1 = "var(--color-surface-1)";
  const surface2 = "var(--color-surface-2)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const textTertiary = "var(--color-text-tertiary)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  // Filter out existing members and apply search
  const availableUsers = users.filter((user) => {
    if (existingMemberIds.includes(user.id)) return false;
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query)
    );
  });

  const handleInvite = async (userId: string) => {
    setInviting(true);
    try {
      await onInvite(userId);
      onClose();
    } catch {
      setInviting(false);
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
          padding: "1.5rem",
          animation: "d2dFadeUp 0.5s ease-out both",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
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
            Invite a user
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

        <div className="mb-4">
          <Input
            placeholder="Email address or name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: surface3,
              borderColor: border,
              color: textPrimary,
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            margin: "0 -1.5rem",
            padding: "0 1.5rem",
          }}
        >
          {availableUsers.length === 0 ? (
            <div
              style={{
                padding: "2rem 1rem",
                textAlign: "center",
                color: textSecondary,
                fontFamily: fontBody,
                fontSize: "0.9rem",
              }}
            >
              {searchQuery.trim()
                ? "No users found matching your search"
                : "All users are already members of this team"}
            </div>
          ) : (
            <div>
              {availableUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleInvite(user.id)}
                  disabled={inviting}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem",
                    background: "transparent",
                    border: "none",
                    borderRadius: "8px",
                    cursor: inviting ? "not-allowed" : "pointer",
                    transition: "background 0.2s ease",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    if (!inviting) {
                      e.currentTarget.style.background = surface2;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <ProfileAvatar
                    profileIcon={user.profileIcon}
                    fullName={user.fullName}
                    size="md"
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: fontBody,
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: textPrimary,
                        marginBottom: "0.15rem",
                      }}
                    >
                      {user.fullName}
                    </div>
                    <div
                      style={{
                        fontFamily: fontBody,
                        fontSize: "0.75rem",
                        color: textSecondary,
                      }}
                    >
                      {user.email}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
