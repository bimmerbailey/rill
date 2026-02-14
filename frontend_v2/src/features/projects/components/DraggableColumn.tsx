import { useEffect, useRef, useState, type ReactNode } from "react";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/types";
import type { ColumnDragData, ColumnDropZoneData } from "../utils/dnd-types";

interface DraggableColumnProps {
  column: {
    id: string;
    name: string;
    position: number;
  };
  children: ReactNode;
  surface1: string;
  surface2: string;
  border: string;
  headerContent: ReactNode;
  isDraggedOver: boolean;
  onDraggedOverChange: (isOver: boolean) => void;
}

export function DraggableColumn({
  column,
  children,
  surface1,
  surface2,
  border,
  headerContent,
  isDraggedOver,
  onDraggedOverChange,
}: DraggableColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

  useEffect(() => {
    const el = columnRef.current;
    if (!el) return;

    return combine(
      draggable({
        element: el,
        getInitialData: (): ColumnDragData => ({
          type: "column",
          id: column.id,
          name: column.name,
          position: column.position,
        }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element: el,
        getData: ({ input, element }) => {
          const data = { type: "column" as const, id: column.id };
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["left", "right"],
          });
        },
        canDrop: ({ source }) => {
          if (source.data.type !== "column") return false;
          return source.data.id !== column.id;
        },
        onDragEnter: ({ self }) => {
          const edge = extractClosestEdge(self.data);
          setClosestEdge(edge);
        },
        onDragLeave: () => setClosestEdge(null),
        onDrop: () => setClosestEdge(null),
      }),
    );
  }, [column.id, column.position, column.name]);

  useEffect(() => {
    const el = dropZoneRef.current;
    if (!el) return;

    return dropTargetForElements({
      element: el,
      getData: (): ColumnDropZoneData => ({
        type: "column-drop-zone",
        columnId: column.id,
      }),
      canDrop: ({ source }) => {
        if (source.data.type !== "task") return false;
        return source.data.columnId !== column.id;
      },
      onDragEnter: () => onDraggedOverChange(true),
      onDragLeave: () => onDraggedOverChange(false),
      onDrop: () => onDraggedOverChange(false),
    });
  }, [column.id, onDraggedOverChange]);

  return (
    <div
      ref={columnRef}
      className="flex-shrink-0 w-[320px] flex flex-col relative"
      style={{
        background: isDraggedOver ? surface2 : surface1,
        border: `1px solid ${border}`,
        borderRadius: "20px",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {headerContent}
      {children}

      <div
        ref={dropZoneRef}
        style={{
          minHeight: isDraggedOver ? "100px" : "20px",
          transition: "min-height 0.2s",
        }}
      />

      {closestEdge && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: closestEdge === "left" ? -2 : undefined,
            right: closestEdge === "right" ? -2 : undefined,
            width: 4,
            background: "#c9805e",
            borderRadius: 2,
          }}
        />
      )}
    </div>
  );
}
