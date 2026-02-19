import {
  type TaskFilters,
  type TaskSorting,
  type TaskStatusFilter,
} from "@/features/projects/types";
import { ControlFilter } from "./ControlFilter";
import { ControlSort } from "./ControlSort";
import { ControlStatus } from "./ControlStatus";

type TaskMember = {
  id: string;
  fullName: string;
  username?: string | null;
  profileIcon?: { initials?: string | null; bgColor?: string | null } | null;
};

type TaskLabel = {
  id: string;
  name?: string | null;
  labelColor?: { colorHex: string } | null;
};

interface BoardControlsProps {
  filters: TaskFilters;
  sorting: TaskSorting;
  statusFilter: TaskStatusFilter;
  currentUserId?: string;
  members: TaskMember[];
  labels: TaskLabel[];
  onFiltersChange: (filters: TaskFilters) => void;
  onSortingChange: (sorting: TaskSorting) => void;
  onStatusFilterChange: (filter: TaskStatusFilter) => void;
}

export function BoardControls({
  filters,
  sorting,
  statusFilter,
  currentUserId,
  members,
  labels,
  onFiltersChange,
  onSortingChange,
  onStatusFilterChange,
}: BoardControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ControlFilter
        filters={filters}
        currentUserId={currentUserId}
        members={members}
        labels={labels}
        onChange={onFiltersChange}
      />
      <ControlSort sorting={sorting} onChange={onSortingChange} />
      <ControlStatus filter={statusFilter} onChange={onStatusFilterChange} />
    </div>
  );
}
