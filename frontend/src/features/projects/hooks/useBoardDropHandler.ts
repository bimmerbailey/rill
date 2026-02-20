import { useEffect, useCallback } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import {
  isTaskDragData,
  isColumnDragData,
  isColumnDropZoneData,
  isTaskDropData,
} from "../utils/dnd-types";
import {
  getNewDraggablePosition,
  getSortedDraggables,
} from "../utils/dnd-helpers";

interface TaskGroup {
  id: string;
  position: number;
  tasks: Array<{
    id: string;
    position: number;
  }>;
}

interface UseBoardDropHandlerProps {
  taskGroups: TaskGroup[];
  onTaskMove: (variables: {
    taskID: string;
    taskGroupID: string;
    position: number;
    previousTaskGroupID: string;
  }) => void;
  onColumnMove: (variables: { taskGroupID: string; position: number }) => void;
}

export function useBoardDropHandler({
  taskGroups,
  onTaskMove,
  onColumnMove,
}: UseBoardDropHandlerProps) {
  const handleDrop = useCallback(
    ({
      source,
      location,
    }: {
      source: { data: Record<string, unknown> };
      location: {
        current: { dropTargets: Array<{ data: Record<string, unknown> }> };
      };
    }) => {
      const destination = location.current.dropTargets[0];
      if (!destination) return;

      if (isTaskDragData(source.data)) {
        const destData = destination.data;

        if (isTaskDropData(destData)) {
          const targetColumnId = destData.columnId;
          const column = taskGroups.find((g) => g.id === targetColumnId);
          if (!column) return;

          const sortedTasks = getSortedDraggables(column.tasks);
          const destTaskIndex = sortedTasks.findIndex(
            (t) => t.id === destData.id,
          );
          if (destTaskIndex === -1) return;

          const edge = extractClosestEdge(destData);

          let beforeTask: { id: string; position: number } | null = null;
          let afterTask: { id: string; position: number } | null = null;

          if (edge === "top") {
            beforeTask =
              destTaskIndex > 0 ? sortedTasks[destTaskIndex - 1] : null;
            afterTask = sortedTasks[destTaskIndex];
          } else {
            beforeTask = sortedTasks[destTaskIndex];
            afterTask =
              destTaskIndex < sortedTasks.length - 1
                ? sortedTasks[destTaskIndex + 1]
                : null;
          }

          const newPosition = getNewDraggablePosition(beforeTask, afterTask);

          onTaskMove({
            taskID: source.data.id,
            taskGroupID: targetColumnId,
            position: newPosition,
            previousTaskGroupID: source.data.columnId,
          });
        } else if (isColumnDropZoneData(destData)) {
          const targetColumnId = destData.columnId;
          const column = taskGroups.find((g) => g.id === targetColumnId);
          if (!column) return;

          const sortedTasks = getSortedDraggables(column.tasks);
          const lastTask = sortedTasks[sortedTasks.length - 1];
          const newPosition = getNewDraggablePosition(
            lastTask ? { id: lastTask.id, position: lastTask.position } : null,
            null,
          );

          onTaskMove({
            taskID: source.data.id,
            taskGroupID: targetColumnId,
            position: newPosition,
            previousTaskGroupID: source.data.columnId,
          });
        }
      }

      if (isColumnDragData(source.data)) {
        const destData = destination.data;

        if (destData.type === "column") {
          const sortedColumns = getSortedDraggables(
            taskGroups.map((g) => ({ id: g.id, position: g.position })),
          );

          const destColIndex = sortedColumns.findIndex(
            (c) => c.id === destData.id,
          );
          if (destColIndex === -1) return;

          const edge = extractClosestEdge(destData);

          let beforeCol: { id: string; position: number } | null = null;
          let afterCol: { id: string; position: number } | null = null;

          if (edge === "left") {
            beforeCol =
              destColIndex > 0 ? sortedColumns[destColIndex - 1] : null;
            afterCol = sortedColumns[destColIndex];
          } else {
            beforeCol = sortedColumns[destColIndex];
            afterCol =
              destColIndex < sortedColumns.length - 1
                ? sortedColumns[destColIndex + 1]
                : null;
          }

          const newPosition = getNewDraggablePosition(beforeCol, afterCol);

          onColumnMove({
            taskGroupID: source.data.id,
            position: newPosition,
          });
        }
      }
    },
    [taskGroups, onTaskMove, onColumnMove],
  );

  useEffect(() => {
    return monitorForElements({
      onDrop: handleDrop,
    });
  }, [handleDrop]);
}
