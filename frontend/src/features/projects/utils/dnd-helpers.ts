import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/types";

export interface DraggableElement {
  id: string;
  position: number;
}

export function getNewDraggablePosition(
  before: DraggableElement | null,
  after: DraggableElement | null,
): number {
  if (before === null && after === null) {
    return 65535;
  }
  if (before === null) {
    return after!.position / 2.0;
  }
  if (after === null) {
    return before.position * 2.0;
  }
  return (before.position + after.position) / 2.0;
}

export function getSortedDraggables<T extends DraggableElement>(
  items: T[],
): T[] {
  return [...items].sort((a, b) => a.position - b.position);
}

export function getEdgeFromData(data: Record<string, unknown>): Edge | null {
  return (data.closestEdge as Edge) || null;
}
