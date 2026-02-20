import { useState, useMemo } from "react";
import { X, UserPlus } from "lucide-react";
import type {
  ProjectMember,
  ProjectUser,
  InvitedMember,
  ProjectRoleCode,
} from "@/features/projects/types";
import { ProjectMemberList } from "./ProjectMemberList";
import { InviteProjectMemberModal } from "./InviteProjectMemberModal";
import { ProjectMemberRoleModal } from "./ProjectMemberRoleModal";

interface MemberManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: ProjectMember[];
  invitedMembers: InvitedMember[];
  users: ProjectUser[];
  currentUserId?: string;
  onInvite: (
    members: { userID?: string; email?: string }[],
  ) => Promise<boolean>;
  onRemove: (userId: string) => Promise<boolean>;
  onCancelInvite: (email: string) => Promise<boolean>;
  onChangeRole: (userId: string, roleCode: ProjectRoleCode) => Promise<boolean>;
}

export function MemberManagementModal({
  isOpen,
  onClose,
  members,
  invitedMembers,
  users,
  currentUserId,
  onInvite,
  onRemove,
  onCancelInvite,
  onChangeRole,
}: MemberManagementModalProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const surface0 = "var(--color-surface-base)";
  const surface1 = "var(--color-surface-0)";
  const border = "var(--color-border-strong)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const terracotta = "var(--color-terracotta)";
  const danger = "var(--color-danger)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  const selectedMember = useMemo(
    () => members.find((m) => m.id === selectedMemberId) || null,
    [members, selectedMemberId],
  );

  const isLastOwner = useMemo(() => {
    if (!selectedMember) return false;
    const ownerCount = members.filter((m) => m.role.code === "owner").length;
    return selectedMember.role.code === "owner" && ownerCount === 1;
  }, [members, selectedMember]);

  const handleManageMember = (memberId: string) => {
    setSelectedMemberId(memberId);
  };

  const handleManageInvitedMember = (email: string) => {
    setSelectedEmail(email);
  };

  const handleChangeRole = async (roleCode: ProjectRoleCode) => {
    if (!selectedMemberId) return false;
    return onChangeRole(selectedMemberId, roleCode);
  };

  const handleRemove = async () => {
    if (!selectedMemberId) return false;
    return onRemove(selectedMemberId);
  };

  const handleCancelInvite = async () => {
    if (!selectedEmail) return false;
    const success = await onCancelInvite(selectedEmail);
    if (success) {
      setSelectedEmail(null);
    }
    return success;
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-40"
        style={{ background: "rgba(0,0,0,0.6)" }}
        onClick={onClose}
      >
        <div
          className="rounded-xl w-full max-w-lg mx-4 shadow-2xl"
          style={{
            background: surface1,
            border: `1px solid ${border}`,
            maxHeight: "80vh",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="flex items-center justify-between p-4"
            style={{ borderBottom: `1px solid ${border}` }}
          >
            <div>
              <h2
                style={{
                  fontFamily: fontHeading,
                  fontSize: "1.25rem",
                  color: textPrimary,
                }}
              >
                Members
              </h2>
              <p
                style={{
                  fontFamily: fontBody,
                  fontSize: "0.8rem",
                  color: textSecondary,
                  marginTop: "0.25rem",
                }}
              >
                {members.length} member{members.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
                style={{
                  background: terracotta,
                  color: surface0,
                  fontFamily: fontBody,
                  fontSize: "0.85rem",
                }}
              >
                <UserPlus size={16} />
                <span>Invite</span>
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded hover:opacity-70 transition-opacity"
              >
                <X size={20} style={{ color: textSecondary }} />
              </button>
            </div>
          </div>

          <div
            className="p-4 overflow-y-auto"
            style={{ maxHeight: "calc(80vh - 80px)" }}
          >
            <ProjectMemberList
              members={members}
              invitedMembers={invitedMembers}
              currentUserId={currentUserId}
              onManageMember={handleManageMember}
              onManageInvitedMember={handleManageInvitedMember}
            />
          </div>
        </div>
      </div>

      <InviteProjectMemberModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        users={users}
        currentMembers={members}
        onInvite={onInvite}
      />

      <ProjectMemberRoleModal
        isOpen={selectedMemberId !== null}
        onClose={() => setSelectedMemberId(null)}
        member={selectedMember}
        isLastOwner={isLastOwner}
        onChangeRole={handleChangeRole}
        onRemove={handleRemove}
      />

      {selectedEmail && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setSelectedEmail(null)}
        >
          <div
            className="rounded-xl w-full max-w-sm mx-4 shadow-2xl p-4"
            style={{
              background: surface1,
              border: `1px solid ${border}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontFamily: fontHeading,
                color: textPrimary,
                marginBottom: "1rem",
              }}
            >
              Cancel Invite
            </h3>
            <p
              style={{
                fontFamily: fontBody,
                color: textSecondary,
                marginBottom: "1rem",
              }}
            >
              Cancel the pending invite for {selectedEmail}?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedEmail(null)}
                style={{
                  color: textSecondary,
                  fontFamily: fontBody,
                }}
              >
                Keep Invite
              </button>
              <button
                onClick={handleCancelInvite}
                style={{
                  color: danger,
                  fontFamily: fontBody,
                  fontWeight: 500,
                }}
              >
                Cancel Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
