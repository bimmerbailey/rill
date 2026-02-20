import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/types";

export type TaskDragData = {
  type: "task";
  id: string;
  shortId: string;
  name: string;
  columnId: string;
  position: number;
};

export type ColumnDragData = {
  type: "column";
  id: string;
  name: string;
  position: number;
};

export type ColumnDropZoneData = {
  type: "column-drop-zone";
  columnId: string;
};

export type TaskDropData = {
  type: "task-drop";
  id: string;
  columnId: string;
  closestEdge: Edge | null;
};

export type DragData =
  | TaskDragData
  | ColumnDragData
  | ColumnDropZoneData
  | TaskDropData;

export function isTaskDragData(
  data: Record<string, unknown>,
): data is TaskDragData {
  return data.type === "task" && "id" in data && "columnId" in data;
}

export function isColumnDragData(
  data: Record<string, unknown>,
): data is ColumnDragData {
  return data.type === "column" && "id" in data;
}

export function isColumnDropZoneData(
  data: Record<string, unknown>,
): data is ColumnDropZoneData {
  return data.type === "column-drop-zone";
}

export function isTaskDropData(
  data: Record<string, unknown>,
): data is TaskDropData {
  return data.type === "task-drop";
}
