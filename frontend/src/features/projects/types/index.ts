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

// ─── Board Controls & Filtering ───────────────────────────────────────────────

export enum TaskSortingType {
  NONE = "NONE",
  DUE_DATE = "DUE_DATE",
  NAME = "NAME",
  MEMBERS = "MEMBERS",
  LABELS = "LABELS",
  COMPLETE = "COMPLETE",
}

export enum TaskSortingDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export interface TaskSorting {
  type: TaskSortingType;
  direction: TaskSortingDirection;
}

export enum DueDateFilterType {
  TODAY = "TODAY",
  TOMORROW = "TOMORROW",
  THIS_WEEK = "THIS_WEEK",
  NEXT_WEEK = "NEXT_WEEK",
  ONE_WEEK = "ONE_WEEK",
  TWO_WEEKS = "TWO_WEEKS",
  THREE_WEEKS = "THREE_WEEKS",
  OVERDUE = "OVERDUE",
  NO_DUE_DATE = "NO_DUE_DATE",
}

export interface DueDateFilter {
  type: DueDateFilterType;
  label: string;
}

export interface MemberFilter {
  id: string;
  username: string;
}

export interface LabelFilter {
  id: string;
  name: string;
  color: string;
}

export interface TaskFilters {
  taskName: string | null;
  members: MemberFilter[];
  labels: LabelFilter[];
  dueDate: DueDateFilter | null;
}

export enum TaskStatus {
  ALL = "ALL",
  INCOMPLETE = "INCOMPLETE",
  COMPLETE = "COMPLETE",
}

export enum TaskSince {
  ALL = "ALL",
  TODAY = "TODAY",
  YESTERDAY = "YESTERDAY",
  ONE_WEEK = "ONE_WEEK",
  TWO_WEEKS = "TWO_WEEKS",
  THREE_WEEKS = "THREE_WEEKS",
}

export interface TaskStatusFilter {
  status: TaskStatus;
  since: TaskSince;
}

export const DEFAULT_FILTERS: TaskFilters = {
  taskName: null,
  members: [],
  labels: [],
  dueDate: null,
};

export const DEFAULT_SORTING: TaskSorting = {
  type: TaskSortingType.NONE,
  direction: TaskSortingDirection.ASC,
};

export const DEFAULT_STATUS_FILTER: TaskStatusFilter = {
  status: TaskStatus.ALL,
  since: TaskSince.ALL,
};
