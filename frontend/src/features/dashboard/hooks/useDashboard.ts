import { useQuery } from "@apollo/client/react";
import {
  MyTasksSort,
  MyTasksStatus,
  GetDashboardDataDocument,
  GetMyTasksDocument,
} from "@/graphql/generated/graphql";

export function useDashboardData() {
  const { data, loading, error } = useQuery(GetDashboardDataDocument);

  return {
    user: data?.me?.user,
    projects: data?.projects || [],
    teams: data?.teams || [],
    loading,
    error,
  };
}

export function useMyTasks(
  status: MyTasksStatus = MyTasksStatus.All,
  sort: MyTasksSort = MyTasksSort.DueDate,
) {
  const { data, loading, error } = useQuery(GetMyTasksDocument, {
    variables: { status, sort },
  });

  return {
    tasks: data?.myTasks.tasks || [],
    loading,
    error,
  };
}
