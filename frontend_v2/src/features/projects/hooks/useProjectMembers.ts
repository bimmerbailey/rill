import { useCallback } from "react";
import { showSuccess, showError } from "@/utils/toast";
import {
  FindProjectDocument,
  useInviteProjectMembersMutation,
  useDeleteProjectMemberMutation,
  useDeleteInvitedProjectMemberMutation,
  useUpdateProjectMemberRoleMutation,
  type FindProjectQuery,
} from "@/graphql/generated/graphql";
import type {
  InviteMemberData,
  ProjectRoleCode,
} from "@/features/projects/types";

interface UseProjectMembersOptions {
  projectId: string;
  onMembersChanged?: () => void;
}

export function useProjectMembers({
  projectId,
  onMembersChanged,
}: UseProjectMembersOptions) {
  const [inviteMembers] = useInviteProjectMembersMutation();
  const [removeMember] = useDeleteProjectMemberMutation();
  const [cancelInvite] = useDeleteInvitedProjectMemberMutation();
  const [changeRole] = useUpdateProjectMemberRoleMutation();

  const inviteProjectMembers = useCallback(
    async (members: InviteMemberData[]) => {
      try {
        await inviteMembers({
          variables: {
            projectID: projectId,
            members,
          },
          update: (cache, result) => {
            if (!result.data?.inviteProjectMembers) return;

            const data = cache.readQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectId },
            });

            if (!data?.findProject) return;

            const { invitedMembers: newInvited, members: newMembers } =
              result.data.inviteProjectMembers;

            cache.writeQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectId },
              data: {
                ...data,
                findProject: {
                  ...data.findProject,
                  invitedMembers: [
                    ...(data.findProject.invitedMembers || []),
                    ...(newInvited || []),
                  ],
                  members: [
                    ...(data.findProject.members || []),
                    ...(newMembers || []),
                  ],
                },
              },
            });
          },
        });
        showSuccess("Members invited successfully");
        onMembersChanged?.();
        return true;
      } catch (err) {
        showError("Failed to invite members");
        console.error(err);
        return false;
      }
    },
    [projectId, inviteMembers, onMembersChanged],
  );

  const removeProjectMember = useCallback(
    async (userId: string) => {
      try {
        await removeMember({
          variables: {
            projectID: projectId,
            userID: userId,
          },
          update: (cache) => {
            const data = cache.readQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectId },
            });

            if (!data?.findProject) return;

            cache.writeQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectId },
              data: {
                ...data,
                findProject: {
                  ...data.findProject,
                  members: data.findProject.members.filter(
                    (m) => m.id !== userId,
                  ),
                },
              },
            });
          },
        });
        showSuccess("Member removed from project");
        onMembersChanged?.();
        return true;
      } catch (err) {
        showError("Failed to remove member");
        console.error(err);
        return false;
      }
    },
    [projectId, removeMember, onMembersChanged],
  );

  const cancelProjectInvite = useCallback(
    async (email: string) => {
      try {
        await cancelInvite({
          variables: {
            projectID: projectId,
            email,
          },
          update: (cache) => {
            const data = cache.readQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectId },
            });

            if (!data?.findProject) return;

            cache.writeQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectId },
              data: {
                ...data,
                findProject: {
                  ...data.findProject,
                  invitedMembers: data.findProject.invitedMembers.filter(
                    (m) => m.email !== email,
                  ),
                },
              },
            });
          },
        });
        showSuccess("Invite cancelled");
        onMembersChanged?.();
        return true;
      } catch (err) {
        showError("Failed to cancel invite");
        console.error(err);
        return false;
      }
    },
    [projectId, cancelInvite, onMembersChanged],
  );

  const changeProjectMemberRole = useCallback(
    async (userId: string, roleCode: ProjectRoleCode) => {
      try {
        await changeRole({
          variables: {
            projectID: projectId,
            userID: userId,
            roleCode,
          },
          update: (cache, result) => {
            if (!result.data?.updateProjectMemberRole) return;

            const data = cache.readQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectId },
            });

            if (!data?.findProject) return;

            const updatedMember = result.data.updateProjectMemberRole.member;
            const updatedMembers = data.findProject.members.map((m) =>
              m.id === userId ? { ...m, role: updatedMember.role } : m,
            );

            cache.writeQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectId },
              data: {
                ...data,
                findProject: {
                  ...data.findProject,
                  members: updatedMembers,
                },
              },
            });
          },
        });
        showSuccess("Role updated successfully");
        onMembersChanged?.();
        return true;
      } catch (err) {
        showError("Failed to update role");
        console.error(err);
        return false;
      }
    },
    [projectId, changeRole, onMembersChanged],
  );

  return {
    inviteProjectMembers,
    removeProjectMember,
    cancelProjectInvite,
    changeProjectMemberRole,
  };
}
