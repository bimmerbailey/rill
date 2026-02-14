import { useGetTeamQuery } from "@/graphql/generated/graphql";
import { POLLING } from "../constants/roles";

export function useTeamDetail(teamId: string) {
  const { data, loading, error } = useGetTeamQuery({
    variables: { teamID: teamId },
    pollInterval: POLLING.TEAM,
    skip: !teamId,
  });

  return {
    team: data?.findTeam,
    projects: data?.projects || [],
    allUsers: data?.users || [],
    loading,
    error,
  };
}
