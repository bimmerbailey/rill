import type { FindProjectQuery, RoleCode } from "@/graphql/generated/graphql";

export type { FindProjectQuery };

export type ProjectMember = FindProjectQuery["findProject"]["members"][number];
export type InvitedMember =
  FindProjectQuery["findProject"]["invitedMembers"][number];
export type ProjectLabel = FindProjectQuery["findProject"]["labels"][number];
export type LabelColor = FindProjectQuery["labelColors"][number];
export type ProjectUser = FindProjectQuery["users"][number];
export type ProjectRoleCode = RoleCode;

export interface LabelFormData {
  name: string;
  labelColorId: string;
}

export interface InviteMemberData {
  email?: string;
  userID?: string;
}
