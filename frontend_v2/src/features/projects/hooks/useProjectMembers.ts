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
  /** Short ID from URL params — used as the cache key for FindProjectDocument */
  projectShortId: string;
  /** Full UUID from findProject result — used in mutation variables */
  projectUUID: string;
  onMembersChanged?: () => void;
}

export function useProjectMembers({
  projectShortId,
  projectUUID,
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
            projectID: projectUUID,
            members,
          },
          update: (cache, result) => {
            if (!result.data?.inviteProjectMembers) return;

            const data = cache.readQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectShortId },
            });

            if (!data?.findProject) return;

            const { invitedMembers: newInvited, members: newMembers } =
              result.data.inviteProjectMembers;

            cache.writeQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectShortId },
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
    [projectShortId, projectUUID, inviteMembers, onMembersChanged],
  );

  const removeProjectMember = useCallback(
    async (userId: string) => {
      try {
        await removeMember({
          variables: {
            projectID: projectUUID,
            userID: userId,
          },
          update: (cache) => {
            const data = cache.readQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectShortId },
            });

            if (!data?.findProject) return;

            cache.writeQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectShortId },
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
    [projectShortId, projectUUID, removeMember, onMembersChanged],
  );

  const cancelProjectInvite = useCallback(
    async (email: string) => {
      try {
        await cancelInvite({
          variables: {
            projectID: projectUUID,
            email,
          },
          update: (cache) => {
            const data = cache.readQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectShortId },
            });

            if (!data?.findProject) return;

            cache.writeQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectShortId },
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
    [projectShortId, projectUUID, cancelInvite, onMembersChanged],
  );

  const changeProjectMemberRole = useCallback(
    async (userId: string, roleCode: ProjectRoleCode) => {
      try {
        await changeRole({
          variables: {
            projectID: projectUUID,
            userID: userId,
            roleCode,
          },
          update: (cache, result) => {
            if (!result.data?.updateProjectMemberRole) return;

            const data = cache.readQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectShortId },
            });

            if (!data?.findProject) return;

            const updatedMember = result.data.updateProjectMemberRole.member;
            const updatedMembers = data.findProject.members.map((m) =>
              m.id === userId ? { ...m, role: updatedMember.role } : m,
            );

            cache.writeQuery<FindProjectQuery>({
              query: FindProjectDocument,
              variables: { projectID: projectShortId },
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
    [projectShortId, projectUUID, changeRole, onMembersChanged],
  );

  return {
    inviteProjectMembers,
    removeProjectMember,
    cancelProjectInvite,
    changeProjectMemberRole,
  };
}
