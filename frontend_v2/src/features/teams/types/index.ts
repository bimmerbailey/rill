export interface TeamMember {
  id: string;
  fullName: string;
  username: string;
  role: {
    code: string;
    name: string;
  };
  profileIcon: {
    url?: string | null;
    initials?: string | null;
    bgColor?: string | null;
  };
  owned: {
    teams: Array<{ id: string; name: string }>;
    projects: Array<{ id: string; name: string }>;
  };
  member: {
    teams: Array<{ id: string; name: string }>;
    projects: Array<{ id: string; name: string }>;
  };
}

export interface TeamProject {
  id: string;
  name: string;
  team?: {
    id: string;
    name: string;
  } | null;
}

export type SortOption = "recent" | "members" | "stars" | "alphabetical";
