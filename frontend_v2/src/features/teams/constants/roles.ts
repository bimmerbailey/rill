import { RoleCode } from "@/graphql/generated/graphql";

export const ROLE_DESCRIPTIONS = {
  [RoleCode.Owner]: {
    name: "Owner",
    description:
      "Can view, create and edit team projects, and change settings for the team. Will have admin rights on all projects in this team. Can delete the team and all team projects.",
  },
  [RoleCode.Admin]: {
    name: "Admin",
    description:
      "Can view, create and edit team projects, and change settings for the team. Will have admin rights on all projects in this team.",
  },
  [RoleCode.Member]: {
    name: "Member",
    description:
      "Can view, create, and edit team projects, but not change settings.",
  },
  [RoleCode.Observer]: {
    name: "Observer",
    description: "Can view team projects but cannot create or edit them.",
  },
} as const;

export const POLLING = {
  TEAM: 5000, // 5 seconds for team details
  TEAM_MEMBERS: 5000, // 5 seconds for member list
  TEAM_PROJECTS: 5000, // 5 seconds for project list
};
