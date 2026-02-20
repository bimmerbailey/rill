import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GetTeamDocument } from "@/graphql/generated/graphql";
import { POLLING } from "../constants/roles";

export function useTeamDetail(teamId: string) {
  const { data, loading, error, refetch } = useQuery(GetTeamDocument, {
    variables: { teamID: teamId },
    skip: !teamId,
  });

  useEffect(() => {
    if (!teamId) return;
    const interval = setInterval(() => {
      refetch();
    }, POLLING.TEAM);
    return () => clearInterval(interval);
  }, [teamId, refetch]);

  return {
    team: data?.findTeam,
    projects: data?.projects || [],
    allUsers: data?.users || [],
    loading,
    error,
  };
}
