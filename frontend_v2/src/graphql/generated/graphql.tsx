import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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

export type GetDashboardDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDashboardDataQuery = { __typename?: 'Query', me?: { __typename?: 'MePayload', user: { __typename?: 'UserAccount', id: string, fullName: string, username: string, email: string, profileIcon: { __typename?: 'ProfileIcon', initials?: string | null, bgColor?: string | null, url?: string | null } } } | null, projects: Array<{ __typename?: 'Project', id: string, shortId: string, name: string, team?: { __typename?: 'Team', id: string, name: string } | null }>, teams: Array<{ __typename?: 'Team', id: string, name: string }> };

export type GetMyTasksQueryVariables = Exact<{
  status: MyTasksStatus;
  sort: MyTasksSort;
}>;


export type GetMyTasksQuery = { __typename?: 'Query', myTasks: { __typename?: 'MyTasksPayload', tasks: Array<{ __typename?: 'Task', id: string, shortId: string, name: string, complete: boolean, taskGroup: { __typename?: 'TaskGroup', id: string, name: string } }>, projects: Array<{ __typename?: 'ProjectTaskMapping', projectID: string, taskID: string }> } };

export type FindProjectQueryVariables = Exact<{
  projectID: Scalars['UUID']['input'];
}>;


export type FindProjectQuery = { __typename?: 'Query', findProject: { __typename?: 'Project', id: string, name: string, publicOn?: any | null, team?: { __typename?: 'Team', id: string } | null, members: Array<{ __typename?: 'Member', id: string, fullName: string, username: string, role: { __typename?: 'Role', code: string, name: string }, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null } }>, invitedMembers: Array<{ __typename?: 'InvitedMember', email: string, invitedOn: any }>, labels: Array<{ __typename?: 'ProjectLabel', id: string, createdDate: any, name?: string | null, labelColor: { __typename?: 'LabelColor', id: string, name: string, colorHex: string, position: number } }>, taskGroups: Array<{ __typename?: 'TaskGroup', id: string, name: string, position: number, tasks: Array<{ __typename?: 'Task', id: string, shortId: string, name: string, description?: string | null, hasTime: boolean, complete: boolean, watched: boolean, completedAt?: any | null, position: number, dueDate: { __typename?: 'DueDate', at?: any | null }, badges: { __typename?: 'TaskBadges', checklist?: { __typename?: 'ChecklistBadge', complete: number, total: number } | null, comments?: { __typename?: 'CommentsBadge', unread: boolean, total: number } | null }, taskGroup: { __typename?: 'TaskGroup', id: string, name: string, position: number }, labels: Array<{ __typename?: 'TaskLabel', id: string, assignedDate: any, projectLabel: { __typename?: 'ProjectLabel', id: string, name?: string | null, createdDate: any, labelColor: { __typename?: 'LabelColor', id: string, colorHex: string, position: number, name: string } } }>, assigned: Array<{ __typename?: 'Member', id: string, fullName: string, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null } }> }> }> }, labelColors: Array<{ __typename?: 'LabelColor', id: string, position: number, colorHex: string, name: string }>, users: Array<{ __typename?: 'UserAccount', id: string, email: string, fullName: string, username: string, role: { __typename?: 'Role', code: string, name: string }, profileIcon: { __typename?: 'ProfileIcon', url?: string | null, initials?: string | null, bgColor?: string | null }, owned: { __typename?: 'OwnedList', teams: Array<{ __typename?: 'Team', id: string, name: string }>, projects: Array<{ __typename?: 'Project', id: string, name: string }> }, member: { __typename?: 'MemberList', teams: Array<{ __typename?: 'Team', id: string, name: string }>, projects: Array<{ __typename?: 'Project', id: string, name: string }> } }> };

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

export type ClearProfileAvatarMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearProfileAvatarMutation = { __typename?: 'Mutation', clearProfileAvatar: { __typename?: 'UserAccount', id: string, fullName: string, profileIcon: { __typename?: 'ProfileIcon', initials?: string | null, bgColor?: string | null, url?: string | null } } };

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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'MePayload', user: { __typename?: 'UserAccount', id: string, fullName: string, username: string, email: string, bio: string, profileIcon: { __typename?: 'ProfileIcon', initials?: string | null, bgColor?: string | null, url?: string | null } }, teamRoles: Array<{ __typename?: 'TeamRole', teamID: string, roleCode: RoleCode }>, projectRoles: Array<{ __typename?: 'ProjectRole', projectID: string, roleCode: RoleCode }> } | null };

export type LegacyMyTasksQueryVariables = Exact<{
  status: MyTasksStatus;
  sort: MyTasksSort;
}>;


export type LegacyMyTasksQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, name: string }>, myTasks: { __typename?: 'MyTasksPayload', tasks: Array<{ __typename?: 'Task', id: string, shortId: string, name: string, hasTime: boolean, complete: boolean, completedAt?: any | null, taskGroup: { __typename?: 'TaskGroup', id: string, name: string }, dueDate: { __typename?: 'DueDate', at?: any | null } }>, projects: Array<{ __typename?: 'ProjectTaskMapping', projectID: string, taskID: string }> } };

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

export const TaskFieldsFragmentDoc = gql`
    fragment TaskFields on Task {
  id
  shortId
  name
  description
  dueDate {
    at
  }
  hasTime
  complete
  watched
  completedAt
  position
  badges {
    checklist {
      complete
      total
    }
    comments {
      unread
      total
    }
  }
  taskGroup {
    id
    name
    position
  }
  labels {
    id
    assignedDate
    projectLabel {
      id
      name
      createdDate
      labelColor {
        id
        colorHex
        position
        name
      }
    }
  }
  assigned {
    id
    fullName
    profileIcon {
      url
      initials
      bgColor
    }
  }
}
    `;
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
export function useGetDashboardDataQuery(baseOptions?: Apollo.QueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
      }
export function useGetDashboardDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
        }
// @ts-ignore
export function useGetDashboardDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>): Apollo.UseSuspenseQueryResult<GetDashboardDataQuery, GetDashboardDataQueryVariables>;
export function useGetDashboardDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>): Apollo.UseSuspenseQueryResult<GetDashboardDataQuery | undefined, GetDashboardDataQueryVariables>;
export function useGetDashboardDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDashboardDataQuery, GetDashboardDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDashboardDataQuery, GetDashboardDataQueryVariables>(GetDashboardDataDocument, options);
        }
export type GetDashboardDataQueryHookResult = ReturnType<typeof useGetDashboardDataQuery>;
export type GetDashboardDataLazyQueryHookResult = ReturnType<typeof useGetDashboardDataLazyQuery>;
export type GetDashboardDataSuspenseQueryHookResult = ReturnType<typeof useGetDashboardDataSuspenseQuery>;
export type GetDashboardDataQueryResult = Apollo.QueryResult<GetDashboardDataQuery, GetDashboardDataQueryVariables>;
export const GetMyTasksDocument = gql`
    query GetMyTasks($status: MyTasksStatus!, $sort: MyTasksSort!) {
  myTasks(input: {status: $status, sort: $sort}) {
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
export function useGetMyTasksQuery(baseOptions: Apollo.QueryHookOptions<GetMyTasksQuery, GetMyTasksQueryVariables> & ({ variables: GetMyTasksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(GetMyTasksDocument, options);
      }
export function useGetMyTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTasksQuery, GetMyTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(GetMyTasksDocument, options);
        }
// @ts-ignore
export function useGetMyTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyTasksQuery, GetMyTasksQueryVariables>): Apollo.UseSuspenseQueryResult<GetMyTasksQuery, GetMyTasksQueryVariables>;
export function useGetMyTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyTasksQuery, GetMyTasksQueryVariables>): Apollo.UseSuspenseQueryResult<GetMyTasksQuery | undefined, GetMyTasksQueryVariables>;
export function useGetMyTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMyTasksQuery, GetMyTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(GetMyTasksDocument, options);
        }
export type GetMyTasksQueryHookResult = ReturnType<typeof useGetMyTasksQuery>;
export type GetMyTasksLazyQueryHookResult = ReturnType<typeof useGetMyTasksLazyQuery>;
export type GetMyTasksSuspenseQueryHookResult = ReturnType<typeof useGetMyTasksSuspenseQuery>;
export type GetMyTasksQueryResult = Apollo.QueryResult<GetMyTasksQuery, GetMyTasksQueryVariables>;
export const FindProjectDocument = gql`
    query FindProject($projectID: UUID!) {
  findProject(input: {projectID: $projectID}) {
    id
    name
    publicOn
    team {
      id
    }
    members {
      id
      fullName
      username
      role {
        code
        name
      }
      profileIcon {
        url
        initials
        bgColor
      }
    }
    invitedMembers {
      email
      invitedOn
    }
    labels {
      id
      createdDate
      name
      labelColor {
        id
        name
        colorHex
        position
      }
    }
    taskGroups {
      id
      name
      position
      tasks {
        ...TaskFields
      }
    }
  }
  labelColors {
    id
    position
    colorHex
    name
  }
  users {
    id
    email
    fullName
    username
    role {
      code
      name
    }
    profileIcon {
      url
      initials
      bgColor
    }
    owned {
      teams {
        id
        name
      }
      projects {
        id
        name
      }
    }
    member {
      teams {
        id
        name
      }
      projects {
        id
        name
      }
    }
  }
}
    ${TaskFieldsFragmentDoc}`;

/**
 * __useFindProjectQuery__
 *
 * To run a query within a React component, call `useFindProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProjectQuery({
 *   variables: {
 *      projectID: // value for 'projectID'
 *   },
 * });
 */
export function useFindProjectQuery(baseOptions: Apollo.QueryHookOptions<FindProjectQuery, FindProjectQueryVariables> & ({ variables: FindProjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProjectQuery, FindProjectQueryVariables>(FindProjectDocument, options);
      }
export function useFindProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProjectQuery, FindProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProjectQuery, FindProjectQueryVariables>(FindProjectDocument, options);
        }
// @ts-ignore
export function useFindProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindProjectQuery, FindProjectQueryVariables>): Apollo.UseSuspenseQueryResult<FindProjectQuery, FindProjectQueryVariables>;
export function useFindProjectSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindProjectQuery, FindProjectQueryVariables>): Apollo.UseSuspenseQueryResult<FindProjectQuery | undefined, FindProjectQueryVariables>;
export function useFindProjectSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindProjectQuery, FindProjectQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProjectQuery, FindProjectQueryVariables>(FindProjectDocument, options);
        }
export type FindProjectQueryHookResult = ReturnType<typeof useFindProjectQuery>;
export type FindProjectLazyQueryHookResult = ReturnType<typeof useFindProjectLazyQuery>;
export type FindProjectSuspenseQueryHookResult = ReturnType<typeof useFindProjectSuspenseQuery>;
export type FindProjectQueryResult = Apollo.QueryResult<FindProjectQuery, FindProjectQueryVariables>;
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
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
// @ts-ignore
export function useGetProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>): Apollo.UseSuspenseQueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export function useGetProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>): Apollo.UseSuspenseQueryResult<GetProjectsQuery | undefined, GetProjectsQueryVariables>;
export function useGetProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsSuspenseQueryHookResult = ReturnType<typeof useGetProjectsSuspenseQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($teamID: UUID, $name: String!) {
  createProject(input: {teamID: $teamID, name: $name}) {
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
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

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
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!, $organizationID: UUID!) {
  createTeam(input: {name: $name, organizationID: $organizationID}) {
    id
    createdAt
    name
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

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
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const GetProjectBoardDocument = gql`
    query GetProjectBoard($projectID: UUID!) {
  findProject(input: {projectID: $projectID}) {
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
export function useGetProjectBoardQuery(baseOptions: Apollo.QueryHookOptions<GetProjectBoardQuery, GetProjectBoardQueryVariables> & ({ variables: GetProjectBoardQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectBoardQuery, GetProjectBoardQueryVariables>(GetProjectBoardDocument, options);
      }
export function useGetProjectBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectBoardQuery, GetProjectBoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectBoardQuery, GetProjectBoardQueryVariables>(GetProjectBoardDocument, options);
        }
// @ts-ignore
export function useGetProjectBoardSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProjectBoardQuery, GetProjectBoardQueryVariables>): Apollo.UseSuspenseQueryResult<GetProjectBoardQuery, GetProjectBoardQueryVariables>;
export function useGetProjectBoardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectBoardQuery, GetProjectBoardQueryVariables>): Apollo.UseSuspenseQueryResult<GetProjectBoardQuery | undefined, GetProjectBoardQueryVariables>;
export function useGetProjectBoardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectBoardQuery, GetProjectBoardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectBoardQuery, GetProjectBoardQueryVariables>(GetProjectBoardDocument, options);
        }
export type GetProjectBoardQueryHookResult = ReturnType<typeof useGetProjectBoardQuery>;
export type GetProjectBoardLazyQueryHookResult = ReturnType<typeof useGetProjectBoardLazyQuery>;
export type GetProjectBoardSuspenseQueryHookResult = ReturnType<typeof useGetProjectBoardSuspenseQuery>;
export type GetProjectBoardQueryResult = Apollo.QueryResult<GetProjectBoardQuery, GetProjectBoardQueryVariables>;
export const CreateTaskGroupDocument = gql`
    mutation CreateTaskGroup($projectID: UUID!, $name: String!, $position: Float!) {
  createTaskGroup(
    input: {projectID: $projectID, name: $name, position: $position}
  ) {
    id
    name
    position
  }
}
    `;
export type CreateTaskGroupMutationFn = Apollo.MutationFunction<CreateTaskGroupMutation, CreateTaskGroupMutationVariables>;

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
export function useCreateTaskGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskGroupMutation, CreateTaskGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskGroupMutation, CreateTaskGroupMutationVariables>(CreateTaskGroupDocument, options);
      }
export type CreateTaskGroupMutationHookResult = ReturnType<typeof useCreateTaskGroupMutation>;
export type CreateTaskGroupMutationResult = Apollo.MutationResult<CreateTaskGroupMutation>;
export type CreateTaskGroupMutationOptions = Apollo.BaseMutationOptions<CreateTaskGroupMutation, CreateTaskGroupMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($taskGroupID: UUID!, $name: String!, $position: Float!, $assigned: [UUID!]) {
  createTask(
    input: {taskGroupID: $taskGroupID, name: $name, position: $position, assigned: $assigned}
  ) {
    id
    name
    position
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

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
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const AssignTaskDocument = gql`
    mutation assignTask($taskID: UUID!, $userID: UUID!) {
  assignTask(input: {taskID: $taskID, userID: $userID}) {
    id
    assigned {
      id
      fullName
    }
  }
}
    `;
export type AssignTaskMutationFn = Apollo.MutationFunction<AssignTaskMutation, AssignTaskMutationVariables>;

/**
 * __useAssignTaskMutation__
 *
 * To run a mutation, you first call `useAssignTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignTaskMutation, { data, loading, error }] = useAssignTaskMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useAssignTaskMutation(baseOptions?: Apollo.MutationHookOptions<AssignTaskMutation, AssignTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignTaskMutation, AssignTaskMutationVariables>(AssignTaskDocument, options);
      }
export type AssignTaskMutationHookResult = ReturnType<typeof useAssignTaskMutation>;
export type AssignTaskMutationResult = Apollo.MutationResult<AssignTaskMutation>;
export type AssignTaskMutationOptions = Apollo.BaseMutationOptions<AssignTaskMutation, AssignTaskMutationVariables>;
export const ClearProfileAvatarDocument = gql`
    mutation clearProfileAvatar {
  clearProfileAvatar {
    id
    fullName
    profileIcon {
      initials
      bgColor
      url
    }
  }
}
    `;
export type ClearProfileAvatarMutationFn = Apollo.MutationFunction<ClearProfileAvatarMutation, ClearProfileAvatarMutationVariables>;

/**
 * __useClearProfileAvatarMutation__
 *
 * To run a mutation, you first call `useClearProfileAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearProfileAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearProfileAvatarMutation, { data, loading, error }] = useClearProfileAvatarMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearProfileAvatarMutation(baseOptions?: Apollo.MutationHookOptions<ClearProfileAvatarMutation, ClearProfileAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearProfileAvatarMutation, ClearProfileAvatarMutationVariables>(ClearProfileAvatarDocument, options);
      }
export type ClearProfileAvatarMutationHookResult = ReturnType<typeof useClearProfileAvatarMutation>;
export type ClearProfileAvatarMutationResult = Apollo.MutationResult<ClearProfileAvatarMutation>;
export type ClearProfileAvatarMutationOptions = Apollo.BaseMutationOptions<ClearProfileAvatarMutation, ClearProfileAvatarMutationVariables>;
export const LegacyCreateProjectDocument = gql`
    mutation LegacyCreateProject($teamID: UUID, $name: String!) {
  createProject(input: {teamID: $teamID, name: $name}) {
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
export type LegacyCreateProjectMutationFn = Apollo.MutationFunction<LegacyCreateProjectMutation, LegacyCreateProjectMutationVariables>;

/**
 * __useLegacyCreateProjectMutation__
 *
 * To run a mutation, you first call `useLegacyCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLegacyCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [legacyCreateProjectMutation, { data, loading, error }] = useLegacyCreateProjectMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useLegacyCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<LegacyCreateProjectMutation, LegacyCreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LegacyCreateProjectMutation, LegacyCreateProjectMutationVariables>(LegacyCreateProjectDocument, options);
      }
export type LegacyCreateProjectMutationHookResult = ReturnType<typeof useLegacyCreateProjectMutation>;
export type LegacyCreateProjectMutationResult = Apollo.MutationResult<LegacyCreateProjectMutation>;
export type LegacyCreateProjectMutationOptions = Apollo.BaseMutationOptions<LegacyCreateProjectMutation, LegacyCreateProjectMutationVariables>;
export const CreateProjectLabelDocument = gql`
    mutation createProjectLabel($projectID: UUID!, $labelColorID: UUID!, $name: String!) {
  createProjectLabel(
    input: {projectID: $projectID, labelColorID: $labelColorID, name: $name}
  ) {
    id
    createdDate
    labelColor {
      id
      colorHex
      name
      position
    }
    name
  }
}
    `;
export type CreateProjectLabelMutationFn = Apollo.MutationFunction<CreateProjectLabelMutation, CreateProjectLabelMutationVariables>;

/**
 * __useCreateProjectLabelMutation__
 *
 * To run a mutation, you first call `useCreateProjectLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectLabelMutation, { data, loading, error }] = useCreateProjectLabelMutation({
 *   variables: {
 *      projectID: // value for 'projectID'
 *      labelColorID: // value for 'labelColorID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateProjectLabelMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectLabelMutation, CreateProjectLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectLabelMutation, CreateProjectLabelMutationVariables>(CreateProjectLabelDocument, options);
      }
export type CreateProjectLabelMutationHookResult = ReturnType<typeof useCreateProjectLabelMutation>;
export type CreateProjectLabelMutationResult = Apollo.MutationResult<CreateProjectLabelMutation>;
export type CreateProjectLabelMutationOptions = Apollo.BaseMutationOptions<CreateProjectLabelMutation, CreateProjectLabelMutationVariables>;
export const LegacyCreateTaskGroupDocument = gql`
    mutation LegacyCreateTaskGroup($projectID: UUID!, $name: String!, $position: Float!) {
  createTaskGroup(
    input: {projectID: $projectID, name: $name, position: $position}
  ) {
    id
    name
    position
  }
}
    `;
export type LegacyCreateTaskGroupMutationFn = Apollo.MutationFunction<LegacyCreateTaskGroupMutation, LegacyCreateTaskGroupMutationVariables>;

/**
 * __useLegacyCreateTaskGroupMutation__
 *
 * To run a mutation, you first call `useLegacyCreateTaskGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLegacyCreateTaskGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [legacyCreateTaskGroupMutation, { data, loading, error }] = useLegacyCreateTaskGroupMutation({
 *   variables: {
 *      projectID: // value for 'projectID'
 *      name: // value for 'name'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useLegacyCreateTaskGroupMutation(baseOptions?: Apollo.MutationHookOptions<LegacyCreateTaskGroupMutation, LegacyCreateTaskGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LegacyCreateTaskGroupMutation, LegacyCreateTaskGroupMutationVariables>(LegacyCreateTaskGroupDocument, options);
      }
export type LegacyCreateTaskGroupMutationHookResult = ReturnType<typeof useLegacyCreateTaskGroupMutation>;
export type LegacyCreateTaskGroupMutationResult = Apollo.MutationResult<LegacyCreateTaskGroupMutation>;
export type LegacyCreateTaskGroupMutationOptions = Apollo.BaseMutationOptions<LegacyCreateTaskGroupMutation, LegacyCreateTaskGroupMutationVariables>;
export const CreateUserAccountDocument = gql`
    mutation createUserAccount($email: String!, $username: String!, $fullName: String!, $initials: String!, $password: String!, $roleCode: String!) {
  createUserAccount(
    input: {email: $email, username: $username, fullName: $fullName, initials: $initials, password: $password, roleCode: $roleCode}
  ) {
    id
    email
    fullName
    username
    role {
      code
      name
    }
    profileIcon {
      url
      initials
      bgColor
    }
  }
}
    `;
export type CreateUserAccountMutationFn = Apollo.MutationFunction<CreateUserAccountMutation, CreateUserAccountMutationVariables>;

/**
 * __useCreateUserAccountMutation__
 *
 * To run a mutation, you first call `useCreateUserAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserAccountMutation, { data, loading, error }] = useCreateUserAccountMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      fullName: // value for 'fullName'
 *      initials: // value for 'initials'
 *      password: // value for 'password'
 *      roleCode: // value for 'roleCode'
 *   },
 * });
 */
export function useCreateUserAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserAccountMutation, CreateUserAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserAccountMutation, CreateUserAccountMutationVariables>(CreateUserAccountDocument, options);
      }
export type CreateUserAccountMutationHookResult = ReturnType<typeof useCreateUserAccountMutation>;
export type CreateUserAccountMutationResult = Apollo.MutationResult<CreateUserAccountMutation>;
export type CreateUserAccountMutationOptions = Apollo.BaseMutationOptions<CreateUserAccountMutation, CreateUserAccountMutationVariables>;
export const DeleteInvitedUserAccountDocument = gql`
    mutation deleteInvitedUserAccount($invitedUserID: UUID!) {
  deleteInvitedUserAccount(input: {invitedUserID: $invitedUserID}) {
    invitedUser {
      id
      email
    }
  }
}
    `;
export type DeleteInvitedUserAccountMutationFn = Apollo.MutationFunction<DeleteInvitedUserAccountMutation, DeleteInvitedUserAccountMutationVariables>;

/**
 * __useDeleteInvitedUserAccountMutation__
 *
 * To run a mutation, you first call `useDeleteInvitedUserAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInvitedUserAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInvitedUserAccountMutation, { data, loading, error }] = useDeleteInvitedUserAccountMutation({
 *   variables: {
 *      invitedUserID: // value for 'invitedUserID'
 *   },
 * });
 */
export function useDeleteInvitedUserAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInvitedUserAccountMutation, DeleteInvitedUserAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInvitedUserAccountMutation, DeleteInvitedUserAccountMutationVariables>(DeleteInvitedUserAccountDocument, options);
      }
export type DeleteInvitedUserAccountMutationHookResult = ReturnType<typeof useDeleteInvitedUserAccountMutation>;
export type DeleteInvitedUserAccountMutationResult = Apollo.MutationResult<DeleteInvitedUserAccountMutation>;
export type DeleteInvitedUserAccountMutationOptions = Apollo.BaseMutationOptions<DeleteInvitedUserAccountMutation, DeleteInvitedUserAccountMutationVariables>;
export const DeleteProjectLabelDocument = gql`
    mutation deleteProjectLabel($projectLabelID: UUID!) {
  deleteProjectLabel(input: {projectLabelID: $projectLabelID}) {
    id
  }
}
    `;
export type DeleteProjectLabelMutationFn = Apollo.MutationFunction<DeleteProjectLabelMutation, DeleteProjectLabelMutationVariables>;

/**
 * __useDeleteProjectLabelMutation__
 *
 * To run a mutation, you first call `useDeleteProjectLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectLabelMutation, { data, loading, error }] = useDeleteProjectLabelMutation({
 *   variables: {
 *      projectLabelID: // value for 'projectLabelID'
 *   },
 * });
 */
export function useDeleteProjectLabelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectLabelMutation, DeleteProjectLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectLabelMutation, DeleteProjectLabelMutationVariables>(DeleteProjectLabelDocument, options);
      }
export type DeleteProjectLabelMutationHookResult = ReturnType<typeof useDeleteProjectLabelMutation>;
export type DeleteProjectLabelMutationResult = Apollo.MutationResult<DeleteProjectLabelMutation>;
export type DeleteProjectLabelMutationOptions = Apollo.BaseMutationOptions<DeleteProjectLabelMutation, DeleteProjectLabelMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation deleteTask($taskID: UUID!) {
  deleteTask(input: {taskID: $taskID}) {
    taskID
  }
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const DeleteTaskGroupDocument = gql`
    mutation deleteTaskGroup($taskGroupID: UUID!) {
  deleteTaskGroup(input: {taskGroupID: $taskGroupID}) {
    ok
    affectedRows
    taskGroup {
      id
      tasks {
        id
        name
      }
    }
  }
}
    `;
export type DeleteTaskGroupMutationFn = Apollo.MutationFunction<DeleteTaskGroupMutation, DeleteTaskGroupMutationVariables>;

/**
 * __useDeleteTaskGroupMutation__
 *
 * To run a mutation, you first call `useDeleteTaskGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskGroupMutation, { data, loading, error }] = useDeleteTaskGroupMutation({
 *   variables: {
 *      taskGroupID: // value for 'taskGroupID'
 *   },
 * });
 */
export function useDeleteTaskGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskGroupMutation, DeleteTaskGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskGroupMutation, DeleteTaskGroupMutationVariables>(DeleteTaskGroupDocument, options);
      }
export type DeleteTaskGroupMutationHookResult = ReturnType<typeof useDeleteTaskGroupMutation>;
export type DeleteTaskGroupMutationResult = Apollo.MutationResult<DeleteTaskGroupMutation>;
export type DeleteTaskGroupMutationOptions = Apollo.BaseMutationOptions<DeleteTaskGroupMutation, DeleteTaskGroupMutationVariables>;
export const DeleteTaskGroupTasksDocument = gql`
    mutation deleteTaskGroupTasks($taskGroupID: UUID!) {
  deleteTaskGroupTasks(input: {taskGroupID: $taskGroupID}) {
    tasks
    taskGroupID
  }
}
    `;
export type DeleteTaskGroupTasksMutationFn = Apollo.MutationFunction<DeleteTaskGroupTasksMutation, DeleteTaskGroupTasksMutationVariables>;

/**
 * __useDeleteTaskGroupTasksMutation__
 *
 * To run a mutation, you first call `useDeleteTaskGroupTasksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskGroupTasksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskGroupTasksMutation, { data, loading, error }] = useDeleteTaskGroupTasksMutation({
 *   variables: {
 *      taskGroupID: // value for 'taskGroupID'
 *   },
 * });
 */
export function useDeleteTaskGroupTasksMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskGroupTasksMutation, DeleteTaskGroupTasksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskGroupTasksMutation, DeleteTaskGroupTasksMutationVariables>(DeleteTaskGroupTasksDocument, options);
      }
export type DeleteTaskGroupTasksMutationHookResult = ReturnType<typeof useDeleteTaskGroupTasksMutation>;
export type DeleteTaskGroupTasksMutationResult = Apollo.MutationResult<DeleteTaskGroupTasksMutation>;
export type DeleteTaskGroupTasksMutationOptions = Apollo.BaseMutationOptions<DeleteTaskGroupTasksMutation, DeleteTaskGroupTasksMutationVariables>;
export const DeleteUserAccountDocument = gql`
    mutation deleteUserAccount($userID: UUID!, $newOwnerID: UUID) {
  deleteUserAccount(input: {userID: $userID, newOwnerID: $newOwnerID}) {
    userAccount {
      id
      email
      fullName
    }
  }
}
    `;
export type DeleteUserAccountMutationFn = Apollo.MutationFunction<DeleteUserAccountMutation, DeleteUserAccountMutationVariables>;

/**
 * __useDeleteUserAccountMutation__
 *
 * To run a mutation, you first call `useDeleteUserAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserAccountMutation, { data, loading, error }] = useDeleteUserAccountMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *      newOwnerID: // value for 'newOwnerID'
 *   },
 * });
 */
export function useDeleteUserAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserAccountMutation, DeleteUserAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserAccountMutation, DeleteUserAccountMutationVariables>(DeleteUserAccountDocument, options);
      }
export type DeleteUserAccountMutationHookResult = ReturnType<typeof useDeleteUserAccountMutation>;
export type DeleteUserAccountMutationResult = Apollo.MutationResult<DeleteUserAccountMutation>;
export type DeleteUserAccountMutationOptions = Apollo.BaseMutationOptions<DeleteUserAccountMutation, DeleteUserAccountMutationVariables>;
export const DuplicateTaskGroupDocument = gql`
    mutation duplicateTaskGroup($taskGroupID: UUID!, $name: String!, $position: Float!, $projectID: UUID!) {
  duplicateTaskGroup(
    input: {projectID: $projectID, taskGroupID: $taskGroupID, name: $name, position: $position}
  ) {
    taskGroup {
      id
      name
      position
      tasks {
        id
        shortId
        name
        description
        dueDate {
          at
        }
        hasTime
        complete
        watched
        completedAt
        position
        badges {
          checklist {
            complete
            total
          }
          comments {
            unread
            total
          }
        }
        taskGroup {
          id
          name
          position
        }
        labels {
          id
          assignedDate
          projectLabel {
            id
            name
            createdDate
            labelColor {
              id
              colorHex
              position
              name
            }
          }
        }
        assigned {
          id
          fullName
          profileIcon {
            url
            initials
            bgColor
          }
        }
      }
    }
  }
}
    `;
export type DuplicateTaskGroupMutationFn = Apollo.MutationFunction<DuplicateTaskGroupMutation, DuplicateTaskGroupMutationVariables>;

/**
 * __useDuplicateTaskGroupMutation__
 *
 * To run a mutation, you first call `useDuplicateTaskGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateTaskGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateTaskGroupMutation, { data, loading, error }] = useDuplicateTaskGroupMutation({
 *   variables: {
 *      taskGroupID: // value for 'taskGroupID'
 *      name: // value for 'name'
 *      position: // value for 'position'
 *      projectID: // value for 'projectID'
 *   },
 * });
 */
export function useDuplicateTaskGroupMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateTaskGroupMutation, DuplicateTaskGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateTaskGroupMutation, DuplicateTaskGroupMutationVariables>(DuplicateTaskGroupDocument, options);
      }
export type DuplicateTaskGroupMutationHookResult = ReturnType<typeof useDuplicateTaskGroupMutation>;
export type DuplicateTaskGroupMutationResult = Apollo.MutationResult<DuplicateTaskGroupMutation>;
export type DuplicateTaskGroupMutationOptions = Apollo.BaseMutationOptions<DuplicateTaskGroupMutation, DuplicateTaskGroupMutationVariables>;
export const FindTaskDocument = gql`
    query findTask($taskID: String!) {
  findTask(input: {taskShortID: $taskID}) {
    id
    shortId
    name
    watched
    description
    dueDate {
      at
      notifications {
        id
        period
        duration
      }
    }
    position
    complete
    hasTime
    taskGroup {
      id
      name
    }
    comments {
      id
      pinned
      message
      createdAt
      updatedAt
      createdBy {
        id
        fullName
        profileIcon {
          initials
          bgColor
          url
        }
      }
    }
    activity {
      id
      type
      causedBy {
        id
        fullName
        profileIcon {
          initials
          bgColor
          url
        }
      }
      createdAt
      data {
        name
        value
      }
    }
    badges {
      checklist {
        total
        complete
      }
    }
    checklists {
      id
      name
      position
      items {
        id
        name
        taskChecklistID
        complete
        position
      }
    }
    labels {
      id
      assignedDate
      projectLabel {
        id
        name
        createdDate
        labelColor {
          id
          colorHex
          position
          name
        }
      }
    }
    assigned {
      id
      fullName
      profileIcon {
        url
        initials
        bgColor
      }
    }
  }
  me {
    user {
      id
      fullName
      profileIcon {
        initials
        bgColor
        url
      }
    }
  }
}
    `;

/**
 * __useFindTaskQuery__
 *
 * To run a query within a React component, call `useFindTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindTaskQuery({
 *   variables: {
 *      taskID: // value for 'taskID'
 *   },
 * });
 */
export function useFindTaskQuery(baseOptions: Apollo.QueryHookOptions<FindTaskQuery, FindTaskQueryVariables> & ({ variables: FindTaskQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindTaskQuery, FindTaskQueryVariables>(FindTaskDocument, options);
      }
export function useFindTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindTaskQuery, FindTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindTaskQuery, FindTaskQueryVariables>(FindTaskDocument, options);
        }
// @ts-ignore
export function useFindTaskSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindTaskQuery, FindTaskQueryVariables>): Apollo.UseSuspenseQueryResult<FindTaskQuery, FindTaskQueryVariables>;
export function useFindTaskSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindTaskQuery, FindTaskQueryVariables>): Apollo.UseSuspenseQueryResult<FindTaskQuery | undefined, FindTaskQueryVariables>;
export function useFindTaskSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindTaskQuery, FindTaskQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindTaskQuery, FindTaskQueryVariables>(FindTaskDocument, options);
        }
export type FindTaskQueryHookResult = ReturnType<typeof useFindTaskQuery>;
export type FindTaskLazyQueryHookResult = ReturnType<typeof useFindTaskLazyQuery>;
export type FindTaskSuspenseQueryHookResult = ReturnType<typeof useFindTaskSuspenseQuery>;
export type FindTaskQueryResult = Apollo.QueryResult<FindTaskQuery, FindTaskQueryVariables>;
export const LegacyGetProjectsDocument = gql`
    query LegacyGetProjects {
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
 * __useLegacyGetProjectsQuery__
 *
 * To run a query within a React component, call `useLegacyGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLegacyGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLegacyGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLegacyGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<LegacyGetProjectsQuery, LegacyGetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LegacyGetProjectsQuery, LegacyGetProjectsQueryVariables>(LegacyGetProjectsDocument, options);
      }
export function useLegacyGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LegacyGetProjectsQuery, LegacyGetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LegacyGetProjectsQuery, LegacyGetProjectsQueryVariables>(LegacyGetProjectsDocument, options);
        }
// @ts-ignore
export function useLegacyGetProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LegacyGetProjectsQuery, LegacyGetProjectsQueryVariables>): Apollo.UseSuspenseQueryResult<LegacyGetProjectsQuery, LegacyGetProjectsQueryVariables>;
export function useLegacyGetProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LegacyGetProjectsQuery, LegacyGetProjectsQueryVariables>): Apollo.UseSuspenseQueryResult<LegacyGetProjectsQuery | undefined, LegacyGetProjectsQueryVariables>;
export function useLegacyGetProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LegacyGetProjectsQuery, LegacyGetProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LegacyGetProjectsQuery, LegacyGetProjectsQueryVariables>(LegacyGetProjectsDocument, options);
        }
export type LegacyGetProjectsQueryHookResult = ReturnType<typeof useLegacyGetProjectsQuery>;
export type LegacyGetProjectsLazyQueryHookResult = ReturnType<typeof useLegacyGetProjectsLazyQuery>;
export type LegacyGetProjectsSuspenseQueryHookResult = ReturnType<typeof useLegacyGetProjectsSuspenseQuery>;
export type LegacyGetProjectsQueryResult = Apollo.QueryResult<LegacyGetProjectsQuery, LegacyGetProjectsQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    user {
      id
      fullName
      username
      email
      bio
      profileIcon {
        initials
        bgColor
        url
      }
    }
    teamRoles {
      teamID
      roleCode
    }
    projectRoles {
      projectID
      roleCode
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
// @ts-ignore
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery | undefined, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const LegacyMyTasksDocument = gql`
    query LegacyMyTasks($status: MyTasksStatus!, $sort: MyTasksSort!) {
  projects {
    id
    name
  }
  myTasks(input: {status: $status, sort: $sort}) {
    tasks {
      id
      shortId
      taskGroup {
        id
        name
      }
      name
      dueDate {
        at
      }
      hasTime
      complete
      completedAt
    }
    projects {
      projectID
      taskID
    }
  }
}
    `;

/**
 * __useLegacyMyTasksQuery__
 *
 * To run a query within a React component, call `useLegacyMyTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useLegacyMyTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLegacyMyTasksQuery({
 *   variables: {
 *      status: // value for 'status'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useLegacyMyTasksQuery(baseOptions: Apollo.QueryHookOptions<LegacyMyTasksQuery, LegacyMyTasksQueryVariables> & ({ variables: LegacyMyTasksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LegacyMyTasksQuery, LegacyMyTasksQueryVariables>(LegacyMyTasksDocument, options);
      }
export function useLegacyMyTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LegacyMyTasksQuery, LegacyMyTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LegacyMyTasksQuery, LegacyMyTasksQueryVariables>(LegacyMyTasksDocument, options);
        }
// @ts-ignore
export function useLegacyMyTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LegacyMyTasksQuery, LegacyMyTasksQueryVariables>): Apollo.UseSuspenseQueryResult<LegacyMyTasksQuery, LegacyMyTasksQueryVariables>;
export function useLegacyMyTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LegacyMyTasksQuery, LegacyMyTasksQueryVariables>): Apollo.UseSuspenseQueryResult<LegacyMyTasksQuery | undefined, LegacyMyTasksQueryVariables>;
export function useLegacyMyTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LegacyMyTasksQuery, LegacyMyTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LegacyMyTasksQuery, LegacyMyTasksQueryVariables>(LegacyMyTasksDocument, options);
        }
export type LegacyMyTasksQueryHookResult = ReturnType<typeof useLegacyMyTasksQuery>;
export type LegacyMyTasksLazyQueryHookResult = ReturnType<typeof useLegacyMyTasksLazyQuery>;
export type LegacyMyTasksSuspenseQueryHookResult = ReturnType<typeof useLegacyMyTasksSuspenseQuery>;
export type LegacyMyTasksQueryResult = Apollo.QueryResult<LegacyMyTasksQuery, LegacyMyTasksQueryVariables>;
export const SetTaskCompleteDocument = gql`
    mutation setTaskComplete($taskID: UUID!, $complete: Boolean!) {
  setTaskComplete(input: {taskID: $taskID, complete: $complete}) {
    id
    name
    complete
    completedAt
    position
  }
}
    `;
export type SetTaskCompleteMutationFn = Apollo.MutationFunction<SetTaskCompleteMutation, SetTaskCompleteMutationVariables>;

/**
 * __useSetTaskCompleteMutation__
 *
 * To run a mutation, you first call `useSetTaskCompleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTaskCompleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTaskCompleteMutation, { data, loading, error }] = useSetTaskCompleteMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      complete: // value for 'complete'
 *   },
 * });
 */
export function useSetTaskCompleteMutation(baseOptions?: Apollo.MutationHookOptions<SetTaskCompleteMutation, SetTaskCompleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetTaskCompleteMutation, SetTaskCompleteMutationVariables>(SetTaskCompleteDocument, options);
      }
export type SetTaskCompleteMutationHookResult = ReturnType<typeof useSetTaskCompleteMutation>;
export type SetTaskCompleteMutationResult = Apollo.MutationResult<SetTaskCompleteMutation>;
export type SetTaskCompleteMutationOptions = Apollo.BaseMutationOptions<SetTaskCompleteMutation, SetTaskCompleteMutationVariables>;
export const SortTaskGroupDocument = gql`
    mutation sortTaskGroup($tasks: [TaskPositionUpdate!]!, $taskGroupID: UUID!) {
  sortTaskGroup(input: {taskGroupID: $taskGroupID, tasks: $tasks}) {
    taskGroupID
    tasks {
      id
      position
    }
  }
}
    `;
export type SortTaskGroupMutationFn = Apollo.MutationFunction<SortTaskGroupMutation, SortTaskGroupMutationVariables>;

/**
 * __useSortTaskGroupMutation__
 *
 * To run a mutation, you first call `useSortTaskGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSortTaskGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sortTaskGroupMutation, { data, loading, error }] = useSortTaskGroupMutation({
 *   variables: {
 *      tasks: // value for 'tasks'
 *      taskGroupID: // value for 'taskGroupID'
 *   },
 * });
 */
export function useSortTaskGroupMutation(baseOptions?: Apollo.MutationHookOptions<SortTaskGroupMutation, SortTaskGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SortTaskGroupMutation, SortTaskGroupMutationVariables>(SortTaskGroupDocument, options);
      }
export type SortTaskGroupMutationHookResult = ReturnType<typeof useSortTaskGroupMutation>;
export type SortTaskGroupMutationResult = Apollo.MutationResult<SortTaskGroupMutation>;
export type SortTaskGroupMutationOptions = Apollo.BaseMutationOptions<SortTaskGroupMutation, SortTaskGroupMutationVariables>;
export const ToggleTaskLabelDocument = gql`
    mutation toggleTaskLabel($taskID: UUID!, $projectLabelID: UUID!) {
  toggleTaskLabel(input: {taskID: $taskID, projectLabelID: $projectLabelID}) {
    active
    task {
      id
      labels {
        id
        assignedDate
        projectLabel {
          id
          createdDate
          labelColor {
            id
            colorHex
            name
            position
          }
          name
        }
      }
    }
  }
}
    `;
export type ToggleTaskLabelMutationFn = Apollo.MutationFunction<ToggleTaskLabelMutation, ToggleTaskLabelMutationVariables>;

/**
 * __useToggleTaskLabelMutation__
 *
 * To run a mutation, you first call `useToggleTaskLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleTaskLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleTaskLabelMutation, { data, loading, error }] = useToggleTaskLabelMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      projectLabelID: // value for 'projectLabelID'
 *   },
 * });
 */
export function useToggleTaskLabelMutation(baseOptions?: Apollo.MutationHookOptions<ToggleTaskLabelMutation, ToggleTaskLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleTaskLabelMutation, ToggleTaskLabelMutationVariables>(ToggleTaskLabelDocument, options);
      }
export type ToggleTaskLabelMutationHookResult = ReturnType<typeof useToggleTaskLabelMutation>;
export type ToggleTaskLabelMutationResult = Apollo.MutationResult<ToggleTaskLabelMutation>;
export type ToggleTaskLabelMutationOptions = Apollo.BaseMutationOptions<ToggleTaskLabelMutation, ToggleTaskLabelMutationVariables>;
export const UnassignTaskDocument = gql`
    mutation unassignTask($taskID: UUID!, $userID: UUID!) {
  unassignTask(input: {taskID: $taskID, userID: $userID}) {
    assigned {
      id
      fullName
    }
    id
  }
}
    `;
export type UnassignTaskMutationFn = Apollo.MutationFunction<UnassignTaskMutation, UnassignTaskMutationVariables>;

/**
 * __useUnassignTaskMutation__
 *
 * To run a mutation, you first call `useUnassignTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignTaskMutation, { data, loading, error }] = useUnassignTaskMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useUnassignTaskMutation(baseOptions?: Apollo.MutationHookOptions<UnassignTaskMutation, UnassignTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnassignTaskMutation, UnassignTaskMutationVariables>(UnassignTaskDocument, options);
      }
export type UnassignTaskMutationHookResult = ReturnType<typeof useUnassignTaskMutation>;
export type UnassignTaskMutationResult = Apollo.MutationResult<UnassignTaskMutation>;
export type UnassignTaskMutationOptions = Apollo.BaseMutationOptions<UnassignTaskMutation, UnassignTaskMutationVariables>;
export const UpdateProjectLabelDocument = gql`
    mutation updateProjectLabel($projectLabelID: UUID!, $labelColorID: UUID!, $name: String!) {
  updateProjectLabel(
    input: {projectLabelID: $projectLabelID, labelColorID: $labelColorID, name: $name}
  ) {
    id
    createdDate
    labelColor {
      id
      colorHex
      name
      position
    }
    name
  }
}
    `;
export type UpdateProjectLabelMutationFn = Apollo.MutationFunction<UpdateProjectLabelMutation, UpdateProjectLabelMutationVariables>;

/**
 * __useUpdateProjectLabelMutation__
 *
 * To run a mutation, you first call `useUpdateProjectLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectLabelMutation, { data, loading, error }] = useUpdateProjectLabelMutation({
 *   variables: {
 *      projectLabelID: // value for 'projectLabelID'
 *      labelColorID: // value for 'labelColorID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateProjectLabelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectLabelMutation, UpdateProjectLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectLabelMutation, UpdateProjectLabelMutationVariables>(UpdateProjectLabelDocument, options);
      }
export type UpdateProjectLabelMutationHookResult = ReturnType<typeof useUpdateProjectLabelMutation>;
export type UpdateProjectLabelMutationResult = Apollo.MutationResult<UpdateProjectLabelMutation>;
export type UpdateProjectLabelMutationOptions = Apollo.BaseMutationOptions<UpdateProjectLabelMutation, UpdateProjectLabelMutationVariables>;
export const UpdateProjectNameDocument = gql`
    mutation updateProjectName($projectID: UUID!, $name: String!) {
  updateProjectName(input: {projectID: $projectID, name: $name}) {
    id
    name
  }
}
    `;
export type UpdateProjectNameMutationFn = Apollo.MutationFunction<UpdateProjectNameMutation, UpdateProjectNameMutationVariables>;

/**
 * __useUpdateProjectNameMutation__
 *
 * To run a mutation, you first call `useUpdateProjectNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectNameMutation, { data, loading, error }] = useUpdateProjectNameMutation({
 *   variables: {
 *      projectID: // value for 'projectID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateProjectNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectNameMutation, UpdateProjectNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectNameMutation, UpdateProjectNameMutationVariables>(UpdateProjectNameDocument, options);
      }
export type UpdateProjectNameMutationHookResult = ReturnType<typeof useUpdateProjectNameMutation>;
export type UpdateProjectNameMutationResult = Apollo.MutationResult<UpdateProjectNameMutation>;
export type UpdateProjectNameMutationOptions = Apollo.BaseMutationOptions<UpdateProjectNameMutation, UpdateProjectNameMutationVariables>;
export const UpdateTaskDescriptionDocument = gql`
    mutation updateTaskDescription($taskID: UUID!, $description: String!) {
  updateTaskDescription(input: {taskID: $taskID, description: $description}) {
    id
    description
  }
}
    `;
export type UpdateTaskDescriptionMutationFn = Apollo.MutationFunction<UpdateTaskDescriptionMutation, UpdateTaskDescriptionMutationVariables>;

/**
 * __useUpdateTaskDescriptionMutation__
 *
 * To run a mutation, you first call `useUpdateTaskDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskDescriptionMutation, { data, loading, error }] = useUpdateTaskDescriptionMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateTaskDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskDescriptionMutation, UpdateTaskDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskDescriptionMutation, UpdateTaskDescriptionMutationVariables>(UpdateTaskDescriptionDocument, options);
      }
export type UpdateTaskDescriptionMutationHookResult = ReturnType<typeof useUpdateTaskDescriptionMutation>;
export type UpdateTaskDescriptionMutationResult = Apollo.MutationResult<UpdateTaskDescriptionMutation>;
export type UpdateTaskDescriptionMutationOptions = Apollo.BaseMutationOptions<UpdateTaskDescriptionMutation, UpdateTaskDescriptionMutationVariables>;
export const UpdateTaskDueDateDocument = gql`
    mutation updateTaskDueDate($taskID: UUID!, $dueDate: Time, $hasTime: Boolean!, $createNotifications: [CreateTaskDueDateNotification!]!, $updateNotifications: [UpdateTaskDueDateNotification!]!, $deleteNotifications: [DeleteTaskDueDateNotification!]!) {
  updateTaskDueDate(
    input: {taskID: $taskID, dueDate: $dueDate, hasTime: $hasTime}
  ) {
    id
    dueDate {
      at
    }
    hasTime
  }
  createTaskDueDateNotifications(input: $createNotifications) {
    notifications {
      id
      period
      duration
    }
  }
  updateTaskDueDateNotifications(input: $updateNotifications) {
    notifications {
      id
      period
      duration
    }
  }
  deleteTaskDueDateNotifications(input: $deleteNotifications) {
    notifications
  }
}
    `;
export type UpdateTaskDueDateMutationFn = Apollo.MutationFunction<UpdateTaskDueDateMutation, UpdateTaskDueDateMutationVariables>;

/**
 * __useUpdateTaskDueDateMutation__
 *
 * To run a mutation, you first call `useUpdateTaskDueDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskDueDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskDueDateMutation, { data, loading, error }] = useUpdateTaskDueDateMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      dueDate: // value for 'dueDate'
 *      hasTime: // value for 'hasTime'
 *      createNotifications: // value for 'createNotifications'
 *      updateNotifications: // value for 'updateNotifications'
 *      deleteNotifications: // value for 'deleteNotifications'
 *   },
 * });
 */
export function useUpdateTaskDueDateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskDueDateMutation, UpdateTaskDueDateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskDueDateMutation, UpdateTaskDueDateMutationVariables>(UpdateTaskDueDateDocument, options);
      }
export type UpdateTaskDueDateMutationHookResult = ReturnType<typeof useUpdateTaskDueDateMutation>;
export type UpdateTaskDueDateMutationResult = Apollo.MutationResult<UpdateTaskDueDateMutation>;
export type UpdateTaskDueDateMutationOptions = Apollo.BaseMutationOptions<UpdateTaskDueDateMutation, UpdateTaskDueDateMutationVariables>;
export const UpdateTaskGroupLocationDocument = gql`
    mutation updateTaskGroupLocation($taskGroupID: UUID!, $position: Float!) {
  updateTaskGroupLocation(input: {taskGroupID: $taskGroupID, position: $position}) {
    id
    position
  }
}
    `;
export type UpdateTaskGroupLocationMutationFn = Apollo.MutationFunction<UpdateTaskGroupLocationMutation, UpdateTaskGroupLocationMutationVariables>;

/**
 * __useUpdateTaskGroupLocationMutation__
 *
 * To run a mutation, you first call `useUpdateTaskGroupLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskGroupLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskGroupLocationMutation, { data, loading, error }] = useUpdateTaskGroupLocationMutation({
 *   variables: {
 *      taskGroupID: // value for 'taskGroupID'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useUpdateTaskGroupLocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskGroupLocationMutation, UpdateTaskGroupLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskGroupLocationMutation, UpdateTaskGroupLocationMutationVariables>(UpdateTaskGroupLocationDocument, options);
      }
export type UpdateTaskGroupLocationMutationHookResult = ReturnType<typeof useUpdateTaskGroupLocationMutation>;
export type UpdateTaskGroupLocationMutationResult = Apollo.MutationResult<UpdateTaskGroupLocationMutation>;
export type UpdateTaskGroupLocationMutationOptions = Apollo.BaseMutationOptions<UpdateTaskGroupLocationMutation, UpdateTaskGroupLocationMutationVariables>;
export const UpdateTaskGroupNameDocument = gql`
    mutation updateTaskGroupName($taskGroupID: UUID!, $name: String!) {
  updateTaskGroupName(input: {taskGroupID: $taskGroupID, name: $name}) {
    id
    name
  }
}
    `;
export type UpdateTaskGroupNameMutationFn = Apollo.MutationFunction<UpdateTaskGroupNameMutation, UpdateTaskGroupNameMutationVariables>;

/**
 * __useUpdateTaskGroupNameMutation__
 *
 * To run a mutation, you first call `useUpdateTaskGroupNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskGroupNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskGroupNameMutation, { data, loading, error }] = useUpdateTaskGroupNameMutation({
 *   variables: {
 *      taskGroupID: // value for 'taskGroupID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateTaskGroupNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskGroupNameMutation, UpdateTaskGroupNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskGroupNameMutation, UpdateTaskGroupNameMutationVariables>(UpdateTaskGroupNameDocument, options);
      }
export type UpdateTaskGroupNameMutationHookResult = ReturnType<typeof useUpdateTaskGroupNameMutation>;
export type UpdateTaskGroupNameMutationResult = Apollo.MutationResult<UpdateTaskGroupNameMutation>;
export type UpdateTaskGroupNameMutationOptions = Apollo.BaseMutationOptions<UpdateTaskGroupNameMutation, UpdateTaskGroupNameMutationVariables>;
export const UpdateTaskLocationDocument = gql`
    mutation updateTaskLocation($taskID: UUID!, $taskGroupID: UUID!, $position: Float!) {
  updateTaskLocation(
    input: {taskID: $taskID, taskGroupID: $taskGroupID, position: $position}
  ) {
    previousTaskGroupID
    task {
      id
      createdAt
      name
      position
      taskGroup {
        id
      }
    }
  }
}
    `;
export type UpdateTaskLocationMutationFn = Apollo.MutationFunction<UpdateTaskLocationMutation, UpdateTaskLocationMutationVariables>;

/**
 * __useUpdateTaskLocationMutation__
 *
 * To run a mutation, you first call `useUpdateTaskLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskLocationMutation, { data, loading, error }] = useUpdateTaskLocationMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      taskGroupID: // value for 'taskGroupID'
 *      position: // value for 'position'
 *   },
 * });
 */
export function useUpdateTaskLocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskLocationMutation, UpdateTaskLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskLocationMutation, UpdateTaskLocationMutationVariables>(UpdateTaskLocationDocument, options);
      }
export type UpdateTaskLocationMutationHookResult = ReturnType<typeof useUpdateTaskLocationMutation>;
export type UpdateTaskLocationMutationResult = Apollo.MutationResult<UpdateTaskLocationMutation>;
export type UpdateTaskLocationMutationOptions = Apollo.BaseMutationOptions<UpdateTaskLocationMutation, UpdateTaskLocationMutationVariables>;
export const UpdateTaskNameDocument = gql`
    mutation updateTaskName($taskID: UUID!, $name: String!) {
  updateTaskName(input: {taskID: $taskID, name: $name}) {
    id
    name
    position
  }
}
    `;
export type UpdateTaskNameMutationFn = Apollo.MutationFunction<UpdateTaskNameMutation, UpdateTaskNameMutationVariables>;

/**
 * __useUpdateTaskNameMutation__
 *
 * To run a mutation, you first call `useUpdateTaskNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskNameMutation, { data, loading, error }] = useUpdateTaskNameMutation({
 *   variables: {
 *      taskID: // value for 'taskID'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateTaskNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskNameMutation, UpdateTaskNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskNameMutation, UpdateTaskNameMutationVariables>(UpdateTaskNameDocument, options);
      }
export type UpdateTaskNameMutationHookResult = ReturnType<typeof useUpdateTaskNameMutation>;
export type UpdateTaskNameMutationResult = Apollo.MutationResult<UpdateTaskNameMutation>;
export type UpdateTaskNameMutationOptions = Apollo.BaseMutationOptions<UpdateTaskNameMutation, UpdateTaskNameMutationVariables>;
export const UsersDocument = gql`
    query users {
  invitedUsers {
    id
    email
    invitedOn
  }
  users {
    id
    email
    fullName
    username
    role {
      code
      name
    }
    profileIcon {
      url
      initials
      bgColor
    }
    owned {
      teams {
        id
        name
      }
      projects {
        id
        name
      }
    }
    member {
      teams {
        id
        name
      }
      projects {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
// @ts-ignore
export function useUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>): Apollo.UseSuspenseQueryResult<UsersQuery, UsersQueryVariables>;
export function useUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>): Apollo.UseSuspenseQueryResult<UsersQuery | undefined, UsersQueryVariables>;
export function useUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;