import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Time: { input: any; output: any };
  UUID: { input: string; output: string };
  Upload: { input: any; output: any };
};

export enum ActionLevel {
  Org = "ORG",
  Project = "PROJECT",
  Team = "TEAM",
}

export enum ActionType {
  CommentMentioned = "COMMENT_MENTIONED",
  CommentOther = "COMMENT_OTHER",
  DueDateAdded = "DUE_DATE_ADDED",
  DueDateChanged = "DUE_DATE_CHANGED",
  DueDateReminder = "DUE_DATE_REMINDER",
  DueDateRemoved = "DUE_DATE_REMOVED",
  ProjectAdded = "PROJECT_ADDED",
  ProjectArchived = "PROJECT_ARCHIVED",
  ProjectRemoved = "PROJECT_REMOVED",
  TaskArchived = "TASK_ARCHIVED",
  TaskAssigned = "TASK_ASSIGNED",
  TaskAttachmentUploaded = "TASK_ATTACHMENT_UPLOADED",
  TaskMoved = "TASK_MOVED",
  TeamAdded = "TEAM_ADDED",
  TeamRemoved = "TEAM_REMOVED",
}

export enum ActivityType {
  TaskAdded = "TASK_ADDED",
  TaskChecklistAdded = "TASK_CHECKLIST_ADDED",
  TaskChecklistChanged = "TASK_CHECKLIST_CHANGED",
  TaskChecklistRemoved = "TASK_CHECKLIST_REMOVED",
  TaskDueDateAdded = "TASK_DUE_DATE_ADDED",
  TaskDueDateChanged = "TASK_DUE_DATE_CHANGED",
  TaskDueDateRemoved = "TASK_DUE_DATE_REMOVED",
  TaskMarkedComplete = "TASK_MARKED_COMPLETE",
  TaskMarkedIncomplete = "TASK_MARKED_INCOMPLETE",
  TaskMoved = "TASK_MOVED",
}

export type AddTaskLabelInput = {
  projectLabelID: Scalars["UUID"]["input"];
  taskID: Scalars["UUID"]["input"];
};

export type AssignTaskInput = {
  taskID: Scalars["UUID"]["input"];
  userID: Scalars["UUID"]["input"];
};

export type CausedBy = {
  __typename?: "CausedBy";
  fullName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  profileIcon?: Maybe<ProfileIcon>;
};

export type ChecklistBadge = {
  __typename?: "ChecklistBadge";
  complete: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type CommentsBadge = {
  __typename?: "CommentsBadge";
  total: Scalars["Int"]["output"];
  unread: Scalars["Boolean"]["output"];
};

export type CreateTaskChecklist = {
  name: Scalars["String"]["input"];
  position: Scalars["Float"]["input"];
  taskID: Scalars["UUID"]["input"];
};

export type CreateTaskChecklistItem = {
  name: Scalars["String"]["input"];
  position: Scalars["Float"]["input"];
  taskChecklistID: Scalars["UUID"]["input"];
};

export type CreateTaskComment = {
  message: Scalars["String"]["input"];
  taskID: Scalars["UUID"]["input"];
};

export type CreateTaskCommentPayload = {
  __typename?: "CreateTaskCommentPayload";
  comment: TaskComment;
  taskID: Scalars["UUID"]["output"];
};

export type CreateTaskDueDateNotification = {
  duration: DueDateNotificationDuration;
  period: Scalars["Int"]["input"];
  taskID: Scalars["UUID"]["input"];
};

export type CreateTaskDueDateNotificationsResult = {
  __typename?: "CreateTaskDueDateNotificationsResult";
  notifications: Array<DueDateNotification>;
};

export type CreateTeamMember = {
  teamID: Scalars["UUID"]["input"];
  userID: Scalars["UUID"]["input"];
};

export type CreateTeamMemberPayload = {
  __typename?: "CreateTeamMemberPayload";
  team: Team;
  teamMember: Member;
};

export type CreatedBy = {
  __typename?: "CreatedBy";
  fullName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  profileIcon: ProfileIcon;
};

export type DeleteInvitedProjectMember = {
  email: Scalars["String"]["input"];
  projectID: Scalars["UUID"]["input"];
};

export type DeleteInvitedProjectMemberPayload = {
  __typename?: "DeleteInvitedProjectMemberPayload";
  invitedMember: InvitedMember;
};

export type DeleteInvitedUserAccount = {
  invitedUserID: Scalars["UUID"]["input"];
};

export type DeleteInvitedUserAccountPayload = {
  __typename?: "DeleteInvitedUserAccountPayload";
  invitedUser: InvitedUserAccount;
};

export type DeleteProject = {
  projectID: Scalars["UUID"]["input"];
};

export type DeleteProjectLabel = {
  projectLabelID: Scalars["UUID"]["input"];
};

export type DeleteProjectMember = {
  projectID: Scalars["UUID"]["input"];
  userID: Scalars["UUID"]["input"];
};

export type DeleteProjectMemberPayload = {
  __typename?: "DeleteProjectMemberPayload";
  member: Member;
  ok: Scalars["Boolean"]["output"];
  projectID: Scalars["UUID"]["output"];
};

export type DeleteProjectPayload = {
  __typename?: "DeleteProjectPayload";
  ok: Scalars["Boolean"]["output"];
  project: Project;
};

export type DeleteTaskChecklist = {
  taskChecklistID: Scalars["UUID"]["input"];
};

export type DeleteTaskChecklistItem = {
  taskChecklistItemID: Scalars["UUID"]["input"];
};

export type DeleteTaskChecklistItemPayload = {
  __typename?: "DeleteTaskChecklistItemPayload";
  ok: Scalars["Boolean"]["output"];
  taskChecklistItem: TaskChecklistItem;
};

export type DeleteTaskChecklistPayload = {
  __typename?: "DeleteTaskChecklistPayload";
  ok: Scalars["Boolean"]["output"];
  taskChecklist: TaskChecklist;
};

export type DeleteTaskComment = {
  commentID: Scalars["UUID"]["input"];
};

export type DeleteTaskCommentPayload = {
  __typename?: "DeleteTaskCommentPayload";
  commentID: Scalars["UUID"]["output"];
  taskID: Scalars["UUID"]["output"];
};

export type DeleteTaskDueDateNotification = {
  id: Scalars["UUID"]["input"];
};

export type DeleteTaskDueDateNotificationsResult = {
  __typename?: "DeleteTaskDueDateNotificationsResult";
  notifications: Array<Scalars["UUID"]["output"]>;
};

export type DeleteTaskGroupInput = {
  taskGroupID: Scalars["UUID"]["input"];
};

export type DeleteTaskGroupPayload = {
  __typename?: "DeleteTaskGroupPayload";
  affectedRows: Scalars["Int"]["output"];
  ok: Scalars["Boolean"]["output"];
  taskGroup: TaskGroup;
};

export type DeleteTaskGroupTasks = {
  taskGroupID: Scalars["UUID"]["input"];
};

export type DeleteTaskGroupTasksPayload = {
  __typename?: "DeleteTaskGroupTasksPayload";
  taskGroupID: Scalars["UUID"]["output"];
  tasks: Array<Scalars["UUID"]["output"]>;
};

export type DeleteTaskInput = {
  taskID: Scalars["UUID"]["input"];
};

export type DeleteTaskPayload = {
  __typename?: "DeleteTaskPayload";
  taskID: Scalars["UUID"]["output"];
};

export type DeleteTeam = {
  teamID: Scalars["UUID"]["input"];
};

export type DeleteTeamMember = {
  newOwnerID?: InputMaybe<Scalars["UUID"]["input"]>;
  teamID: Scalars["UUID"]["input"];
  userID: Scalars["UUID"]["input"];
};

export type DeleteTeamMemberPayload = {
  __typename?: "DeleteTeamMemberPayload";
  affectedProjects: Array<Project>;
  teamID: Scalars["UUID"]["output"];
  userID: Scalars["UUID"]["output"];
};

export type DeleteTeamPayload = {
  __typename?: "DeleteTeamPayload";
  ok: Scalars["Boolean"]["output"];
  projects: Array<Project>;
  team: Team;
};

export type DeleteUserAccount = {
  newOwnerID?: InputMaybe<Scalars["UUID"]["input"]>;
  userID: Scalars["UUID"]["input"];
};

export type DeleteUserAccountPayload = {
  __typename?: "DeleteUserAccountPayload";
  ok: Scalars["Boolean"]["output"];
  userAccount: UserAccount;
};

export type DueDate = {
  __typename?: "DueDate";
  at?: Maybe<Scalars["Time"]["output"]>;
  notifications: Array<DueDateNotification>;
};

export type DueDateNotification = {
  __typename?: "DueDateNotification";
  duration: DueDateNotificationDuration;
  id: Scalars["ID"]["output"];
  period: Scalars["Int"]["output"];
};

export enum DueDateNotificationDuration {
  Day = "DAY",
  Hour = "HOUR",
  Minute = "MINUTE",
  Week = "WEEK",
}

export type DuplicateTaskGroup = {
  name: Scalars["String"]["input"];
  position: Scalars["Float"]["input"];
  projectID: Scalars["UUID"]["input"];
  taskGroupID: Scalars["UUID"]["input"];
};

export type DuplicateTaskGroupPayload = {
  __typename?: "DuplicateTaskGroupPayload";
  taskGroup: TaskGroup;
};

export type FindProject = {
  projectID?: InputMaybe<Scalars["UUID"]["input"]>;
  projectShortID?: InputMaybe<Scalars["String"]["input"]>;
};

export type FindTask = {
  taskID?: InputMaybe<Scalars["UUID"]["input"]>;
  taskShortID?: InputMaybe<Scalars["String"]["input"]>;
};

export type FindTeam = {
  teamID: Scalars["UUID"]["input"];
};

export type FindUser = {
  userID: Scalars["UUID"]["input"];
};

export type HasUnreadNotificationsResult = {
  __typename?: "HasUnreadNotificationsResult";
  unread: Scalars["Boolean"]["output"];
};

export type InviteProjectMembers = {
  members: Array<MemberInvite>;
  projectID: Scalars["UUID"]["input"];
};

export type InviteProjectMembersPayload = {
  __typename?: "InviteProjectMembersPayload";
  invitedMembers: Array<InvitedMember>;
  members: Array<Member>;
  ok: Scalars["Boolean"]["output"];
  projectID: Scalars["UUID"]["output"];
};

export type InvitedMember = {
  __typename?: "InvitedMember";
  email: Scalars["String"]["output"];
  invitedOn: Scalars["Time"]["output"];
};

export type InvitedUserAccount = {
  __typename?: "InvitedUserAccount";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  invitedOn: Scalars["Time"]["output"];
  member: MemberList;
};

export type LabelColor = {
  __typename?: "LabelColor";
  colorHex: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  position: Scalars["Float"]["output"];
};

export type LogoutUser = {
  userID: Scalars["UUID"]["input"];
};

export type MePayload = {
  __typename?: "MePayload";
  organization?: Maybe<RoleCode>;
  projectRoles: Array<ProjectRole>;
  teamRoles: Array<TeamRole>;
  user: UserAccount;
};

export type Member = {
  __typename?: "Member";
  fullName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  member: MemberList;
  owned: OwnedList;
  profileIcon: ProfileIcon;
  role: Role;
  username: Scalars["String"]["output"];
};

export type MemberInvite = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  userID?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type MemberList = {
  __typename?: "MemberList";
  projects: Array<Project>;
  teams: Array<Team>;
};

export type MemberSearchFilter = {
  projectID?: InputMaybe<Scalars["UUID"]["input"]>;
  searchFilter: Scalars["String"]["input"];
};

export type MemberSearchResult = {
  __typename?: "MemberSearchResult";
  id: Scalars["String"]["output"];
  similarity: Scalars["Int"]["output"];
  status: ShareStatus;
  user?: Maybe<UserAccount>;
};

export type Mutation = {
  __typename?: "Mutation";
  addTaskLabel: Task;
  assignTask: Task;
  clearProfileAvatar: UserAccount;
  createProject: Project;
  createProjectLabel: ProjectLabel;
  createTask: Task;
  createTaskChecklist: TaskChecklist;
  createTaskChecklistItem: TaskChecklistItem;
  createTaskComment: CreateTaskCommentPayload;
  createTaskDueDateNotifications: CreateTaskDueDateNotificationsResult;
  createTaskGroup: TaskGroup;
  createTeam: Team;
  createTeamMember: CreateTeamMemberPayload;
  createUserAccount: UserAccount;
  deleteInvitedProjectMember: DeleteInvitedProjectMemberPayload;
  deleteInvitedUserAccount: DeleteInvitedUserAccountPayload;
  deleteProject: DeleteProjectPayload;
  deleteProjectLabel: ProjectLabel;
  deleteProjectMember: DeleteProjectMemberPayload;
  deleteTask: DeleteTaskPayload;
  deleteTaskChecklist: DeleteTaskChecklistPayload;
  deleteTaskChecklistItem: DeleteTaskChecklistItemPayload;
  deleteTaskComment: DeleteTaskCommentPayload;
  deleteTaskDueDateNotifications: DeleteTaskDueDateNotificationsResult;
  deleteTaskGroup: DeleteTaskGroupPayload;
  deleteTaskGroupTasks: DeleteTaskGroupTasksPayload;
  deleteTeam: DeleteTeamPayload;
  deleteTeamMember: DeleteTeamMemberPayload;
  deleteUserAccount: DeleteUserAccountPayload;
  duplicateTaskGroup: DuplicateTaskGroupPayload;
  inviteProjectMembers: InviteProjectMembersPayload;
  logoutUser: Scalars["Boolean"]["output"];
  notificationMarkAllRead: NotificationMarkAllAsReadResult;
  notificationToggleRead: Notified;
  removeTaskLabel: Task;
  setTaskChecklistItemComplete: TaskChecklistItem;
  setTaskComplete: Task;
  sortTaskGroup: SortTaskGroupPayload;
  toggleProjectVisibility: ToggleProjectVisibilityPayload;
  toggleTaskLabel: ToggleTaskLabelPayload;
  toggleTaskWatch: Task;
  unassignTask: Task;
  updateProjectLabel: ProjectLabel;
  updateProjectLabelColor: ProjectLabel;
  updateProjectLabelName: ProjectLabel;
  updateProjectMemberRole: UpdateProjectMemberRolePayload;
  updateProjectName: Project;
  updateTaskChecklistItemLocation: UpdateTaskChecklistItemLocationPayload;
  updateTaskChecklistItemName: TaskChecklistItem;
  updateTaskChecklistLocation: UpdateTaskChecklistLocationPayload;
  updateTaskChecklistName: TaskChecklist;
  updateTaskComment: UpdateTaskCommentPayload;
  updateTaskDescription: Task;
  updateTaskDueDate: Task;
  updateTaskDueDateNotifications: UpdateTaskDueDateNotificationsResult;
  updateTaskGroupLocation: TaskGroup;
  updateTaskGroupName: TaskGroup;
  updateTaskLocation: UpdateTaskLocationPayload;
  updateTaskName: Task;
  updateTeamMemberRole: UpdateTeamMemberRolePayload;
  updateUserInfo: UpdateUserInfoPayload;
  updateUserPassword: UpdateUserPasswordPayload;
  updateUserRole: UpdateUserRolePayload;
};

export type MutationAddTaskLabelArgs = {
  input?: InputMaybe<AddTaskLabelInput>;
};

export type MutationAssignTaskArgs = {
  input?: InputMaybe<AssignTaskInput>;
};

export type MutationCreateProjectArgs = {
  input: NewProject;
};

export type MutationCreateProjectLabelArgs = {
  input: NewProjectLabel;
};

export type MutationCreateTaskArgs = {
  input: NewTask;
};

export type MutationCreateTaskChecklistArgs = {
  input: CreateTaskChecklist;
};

export type MutationCreateTaskChecklistItemArgs = {
  input: CreateTaskChecklistItem;
};

export type MutationCreateTaskCommentArgs = {
  input?: InputMaybe<CreateTaskComment>;
};

export type MutationCreateTaskDueDateNotificationsArgs = {
  input: Array<CreateTaskDueDateNotification>;
};

export type MutationCreateTaskGroupArgs = {
  input: NewTaskGroup;
};

export type MutationCreateTeamArgs = {
  input: NewTeam;
};

export type MutationCreateTeamMemberArgs = {
  input: CreateTeamMember;
};

export type MutationCreateUserAccountArgs = {
  input: NewUserAccount;
};

export type MutationDeleteInvitedProjectMemberArgs = {
  input: DeleteInvitedProjectMember;
};

export type MutationDeleteInvitedUserAccountArgs = {
  input: DeleteInvitedUserAccount;
};

export type MutationDeleteProjectArgs = {
  input: DeleteProject;
};

export type MutationDeleteProjectLabelArgs = {
  input: DeleteProjectLabel;
};

export type MutationDeleteProjectMemberArgs = {
  input: DeleteProjectMember;
};

export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};

export type MutationDeleteTaskChecklistArgs = {
  input: DeleteTaskChecklist;
};

export type MutationDeleteTaskChecklistItemArgs = {
  input: DeleteTaskChecklistItem;
};

export type MutationDeleteTaskCommentArgs = {
  input?: InputMaybe<DeleteTaskComment>;
};

export type MutationDeleteTaskDueDateNotificationsArgs = {
  input: Array<DeleteTaskDueDateNotification>;
};

export type MutationDeleteTaskGroupArgs = {
  input: DeleteTaskGroupInput;
};

export type MutationDeleteTaskGroupTasksArgs = {
  input: DeleteTaskGroupTasks;
};

export type MutationDeleteTeamArgs = {
  input: DeleteTeam;
};

export type MutationDeleteTeamMemberArgs = {
  input: DeleteTeamMember;
};

export type MutationDeleteUserAccountArgs = {
  input: DeleteUserAccount;
};

export type MutationDuplicateTaskGroupArgs = {
  input: DuplicateTaskGroup;
};

export type MutationInviteProjectMembersArgs = {
  input: InviteProjectMembers;
};

export type MutationLogoutUserArgs = {
  input: LogoutUser;
};

export type MutationNotificationToggleReadArgs = {
  input: NotificationToggleReadInput;
};

export type MutationRemoveTaskLabelArgs = {
  input?: InputMaybe<RemoveTaskLabelInput>;
};

export type MutationSetTaskChecklistItemCompleteArgs = {
  input: SetTaskChecklistItemComplete;
};

export type MutationSetTaskCompleteArgs = {
  input: SetTaskComplete;
};

export type MutationSortTaskGroupArgs = {
  input: SortTaskGroup;
};

export type MutationToggleProjectVisibilityArgs = {
  input: ToggleProjectVisibility;
};

export type MutationToggleTaskLabelArgs = {
  input: ToggleTaskLabelInput;
};

export type MutationToggleTaskWatchArgs = {
  input: ToggleTaskWatch;
};

export type MutationUnassignTaskArgs = {
  input?: InputMaybe<UnassignTaskInput>;
};

export type MutationUpdateProjectLabelArgs = {
  input: UpdateProjectLabel;
};

export type MutationUpdateProjectLabelColorArgs = {
  input: UpdateProjectLabelColor;
};

export type MutationUpdateProjectLabelNameArgs = {
  input: UpdateProjectLabelName;
};

export type MutationUpdateProjectMemberRoleArgs = {
  input: UpdateProjectMemberRole;
};

export type MutationUpdateProjectNameArgs = {
  input?: InputMaybe<UpdateProjectName>;
};

export type MutationUpdateTaskChecklistItemLocationArgs = {
  input: UpdateTaskChecklistItemLocation;
};

export type MutationUpdateTaskChecklistItemNameArgs = {
  input: UpdateTaskChecklistItemName;
};

export type MutationUpdateTaskChecklistLocationArgs = {
  input: UpdateTaskChecklistLocation;
};

export type MutationUpdateTaskChecklistNameArgs = {
  input: UpdateTaskChecklistName;
};

export type MutationUpdateTaskCommentArgs = {
  input?: InputMaybe<UpdateTaskComment>;
};

export type MutationUpdateTaskDescriptionArgs = {
  input: UpdateTaskDescriptionInput;
};

export type MutationUpdateTaskDueDateArgs = {
  input: UpdateTaskDueDate;
};

export type MutationUpdateTaskDueDateNotificationsArgs = {
  input: Array<UpdateTaskDueDateNotification>;
};

export type MutationUpdateTaskGroupLocationArgs = {
  input: NewTaskGroupLocation;
};

export type MutationUpdateTaskGroupNameArgs = {
  input: UpdateTaskGroupName;
};

export type MutationUpdateTaskLocationArgs = {
  input: NewTaskLocation;
};

export type MutationUpdateTaskNameArgs = {
  input: UpdateTaskName;
};

export type MutationUpdateTeamMemberRoleArgs = {
  input: UpdateTeamMemberRole;
};

export type MutationUpdateUserInfoArgs = {
  input: UpdateUserInfo;
};

export type MutationUpdateUserPasswordArgs = {
  input: UpdateUserPassword;
};

export type MutationUpdateUserRoleArgs = {
  input: UpdateUserRole;
};

export type MyTasks = {
  sort: MyTasksSort;
  status: MyTasksStatus;
};

export type MyTasksPayload = {
  __typename?: "MyTasksPayload";
  projects: Array<ProjectTaskMapping>;
  tasks: Array<Task>;
};

export enum MyTasksSort {
  DueDate = "DUE_DATE",
  None = "NONE",
  Project = "PROJECT",
}

export enum MyTasksStatus {
  All = "ALL",
  CompleteAll = "COMPLETE_ALL",
  CompleteOneWeek = "COMPLETE_ONE_WEEK",
  CompleteThreeWeek = "COMPLETE_THREE_WEEK",
  CompleteToday = "COMPLETE_TODAY",
  CompleteTwoWeek = "COMPLETE_TWO_WEEK",
  CompleteYesterday = "COMPLETE_YESTERDAY",
  Incomplete = "INCOMPLETE",
}

export type NewProject = {
  name: Scalars["String"]["input"];
  teamID?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type NewProjectLabel = {
  labelColorID: Scalars["UUID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  projectID: Scalars["UUID"]["input"];
};

export type NewTask = {
  assigned?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
  name: Scalars["String"]["input"];
  position: Scalars["Float"]["input"];
  taskGroupID: Scalars["UUID"]["input"];
};

export type NewTaskGroup = {
  name: Scalars["String"]["input"];
  position: Scalars["Float"]["input"];
  projectID: Scalars["UUID"]["input"];
};

export type NewTaskGroupLocation = {
  position: Scalars["Float"]["input"];
  taskGroupID: Scalars["UUID"]["input"];
};

export type NewTaskLocation = {
  position: Scalars["Float"]["input"];
  taskGroupID: Scalars["UUID"]["input"];
  taskID: Scalars["UUID"]["input"];
};

export type NewTeam = {
  name: Scalars["String"]["input"];
  organizationID: Scalars["UUID"]["input"];
};

export type NewUserAccount = {
  email: Scalars["String"]["input"];
  fullName: Scalars["String"]["input"];
  initials: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  roleCode: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type Notification = {
  __typename?: "Notification";
  actionType: ActionType;
  causedBy?: Maybe<NotificationCausedBy>;
  createdAt: Scalars["Time"]["output"];
  data: Array<NotificationData>;
  id: Scalars["ID"]["output"];
};

export type NotificationCausedBy = {
  __typename?: "NotificationCausedBy";
  fullname: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  username: Scalars["String"]["output"];
};

export type NotificationData = {
  __typename?: "NotificationData";
  key: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
};

export enum NotificationFilter {
  All = "ALL",
  Assigned = "ASSIGNED",
  Mentioned = "MENTIONED",
  Unread = "UNREAD",
}

export type NotificationMarkAllAsReadResult = {
  __typename?: "NotificationMarkAllAsReadResult";
  success: Scalars["Boolean"]["output"];
};

export type NotificationToggleReadInput = {
  notifiedID: Scalars["UUID"]["input"];
};

export type Notified = {
  __typename?: "Notified";
  id: Scalars["ID"]["output"];
  notification: Notification;
  read: Scalars["Boolean"]["output"];
  readAt?: Maybe<Scalars["Time"]["output"]>;
};

export type NotifiedInput = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  filter: NotificationFilter;
  limit: Scalars["Int"]["input"];
};

export type NotifiedResult = {
  __typename?: "NotifiedResult";
  notified: Array<Notified>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export enum ObjectType {
  Org = "ORG",
  Project = "PROJECT",
  Task = "TASK",
  TaskChecklist = "TASK_CHECKLIST",
  TaskChecklistItem = "TASK_CHECKLIST_ITEM",
  TaskGroup = "TASK_GROUP",
  Team = "TEAM",
}

export type Organization = {
  __typename?: "Organization";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type OwnedList = {
  __typename?: "OwnedList";
  projects: Array<Project>;
  teams: Array<Team>;
};

export type OwnersList = {
  __typename?: "OwnersList";
  projects: Array<Scalars["UUID"]["output"]>;
  teams: Array<Scalars["UUID"]["output"]>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
};

export type ProfileIcon = {
  __typename?: "ProfileIcon";
  bgColor?: Maybe<Scalars["String"]["output"]>;
  initials?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

export type Project = {
  __typename?: "Project";
  createdAt: Scalars["Time"]["output"];
  id: Scalars["ID"]["output"];
  invitedMembers: Array<InvitedMember>;
  labels: Array<ProjectLabel>;
  members: Array<Member>;
  name: Scalars["String"]["output"];
  permission: ProjectPermission;
  publicOn?: Maybe<Scalars["Time"]["output"]>;
  shortId: Scalars["String"]["output"];
  taskGroups: Array<TaskGroup>;
  team?: Maybe<Team>;
};

export type ProjectLabel = {
  __typename?: "ProjectLabel";
  createdDate: Scalars["Time"]["output"];
  id: Scalars["ID"]["output"];
  labelColor: LabelColor;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type ProjectPermission = {
  __typename?: "ProjectPermission";
  org: RoleCode;
  project: RoleCode;
  team: RoleCode;
};

export type ProjectRole = {
  __typename?: "ProjectRole";
  projectID: Scalars["UUID"]["output"];
  roleCode: RoleCode;
};

export type ProjectTaskMapping = {
  __typename?: "ProjectTaskMapping";
  projectID: Scalars["UUID"]["output"];
  taskID: Scalars["UUID"]["output"];
};

export type ProjectsFilter = {
  teamID?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  findProject: Project;
  findTask: Task;
  findTeam: Team;
  findUser: UserAccount;
  hasUnreadNotifications: HasUnreadNotificationsResult;
  invitedUsers: Array<InvitedUserAccount>;
  labelColors: Array<LabelColor>;
  me?: Maybe<MePayload>;
  myTasks: MyTasksPayload;
  notifications: Array<Notified>;
  notified: NotifiedResult;
  organizations: Array<Organization>;
  projects: Array<Project>;
  searchMembers: Array<MemberSearchResult>;
  taskGroups: Array<TaskGroup>;
  teams: Array<Team>;
  users: Array<UserAccount>;
};

export type QueryFindProjectArgs = {
  input: FindProject;
};

export type QueryFindTaskArgs = {
  input: FindTask;
};

export type QueryFindTeamArgs = {
  input: FindTeam;
};

export type QueryFindUserArgs = {
  input: FindUser;
};

export type QueryMyTasksArgs = {
  input: MyTasks;
};

export type QueryNotifiedArgs = {
  input: NotifiedInput;
};

export type QueryProjectsArgs = {
  input?: InputMaybe<ProjectsFilter>;
};

export type QuerySearchMembersArgs = {
  input: MemberSearchFilter;
};

export type RemoveTaskLabelInput = {
  taskID: Scalars["UUID"]["input"];
  taskLabelID: Scalars["UUID"]["input"];
};

export type Role = {
  __typename?: "Role";
  code: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export enum RoleCode {
  Admin = "admin",
  Member = "member",
  Observer = "observer",
  Owner = "owner",
}

export enum RoleLevel {
  Admin = "ADMIN",
  Member = "MEMBER",
}

export type SetTaskChecklistItemComplete = {
  complete: Scalars["Boolean"]["input"];
  taskChecklistItemID: Scalars["UUID"]["input"];
};

export type SetTaskComplete = {
  complete: Scalars["Boolean"]["input"];
  taskID: Scalars["UUID"]["input"];
};

export enum ShareStatus {
  Invited = "INVITED",
  Joined = "JOINED",
}

export type SortTaskGroup = {
  taskGroupID: Scalars["UUID"]["input"];
  tasks: Array<TaskPositionUpdate>;
};

export type SortTaskGroupPayload = {
  __typename?: "SortTaskGroupPayload";
  taskGroupID: Scalars["UUID"]["output"];
  tasks: Array<Task>;
};

export type Subscription = {
  __typename?: "Subscription";
  notificationAdded: Notified;
};

export type Task = {
  __typename?: "Task";
  activity: Array<TaskActivity>;
  assigned: Array<Member>;
  badges: TaskBadges;
  checklists: Array<TaskChecklist>;
  comments: Array<TaskComment>;
  complete: Scalars["Boolean"]["output"];
  completedAt?: Maybe<Scalars["Time"]["output"]>;
  createdAt: Scalars["Time"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  dueDate: DueDate;
  hasTime: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  labels: Array<TaskLabel>;
  name: Scalars["String"]["output"];
  position: Scalars["Float"]["output"];
  shortId: Scalars["String"]["output"];
  taskGroup: TaskGroup;
  watched: Scalars["Boolean"]["output"];
};

export type TaskActivity = {
  __typename?: "TaskActivity";
  causedBy: CausedBy;
  createdAt: Scalars["Time"]["output"];
  data: Array<TaskActivityData>;
  id: Scalars["ID"]["output"];
  type: ActivityType;
};

export type TaskActivityData = {
  __typename?: "TaskActivityData";
  name: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
};

export type TaskBadges = {
  __typename?: "TaskBadges";
  checklist?: Maybe<ChecklistBadge>;
  comments?: Maybe<CommentsBadge>;
};

export type TaskChecklist = {
  __typename?: "TaskChecklist";
  id: Scalars["ID"]["output"];
  items: Array<TaskChecklistItem>;
  name: Scalars["String"]["output"];
  position: Scalars["Float"]["output"];
};

export type TaskChecklistItem = {
  __typename?: "TaskChecklistItem";
  complete: Scalars["Boolean"]["output"];
  dueDate: Scalars["Time"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  position: Scalars["Float"]["output"];
  taskChecklistID: Scalars["UUID"]["output"];
};

export type TaskComment = {
  __typename?: "TaskComment";
  createdAt: Scalars["Time"]["output"];
  createdBy: CreatedBy;
  id: Scalars["ID"]["output"];
  message: Scalars["String"]["output"];
  pinned: Scalars["Boolean"]["output"];
  updatedAt?: Maybe<Scalars["Time"]["output"]>;
};

export type TaskGroup = {
  __typename?: "TaskGroup";
  createdAt: Scalars["Time"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  position: Scalars["Float"]["output"];
  projectID: Scalars["String"]["output"];
  tasks: Array<Task>;
};

export type TaskLabel = {
  __typename?: "TaskLabel";
  assignedDate: Scalars["Time"]["output"];
  id: Scalars["ID"]["output"];
  projectLabel: ProjectLabel;
};

export type TaskPositionUpdate = {
  position: Scalars["Float"]["input"];
  taskID: Scalars["UUID"]["input"];
};

export type Team = {
  __typename?: "Team";
  createdAt: Scalars["Time"]["output"];
  id: Scalars["ID"]["output"];
  members: Array<Member>;
  name: Scalars["String"]["output"];
  permission: TeamPermission;
};

export type TeamPermission = {
  __typename?: "TeamPermission";
  org: RoleCode;
  team: RoleCode;
};

export type TeamRole = {
  __typename?: "TeamRole";
  roleCode: RoleCode;
  teamID: Scalars["UUID"]["output"];
};

export type ToggleProjectVisibility = {
  isPublic: Scalars["Boolean"]["input"];
  projectID: Scalars["UUID"]["input"];
};

export type ToggleProjectVisibilityPayload = {
  __typename?: "ToggleProjectVisibilityPayload";
  project: Project;
};

export type ToggleTaskLabelInput = {
  projectLabelID: Scalars["UUID"]["input"];
  taskID: Scalars["UUID"]["input"];
};

export type ToggleTaskLabelPayload = {
  __typename?: "ToggleTaskLabelPayload";
  active: Scalars["Boolean"]["output"];
  task: Task;
};

export type ToggleTaskWatch = {
  taskID: Scalars["UUID"]["input"];
};

export type UnassignTaskInput = {
  taskID: Scalars["UUID"]["input"];
  userID: Scalars["UUID"]["input"];
};

export type UpdateProjectLabel = {
  labelColorID: Scalars["UUID"]["input"];
  name: Scalars["String"]["input"];
  projectLabelID: Scalars["UUID"]["input"];
};

export type UpdateProjectLabelColor = {
  labelColorID: Scalars["UUID"]["input"];
  projectLabelID: Scalars["UUID"]["input"];
};

export type UpdateProjectLabelName = {
  name: Scalars["String"]["input"];
  projectLabelID: Scalars["UUID"]["input"];
};

export type UpdateProjectMemberRole = {
  projectID: Scalars["UUID"]["input"];
  roleCode: RoleCode;
  userID: Scalars["UUID"]["input"];
};

export type UpdateProjectMemberRolePayload = {
  __typename?: "UpdateProjectMemberRolePayload";
  member: Member;
  ok: Scalars["Boolean"]["output"];
};

export type UpdateProjectName = {
  name: Scalars["String"]["input"];
  projectID: Scalars["UUID"]["input"];
};

export type UpdateTaskChecklistItemLocation = {
  position: Scalars["Float"]["input"];
  taskChecklistID: Scalars["UUID"]["input"];
  taskChecklistItemID: Scalars["UUID"]["input"];
};

export type UpdateTaskChecklistItemLocationPayload = {
  __typename?: "UpdateTaskChecklistItemLocationPayload";
  checklistItem: TaskChecklistItem;
  prevChecklistID: Scalars["UUID"]["output"];
  taskChecklistID: Scalars["UUID"]["output"];
};

export type UpdateTaskChecklistItemName = {
  name: Scalars["String"]["input"];
  taskChecklistItemID: Scalars["UUID"]["input"];
};

export type UpdateTaskChecklistLocation = {
  position: Scalars["Float"]["input"];
  taskChecklistID: Scalars["UUID"]["input"];
};

export type UpdateTaskChecklistLocationPayload = {
  __typename?: "UpdateTaskChecklistLocationPayload";
  checklist: TaskChecklist;
};

export type UpdateTaskChecklistName = {
  name: Scalars["String"]["input"];
  taskChecklistID: Scalars["UUID"]["input"];
};

export type UpdateTaskComment = {
  commentID: Scalars["UUID"]["input"];
  message: Scalars["String"]["input"];
};

export type UpdateTaskCommentPayload = {
  __typename?: "UpdateTaskCommentPayload";
  comment: TaskComment;
  taskID: Scalars["UUID"]["output"];
};

export type UpdateTaskDescriptionInput = {
  description: Scalars["String"]["input"];
  taskID: Scalars["UUID"]["input"];
};

export type UpdateTaskDueDate = {
  dueDate?: InputMaybe<Scalars["Time"]["input"]>;
  hasTime: Scalars["Boolean"]["input"];
  taskID: Scalars["UUID"]["input"];
};

export type UpdateTaskDueDateNotification = {
  duration: DueDateNotificationDuration;
  id: Scalars["UUID"]["input"];
  period: Scalars["Int"]["input"];
};

export type UpdateTaskDueDateNotificationsResult = {
  __typename?: "UpdateTaskDueDateNotificationsResult";
  notifications: Array<DueDateNotification>;
};

export type UpdateTaskGroupName = {
  name: Scalars["String"]["input"];
  taskGroupID: Scalars["UUID"]["input"];
};

export type UpdateTaskLocationPayload = {
  __typename?: "UpdateTaskLocationPayload";
  previousTaskGroupID: Scalars["UUID"]["output"];
  task: Task;
};

export type UpdateTaskName = {
  name: Scalars["String"]["input"];
  taskID: Scalars["UUID"]["input"];
};

export type UpdateTeamMemberRole = {
  roleCode: RoleCode;
  teamID: Scalars["UUID"]["input"];
  userID: Scalars["UUID"]["input"];
};

export type UpdateTeamMemberRolePayload = {
  __typename?: "UpdateTeamMemberRolePayload";
  member: Member;
  ok: Scalars["Boolean"]["output"];
  teamID: Scalars["UUID"]["output"];
};

export type UpdateUserInfo = {
  bio: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  initials: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type UpdateUserInfoPayload = {
  __typename?: "UpdateUserInfoPayload";
  user: UserAccount;
};

export type UpdateUserPassword = {
  password: Scalars["String"]["input"];
  userID: Scalars["UUID"]["input"];
};

export type UpdateUserPasswordPayload = {
  __typename?: "UpdateUserPasswordPayload";
  ok: Scalars["Boolean"]["output"];
  user: UserAccount;
};

export type UpdateUserRole = {
  roleCode: RoleCode;
  userID: Scalars["UUID"]["input"];
};

export type UpdateUserRolePayload = {
  __typename?: "UpdateUserRolePayload";
  user: UserAccount;
};

export type UserAccount = {
  __typename?: "UserAccount";
  bio: Scalars["String"]["output"];
  createdAt: Scalars["Time"]["output"];
  email: Scalars["String"]["output"];
  fullName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  initials: Scalars["String"]["output"];
  member: MemberList;
  owned: OwnedList;
  profileIcon: ProfileIcon;
  role: Role;
  username: Scalars["String"]["output"];
};

export type GetDashboardDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetDashboardDataQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "MePayload";
    user: {
      __typename?: "UserAccount";
      id: string;
      fullName: string;
      username: string;
      email: string;
      profileIcon: {
        __typename?: "ProfileIcon";
        initials?: string | null;
        bgColor?: string | null;
        url?: string | null;
      };
    };
  } | null;
  projects: Array<{
    __typename?: "Project";
    id: string;
    shortId: string;
    name: string;
    team?: { __typename?: "Team"; id: string; name: string } | null;
  }>;
  teams: Array<{ __typename?: "Team"; id: string; name: string }>;
};

export type GetMyTasksQueryVariables = Exact<{
  status: MyTasksStatus;
  sort: MyTasksSort;
}>;

export type GetMyTasksQuery = {
  __typename?: "Query";
  myTasks: {
    __typename?: "MyTasksPayload";
    tasks: Array<{
      __typename?: "Task";
      id: string;
      shortId: string;
      name: string;
      complete: boolean;
      taskGroup: { __typename?: "TaskGroup"; id: string; name: string };
    }>;
    projects: Array<{
      __typename?: "ProjectTaskMapping";
      projectID: string;
      taskID: string;
    }>;
  };
};

export type GetProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProjectsQuery = {
  __typename?: "Query";
  organizations: Array<{
    __typename?: "Organization";
    id: string;
    name: string;
  }>;
  teams: Array<{
    __typename?: "Team";
    id: string;
    name: string;
    createdAt: any;
  }>;
  projects: Array<{
    __typename?: "Project";
    id: string;
    shortId: string;
    name: string;
    team?: { __typename?: "Team"; id: string; name: string } | null;
  }>;
};

export type CreateProjectMutationVariables = Exact<{
  teamID?: InputMaybe<Scalars["UUID"]["input"]>;
  name: Scalars["String"]["input"];
}>;

export type CreateProjectMutation = {
  __typename?: "Mutation";
  createProject: {
    __typename?: "Project";
    id: string;
    shortId: string;
    name: string;
    team?: { __typename?: "Team"; id: string; name: string } | null;
  };
};

export type CreateTeamMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  organizationID: Scalars["UUID"]["input"];
}>;

export type CreateTeamMutation = {
  __typename?: "Mutation";
  createTeam: { __typename?: "Team"; id: string; createdAt: any; name: string };
};

export type GetProjectBoardQueryVariables = Exact<{
  projectID: Scalars["UUID"]["input"];
}>;

export type GetProjectBoardQuery = {
  __typename?: "Query";
  findProject: {
    __typename?: "Project";
    id: string;
    name: string;
    taskGroups: Array<{
      __typename?: "TaskGroup";
      id: string;
      name: string;
      position: number;
      tasks: Array<{
        __typename?: "Task";
        id: string;
        name: string;
        position: number;
      }>;
    }>;
  };
};

export type CreateTaskGroupMutationVariables = Exact<{
  projectID: Scalars["UUID"]["input"];
  name: Scalars["String"]["input"];
  position: Scalars["Float"]["input"];
}>;

export type CreateTaskGroupMutation = {
  __typename?: "Mutation";
  createTaskGroup: {
    __typename?: "TaskGroup";
    id: string;
    name: string;
    position: number;
  };
};

export type CreateTaskMutationVariables = Exact<{
  taskGroupID: Scalars["UUID"]["input"];
  name: Scalars["String"]["input"];
  position: Scalars["Float"]["input"];
  assigned?: InputMaybe<
    Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"]
  >;
}>;

export type CreateTaskMutation = {
  __typename?: "Mutation";
  createTask: {
    __typename?: "Task";
    id: string;
    name: string;
    position: number;
  };
};

export const GetDashboardDataDocument = gql`
  query GetDashboardData {
    me {
      user {
        id
        fullName
        username
        email
        profileIcon {
          initials
          bgColor
          url
        }
      }
    }
    projects {
      id
      shortId
      name
      team {
        id
        name
      }
    }
    teams {
      id
      name
    }
  }
`;

/**
 * __useGetDashboardDataQuery__
 *
 * To run a query within a React component, call `useGetDashboardDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDashboardDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDashboardDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDashboardDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetDashboardDataQuery,
    GetDashboardDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(
    GetDashboardDataDocument,
    options,
  );
}
export function useGetDashboardDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDashboardDataQuery,
    GetDashboardDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetDashboardDataQuery,
    GetDashboardDataQueryVariables
  >(GetDashboardDataDocument, options);
}
// @ts-ignore
export function useGetDashboardDataSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetDashboardDataQuery,
    GetDashboardDataQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<
  GetDashboardDataQuery,
  GetDashboardDataQueryVariables
>;
export function useGetDashboardDataSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetDashboardDataQuery,
        GetDashboardDataQueryVariables
      >,
): Apollo.UseSuspenseQueryResult<
  GetDashboardDataQuery | undefined,
  GetDashboardDataQueryVariables
>;
export function useGetDashboardDataSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetDashboardDataQuery,
        GetDashboardDataQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetDashboardDataQuery,
    GetDashboardDataQueryVariables
  >(GetDashboardDataDocument, options);
}
export type GetDashboardDataQueryHookResult = ReturnType<
  typeof useGetDashboardDataQuery
>;
export type GetDashboardDataLazyQueryHookResult = ReturnType<
  typeof useGetDashboardDataLazyQuery
>;
export type GetDashboardDataSuspenseQueryHookResult = ReturnType<
  typeof useGetDashboardDataSuspenseQuery
>;
export type GetDashboardDataQueryResult = Apollo.QueryResult<
  GetDashboardDataQuery,
  GetDashboardDataQueryVariables
>;
export const GetMyTasksDocument = gql`
  query GetMyTasks($status: MyTasksStatus!, $sort: MyTasksSort!) {
    myTasks(input: { status: $status, sort: $sort }) {
      tasks {
        id
        shortId
        name
        complete
        taskGroup {
          id
          name
        }
      }
      projects {
        projectID
        taskID
      }
    }
  }
`;

/**
 * __useGetMyTasksQuery__
 *
 * To run a query within a React component, call `useGetMyTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTasksQuery({
 *   variables: {
 *      status: // value for 'status'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetMyTasksQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMyTasksQuery,
    GetMyTasksQueryVariables
  > &
    (
      | { variables: GetMyTasksQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(
    GetMyTasksDocument,
    options,
  );
}
export function useGetMyTasksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyTasksQuery,
    GetMyTasksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(
    GetMyTasksDocument,
    options,
  );
}
// @ts-ignore
export function useGetMyTasksSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetMyTasksQuery,
    GetMyTasksQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<GetMyTasksQuery, GetMyTasksQueryVariables>;
export function useGetMyTasksSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMyTasksQuery,
        GetMyTasksQueryVariables
      >,
): Apollo.UseSuspenseQueryResult<
  GetMyTasksQuery | undefined,
  GetMyTasksQueryVariables
>;
export function useGetMyTasksSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMyTasksQuery,
        GetMyTasksQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(
    GetMyTasksDocument,
    options,
  );
}
export type GetMyTasksQueryHookResult = ReturnType<typeof useGetMyTasksQuery>;
export type GetMyTasksLazyQueryHookResult = ReturnType<
  typeof useGetMyTasksLazyQuery
>;
export type GetMyTasksSuspenseQueryHookResult = ReturnType<
  typeof useGetMyTasksSuspenseQuery
>;
export type GetMyTasksQueryResult = Apollo.QueryResult<
  GetMyTasksQuery,
  GetMyTasksQueryVariables
>;
export const GetProjectsDocument = gql`
  query GetProjects {
    organizations {
      id
      name
    }
    teams {
      id
      name
      createdAt
    }
    projects {
      id
      shortId
      name
      team {
        id
        name
      }
    }
  }
`;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetProjectsQuery,
    GetProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(
    GetProjectsDocument,
    options,
  );
}
export function useGetProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProjectsQuery,
    GetProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(
    GetProjectsDocument,
    options,
  );
}
// @ts-ignore
export function useGetProjectsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetProjectsQuery,
    GetProjectsQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export function useGetProjectsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetProjectsQuery,
        GetProjectsQueryVariables
      >,
): Apollo.UseSuspenseQueryResult<
  GetProjectsQuery | undefined,
  GetProjectsQueryVariables
>;
export function useGetProjectsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetProjectsQuery,
        GetProjectsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetProjectsQuery, GetProjectsQueryVariables>(
    GetProjectsDocument,
    options,
  );
}
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<
  typeof useGetProjectsLazyQuery
>;
export type GetProjectsSuspenseQueryHookResult = ReturnType<
  typeof useGetProjectsSuspenseQuery
>;
export type GetProjectsQueryResult = Apollo.QueryResult<
  GetProjectsQuery,
  GetProjectsQueryVariables
>;
export const CreateProjectDocument = gql`
  mutation CreateProject($teamID: UUID, $name: String!) {
    createProject(input: { teamID: $teamID, name: $name }) {
      id
      shortId
      name
      team {
        id
        name
      }
    }
  }
`;
export type CreateProjectMutationFn = Apollo.MutationFunction<
  CreateProjectMutation,
  CreateProjectMutationVariables
>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(CreateProjectDocument, options);
}
export type CreateProjectMutationHookResult = ReturnType<
  typeof useCreateProjectMutation
>;
export type CreateProjectMutationResult =
  Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<
  CreateProjectMutation,
  CreateProjectMutationVariables
>;
export const CreateTeamDocument = gql`
  mutation CreateTeam($name: String!, $organizationID: UUID!) {
    createTeam(input: { name: $name, organizationID: $organizationID }) {
      id
      createdAt
      name
    }
  }
`;
export type CreateTeamMutationFn = Apollo.MutationFunction<
  CreateTeamMutation,
  CreateTeamMutationVariables
>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *      organizationID: // value for 'organizationID'
 *   },
 * });
 */
export function useCreateTeamMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTeamMutation,
    CreateTeamMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(
    CreateTeamDocument,
    options,
  );
}
export type CreateTeamMutationHookResult = ReturnType<
  typeof useCreateTeamMutation
>;
export type CreateTeamMutationResult =
  Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<
  CreateTeamMutation,
  CreateTeamMutationVariables
>;
export const GetProjectBoardDocument = gql`
  query GetProjectBoard($projectID: UUID!) {
    findProject(input: { projectID: $projectID }) {
      id
      name
      taskGroups {
        id
        name
        position
        tasks {
          id
          name
          position
        }
      }
    }
  }
`;

/**
 * __useGetProjectBoardQuery__
 *
 * To run a query within a React component, call `useGetProjectBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectBoardQuery({
 *   variables: {
 *      projectID: // value for 'projectID'
 *   },
 * });
 */
export function useGetProjectBoardQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProjectBoardQuery,
    GetProjectBoardQueryVariables
  > &
    (
      | { variables: GetProjectBoardQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProjectBoardQuery, GetProjectBoardQueryVariables>(
    GetProjectBoardDocument,
    options,
  );
}
export function useGetProjectBoardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProjectBoardQuery,
    GetProjectBoardQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetProjectBoardQuery,
    GetProjectBoardQueryVariables
  >(GetProjectBoardDocument, options);
}
// @ts-ignore
export function useGetProjectBoardSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetProjectBoardQuery,
    GetProjectBoardQueryVariables
  >,
): Apollo.UseSuspenseQueryResult<
  GetProjectBoardQuery,
  GetProjectBoardQueryVariables
>;
export function useGetProjectBoardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetProjectBoardQuery,
        GetProjectBoardQueryVariables
      >,
): Apollo.UseSuspenseQueryResult<
  GetProjectBoardQuery | undefined,
  GetProjectBoardQueryVariables
>;
export function useGetProjectBoardSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetProjectBoardQuery,
        GetProjectBoardQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetProjectBoardQuery,
    GetProjectBoardQueryVariables
  >(GetProjectBoardDocument, options);
}
export type GetProjectBoardQueryHookResult = ReturnType<
  typeof useGetProjectBoardQuery
>;
export type GetProjectBoardLazyQueryHookResult = ReturnType<
  typeof useGetProjectBoardLazyQuery
>;
export type GetProjectBoardSuspenseQueryHookResult = ReturnType<
  typeof useGetProjectBoardSuspenseQuery
>;
export type GetProjectBoardQueryResult = Apollo.QueryResult<
  GetProjectBoardQuery,
  GetProjectBoardQueryVariables
>;
export const CreateTaskGroupDocument = gql`
  mutation CreateTaskGroup(
    $projectID: UUID!
    $name: String!
    $position: Float!
  ) {
    createTaskGroup(
      input: { projectID: $projectID, name: $name, position: $position }
    ) {
      id
      name
      position
    }
  }
`;
export type CreateTaskGroupMutationFn = Apollo.MutationFunction<
  CreateTaskGroupMutation,
  CreateTaskGroupMutationVariables
>;

/**
 * __useCreateTaskGroupMutation__
 *
 * To run a mutation, you first call `useCreateTaskGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskGroupMutation, { data, loading, error }] = useCreateTaskGroupMutation({
 *   variables: {
 *      projectID: // value for 'projectID'
 *      name: // value for 'name'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useCreateTaskGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTaskGroupMutation,
    CreateTaskGroupMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTaskGroupMutation,
    CreateTaskGroupMutationVariables
  >(CreateTaskGroupDocument, options);
}
export type CreateTaskGroupMutationHookResult = ReturnType<
  typeof useCreateTaskGroupMutation
>;
export type CreateTaskGroupMutationResult =
  Apollo.MutationResult<CreateTaskGroupMutation>;
export type CreateTaskGroupMutationOptions = Apollo.BaseMutationOptions<
  CreateTaskGroupMutation,
  CreateTaskGroupMutationVariables
>;
export const CreateTaskDocument = gql`
  mutation CreateTask(
    $taskGroupID: UUID!
    $name: String!
    $position: Float!
    $assigned: [UUID!]
  ) {
    createTask(
      input: {
        taskGroupID: $taskGroupID
        name: $name
        position: $position
        assigned: $assigned
      }
    ) {
      id
      name
      position
    }
  }
`;
export type CreateTaskMutationFn = Apollo.MutationFunction<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      taskGroupID: // value for 'taskGroupID'
 *      name: // value for 'name'
 *      position: // value for 'position'
 *      assigned: // value for 'assigned'
 *   },
 * });
 */
export function useCreateTaskMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(
    CreateTaskDocument,
    options,
  );
}
export type CreateTaskMutationHookResult = ReturnType<
  typeof useCreateTaskMutation
>;
export type CreateTaskMutationResult =
  Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;
