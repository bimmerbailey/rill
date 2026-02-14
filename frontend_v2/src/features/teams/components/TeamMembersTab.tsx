import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { useAuthStore } from "@/stores/authStore";
import { RoleCode } from "@/graphql/generated/graphql";
import { useTeamDetail, useTeamMembers } from "../hooks";
import { MemberListItem } from "./MemberListItem";
import { InviteMemberModal } from "./InviteMemberModal";
import { MemberRoleModal } from "./MemberRoleModal";
import { RemoveMemberModal } from "./RemoveMemberModal";
import type { TeamMember } from "../types";

export function TeamMembersTab() {
  const { teamId } = useParams<{ teamId: string }>();
  const { userId } = useAuthStore();
  const { team, allUsers, loading } = useTeamDetail(teamId || "");
  const { inviteMember, changeRole, removeMember } = useTeamMembers(
    teamId || "",
  );

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const surface1 = "#231f1c";
  const surface2 = "#2c2724";
  const border = "rgba(255,235,210,0.06)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const textSecondary = "rgba(245,238,230,0.5)";
  const terracotta = "#c9805e";

  const members = team?.members || [];

  // Check if there's only one owner
  const owners = members.filter((m) => m.role.code.toLowerCase() === "owner");
  const isOnlyOwner = (member: TeamMember) => {
    return owners.length === 1 && member.role.code.toLowerCase() === "owner";
  };

  const handleManage = (member: TeamMember) => {
    setSelectedMember(member);
    setShowRoleModal(true);
  };

  const handleChangeRole = async (roleCode: RoleCode) => {
    if (!selectedMember) return;
    await changeRole(selectedMember.id, roleCode);
    setShowRoleModal(false);
    setSelectedMember(null);
  };

  const handleOpenRemove = () => {
    setShowRoleModal(false);
    setShowRemoveModal(true);
  };

  const handleRemove = async (newOwnerId: string | null) => {
    if (!selectedMember) return;
    await removeMember(selectedMember.id, newOwnerId);
    setShowRemoveModal(false);
    setSelectedMember(null);
  };

  if (loading) {
    return (
      <div>
        <div
          className="animate-pulse mb-6"
          style={{
            background: surface2,
            height: "40px",
            width: "200px",
            borderRadius: "8px",
          }}
        />
        <div
          style={{
            background: surface1,
            borderRadius: "20px",
            border: `1px solid ${border}`,
            padding: "1.5rem",
          }}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse"
              style={{
                background: surface2,
                height: "60px",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* Header */}
        <div
          className="flex items-center justify-between mb-6"
          style={{
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontSize: "1.4rem",
                color: textPrimary,
                marginBottom: "0.35rem",
              }}
            >
              Team Members ({members.length})
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                color: textSecondary,
                lineHeight: 1.5,
              }}
            >
              Team members can view and join all Team Visible boards and create
              new boards in the team.
            </p>
          </div>

          <Button
            onClick={() => setShowInviteModal(true)}
            style={{
              background: terracotta,
              border: "none",
              color: "#fff",
              padding: "0.75rem 1.5rem",
              fontSize: "0.8rem",
            }}
          >
            + Invite Members
          </Button>
        </div>

        {/* Members List */}
        <div
          style={{
            background: surface1,
            borderRadius: "20px",
            border: `1px solid ${border}`,
            overflow: "hidden",
          }}
        >
          {members.length === 0 ? (
            <div
              style={{
                padding: "3rem 2rem",
                textAlign: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                color: textSecondary,
              }}
            >
              No members yet.
            </div>
          ) : (
            members.map((member) => (
              <MemberListItem
                key={member.id}
                member={member}
                onManage={handleManage}
              />
            ))
          )}
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <InviteMemberModal
          users={allUsers}
          existingMemberIds={members.map((m) => m.id)}
          onInvite={inviteMember}
          onClose={() => setShowInviteModal(false)}
        />
      )}

      {/* Member Role Modal */}
      {showRoleModal && selectedMember && (
        <MemberRoleModal
          member={selectedMember}
          currentUserId={userId || ""}
          isOnlyOwner={isOnlyOwner(selectedMember)}
          onChangeRole={handleChangeRole}
          onRemove={handleOpenRemove}
          onClose={() => {
            setShowRoleModal(false);
            setSelectedMember(null);
          }}
        />
      )}

      {/* Remove Member Modal */}
      {showRemoveModal && selectedMember && (
        <RemoveMemberModal
          member={selectedMember}
          teamMembers={members}
          onRemove={handleRemove}
          onClose={() => {
            setShowRemoveModal(false);
            setSelectedMember(null);
          }}
        />
      )}
    </>
  );
}
