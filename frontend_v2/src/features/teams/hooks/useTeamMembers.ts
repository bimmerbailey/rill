import { useMutation } from "@apollo/client/react";
import {
  CreateTeamMemberDocument,
  DeleteTeamMemberDocument,
  UpdateTeamMemberRoleDocument,
  RoleCode,
  GetTeamDocument,
  type GetTeamQuery,
} from "@/graphql/generated/graphql";
import { showSuccess, showError } from "@/utils/toast";

export function useTeamMembers(teamId: string) {
  const [createMember] = useMutation(CreateTeamMemberDocument, {
    update: (cache, { data }) => {
      if (!data?.createTeamMember) return;

      const existingData = cache.readQuery<GetTeamQuery>({
        query: GetTeamDocument,
        variables: { teamID: teamId },
      });

      if (existingData?.findTeam) {
        cache.writeQuery<GetTeamQuery>({
          query: GetTeamDocument,
          variables: { teamID: teamId },
          data: {
            ...existingData,
            findTeam: {
              ...existingData.findTeam,
              members: [
                ...existingData.findTeam.members,
                {
                  ...data.createTeamMember.teamMember,
                  owned: { __typename: "OwnedList", teams: [], projects: [] },
                  member: { __typename: "MemberList", teams: [], projects: [] },
                },
              ],
            },
          },
        });
      }
    },
  });

  const [deleteMember] = useMutation(DeleteTeamMemberDocument, {
    update: (cache, { data }) => {
      if (!data?.deleteTeamMember) return;

      const existingData = cache.readQuery<GetTeamQuery>({
        query: GetTeamDocument,
        variables: { teamID: teamId },
      });

      if (existingData?.findTeam) {
        cache.writeQuery<GetTeamQuery>({
          query: GetTeamDocument,
          variables: { teamID: teamId },
          data: {
            ...existingData,
            findTeam: {
              ...existingData.findTeam,
              members: existingData.findTeam.members.filter(
                (member) => member.id !== data.deleteTeamMember.userID,
              ),
            },
          },
        });
      }
    },
  });

  const [updateRole] = useMutation(UpdateTeamMemberRoleDocument, {
    update: (cache, { data }) => {
      if (!data?.updateTeamMemberRole) return;

      const existingData = cache.readQuery<GetTeamQuery>({
        query: GetTeamDocument,
        variables: { teamID: teamId },
      });

      if (existingData?.findTeam) {
        cache.writeQuery<GetTeamQuery>({
          query: GetTeamDocument,
          variables: { teamID: teamId },
          data: {
            ...existingData,
            findTeam: {
              ...existingData.findTeam,
              members: existingData.findTeam.members.map((member) =>
                member.id === data.updateTeamMemberRole.member.id
                  ? {
                      ...member,
                      role: data.updateTeamMemberRole.member.role,
                    }
                  : member,
              ),
            },
          },
        });
      }
    },
  });

  const inviteMember = async (userId: string) => {
    try {
      await createMember({
        variables: { teamID: teamId, userID: userId },
      });
      showSuccess("Member invited successfully");
    } catch (error) {
      showError("Failed to invite member");
      throw error;
    }
  };

  const removeMember = async (userId: string, newOwnerId?: string | null) => {
    try {
      await deleteMember({
        variables: {
          teamID: teamId,
          userID: userId,
          newOwnerID: newOwnerId || undefined,
        },
      });
      showSuccess("Member removed successfully");
    } catch (error) {
      showError("Failed to remove member");
      throw error;
    }
  };

  const changeRole = async (userId: string, roleCode: RoleCode) => {
    try {
      await updateRole({
        variables: { teamID: teamId, userID: userId, roleCode },
      });
      showSuccess("Role updated successfully");
    } catch (error) {
      showError("Failed to update role");
      throw error;
    }
  };

  return {
    inviteMember,
    removeMember,
    changeRole,
  };
}
