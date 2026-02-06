import {
  MyTasksSort,
  MyTasksStatus,
  useGetDashboardDataQuery,
  useGetMyTasksQuery,
} from "@/graphql/generated/graphql";

export function useDashboardData() {
  const { data, loading, error } = useGetDashboardDataQuery();

  return {
    user: data?.me.user,
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
  const { data, loading, error } = useGetMyTasksQuery({
    variables: { status, sort },
  });

  return {
    tasks: data?.myTasks.tasks || [],
    loading,
    error,
  };
}
