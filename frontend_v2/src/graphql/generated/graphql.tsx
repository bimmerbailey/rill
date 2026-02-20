import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: any; output: any; }
  UUID: { input: string; output: string; }
  Upload: { input: any; output: any; }
};

export enum ActionLevel {
  Org = 'ORG',
  Project = 'PROJECT',
  Team = 'TEAM'
}

export enum ActionType {
  CommentMentioned = 'COMMENT_MENTIONED',
  CommentOther = 'COMMENT_OTHER',
  DueDateAdded = 'DUE_DATE_ADDED',
  DueDateChanged = 'DUE_DATE_CHANGED',
  DueDateReminder = 'DUE_DATE_REMINDER',
  DueDateRemoved = 'DUE_DATE_REMOVED',
  ProjectAdded = 'PROJECT_ADDED',
  ProjectArchived = 'PROJECT_ARCHIVED',
  ProjectRemoved = 'PROJECT_REMOVED',
  TaskArchived = 'TASK_ARCHIVED',
  TaskAssigned = 'TASK_ASSIGNED',
  TaskAttachmentUploaded = 'TASK_ATTACHMENT_UPLOADED',
  TaskMoved = 'TASK_MOVED',
  TeamAdded = 'TEAM_ADDED',
  TeamRemoved = 'TEAM_REMOVED'
}

export enum ActivityType {
  TaskAdded = 'TASK_ADDED',
  TaskChecklistAdded = 'TASK_CHECKLIST_ADDED',
  TaskChecklistChanged = 'TASK_CHECKLIST_CHANGED',
  TaskChecklistRemoved = 'TASK_CHECKLIST_REMOVED',
  TaskDueDateAdded = 'TASK_DUE_DATE_ADDED',
  TaskDueDateChanged = 'TASK_DUE_DATE_CHANGED',
  TaskDueDateRemoved = 'TASK_DUE_DATE_REMOVED',
  TaskMarkedComplete = 'TASK_MARKED_COMPLETE',
  TaskMarkedIncomplete = 'TASK_MARKED_INCOMPLETE',
  TaskMoved = 'TASK_MOVED'
}

export type AddTaskLabelInput = {
  projectLabelID: Scalars['UUID']['input'];
  taskID: Scalars['UUID']['input'];
};

export type AssignTaskInput = {
  taskID: Scalars['UUID']['input'];
  userID: Scalars['UUID']['input'];
};

export type CausedBy = {
  __typename?: 'CausedBy';
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  profileIcon?: Maybe<ProfileIcon>;
};

export type ChecklistBadge = {
  __typename?: 'ChecklistBadge';
  complete: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CommentsBadge = {
  __typename?: 'CommentsBadge';
  total: Scalars['Int']['output'];
  unread: Scalars['Boolean']['output'];
};

export type CreateTaskChecklist = {
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
  taskID: Scalars['UUID']['input'];
};

export type CreateTaskChecklistItem = {
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
  taskChecklistID: Scalars['UUID']['input'];
};

export type CreateTaskComment = {
  message: Scalars['String']['input'];
  taskID: Scalars['UUID']['input'];
};

export type CreateTaskCommentPayload = {
  __typename?: 'CreateTaskCommentPayload';
  comment: TaskComment;
  taskID: Scalars['UUID']['output'];
};

export type CreateTaskDueDateNotification = {
  duration: DueDateNotificationDuration;
  period: Scalars['Int']['input'];
  taskID: Scalars['UUID']['input'];
};

export type CreateTaskDueDateNotificationsResult = {
  __typename?: 'CreateTaskDueDateNotificationsResult';
  notifications: Array<DueDateNotification>;
};

export type CreateTeamMember = {
  teamID: Scalars['UUID']['input'];
  userID: Scalars['UUID']['input'];
};

export type CreateTeamMemberPayload = {
  __typename?: 'CreateTeamMemberPayload';
  team: Team;
  teamMember: Member;
};

export type CreatedBy = {
  __typename?: 'CreatedBy';
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  profileIcon: ProfileIcon;
};

export type DeleteInvitedProjectMember = {
  email: Scalars['String']['input'];
  projectID: Scalars['UUID']['input'];
};

export type DeleteInvitedProjectMemberPayload = {
  __typename?: 'DeleteInvitedProjectMemberPayload';
  invitedMember: InvitedMember;
};

export type DeleteInvitedUserAccount = {
  invitedUserID: Scalars['UUID']['input'];
};

export type DeleteInvitedUserAccountPayload = {
  __typename?: 'DeleteInvitedUserAccountPayload';
  invitedUser: InvitedUserAccount;
};

export type DeleteProject = {
  projectID: Scalars['UUID']['input'];
};

export type DeleteProjectLabel = {
  projectLabelID: Scalars['UUID']['input'];
};

export type DeleteProjectMember = {
  projectID: Scalars['UUID']['input'];
  userID: Scalars['UUID']['input'];
};

export type DeleteProjectMemberPayload = {
  __typename?: 'DeleteProjectMemberPayload';
  member: Member;
  ok: Scalars['Boolean']['output'];
  projectID: Scalars['UUID']['output'];
};

export type DeleteProjectPayload = {
  __typename?: 'DeleteProjectPayload';
  ok: Scalars['Boolean']['output'];
  project: Project;
};

export type DeleteTaskChecklist = {
  taskChecklistID: Scalars['UUID']['input'];
};

export type DeleteTaskChecklistItem = {
  taskChecklistItemID: Scalars['UUID']['input'];
};

export type DeleteTaskChecklistItemPayload = {
  __typename?: 'DeleteTaskChecklistItemPayload';
  ok: Scalars['Boolean']['output'];
  taskChecklistItem: TaskChecklistItem;
};

export type DeleteTaskChecklistPayload = {
  __typename?: 'DeleteTaskChecklistPayload';
  ok: Scalars['Boolean']['output'];
  taskChecklist: TaskChecklist;
};

export type DeleteTaskComment = {
  commentID: Scalars['UUID']['input'];
};

export type DeleteTaskCommentPayload = {
  __typename?: 'DeleteTaskCommentPayload';
  commentID: Scalars['UUID']['output'];
  taskID: Scalars['UUID']['output'];
};

export type DeleteTaskDueDateNotification = {
  id: Scalars['UUID']['input'];
};

export type DeleteTaskDueDateNotificationsResult = {
  __typename?: 'DeleteTaskDueDateNotificationsResult';
  notifications: Array<Scalars['UUID']['output']>;
};

export type DeleteTaskGroupInput = {
  taskGroupID: Scalars['UUID']['input'];
};

export type DeleteTaskGroupPayload = {
  __typename?: 'DeleteTaskGroupPayload';
  affectedRows: Scalars['Int']['output'];
  ok: Scalars['Boolean']['output'];
  taskGroup: TaskGroup;
};

export type DeleteTaskGroupTasks = {
  taskGroupID: Scalars['UUID']['input'];
};

export type DeleteTaskGroupTasksPayload = {
  __typename?: 'DeleteTaskGroupTasksPayload';
  taskGroupID: Scalars['UUID']['output'];
  tasks: Array<Scalars['UUID']['output']>;
};

export type DeleteTaskInput = {
  taskID: Scalars['UUID']['input'];
};

export type DeleteTaskPayload = {
  __typename?: 'DeleteTaskPayload';
  taskID: Scalars['UUID']['output'];
};

export type DeleteTeam = {
  teamID: Scalars['UUID']['input'];
};

export type DeleteTeamMember = {
  newOwnerID?: InputMaybe<Scalars['UUID']['input']>;
  teamID: Scalars['UUID']['input'];
  userID: Scalars['UUID']['input'];
};

export type DeleteTeamMemberPayload = {
  __typename?: 'DeleteTeamMemberPayload';
  affectedProjects: Array<Project>;
  teamID: Scalars['UUID']['output'];
  userID: Scalars['UUID']['output'];
};

export type DeleteTeamPayload = {
  __typename?: 'DeleteTeamPayload';
  ok: Scalars['Boolean']['output'];
  projects: Array<Project>;
  team: Team;
};

export type DeleteUserAccount = {
  newOwnerID?: InputMaybe<Scalars['UUID']['input']>;
  userID: Scalars['UUID']['input'];
};

export type DeleteUserAccountPayload = {
  __typename?: 'DeleteUserAccountPayload';
  ok: Scalars['Boolean']['output'];
  userAccount: UserAccount;
};

export type DueDate = {
  __typename?: 'DueDate';
  at?: Maybe<Scalars['Time']['output']>;
  notifications: Array<DueDateNotification>;
};

export type DueDateNotification = {
  __typename?: 'DueDateNotification';
  duration: DueDateNotificationDuration;
  id: Scalars['ID']['output'];
  period: Scalars['Int']['output'];
};

export enum DueDateNotificationDuration {
  Day = 'DAY',
  Hour = 'HOUR',
  Minute = 'MINUTE',
  Week = 'WEEK'
}

export type DuplicateTaskGroup = {
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
  projectID: Scalars['UUID']['input'];
  taskGroupID: Scalars['UUID']['input'];
};

export type DuplicateTaskGroupPayload = {
  __typename?: 'DuplicateTaskGroupPayload';
  taskGroup: TaskGroup;
};

export type FindProject = {
  projectID?: InputMaybe<Scalars['UUID']['input']>;
  projectShortID?: InputMaybe<Scalars['String']['input']>;
};

export type FindTask = {
  taskID?: InputMaybe<Scalars['UUID']['input']>;
  taskShortID?: InputMaybe<Scalars['String']['input']>;
};

export type FindTeam = {
  teamID: Scalars['UUID']['input'];
};

export type FindUser = {
  userID: Scalars['UUID']['input'];
};

export type HasUnreadNotificationsResult = {
  __typename?: 'HasUnreadNotificationsResult';
  unread: Scalars['Boolean']['output'];
};

export type InviteProjectMembers = {
  members: Array<MemberInvite>;
  projectID: Scalars['UUID']['input'];
};

export type InviteProjectMembersPayload = {
  __typename?: 'InviteProjectMembersPayload';
  invitedMembers: Array<InvitedMember>;
  members: Array<Member>;
  ok: Scalars['Boolean']['output'];
  projectID: Scalars['UUID']['output'];
};

export type InvitedMember = {
  __typename?: 'InvitedMember';
  email: Scalars['String']['output'];
  invitedOn: Scalars['Time']['output'];
};

export type InvitedUserAccount = {
  __typename?: 'InvitedUserAccount';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  invitedOn: Scalars['Time']['output'];
  member: MemberList;
};

export type LabelColor = {
  __typename?: 'LabelColor';
  colorHex: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Float']['output'];
};

export type LogoutUser = {
  userID: Scalars['UUID']['input'];
};

export type MePayload = {
  __typename?: 'MePayload';
  organization?: Maybe<RoleCode>;
  projectRoles: Array<ProjectRole>;
  teamRoles: Array<TeamRole>;
  user: UserAccount;
};

export type Member = {
  __typename?: 'Member';
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  member: MemberList;
  owned: OwnedList;
  profileIcon: ProfileIcon;
  role: Role;
  username: Scalars['String']['output'];
};

export type MemberInvite = {
  email?: InputMaybe<Scalars['String']['input']>;
  userID?: InputMaybe<Scalars['UUID']['input']>;
};

export type MemberList = {
  __typename?: 'MemberList';
  projects: Array<Project>;
  teams: Array<Team>;
};

export type MemberSearchFilter = {
  projectID?: InputMaybe<Scalars['UUID']['input']>;
  searchFilter: Scalars['String']['input'];
};

export type MemberSearchResult = {
  __typename?: 'MemberSearchResult';
  id: Scalars['String']['output'];
  similarity: Scalars['Int']['output'];
  status: ShareStatus;
  user?: Maybe<UserAccount>;
};

export type Mutation = {
  __typename?: 'Mutation';
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
  logoutUser: Scalars['Boolean']['output'];
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
  __typename?: 'MyTasksPayload';
  projects: Array<ProjectTaskMapping>;
  tasks: Array<Task>;
};

export enum MyTasksSort {
  DueDate = 'DUE_DATE',
  None = 'NONE',
  Project = 'PROJECT'
}

export enum MyTasksStatus {
  All = 'ALL',
  CompleteAll = 'COMPLETE_ALL',
  CompleteOneWeek = 'COMPLETE_ONE_WEEK',
  CompleteThreeWeek = 'COMPLETE_THREE_WEEK',
  CompleteToday = 'COMPLETE_TODAY',
  CompleteTwoWeek = 'COMPLETE_TWO_WEEK',
  CompleteYesterday = 'COMPLETE_YESTERDAY',
  Incomplete = 'INCOMPLETE'
}

export type NewProject = {
  name: Scalars['String']['input'];
  teamID?: InputMaybe<Scalars['UUID']['input']>;
};

export type NewProjectLabel = {
  labelColorID: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  projectID: Scalars['UUID']['input'];
};

export type NewTask = {
  assigned?: InputMaybe<Array<Scalars['UUID']['input']>>;
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
  taskGroupID: Scalars['UUID']['input'];
};

export type NewTaskGroup = {
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
  projectID: Scalars['UUID']['input'];
};

export type NewTaskGroupLocation = {
  position: Scalars['Float']['input'];
  taskGroupID: Scalars['UUID']['input'];
};

export type NewTaskLocation = {
  position: Scalars['Float']['input'];
  taskGroupID: Scalars['UUID']['input'];
  taskID: Scalars['UUID']['input'];
};

export type NewTeam = {
  name: Scalars['String']['input'];
  organizationID: Scalars['UUID']['input'];
};

export type NewUserAccount = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  initials: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roleCode: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  actionType: ActionType;
  causedBy?: Maybe<NotificationCausedBy>;
  createdAt: Scalars['Time']['output'];
  data: Array<NotificationData>;
  id: Scalars['ID']['output'];
};

export type NotificationCausedBy = {
  __typename?: 'NotificationCausedBy';
  fullname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type NotificationData = {
  __typename?: 'NotificationData';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export enum NotificationFilter {
  All = 'ALL',
  Assigned = 'ASSIGNED',
  Mentioned = 'MENTIONED',
  Unread = 'UNREAD'
}

export type NotificationMarkAllAsReadResult = {
  __typename?: 'NotificationMarkAllAsReadResult';
  success: Scalars['Boolean']['output'];
};

export type NotificationToggleReadInput = {
  notifiedID: Scalars['UUID']['input'];
};

export type Notified = {
  __typename?: 'Notified';
  id: Scalars['ID']['output'];
  notification: Notification;
  read: Scalars['Boolean']['output'];
  readAt?: Maybe<Scalars['Time']['output']>;
};

export type NotifiedInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  filter: NotificationFilter;
  limit: Scalars['Int']['input'];
};

export type NotifiedResult = {
  __typename?: 'NotifiedResult';
  notified: Array<Notified>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum ObjectType {
  Org = 'ORG',
  Project = 'PROJECT',
  Task = 'TASK',
  TaskChecklist = 'TASK_CHECKLIST',
  TaskChecklistItem = 'TASK_CHECKLIST_ITEM',
  TaskGroup = 'TASK_GROUP',
  Team = 'TEAM'
}

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type OwnedList = {
  __typename?: 'OwnedList';
  projects: Array<Project>;
  teams: Array<Team>;
};

export type OwnersList = {
  __typename?: 'OwnersList';
  projects: Array<Scalars['UUID']['output']>;
  teams: Array<Scalars['UUID']['output']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type ProfileIcon = {
  __typename?: 'ProfileIcon';
  bgColor?: Maybe<Scalars['String']['output']>;
  initials?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  invitedMembers: Array<InvitedMember>;
  labels: Array<ProjectLabel>;
  members: Array<Member>;
  name: Scalars['String']['output'];
  permission: ProjectPermission;
  publicOn?: Maybe<Scalars['Time']['output']>;
  shortId: Scalars['String']['output'];
  taskGroups: Array<TaskGroup>;
  team?: Maybe<Team>;
};

export type ProjectLabel = {
  __typename?: 'ProjectLabel';
  createdDate: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  labelColor: LabelColor;
  name?: Maybe<Scalars['String']['output']>;
};

export type ProjectPermission = {
  __typename?: 'ProjectPermission';
  org: RoleCode;
  project: RoleCode;
  team: RoleCode;
};

export type ProjectRole = {
  __typename?: 'ProjectRole';
  projectID: Scalars['UUID']['output'];
  roleCode: RoleCode;
};

export type ProjectTaskMapping = {
  __typename?: 'ProjectTaskMapping';
  projectID: Scalars['UUID']['output'];
  taskID: Scalars['UUID']['output'];
};

export type ProjectsFilter = {
  teamID?: InputMaybe<Scalars['UUID']['input']>;
};

export type Query = {
  __typename?: 'Query';
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
  taskID: Scalars['UUID']['input'];
  taskLabelID: Scalars['UUID']['input'];
};

export type Role = {
  __typename?: 'Role';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export enum RoleCode {
  Admin = 'admin',
  Member = 'member',
  Observer = 'observer',
  Owner = 'owner'
}

export enum RoleLevel {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export type SetTaskChecklistItemComplete = {
  complete: Scalars['Boolean']['input'];
  taskChecklistItemID: Scalars['UUID']['input'];
};

export type SetTaskComplete = {
  complete: Scalars['Boolean']['input'];
  taskID: Scalars['UUID']['input'];
};

export enum ShareStatus {
  Invited = 'INVITED',
  Joined = 'JOINED'
}

export type SortTaskGroup = {
  taskGroupID: Scalars['UUID']['input'];
  tasks: Array<TaskPositionUpdate>;
};

export type SortTaskGroupPayload = {
  __typename?: 'SortTaskGroupPayload';
  taskGroupID: Scalars['UUID']['output'];
  tasks: Array<Task>;
};

export type Subscription = {
  __typename?: 'Subscription';
  notificationAdded: Notified;
};

export type Task = {
  __typename?: 'Task';
  activity: Array<TaskActivity>;
  assigned: Array<Member>;
  badges: TaskBadges;
  checklists: Array<TaskChecklist>;
  comments: Array<TaskComment>;
  complete: Scalars['Boolean']['output'];
  completedAt?: Maybe<Scalars['Time']['output']>;
  createdAt: Scalars['Time']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dueDate: DueDate;
  hasTime: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  labels: Array<TaskLabel>;
  name: Scalars['String']['output'];
  position: Scalars['Float']['output'];
  shortId: Scalars['String']['output'];
  taskGroup: TaskGroup;
  watched: Scalars['Boolean']['output'];
};

export type TaskActivity = {
  __typename?: 'TaskActivity';
  causedBy: CausedBy;
  createdAt: Scalars['Time']['output'];
  data: Array<TaskActivityData>;
  id: Scalars['ID']['output'];
  type: ActivityType;
};

export type TaskActivityData = {
  __typename?: 'TaskActivityData';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type TaskBadges = {
  __typename?: 'TaskBadges';
  checklist?: Maybe<ChecklistBadge>;
  comments?: Maybe<CommentsBadge>;
};

export type TaskChecklist = {
  __typename?: 'TaskChecklist';
  id: Scalars['ID']['output'];
  items: Array<TaskChecklistItem>;
  name: Scalars['String']['output'];
  position: Scalars['Float']['output'];
};

export type TaskChecklistItem = {
  __typename?: 'TaskChecklistItem';
  complete: Scalars['Boolean']['output'];
  dueDate: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Float']['output'];
  taskChecklistID: Scalars['UUID']['output'];
};

export type TaskComment = {
  __typename?: 'TaskComment';
  createdAt: Scalars['Time']['output'];
  createdBy: CreatedBy;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  pinned: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['Time']['output']>;
};

export type TaskGroup = {
  __typename?: 'TaskGroup';
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Float']['output'];
  projectID: Scalars['String']['output'];
  tasks: Array<Task>;
};

export type TaskLabel = {
  __typename?: 'TaskLabel';
  assignedDate: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  projectLabel: ProjectLabel;
};

export type TaskPositionUpdate = {
  position: Scalars['Float']['input'];
  taskID: Scalars['UUID']['input'];
};

export type Team = {
  __typename?: 'Team';
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  members: Array<Member>;
  name: Scalars['String']['output'];
  permission: TeamPermission;
};

export type TeamPermission = {
  __typename?: 'TeamPermission';
  org: RoleCode;
  team: RoleCode;
};

export type TeamRole = {
  __typename?: 'TeamRole';
  roleCode: RoleCode;
  teamID: Scalars['UUID']['output'];
};

export type ToggleProjectVisibility = {
  isPublic: Scalars['Boolean']['input'];
  projectID: Scalars['UUID']['input'];
};

export type ToggleProjectVisibilityPayload = {
  __typename?: 'ToggleProjectVisibilityPayload';
  project: Project;
};

export type ToggleTaskLabelInput = {
  projectLabelID: Scalars['UUID']['input'];
  taskID: Scalars['UUID']['input'];
};

export type ToggleTaskLabelPayload = {
  __typename?: 'ToggleTaskLabelPayload';
  active: Scalars['Boolean']['output'];
  task: Task;
};

export type ToggleTaskWatch = {
  taskID: Scalars['UUID']['input'];
};

export type UnassignTaskInput = {
  taskID: Scalars['UUID']['input'];
  userID: Scalars['UUID']['input'];
};

export type UpdateProjectLabel = {
  labelColorID: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  projectLabelID: Scalars['UUID']['input'];
};

export type UpdateProjectLabelColor = {
  labelColorID: Scalars['UUID']['input'];
  projectLabelID: Scalars['UUID']['input'];
};

export type UpdateProjectLabelName = {
  name: Scalars['String']['input'];
  projectLabelID: Scalars['UUID']['input'];
};

export type UpdateProjectMemberRole = {
  projectID: Scalars['UUID']['input'];
  roleCode: RoleCode;
  userID: Scalars['UUID']['input'];
};

export type UpdateProjectMemberRolePayload = {
  __typename?: 'UpdateProjectMemberRolePayload';
  member: Member;
  ok: Scalars['Boolean']['output'];
};

export type UpdateProjectName = {
  name: Scalars['String']['input'];
  projectID: Scalars['UUID']['input'];
};

export type UpdateTaskChecklistItemLocation = {
  position: Scalars['Float']['input'];
  taskChecklistID: Scalars['UUID']['input'];
  taskChecklistItemID: Scalars['UUID']['input'];
};

export type UpdateTaskChecklistItemLocationPayload = {
  __typename?: 'UpdateTaskChecklistItemLocationPayload';
  checklistItem: TaskChecklistItem;
  prevChecklistID: Scalars['UUID']['output'];
  taskChecklistID: Scalars['UUID']['output'];
};

export type UpdateTaskChecklistItemName = {
  name: Scalars['String']['input'];
  taskChecklistItemID: Scalars['UUID']['input'];
};

export type UpdateTaskChecklistLocation = {
  position: Scalars['Float']['input'];
  taskChecklistID: Scalars['UUID']['input'];
};

export type UpdateTaskChecklistLocationPayload = {
  __typename?: 'UpdateTaskChecklistLocationPayload';
  checklist: TaskChecklist;
};

export type UpdateTaskChecklistName = {
  name: Scalars['String']['input'];
  taskChecklistID: Scalars['UUID']['input'];
};

export type UpdateTaskComment = {
  commentID: Scalars['UUID']['input'];
  message: Scalars['String']['input'];
};

export type UpdateTaskCommentPayload = {
  __typename?: 'UpdateTaskCommentPayload';
  comment: TaskComment;
  taskID: Scalars['UUID']['output'];
};

export type UpdateTaskDescriptionInput = {
  description: Scalars['String']['input'];
  taskID: Scalars['UUID']['input'];
};

export type UpdateTaskDueDate = {
  dueDate?: InputMaybe<Scalars['Time']['input']>;
  hasTime: Scalars['Boolean']['input'];
  taskID: Scalars['UUID']['input'];
};

export type UpdateTaskDueDateNotification = {
  duration: DueDateNotificationDuration;
  id: Scalars['UUID']['input'];
  period: Scalars['Int']['input'];
};

export type UpdateTaskDueDateNotificationsResult = {
  __typename?: 'UpdateTaskDueDateNotificationsResult';
  notifications: Array<DueDateNotification>;
};

export type UpdateTaskGroupName = {
  name: Scalars['String']['input'];
  taskGroupID: Scalars['UUID']['input'];
};

export type UpdateTaskLocationPayload = {
  __typename?: 'UpdateTaskLocationPayload';
  previousTaskGroupID: Scalars['UUID']['output'];
  task: Task;
};

export type UpdateTaskName = {
  name: Scalars['String']['input'];
  taskID: Scalars['UUID']['input'];
};

export type UpdateTeamMemberRole = {
  roleCode: RoleCode;
  teamID: Scalars['UUID']['input'];
  userID: Scalars['UUID']['input'];
};

export type UpdateTeamMemberRolePayload = {
  __typename?: 'UpdateTeamMemberRolePayload';
  member: Member;
  ok: Scalars['Boolean']['output'];
  teamID: Scalars['UUID']['output'];
};

export type UpdateUserInfo = {
  bio: Scalars['String']['input'];
  email: Scalars['String']['input'];
  initials: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateUserInfoPayload = {
  __typename?: 'UpdateUserInfoPayload';
  user: UserAccount;
};

export type UpdateUserPassword = {
  password: Scalars['String']['input'];
  userID: Scalars['UUID']['input'];
};

export type UpdateUserPasswordPayload = {
  __typename?: 'UpdateUserPasswordPayload';
  ok: Scalars['Boolean']['output'];
  user: UserAccount;
};

export type UpdateUserRole = {
  roleCode: RoleCode;
  userID: Scalars['UUID']['input'];
};

export type UpdateUserRolePayload = {
  __typename?: 'UpdateUserRolePayload';
  user: UserAccount;
};

export type UserAccount = {
  __typename?: 'UserAccount';
  bio: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  initials: Scalars['String']['output'];
  member: MemberList;
  owned: OwnedList;
  profileIcon: ProfileIcon;
  role: Role;
  username: Scalars['String']['output'];
};

export type UpdateUserRoleMutationVariables = Exact<{
  userID: Scalars['UUID']['input'];
  roleCode: RoleCode;
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole: { __typename?: 'UpdateUserRolePayload', user: { __typename?: 'UserAccount', id: string, role: { __typename?: 'Role', code: string, name: string } } } };

export type GetDashboardDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardDataQuery = { __typename?: 'Query', me?: { __typename?: 'MePayload', user: { __typename?: 'UserAccount', id: string, fullName: string, username: string, email: string, profileIcon: { __typename?: 'ProfileIcon', initials?: string | null, bgColor?: string | null, url?: string | null } } } | null, projects: Array<{ __typename?: 'Project', id: string, shortId: string, name: string, team?: { __typename?: 'Team', id: string, name: string } | null }>, teams: Array<{ __typename?: 'Team', id: string, name: string }> };

export type GetMyTasksQueryVariables = Exact<{
  status: MyTasksStatus;
  sort: MyTasksSort;
}>;


export type GetMyTasksQuery = { __typename?: 'Query', myTasks: { __typename?: 'MyTasksPayload', tasks: Array<{ __typename?: 'Task', id: string, shortId: string, name: string, complete: boolean, taskGroup: { __typename?: 'TaskGroup', id: string, name: string } }>, projects: Array<{ __typename?: 'ProjectTaskMapping', projectID: string, taskID: string }> } };

export type UpdateUserInfoMutationVariables = Exact<{
  name: Scalars['String']['input'];
  initials: Scalars['String']['input'];
  email: Scalars['String']['input'];
  bio: Scalars['String']['input'];
}>;


export type UpdateUserInfoMutation = { __typename?: 'Mutation', updateUserInfo: { __typename?: 'UpdateUserInfoPayload', user: { __typename?: 'UserAccount', id: string, email: string, fullName: string, bio: string, profileIcon: { __typename?: 'ProfileIcon', initials?: string | null } } } };

export type UpdateUserPasswordMutationVariables = Exact<{
  userID: Scalars['UUID']['input'];
  password: Scalars['String']['input'];
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword: { __typename?: 'UpdateUserPasswordPayload', ok: boolean } };

export type ClearProfileAvatarMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearProfileAvatarMutation = { __typename?: 'Mutation', clearProfileAvatar: { __typename?: 'UserAccount', id: string, fullName: string, profileIcon: { __typename?: 'ProfileIcon', initials?: string | null, bgColor?: string | null, url?: string | null } } };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQuery = { __typename?: 'Query', me?: { __typename?: 'MePayload', user: { __typename?: 'UserAccount', id: string, fullName: string, username: string, email: string, bio: string, profileIcon: { __typename?: 'ProfileIcon', initials?: string | null, bgColor?: string | null, url?: string | null } }, teamRoles: Array<{ __typename?: 'TeamRole', teamID: string, roleCode: RoleCode }>, projectRoles: Array<{ __typename?: 'ProjectRole', projectID: string, roleCode: RoleCode }> } | null };

export type FindProjectQueryVariables = Exact<{
  projectID: Scalars['String']['input'];
}>;


export type FindProjectQuery = { __typename?: 'Query', findProject: { __typename?: 'Project', id: string, name: string, publicOn?: any | null, team?: { __typename?: 'Team', id: string } | null, members: Array<{ __typename?: 'Member', id: string, fullName: string, username: string, role: { __typename?: 'Role', code: string, name: string }, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null } }>, invitedMembers: Array<{ __typename?: 'InvitedMember', email: string, invitedOn: any }>, labels: Array<{ __typename?: 'ProjectLabel', id: string, createdDate: any, name?: string | null, labelColor: { __typename?: 'LabelColor', id: string, name: string, colorHex: string, position: number } }>, taskGroups: Array<{ __typename?: 'TaskGroup', id: string, name: string, position: number, tasks: Array<{ __typename?: 'Task', id: string, shortId: string, name: string, description?: string | null, hasTime: boolean, complete: boolean, watched: boolean, completedAt?: any | null, position: number, dueDate: { __typename?: 'DueDate', at?: any | null }, badges: { __typename?: 'TaskBadges', checklist?: { __typename?: 'ChecklistBadge', complete: number, total: number } | null, comments?: { __typename?: 'CommentsBadge', unread: boolean, total: number } | null }, taskGroup: { __typename?: 'TaskGroup', id: string, name: string, position: number }, labels: Array<{ __typename?: 'TaskLabel', id: string, assignedDate: any, projectLabel: { __typename?: 'ProjectLabel', id: string, name?: string | null, createdDate: any, labelColor: { __typename?: 'LabelColor', id: string, colorHex: string, position: number, name: string } } }>, assigned: Array<{ __typename?: 'Member', id: string, fullName: string, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null } }> }> }> }, labelColors: Array<{ __typename?: 'LabelColor', id: string, position: number, colorHex: string, name: string }>, users: Array<{ __typename?: 'UserAccount', id: string, email: string, fullName: string, username: string, role: { __typename?: 'Role', code: string, name: string }, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null }, owned: { __typename?: 'OwnedList', teams: Array<{ __typename?: 'Team', id: string, name: string }>, projects: Array<{ __typename?: 'Project', id: string, name: string }> }, member: { __typename?: 'MemberList', teams: Array<{ __typename?: 'Team', id: string, name: string }>, projects: Array<{ __typename?: 'Project', id: string, name: string }> } }> };

export type DeleteProjectMutationVariables = Exact<{
  projectID: Scalars['UUID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: { __typename?: 'DeleteProjectPayload', ok: boolean, project: { __typename?: 'Project', id: string } } };

export type ToggleProjectVisibilityMutationVariables = Exact<{
  projectID: Scalars['UUID']['input'];
  isPublic: Scalars['Boolean']['input'];
}>;


export type ToggleProjectVisibilityMutation = { __typename?: 'Mutation', toggleProjectVisibility: { __typename?: 'ToggleProjectVisibilityPayload', project: { __typename?: 'Project', id: string, publicOn?: any | null } } };

export type InviteProjectMembersMutationVariables = Exact<{
  projectID: Scalars['UUID']['input'];
  members: Array<MemberInvite> | MemberInvite;
}>;


export type InviteProjectMembersMutation = { __typename?: 'Mutation', inviteProjectMembers: { __typename?: 'InviteProjectMembersPayload', ok: boolean, invitedMembers: Array<{ __typename?: 'InvitedMember', email: string, invitedOn: any }>, members: Array<{ __typename?: 'Member', id: string, fullName: string, username: string, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null }, role: { __typename?: 'Role', code: string, name: string } }> } };

export type DeleteProjectMemberMutationVariables = Exact<{
  projectID: Scalars['UUID']['input'];
  userID: Scalars['UUID']['input'];
}>;


export type DeleteProjectMemberMutation = { __typename?: 'Mutation', deleteProjectMember: { __typename?: 'DeleteProjectMemberPayload', ok: boolean, projectID: string, member: { __typename?: 'Member', id: string } } };

export type DeleteInvitedProjectMemberMutationVariables = Exact<{
  projectID: Scalars['UUID']['input'];
  email: Scalars['String']['input'];
}>;


export type DeleteInvitedProjectMemberMutation = { __typename?: 'Mutation', deleteInvitedProjectMember: { __typename?: 'DeleteInvitedProjectMemberPayload', invitedMember: { __typename?: 'InvitedMember', email: string } } };

export type UpdateProjectMemberRoleMutationVariables = Exact<{
  projectID: Scalars['UUID']['input'];
  userID: Scalars['UUID']['input'];
  roleCode: RoleCode;
}>;


export type UpdateProjectMemberRoleMutation = { __typename?: 'Mutation', updateProjectMemberRole: { __typename?: 'UpdateProjectMemberRolePayload', ok: boolean, member: { __typename?: 'Member', id: string, role: { __typename?: 'Role', code: string, name: string } } } };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', organizations: Array<{ __typename?: 'Organization', id: string, name: string }>, teams: Array<{ __typename?: 'Team', id: string, name: string, createdAt: any }>, projects: Array<{ __typename?: 'Project', id: string, shortId: string, name: string, team?: { __typename?: 'Team', id: string, name: string } | null }> };

export type CreateProjectMutationVariables = Exact<{
  teamID?: InputMaybe<Scalars['UUID']['input']>;
  name: Scalars['String']['input'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, shortId: string, name: string, team?: { __typename?: 'Team', id: string, name: string } | null } };

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String']['input'];
  organizationID: Scalars['UUID']['input'];
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', id: string, createdAt: any, name: string } };

export type GetProjectBoardQueryVariables = Exact<{
  projectID: Scalars['UUID']['input'];
}>;


export type GetProjectBoardQuery = { __typename?: 'Query', findProject: { __typename?: 'Project', id: string, name: string, taskGroups: Array<{ __typename?: 'TaskGroup', id: string, name: string, position: number, tasks: Array<{ __typename?: 'Task', id: string, name: string, position: number }> }> } };

export type CreateTaskGroupMutationVariables = Exact<{
  projectID: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
}>;


export type CreateTaskGroupMutation = { __typename?: 'Mutation', createTaskGroup: { __typename?: 'TaskGroup', id: string, name: string, position: number } };

export type CreateTaskMutationVariables = Exact<{
  taskGroupID: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
  assigned?: InputMaybe<Array<Scalars['UUID']['input']> | Scalars['UUID']['input']>;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, name: string, position: number } };

export type TaskFieldsFragment = { __typename?: 'Task', id: string, shortId: string, name: string, description?: string | null, hasTime: boolean, complete: boolean, watched: boolean, completedAt?: any | null, position: number, dueDate: { __typename?: 'DueDate', at?: any | null }, badges: { __typename?: 'TaskBadges', checklist?: { __typename?: 'ChecklistBadge', complete: number, total: number } | null, comments?: { __typename?: 'CommentsBadge', unread: boolean, total: number } | null }, taskGroup: { __typename?: 'TaskGroup', id: string, name: string, position: number }, labels: Array<{ __typename?: 'TaskLabel', id: string, assignedDate: any, projectLabel: { __typename?: 'ProjectLabel', id: string, name?: string | null, createdDate: any, labelColor: { __typename?: 'LabelColor', id: string, colorHex: string, position: number, name: string } } }>, assigned: Array<{ __typename?: 'Member', id: string, fullName: string, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null } }> };

export type AssignTaskMutationVariables = Exact<{
  taskID: Scalars['UUID']['input'];
  userID: Scalars['UUID']['input'];
}>;


export type AssignTaskMutation = { __typename?: 'Mutation', assignTask: { __typename?: 'Task', id: string, assigned: Array<{ __typename?: 'Member', id: string, fullName: string }> } };

export type LegacyCreateProjectMutationVariables = Exact<{
  teamID?: InputMaybe<Scalars['UUID']['input']>;
  name: Scalars['String']['input'];
}>;


export type LegacyCreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, shortId: string, name: string, team?: { __typename?: 'Team', id: string, name: string } | null } };

export type CreateProjectLabelMutationVariables = Exact<{
  projectID: Scalars['UUID']['input'];
  labelColorID: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateProjectLabelMutation = { __typename?: 'Mutation', createProjectLabel: { __typename?: 'ProjectLabel', id: string, createdDate: any, name?: string | null, labelColor: { __typename?: 'LabelColor', id: string, colorHex: string, name: string, position: number } } };

export type LegacyCreateTaskGroupMutationVariables = Exact<{
  projectID: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
}>;


export type LegacyCreateTaskGroupMutation = { __typename?: 'Mutation', createTaskGroup: { __typename?: 'TaskGroup', id: string, name: string, position: number } };

export type CreateUserAccountMutationVariables = Exact<{
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  initials: Scalars['String']['input'];
  password: Scalars['String']['input'];
  roleCode: Scalars['String']['input'];
}>;


export type CreateUserAccountMutation = { __typename?: 'Mutation', createUserAccount: { __typename?: 'UserAccount', id: string, email: string, fullName: string, username: string, role: { __typename?: 'Role', code: string, name: string }, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null } } };

export type DeleteInvitedUserAccountMutationVariables = Exact<{
  invitedUserID: Scalars['UUID']['input'];
}>;


export type DeleteInvitedUserAccountMutation = { __typename?: 'Mutation', deleteInvitedUserAccount: { __typename?: 'DeleteInvitedUserAccountPayload', invitedUser: { __typename?: 'InvitedUserAccount', id: string, email: string } } };

export type DeleteProjectLabelMutationVariables = Exact<{
  projectLabelID: Scalars['UUID']['input'];
}>;


export type DeleteProjectLabelMutation = { __typename?: 'Mutation', deleteProjectLabel: { __typename?: 'ProjectLabel', id: string } };

export type DeleteTaskMutationVariables = Exact<{
  taskID: Scalars['UUID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: { __typename?: 'DeleteTaskPayload', taskID: string } };

export type DeleteTaskGroupMutationVariables = Exact<{
  taskGroupID: Scalars['UUID']['input'];
}>;


export type DeleteTaskGroupMutation = { __typename?: 'Mutation', deleteTaskGroup: { __typename?: 'DeleteTaskGroupPayload', ok: boolean, affectedRows: number, taskGroup: { __typename?: 'TaskGroup', id: string, tasks: Array<{ __typename?: 'Task', id: string, name: string }> } } };

export type DeleteTaskGroupTasksMutationVariables = Exact<{
  taskGroupID: Scalars['UUID']['input'];
}>;


export type DeleteTaskGroupTasksMutation = { __typename?: 'Mutation', deleteTaskGroupTasks: { __typename?: 'DeleteTaskGroupTasksPayload', tasks: Array<string>, taskGroupID: string } };

export type DeleteUserAccountMutationVariables = Exact<{
  userID: Scalars['UUID']['input'];
  newOwnerID?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type DeleteUserAccountMutation = { __typename?: 'Mutation', deleteUserAccount: { __typename?: 'DeleteUserAccountPayload', userAccount: { __typename?: 'UserAccount', id: string, email: string, fullName: string } } };

export type DuplicateTaskGroupMutationVariables = Exact<{
  taskGroupID: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
  projectID: Scalars['UUID']['input'];
}>;


export type DuplicateTaskGroupMutation = { __typename?: 'Mutation', duplicateTaskGroup: { __typename?: 'DuplicateTaskGroupPayload', taskGroup: { __typename?: 'TaskGroup', id: string, name: string, position: number, tasks: Array<{ __typename?: 'Task', id: string, shortId: string, name: string, description?: string | null, hasTime: boolean, complete: boolean, watched: boolean, completedAt?: any | null, position: number, dueDate: { __typename?: 'DueDate', at?: any | null }, badges: { __typename?: 'TaskBadges', checklist?: { __typename?: 'ChecklistBadge', complete: number, total: number } | null, comments?: { __typename?: 'CommentsBadge', unread: boolean, total: number } | null }, taskGroup: { __typename?: 'TaskGroup', id: string, name: string, position: number }, labels: Array<{ __typename?: 'TaskLabel', id: string, assignedDate: any, projectLabel: { __typename?: 'ProjectLabel', id: string, name?: string | null, createdDate: any, labelColor: { __typename?: 'LabelColor', id: string, colorHex: string, position: number, name: string } } }>, assigned: Array<{ __typename?: 'Member', id: string, fullName: string, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null } }> }> } } };

export type FindTaskQueryVariables = Exact<{
  taskID: Scalars['String']['input'];
}>;


export type FindTaskQuery = { __typename?: 'Query', findTask: { __typename?: 'Task', id: string, shortId: string, name: string, watched: boolean, description?: string | null, position: number, complete: boolean, hasTime: boolean, dueDate: { __typename?: 'DueDate', at?: any | null, notifications: Array<{ __typename?: 'DueDateNotification', id: string, period: number, duration: DueDateNotificationDuration }> }, taskGroup: { __typename?: 'TaskGroup', id: string, name: string }, comments: Array<{ __typename?: 'TaskComment', id: string, pinned: boolean, message: string, createdAt: any, updatedAt?: any | null, createdBy: { __typename?: 'CreatedBy', id: string, fullName: string, profileIcon: { __typename?: 'ProfileIcon', initials?: string | null, bgColor?: string | null, url?: string | null } } }>, activity: Array<{ __typename?: 'TaskActivity', id: string, type: ActivityType, createdAt: any, causedBy: { __typename?: 'CausedBy', id: string, fullName: string, profileIcon?: { __typename?: 'ProfileIcon', initials?: string | null, bgColor?: string | null, url?: string | null } | null }, data: Array<{ __typename?: 'TaskActivityData', name: string, value: string }> }>, badges: { __typename?: 'TaskBadges', checklist?: { __typename?: 'ChecklistBadge', total: number, complete: number } | null }, checklists: Array<{ __typename?: 'TaskChecklist', id: string, name: string, position: number, items: Array<{ __typename?: 'TaskChecklistItem', id: string, name: string, taskChecklistID: string, complete: boolean, position: number }> }>, labels: Array<{ __typename?: 'TaskLabel', id: string, assignedDate: any, projectLabel: { __typename?: 'ProjectLabel', id: string, name?: string | null, createdDate: any, labelColor: { __typename?: 'LabelColor', id: string, colorHex: string, position: number, name: string } } }>, assigned: Array<{ __typename?: 'Member', id: string, fullName: string, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null } }> }, me?: { __typename?: 'MePayload', user: { __typename?: 'UserAccount', id: string, fullName: string, profileIcon: { __typename?: 'ProfileIcon', initials?: string | null, bgColor?: string | null, url?: string | null } } } | null };

export type LegacyGetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type LegacyGetProjectsQuery = { __typename?: 'Query', organizations: Array<{ __typename?: 'Organization', id: string, name: string }>, teams: Array<{ __typename?: 'Team', id: string, name: string, createdAt: any }>, projects: Array<{ __typename?: 'Project', id: string, shortId: string, name: string, team?: { __typename?: 'Team', id: string, name: string } | null }> };

export type LabelsQueryVariables = Exact<{
  projectID: Scalars['UUID']['input'];
}>;


export type LabelsQuery = { __typename?: 'Query', findProject: { __typename?: 'Project', labels: Array<{ __typename?: 'ProjectLabel', id: string, createdDate: any, name?: string | null, labelColor: { __typename?: 'LabelColor', id: string, name: string, colorHex: string, position: number } }> }, labelColors: Array<{ __typename?: 'LabelColor', id: string, position: number, colorHex: string, name: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'MePayload', user: { __typename?: 'UserAccount', id: string, fullName: string, username: string, email: string, bio: string, profileIcon: { __typename?: 'ProfileIcon', initials?: string | null, bgColor?: string | null, url?: string | null } }, teamRoles: Array<{ __typename?: 'TeamRole', teamID: string, roleCode: RoleCode }>, projectRoles: Array<{ __typename?: 'ProjectRole', projectID: string, roleCode: RoleCode }> } | null };

export type LegacyMyTasksQueryVariables = Exact<{
  status: MyTasksStatus;
  sort: MyTasksSort;
}>;


export type LegacyMyTasksQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, name: string }>, myTasks: { __typename?: 'MyTasksPayload', tasks: Array<{ __typename?: 'Task', id: string, shortId: string, name: string, hasTime: boolean, complete: boolean, completedAt?: any | null, taskGroup: { __typename?: 'TaskGroup', id: string, name: string }, dueDate: { __typename?: 'DueDate', at?: any | null } }>, projects: Array<{ __typename?: 'ProjectTaskMapping', projectID: string, taskID: string }> } };

export type NotificationToggleReadMutationVariables = Exact<{
  notifiedID: Scalars['UUID']['input'];
}>;


export type NotificationToggleReadMutation = { __typename?: 'Mutation', notificationToggleRead: { __typename?: 'Notified', id: string, read: boolean, readAt?: any | null } };

export type NotificationMarkAllReadMutationVariables = Exact<{ [key: string]: never; }>;


export type NotificationMarkAllReadMutation = { __typename?: 'Mutation', notificationMarkAllRead: { __typename?: 'NotificationMarkAllAsReadResult', success: boolean } };

export type NotificationsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  filter: NotificationFilter;
}>;


export type NotificationsQuery = { __typename?: 'Query', notified: { __typename?: 'NotifiedResult', totalCount: number, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, notified: Array<{ __typename?: 'Notified', id: string, read: boolean, readAt?: any | null, notification: { __typename?: 'Notification', id: string, actionType: ActionType, createdAt: any, data: Array<{ __typename?: 'NotificationData', key: string, value: string }>, causedBy?: { __typename?: 'NotificationCausedBy', username: string, fullname: string, id: string } | null } }> } };

export type HasUnreadNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type HasUnreadNotificationsQuery = { __typename?: 'Query', hasUnreadNotifications: { __typename?: 'HasUnreadNotificationsResult', unread: boolean } };

export type TopNavbarQueryVariables = Exact<{ [key: string]: never; }>;


export type TopNavbarQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'Notified', id: string, read: boolean, readAt?: any | null, notification: { __typename?: 'Notification', id: string, actionType: ActionType, createdAt: any, causedBy?: { __typename?: 'NotificationCausedBy', username: string, fullname: string, id: string } | null } }>, me?: { __typename?: 'MePayload', user: { __typename?: 'UserAccount', id: string, fullName: string, profileIcon: { __typename?: 'ProfileIcon', initials?: string | null, bgColor?: string | null, url?: string | null } }, teamRoles: Array<{ __typename?: 'TeamRole', teamID: string, roleCode: RoleCode }>, projectRoles: Array<{ __typename?: 'ProjectRole', projectID: string, roleCode: RoleCode }> } | null };

export type NotificationAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationAddedSubscription = { __typename?: 'Subscription', notificationAdded: { __typename?: 'Notified', id: string, read: boolean, readAt?: any | null, notification: { __typename?: 'Notification', id: string, actionType: ActionType, createdAt: any, data: Array<{ __typename?: 'NotificationData', key: string, value: string }>, causedBy?: { __typename?: 'NotificationCausedBy', username: string, fullname: string, id: string } | null } } };

export type SetTaskCompleteMutationVariables = Exact<{
  taskID: Scalars['UUID']['input'];
  complete: Scalars['Boolean']['input'];
}>;


export type SetTaskCompleteMutation = { __typename?: 'Mutation', setTaskComplete: { __typename?: 'Task', id: string, name: string, complete: boolean, completedAt?: any | null, position: number } };

export type SortTaskGroupMutationVariables = Exact<{
  tasks: Array<TaskPositionUpdate> | TaskPositionUpdate;
  taskGroupID: Scalars['UUID']['input'];
}>;


export type SortTaskGroupMutation = { __typename?: 'Mutation', sortTaskGroup: { __typename?: 'SortTaskGroupPayload', taskGroupID: string, tasks: Array<{ __typename?: 'Task', id: string, position: number }> } };

export type ToggleTaskLabelMutationVariables = Exact<{
  taskID: Scalars['UUID']['input'];
  projectLabelID: Scalars['UUID']['input'];
}>;


export type ToggleTaskLabelMutation = { __typename?: 'Mutation', toggleTaskLabel: { __typename?: 'ToggleTaskLabelPayload', active: boolean, task: { __typename?: 'Task', id: string, labels: Array<{ __typename?: 'TaskLabel', id: string, assignedDate: any, projectLabel: { __typename?: 'ProjectLabel', id: string, createdDate: any, name?: string | null, labelColor: { __typename?: 'LabelColor', id: string, colorHex: string, name: string, position: number } } }> } } };

export type UnassignTaskMutationVariables = Exact<{
  taskID: Scalars['UUID']['input'];
  userID: Scalars['UUID']['input'];
}>;


export type UnassignTaskMutation = { __typename?: 'Mutation', unassignTask: { __typename?: 'Task', id: string, assigned: Array<{ __typename?: 'Member', id: string, fullName: string }> } };

export type UpdateProjectLabelMutationVariables = Exact<{
  projectLabelID: Scalars['UUID']['input'];
  labelColorID: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateProjectLabelMutation = { __typename?: 'Mutation', updateProjectLabel: { __typename?: 'ProjectLabel', id: string, createdDate: any, name?: string | null, labelColor: { __typename?: 'LabelColor', id: string, colorHex: string, name: string, position: number } } };

export type UpdateProjectNameMutationVariables = Exact<{
  projectID: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateProjectNameMutation = { __typename?: 'Mutation', updateProjectName: { __typename?: 'Project', id: string, name: string } };

export type UpdateTaskDescriptionMutationVariables = Exact<{
  taskID: Scalars['UUID']['input'];
  description: Scalars['String']['input'];
}>;


export type UpdateTaskDescriptionMutation = { __typename?: 'Mutation', updateTaskDescription: { __typename?: 'Task', id: string, description?: string | null } };

export type UpdateTaskDueDateMutationVariables = Exact<{
  taskID: Scalars['UUID']['input'];
  dueDate?: InputMaybe<Scalars['Time']['input']>;
  hasTime: Scalars['Boolean']['input'];
  createNotifications: Array<CreateTaskDueDateNotification> | CreateTaskDueDateNotification;
  updateNotifications: Array<UpdateTaskDueDateNotification> | UpdateTaskDueDateNotification;
  deleteNotifications: Array<DeleteTaskDueDateNotification> | DeleteTaskDueDateNotification;
}>;


export type UpdateTaskDueDateMutation = { __typename?: 'Mutation', updateTaskDueDate: { __typename?: 'Task', id: string, hasTime: boolean, dueDate: { __typename?: 'DueDate', at?: any | null } }, createTaskDueDateNotifications: { __typename?: 'CreateTaskDueDateNotificationsResult', notifications: Array<{ __typename?: 'DueDateNotification', id: string, period: number, duration: DueDateNotificationDuration }> }, updateTaskDueDateNotifications: { __typename?: 'UpdateTaskDueDateNotificationsResult', notifications: Array<{ __typename?: 'DueDateNotification', id: string, period: number, duration: DueDateNotificationDuration }> }, deleteTaskDueDateNotifications: { __typename?: 'DeleteTaskDueDateNotificationsResult', notifications: Array<string> } };

export type UpdateTaskGroupLocationMutationVariables = Exact<{
  taskGroupID: Scalars['UUID']['input'];
  position: Scalars['Float']['input'];
}>;


export type UpdateTaskGroupLocationMutation = { __typename?: 'Mutation', updateTaskGroupLocation: { __typename?: 'TaskGroup', id: string, position: number } };

export type UpdateTaskGroupNameMutationVariables = Exact<{
  taskGroupID: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateTaskGroupNameMutation = { __typename?: 'Mutation', updateTaskGroupName: { __typename?: 'TaskGroup', id: string, name: string } };

export type UpdateTaskLocationMutationVariables = Exact<{
  taskID: Scalars['UUID']['input'];
  taskGroupID: Scalars['UUID']['input'];
  position: Scalars['Float']['input'];
}>;


export type UpdateTaskLocationMutation = { __typename?: 'Mutation', updateTaskLocation: { __typename?: 'UpdateTaskLocationPayload', previousTaskGroupID: string, task: { __typename?: 'Task', id: string, createdAt: any, name: string, position: number, taskGroup: { __typename?: 'TaskGroup', id: string } } } };

export type UpdateTaskNameMutationVariables = Exact<{
  taskID: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateTaskNameMutation = { __typename?: 'Mutation', updateTaskName: { __typename?: 'Task', id: string, name: string, position: number } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', invitedUsers: Array<{ __typename?: 'InvitedUserAccount', id: string, email: string, invitedOn: any }>, users: Array<{ __typename?: 'UserAccount', id: string, email: string, fullName: string, username: string, role: { __typename?: 'Role', code: string, name: string }, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null }, owned: { __typename?: 'OwnedList', teams: Array<{ __typename?: 'Team', id: string, name: string }>, projects: Array<{ __typename?: 'Project', id: string, name: string }> }, member: { __typename?: 'MemberList', teams: Array<{ __typename?: 'Team', id: string, name: string }>, projects: Array<{ __typename?: 'Project', id: string, name: string }> } }> };

export type CreateTaskCommentMutationVariables = Exact<{
  taskID: Scalars['UUID']['input'];
  message: Scalars['String']['input'];
}>;


export type CreateTaskCommentMutation = { __typename?: 'Mutation', createTaskComment: { __typename?: 'CreateTaskCommentPayload', taskID: string, comment: { __typename?: 'TaskComment', id: string, message: string, pinned: boolean, createdAt: any, updatedAt?: any | null, createdBy: { __typename?: 'CreatedBy', id: string, fullName: string, profileIcon: { __typename?: 'ProfileIcon', initials?: string | null, bgColor?: string | null, url?: string | null } } } } };

export type UpdateTaskCommentMutationVariables = Exact<{
  commentID: Scalars['UUID']['input'];
  message: Scalars['String']['input'];
}>;


export type UpdateTaskCommentMutation = { __typename?: 'Mutation', updateTaskComment: { __typename?: 'UpdateTaskCommentPayload', taskID: string, comment: { __typename?: 'TaskComment', id: string, message: string, updatedAt?: any | null } } };

export type DeleteTaskCommentMutationVariables = Exact<{
  commentID: Scalars['UUID']['input'];
}>;


export type DeleteTaskCommentMutation = { __typename?: 'Mutation', deleteTaskComment: { __typename?: 'DeleteTaskCommentPayload', taskID: string, commentID: string } };

export type CreateTaskChecklistMutationVariables = Exact<{
  taskID: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
}>;


export type CreateTaskChecklistMutation = { __typename?: 'Mutation', createTaskChecklist: { __typename?: 'TaskChecklist', id: string, name: string, position: number, items: Array<{ __typename?: 'TaskChecklistItem', id: string, name: string, taskChecklistID: string, complete: boolean, position: number }> } };

export type DeleteTaskChecklistMutationVariables = Exact<{
  taskChecklistID: Scalars['UUID']['input'];
}>;


export type DeleteTaskChecklistMutation = { __typename?: 'Mutation', deleteTaskChecklist: { __typename?: 'DeleteTaskChecklistPayload', ok: boolean, taskChecklist: { __typename?: 'TaskChecklist', id: string } } };

export type UpdateTaskChecklistNameMutationVariables = Exact<{
  taskChecklistID: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateTaskChecklistNameMutation = { __typename?: 'Mutation', updateTaskChecklistName: { __typename?: 'TaskChecklist', id: string, name: string } };

export type CreateTaskChecklistItemMutationVariables = Exact<{
  taskChecklistID: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
  position: Scalars['Float']['input'];
}>;


export type CreateTaskChecklistItemMutation = { __typename?: 'Mutation', createTaskChecklistItem: { __typename?: 'TaskChecklistItem', id: string, name: string, taskChecklistID: string, position: number, complete: boolean } };

export type SetTaskChecklistItemCompleteMutationVariables = Exact<{
  taskChecklistItemID: Scalars['UUID']['input'];
  complete: Scalars['Boolean']['input'];
}>;


export type SetTaskChecklistItemCompleteMutation = { __typename?: 'Mutation', setTaskChecklistItemComplete: { __typename?: 'TaskChecklistItem', id: string, complete: boolean } };

export type DeleteTaskChecklistItemMutationVariables = Exact<{
  taskChecklistItemID: Scalars['UUID']['input'];
}>;


export type DeleteTaskChecklistItemMutation = { __typename?: 'Mutation', deleteTaskChecklistItem: { __typename?: 'DeleteTaskChecklistItemPayload', ok: boolean, taskChecklistItem: { __typename?: 'TaskChecklistItem', id: string, taskChecklistID: string } } };

export type UpdateTaskChecklistItemNameMutationVariables = Exact<{
  taskChecklistItemID: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateTaskChecklistItemNameMutation = { __typename?: 'Mutation', updateTaskChecklistItemName: { __typename?: 'TaskChecklistItem', id: string, name: string } };

export type CreateDueDateNotificationsMutationVariables = Exact<{
  input: Array<CreateTaskDueDateNotification> | CreateTaskDueDateNotification;
}>;


export type CreateDueDateNotificationsMutation = { __typename?: 'Mutation', createTaskDueDateNotifications: { __typename?: 'CreateTaskDueDateNotificationsResult', notifications: Array<{ __typename?: 'DueDateNotification', id: string, period: number, duration: DueDateNotificationDuration }> } };

export type DeleteDueDateNotificationsMutationVariables = Exact<{
  input: Array<DeleteTaskDueDateNotification> | DeleteTaskDueDateNotification;
}>;


export type DeleteDueDateNotificationsMutation = { __typename?: 'Mutation', deleteTaskDueDateNotifications: { __typename?: 'DeleteTaskDueDateNotificationsResult', notifications: Array<string> } };

export type ToggleTaskWatchMutationVariables = Exact<{
  taskID: Scalars['UUID']['input'];
}>;


export type ToggleTaskWatchMutation = { __typename?: 'Mutation', toggleTaskWatch: { __typename?: 'Task', id: string, watched: boolean } };

export type UpdateTaskChecklistLocationMutationVariables = Exact<{
  taskChecklistID: Scalars['UUID']['input'];
  position: Scalars['Float']['input'];
}>;


export type UpdateTaskChecklistLocationMutation = { __typename?: 'Mutation', updateTaskChecklistLocation: { __typename?: 'UpdateTaskChecklistLocationPayload', checklist: { __typename?: 'TaskChecklist', id: string, position: number } } };

export type UpdateTaskChecklistItemLocationMutationVariables = Exact<{
  taskChecklistID: Scalars['UUID']['input'];
  taskChecklistItemID: Scalars['UUID']['input'];
  position: Scalars['Float']['input'];
}>;


export type UpdateTaskChecklistItemLocationMutation = { __typename?: 'Mutation', updateTaskChecklistItemLocation: { __typename?: 'UpdateTaskChecklistItemLocationPayload', taskChecklistID: string, prevChecklistID: string, checklistItem: { __typename?: 'TaskChecklistItem', id: string, taskChecklistID: string, position: number } } };

export type DeleteTeamMutationVariables = Exact<{
  teamID: Scalars['UUID']['input'];
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam: { __typename?: 'DeleteTeamPayload', ok: boolean, team: { __typename?: 'Team', id: string } } };

export type CreateTeamMemberMutationVariables = Exact<{
  userID: Scalars['UUID']['input'];
  teamID: Scalars['UUID']['input'];
}>;


export type CreateTeamMemberMutation = { __typename?: 'Mutation', createTeamMember: { __typename?: 'CreateTeamMemberPayload', team: { __typename?: 'Team', id: string }, teamMember: { __typename?: 'Member', id: string, username: string, fullName: string, role: { __typename?: 'Role', code: string, name: string }, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null } } } };

export type DeleteTeamMemberMutationVariables = Exact<{
  teamID: Scalars['UUID']['input'];
  userID: Scalars['UUID']['input'];
  newOwnerID?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type DeleteTeamMemberMutation = { __typename?: 'Mutation', deleteTeamMember: { __typename?: 'DeleteTeamMemberPayload', teamID: string, userID: string } };

export type UpdateTeamMemberRoleMutationVariables = Exact<{
  teamID: Scalars['UUID']['input'];
  userID: Scalars['UUID']['input'];
  roleCode: RoleCode;
}>;


export type UpdateTeamMemberRoleMutation = { __typename?: 'Mutation', updateTeamMemberRole: { __typename?: 'UpdateTeamMemberRolePayload', teamID: string, member: { __typename?: 'Member', id: string, role: { __typename?: 'Role', code: string, name: string } } } };

export type GetTeamQueryVariables = Exact<{
  teamID: Scalars['UUID']['input'];
}>;


export type GetTeamQuery = { __typename?: 'Query', findTeam: { __typename?: 'Team', id: string, createdAt: any, name: string, members: Array<{ __typename?: 'Member', id: string, fullName: string, username: string, role: { __typename?: 'Role', code: string, name: string }, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null }, owned: { __typename?: 'OwnedList', teams: Array<{ __typename?: 'Team', id: string, name: string }>, projects: Array<{ __typename?: 'Project', id: string, name: string }> }, member: { __typename?: 'MemberList', teams: Array<{ __typename?: 'Team', id: string, name: string }>, projects: Array<{ __typename?: 'Project', id: string, name: string }> } }> }, projects: Array<{ __typename?: 'Project', id: string, shortId: string, name: string, team?: { __typename?: 'Team', id: string, name: string } | null }>, users: Array<{ __typename?: 'UserAccount', id: string, email: string, fullName: string, username: string, role: { __typename?: 'Role', code: string, name: string }, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null }, owned: { __typename?: 'OwnedList', teams: Array<{ __typename?: 'Team', id: string, name: string }>, projects: Array<{ __typename?: 'Project', id: string, name: string }> }, member: { __typename?: 'MemberList', teams: Array<{ __typename?: 'Team', id: string, name: string }>, projects: Array<{ __typename?: 'Project', id: string, name: string }> } }> };

export const TaskFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasTime"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unread"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"taskGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedDate"}},{"kind":"Field","name":{"kind":"Name","value":"projectLabel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"labelColor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"assigned"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}}]}}]}}]} as unknown as DocumentNode<TaskFieldsFragment, unknown>;
export const UpdateUserRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUserRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleCode"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"roleCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleCode"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;
export const GetDashboardDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDashboardData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetDashboardDataQuery, GetDashboardDataQueryVariables>;
export const GetMyTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MyTasksStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MyTasksSort"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myTasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"taskGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectID"}},{"kind":"Field","name":{"kind":"Name","value":"taskID"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyTasksQuery, GetMyTasksQueryVariables>;
export const UpdateUserInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUserInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"initials"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"initials"},"value":{"kind":"Variable","name":{"kind":"Name","value":"initials"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"bio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bio"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initials"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
export const UpdateUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const ClearProfileAvatarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"clearProfileAvatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearProfileAvatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<ClearProfileAvatarMutation, ClearProfileAvatarMutationVariables>;
export const GetMyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamID"}},{"kind":"Field","name":{"kind":"Name","value":"roleCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectID"}},{"kind":"Field","name":{"kind":"Name","value":"roleCode"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyProfileQuery, GetMyProfileQueryVariables>;
export const FindProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectShortID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"publicOn"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"invitedMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"invitedOn"}}]}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"labelColor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"taskGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskFields"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"labelColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owned"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasTime"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unread"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"taskGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedDate"}},{"kind":"Field","name":{"kind":"Name","value":"projectLabel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"labelColor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"assigned"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}}]}}]}}]} as unknown as DocumentNode<FindProjectQuery, FindProjectQueryVariables>;
export const DeleteProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const ToggleProjectVisibilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"toggleProjectVisibility"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isPublic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleProjectVisibility"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isPublic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isPublic"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"publicOn"}}]}}]}}]}}]} as unknown as DocumentNode<ToggleProjectVisibilityMutation, ToggleProjectVisibilityMutationVariables>;
export const InviteProjectMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"inviteProjectMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"members"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MemberInvite"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteProjectMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"members"},"value":{"kind":"Variable","name":{"kind":"Name","value":"members"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"invitedMembers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"invitedOn"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<InviteProjectMembersMutation, InviteProjectMembersMutationVariables>;
export const DeleteProjectMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProjectMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProjectMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectID"}}]}}]}}]} as unknown as DocumentNode<DeleteProjectMemberMutation, DeleteProjectMemberMutationVariables>;
export const DeleteInvitedProjectMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteInvitedProjectMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteInvitedProjectMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitedMember"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteInvitedProjectMemberMutation, DeleteInvitedProjectMemberMutationVariables>;
export const UpdateProjectMemberRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProjectMemberRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleCode"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProjectMemberRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"roleCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleCode"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProjectMemberRoleMutation, UpdateProjectMemberRoleMutationVariables>;
export const GetProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectsQuery, GetProjectsQueryVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"organizationID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateTeamMutation, CreateTeamMutationVariables>;
export const GetProjectBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjectBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"taskGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectBoardQuery, GetProjectBoardQueryVariables>;
export const CreateTaskGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTaskGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTaskGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<CreateTaskGroupMutation, CreateTaskGroupMutationVariables>;
export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assigned"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskGroupID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"assigned"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assigned"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const AssignTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"assignTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assigned"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]}}]} as unknown as DocumentNode<AssignTaskMutation, AssignTaskMutationVariables>;
export const LegacyCreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LegacyCreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<LegacyCreateProjectMutation, LegacyCreateProjectMutationVariables>;
export const CreateProjectLabelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProjectLabel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"labelColorID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProjectLabel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"labelColorID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"labelColorID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"labelColor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateProjectLabelMutation, CreateProjectLabelMutationVariables>;
export const LegacyCreateTaskGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LegacyCreateTaskGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTaskGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<LegacyCreateTaskGroupMutation, LegacyCreateTaskGroupMutationVariables>;
export const CreateUserAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUserAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"initials"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"fullName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"initials"},"value":{"kind":"Variable","name":{"kind":"Name","value":"initials"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"roleCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleCode"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUserAccountMutation, CreateUserAccountMutationVariables>;
export const DeleteInvitedUserAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteInvitedUserAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitedUserID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteInvitedUserAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"invitedUserID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitedUserID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitedUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteInvitedUserAccountMutation, DeleteInvitedUserAccountMutationVariables>;
export const DeleteProjectLabelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteProjectLabel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectLabelID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProjectLabel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectLabelID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectLabelID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteProjectLabelMutation, DeleteProjectLabelMutationVariables>;
export const DeleteTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskID"}}]}}]}}]} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const DeleteTaskGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTaskGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTaskGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskGroupID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"affectedRows"}},{"kind":"Field","name":{"kind":"Name","value":"taskGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeleteTaskGroupMutation, DeleteTaskGroupMutationVariables>;
export const DeleteTaskGroupTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTaskGroupTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTaskGroupTasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskGroupID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"}},{"kind":"Field","name":{"kind":"Name","value":"taskGroupID"}}]}}]}}]} as unknown as DocumentNode<DeleteTaskGroupTasksMutation, DeleteTaskGroupTasksMutationVariables>;
export const DeleteUserAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteUserAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newOwnerID"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUserAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"newOwnerID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newOwnerID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteUserAccountMutation, DeleteUserAccountMutationVariables>;
export const DuplicateTaskGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"duplicateTaskGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duplicateTaskGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"taskGroupID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasTime"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unread"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"taskGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedDate"}},{"kind":"Field","name":{"kind":"Name","value":"projectLabel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"labelColor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"assigned"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DuplicateTaskGroupMutation, DuplicateTaskGroupMutationVariables>;
export const FindTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"findTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskShortID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"at"}},{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"period"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"hasTime"}},{"kind":"Field","name":{"kind":"Name","value":"taskGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pinned"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"activity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"causedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"checklists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"taskChecklistID"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedDate"}},{"kind":"Field","name":{"kind":"Name","value":"projectLabel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"labelColor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"assigned"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FindTaskQuery, FindTaskQueryVariables>;
export const LegacyGetProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LegacyGetProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<LegacyGetProjectsQuery, LegacyGetProjectsQueryVariables>;
export const LabelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"labels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"labelColor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"labelColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<LabelsQuery, LabelsQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamID"}},{"kind":"Field","name":{"kind":"Name","value":"roleCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectID"}},{"kind":"Field","name":{"kind":"Name","value":"roleCode"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const LegacyMyTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LegacyMyTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MyTasksStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MyTasksSort"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myTasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"taskGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasTime"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectID"}},{"kind":"Field","name":{"kind":"Name","value":"taskID"}}]}}]}}]}}]} as unknown as DocumentNode<LegacyMyTasksQuery, LegacyMyTasksQueryVariables>;
export const NotificationToggleReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"notificationToggleRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"notifiedID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationToggleRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"notifiedID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"notifiedID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}}]}}]}}]} as unknown as DocumentNode<NotificationToggleReadMutation, NotificationToggleReadMutationVariables>;
export const NotificationMarkAllReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"notificationMarkAllRead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationMarkAllRead"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<NotificationMarkAllReadMutation, NotificationMarkAllReadMutationVariables>;
export const NotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"notifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notified"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notified"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}},{"kind":"Field","name":{"kind":"Name","value":"notification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"causedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<NotificationsQuery, NotificationsQueryVariables>;
export const HasUnreadNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"hasUnreadNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasUnreadNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unread"}}]}}]}}]} as unknown as DocumentNode<HasUnreadNotificationsQuery, HasUnreadNotificationsQueryVariables>;
export const TopNavbarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"topNavbar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}},{"kind":"Field","name":{"kind":"Name","value":"notification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"causedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamID"}},{"kind":"Field","name":{"kind":"Name","value":"roleCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectID"}},{"kind":"Field","name":{"kind":"Name","value":"roleCode"}}]}}]}}]}}]} as unknown as DocumentNode<TopNavbarQuery, TopNavbarQueryVariables>;
export const NotificationAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"notificationAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}},{"kind":"Field","name":{"kind":"Name","value":"notification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"causedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<NotificationAddedSubscription, NotificationAddedSubscriptionVariables>;
export const SetTaskCompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setTaskComplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"complete"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setTaskComplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"complete"},"value":{"kind":"Variable","name":{"kind":"Name","value":"complete"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<SetTaskCompleteMutation, SetTaskCompleteMutationVariables>;
export const SortTaskGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sortTaskGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tasks"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskPositionUpdate"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sortTaskGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskGroupID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"tasks"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tasks"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskGroupID"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<SortTaskGroupMutation, SortTaskGroupMutationVariables>;
export const ToggleTaskLabelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"toggleTaskLabel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectLabelID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleTaskLabel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"projectLabelID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectLabelID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedDate"}},{"kind":"Field","name":{"kind":"Name","value":"projectLabel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"labelColor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ToggleTaskLabelMutation, ToggleTaskLabelMutationVariables>;
export const UnassignTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unassignTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unassignTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assigned"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UnassignTaskMutation, UnassignTaskMutationVariables>;
export const UpdateProjectLabelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProjectLabel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectLabelID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"labelColorID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProjectLabel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectLabelID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectLabelID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"labelColorID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"labelColorID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdDate"}},{"kind":"Field","name":{"kind":"Name","value":"labelColor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"colorHex"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateProjectLabelMutation, UpdateProjectLabelMutationVariables>;
export const UpdateProjectNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProjectName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProjectName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateProjectNameMutation, UpdateProjectNameMutationVariables>;
export const UpdateTaskDescriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTaskDescription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskDescription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskDescriptionMutation, UpdateTaskDescriptionMutationVariables>;
export const UpdateTaskDueDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTaskDueDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dueDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Time"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createNotifications"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTaskDueDateNotification"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateNotifications"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTaskDueDateNotification"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteNotifications"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteTaskDueDateNotification"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskDueDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"dueDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dueDate"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"hasTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasTime"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasTime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createTaskDueDateNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createNotifications"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"period"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updateTaskDueDateNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateNotifications"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"period"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"deleteTaskDueDateNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteNotifications"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskDueDateMutation, UpdateTaskDueDateMutationVariables>;
export const UpdateTaskGroupLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTaskGroupLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskGroupLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskGroupID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskGroupLocationMutation, UpdateTaskGroupLocationMutationVariables>;
export const UpdateTaskGroupNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTaskGroupName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskGroupName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskGroupID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskGroupNameMutation, UpdateTaskGroupNameMutationVariables>;
export const UpdateTaskLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTaskLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"taskGroupID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskGroupID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"previousTaskGroupID"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"taskGroup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTaskLocationMutation, UpdateTaskLocationMutationVariables>;
export const UpdateTaskNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTaskName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskNameMutation, UpdateTaskNameMutationVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitedUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"invitedOn"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owned"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const CreateTaskCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTaskComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTaskComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskID"}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"pinned"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateTaskCommentMutation, CreateTaskCommentMutationVariables>;
export const UpdateTaskCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"commentID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskID"}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTaskCommentMutation, UpdateTaskCommentMutationVariables>;
export const DeleteTaskCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTaskComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTaskComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"commentID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskID"}},{"kind":"Field","name":{"kind":"Name","value":"commentID"}}]}}]}}]} as unknown as DocumentNode<DeleteTaskCommentMutation, DeleteTaskCommentMutationVariables>;
export const CreateTaskChecklistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTaskChecklist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTaskChecklist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"taskChecklistID"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTaskChecklistMutation, CreateTaskChecklistMutationVariables>;
export const DeleteTaskChecklistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTaskChecklist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTaskChecklist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskChecklistID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"taskChecklist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteTaskChecklistMutation, DeleteTaskChecklistMutationVariables>;
export const UpdateTaskChecklistNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskChecklistName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskChecklistName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskChecklistID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskChecklistNameMutation, UpdateTaskChecklistNameMutationVariables>;
export const CreateTaskChecklistItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTaskChecklistItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTaskChecklistItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskChecklistID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"taskChecklistID"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}}]}}]}}]} as unknown as DocumentNode<CreateTaskChecklistItemMutation, CreateTaskChecklistItemMutationVariables>;
export const SetTaskChecklistItemCompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetTaskChecklistItemComplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistItemID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"complete"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setTaskChecklistItemComplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskChecklistItemID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistItemID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"complete"},"value":{"kind":"Variable","name":{"kind":"Name","value":"complete"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"complete"}}]}}]}}]} as unknown as DocumentNode<SetTaskChecklistItemCompleteMutation, SetTaskChecklistItemCompleteMutationVariables>;
export const DeleteTaskChecklistItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTaskChecklistItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistItemID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTaskChecklistItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskChecklistItemID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistItemID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"taskChecklistItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskChecklistID"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteTaskChecklistItemMutation, DeleteTaskChecklistItemMutationVariables>;
export const UpdateTaskChecklistItemNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTaskChecklistItemName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistItemID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskChecklistItemName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskChecklistItemID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistItemID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateTaskChecklistItemNameMutation, UpdateTaskChecklistItemNameMutationVariables>;
export const CreateDueDateNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDueDateNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTaskDueDateNotification"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTaskDueDateNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"period"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]}}]} as unknown as DocumentNode<CreateDueDateNotificationsMutation, CreateDueDateNotificationsMutationVariables>;
export const DeleteDueDateNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDueDateNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteTaskDueDateNotification"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTaskDueDateNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"}}]}}]}}]} as unknown as DocumentNode<DeleteDueDateNotificationsMutation, DeleteDueDateNotificationsMutationVariables>;
export const ToggleTaskWatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ToggleTaskWatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleTaskWatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}}]}}]} as unknown as DocumentNode<ToggleTaskWatchMutation, ToggleTaskWatchMutationVariables>;
export const UpdateTaskChecklistLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTaskChecklistLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskChecklistLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskChecklistID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTaskChecklistLocationMutation, UpdateTaskChecklistLocationMutationVariables>;
export const UpdateTaskChecklistItemLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTaskChecklistItemLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistItemID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskChecklistItemLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"taskChecklistID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"taskChecklistItemID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskChecklistItemID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskChecklistID"}},{"kind":"Field","name":{"kind":"Name","value":"prevChecklistID"}},{"kind":"Field","name":{"kind":"Name","value":"checklistItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskChecklistID"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTaskChecklistItemLocationMutation, UpdateTaskChecklistItemLocationMutationVariables>;
export const DeleteTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const CreateTeamMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTeamMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeamMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamMember"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateTeamMemberMutation, CreateTeamMemberMutationVariables>;
export const DeleteTeamMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTeamMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newOwnerID"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTeamMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"newOwnerID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newOwnerID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamID"}},{"kind":"Field","name":{"kind":"Name","value":"userID"}}]}}]}}]} as unknown as DocumentNode<DeleteTeamMemberMutation, DeleteTeamMemberMutationVariables>;
export const UpdateTeamMemberRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTeamMemberRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RoleCode"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTeamMemberRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"roleCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleCode"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"teamID"}}]}}]}}]} as unknown as DocumentNode<UpdateTeamMemberRoleMutation, UpdateTeamMemberRoleMutationVariables>;
export const GetTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owned"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teamID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"profileIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"initials"}},{"kind":"Field","name":{"kind":"Name","value":"bgColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owned"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetTeamQuery, GetTeamQueryVariables>;