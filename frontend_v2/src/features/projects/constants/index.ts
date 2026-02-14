import { RoleCode } from "@/graphql/generated/graphql";

export const PROJECT_ROLES = {
  owner: {
    code: RoleCode.Owner,
    name: "Owner",
    description:
      "Can view, create, and edit all project content. Can delete the project.",
  },
  admin: {
    code: RoleCode.Admin,
    name: "Admin",
    description:
      "Can view, create, and edit all project content. Cannot delete the project.",
  },
  member: {
    code: RoleCode.Member,
    name: "Member",
    description: "Can create and edit tasks. Cannot access project settings.",
  },
  observer: {
    code: RoleCode.Observer,
    name: "Observer",
    description: "Can only view and comment on tasks. Cannot make changes.",
  },
};

export type ProjectRoleCode = RoleCode;
