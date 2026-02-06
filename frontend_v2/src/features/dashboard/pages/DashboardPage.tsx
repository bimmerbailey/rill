import {
  useDashboardData,
  useMyTasks,
} from "@/features/dashboard/hooks/useDashboard";
import { MyTasksSort, MyTasksStatus } from "@/graphql/generated/graphql";
import { Link } from "react-router-dom";

export function DashboardPage() {
  const { user, projects, teams, loading, error } = useDashboardData();
  const { tasks, loading: tasksLoading } = useMyTasks(
    MyTasksStatus.All,
    MyTasksSort.DueDate,
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-red-800 font-semibold mb-2">
            Error loading dashboard
          </h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  const incompleteTasks = tasks.filter((t) => !t.complete);

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display text-[#1a1a1a] mb-2">
          Welcome back,{" "}
          <span className="italic">{user?.fullName || user?.username}</span>
        </h1>
        <p className="font-mono text-sm text-[#1a1a1a]/60">
          You have access to {projects.length} projects across {teams.length}{" "}
          teams
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Projects Card */}
        <div className="bg-white p-6 border-2 border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/60">
              Projects
            </h3>
            <span className="w-8 h-8 bg-[#d4754e] text-white flex items-center justify-center font-bold text-sm">
              {projects.length}
            </span>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {projects.slice(0, 5).map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="block p-3 bg-[#f7f3ef] hover:bg-[#d4754e] hover:text-white transition-colors font-mono text-sm"
              >
                {project.name}
              </Link>
            ))}
            {projects.length > 5 && (
              <p className="text-center text-sm text-[#1a1a1a]/50 pt-2">
                +{projects.length - 5} more
              </p>
            )}
          </div>
          <Link
            to="/projects"
            className="inline-block mt-4 font-mono text-xs uppercase tracking-widest text-[#d4754e] hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* Tasks Card */}
        <div className="bg-white p-6 border-2 border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/60">
              My Tasks
            </h3>
            <span className="w-8 h-8 bg-[#1a1a1a] text-white flex items-center justify-center font-bold text-sm">
              {incompleteTasks.length}
            </span>
          </div>
          {tasksLoading ? (
            <div className="space-y-2">
              <div className="h-12 bg-gray-100 rounded"></div>
              <div className="h-12 bg-gray-100 rounded"></div>
            </div>
          ) : incompleteTasks.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {incompleteTasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  className="p-3 bg-[#f7f3ef] border-l-4 border-[#d4754e]"
                >
                  <p className="font-medium text-sm truncate">{task.name}</p>
                  {task.taskGroup && (
                    <p className="text-xs text-[#1a1a1a]/50 mt-1">
                      {task.taskGroup.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#1a1a1a]/50 text-sm py-8 text-center">
              No incomplete tasks
            </p>
          )}
          <Link
            to="/my-tasks"
            className="inline-block mt-4 font-mono text-xs uppercase tracking-widest text-[#d4754e] hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* Teams Card */}
        <div className="bg-white p-6 border-2 border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/60">
              Teams
            </h3>
            <span className="w-8 h-8 bg-[#4a5d4a] text-white flex items-center justify-center font-bold text-sm">
              {teams.length}
            </span>
          </div>
          <div className="space-y-2">
            {teams.map((team) => (
              <Link
                key={team.id}
                to={`/teams`}
                className="flex items-center gap-3 p-3 bg-[#f7f3ef] hover:bg-[#4a5d4a] hover:text-white transition-colors"
              >
                <div className="w-8 h-8 bg-[#d4754e] flex items-center justify-center text-white font-bold text-xs">
                  {team.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-mono text-sm truncate">{team.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#1a1a1a] text-[#f7f3ef] p-6">
        <h3 className="font-display text-xl mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/projects"
            className="px-6 py-3 bg-[#d4754e] text-white font-mono text-sm uppercase tracking-widest hover:bg-[#b85f3a] transition-colors"
          >
            Browse Projects
          </Link>
          <Link
            to="/my-tasks"
            className="px-6 py-3 border-2 border-[#f7f3ef] text-[#f7f3ef] font-mono text-sm uppercase tracking-widest hover:bg-[#f7f3ef] hover:text-[#1a1a1a] transition-colors"
          >
            View My Tasks
          </Link>
          <Link
            to="/teams"
            className="px-6 py-3 border-2 border-[#f7f3ef] text-[#f7f3ef] font-mono text-sm uppercase tracking-widest hover:bg-[#f7f3ef] hover:text-[#1a1a1a] transition-colors"
          >
            Manage Teams
          </Link>
        </div>
      </div>
    </div>
  );
}
