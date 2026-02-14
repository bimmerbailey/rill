import { useState, useMemo } from "react";
import { X, Search } from "lucide-react";
import { ProfileAvatar } from "@/features/profile/components/ProfileAvatar";
import type {
  ProjectUser,
  ProjectMember,
  InviteMemberData,
} from "@/features/projects/types";

interface InviteProjectMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: ProjectUser[];
  currentMembers: ProjectMember[];
  onInvite: (members: InviteMemberData[]) => Promise<boolean>;
}

export function InviteProjectMemberModal({
  isOpen,
  onClose,
  users,
  currentMembers,
  onInvite,
}: InviteProjectMemberModalProps) {
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<ProjectUser[]>([]);
  const [inviting, setInviting] = useState(false);

  const surface0 = "#141211";
  const surface1 = "#1c1917";
  const surface2 = "#231f1c";
  const surface3 = "#2c2724";
  const border = "rgba(255,235,210,0.1)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const textSecondary = "rgba(245,238,230,0.6)";
  const textTertiary = "rgba(245,238,230,0.32)";
  const terracotta = "#c9805e";

  const memberIds = useMemo(
    () => new Set(currentMembers.map((m) => m.id)),
    [currentMembers],
  );

  const availableUsers = useMemo(() => {
    let filtered = users.filter((user) => !memberIds.has(user.id));

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(searchLower) ||
          user.username?.toLowerCase().includes(searchLower) ||
          user.email?.toLowerCase().includes(searchLower),
      );
    }

    return filtered;
  }, [users, memberIds, search]);

  const toggleUser = (user: ProjectUser) => {
    setSelectedUsers((prev) =>
      prev.find((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user],
    );
  };

  const handleInvite = async () => {
    if (selectedUsers.length === 0) return;

    setInviting(true);
    const members: InviteMemberData[] = selectedUsers.map((user) => ({
      userID: user.id,
    }));

    const success = await onInvite(members);
    setInviting(false);

    if (success) {
      setSelectedUsers([]);
      setSearch("");
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedUsers([]);
    setSearch("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={handleClose}
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
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "1.25rem",
              color: textPrimary,
            }}
          >
            Invite Members
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded hover:opacity-70 transition-opacity"
          >
            <X size={20} style={{ color: textSecondary }} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="relative">
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: textSecondary,
              }}
            />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg"
              style={{
                background: surface3,
                border: `1px solid ${border}`,
                color: textPrimary,
                fontFamily: "'DM Sans', sans-serif",
              }}
              autoFocus
            />
          </div>

          {selectedUsers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-2 px-2 py-1 rounded"
                  style={{ background: surface3 }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.85rem",
                      color: textPrimary,
                    }}
                  >
                    {user.fullName}
                  </span>
                  <button
                    onClick={() => toggleUser(user)}
                    className="text-xs"
                    style={{ color: textSecondary }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="max-h-64 overflow-y-auto space-y-2">
            {availableUsers.length === 0 ? (
              <div className="text-center py-4">
                <p style={{ color: textTertiary }}>
                  {search
                    ? "No users match your search"
                    : "All users are already members"}
                </p>
              </div>
            ) : (
              availableUsers.map((user) => {
                const isSelected = selectedUsers.find((u) => u.id === user.id);
                return (
                  <button
                    key={user.id}
                    onClick={() => toggleUser(user)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors"
                    style={{
                      background: isSelected ? surface3 : surface2,
                      border: `1px solid ${isSelected ? terracotta : border}`,
                    }}
                  >
                    <ProfileAvatar
                      profileIcon={user.profileIcon}
                      fullName={user.fullName}
                      size="sm"
                    />
                    <div className="text-left flex-1">
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.9rem",
                          color: textPrimary,
                        }}
                      >
                        {user.fullName}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.8rem",
                          color: textSecondary,
                        }}
                      >
                        @{user.username}
                      </div>
                    </div>
                    {isSelected && <span style={{ color: terracotta }}>✓</span>}
                  </button>
                );
              })
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg"
              style={{
                color: textSecondary,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleInvite}
              disabled={selectedUsers.length === 0 || inviting}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                background: terracotta,
                color: surface0,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                opacity: selectedUsers.length === 0 ? 0.5 : 1,
              }}
            >
              {inviting
                ? "Inviting..."
                : `Invite ${selectedUsers.length || ""}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
