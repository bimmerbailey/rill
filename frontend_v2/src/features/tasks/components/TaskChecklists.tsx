import { useState } from "react";
import { Plus, X, Check, MoreHorizontal, Trash2, Edit2 } from "lucide-react";
import { cn } from "@/utils";
import type { FindTaskQuery } from "@/graphql/generated/graphql";

const theme = {
  surface1: "var(--color-surface-1)",
  surface2: "var(--color-surface-2)",
  surface3: "var(--color-surface-3)",
  border: "var(--color-border)",
  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  terracotta: "var(--color-terracotta)",
  success: "var(--color-success)",
};

type TaskChecklist = NonNullable<FindTaskQuery["findTask"]>["checklists"][0];
type TaskChecklistItem = TaskChecklist["items"][0];

interface TaskChecklistsProps {
  taskId: string;
  checklists: NonNullable<FindTaskQuery["findTask"]>["checklists"];
  onCreateChecklist: (name: string, position: number) => Promise<void>;
  onDeleteChecklist: (checklistID: string) => Promise<void>;
  onRenameChecklist: (checklistID: string, name: string) => Promise<void>;
  onCreateItem: (
    checklistID: string,
    name: string,
    position: number,
  ) => Promise<void>;
  onDeleteItem: (itemID: string) => Promise<void>;
  onToggleItemComplete: (itemID: string, complete: boolean) => Promise<void>;
  onRenameItem: (itemID: string, name: string) => Promise<void>;
  loading?: boolean;
}

export function TaskChecklists({
  checklists,
  onCreateChecklist,
  onDeleteChecklist,
  onRenameChecklist,
  onCreateItem,
  onDeleteItem,
  onToggleItemComplete,
  onRenameItem,
  loading = false,
}: TaskChecklistsProps) {
  const [isAddingChecklist, setIsAddingChecklist] = useState(false);
  const [newChecklistName, setNewChecklistName] = useState("");
  const [editingChecklistId, setEditingChecklistId] = useState<string | null>(
    null,
  );
  const [editChecklistName, setEditChecklistName] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [addingItemId, setAddingItemId] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editItemName, setEditItemName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateChecklist = async () => {
    if (!newChecklistName.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const position = (checklists?.length || 0) * 65536;
      await onCreateChecklist(newChecklistName.trim(), position);
      setNewChecklistName("");
      setIsAddingChecklist(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateItem = async (checklistId: string) => {
    if (!newItemName.trim() || isSubmitting) return;
    const checklist = checklists?.find((c) => c.id === checklistId);
    if (!checklist) return;

    setIsSubmitting(true);
    try {
      const position = (checklist.items.length || 0) * 65536;
      await onCreateItem(checklistId, newItemName.trim(), position);
      setNewItemName("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRenameChecklist = async (checklistId: string) => {
    if (!editChecklistName.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onRenameChecklist(checklistId, editChecklistName.trim());
      setEditingChecklistId(null);
      setMenuOpenId(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRenameItem = async (itemId: string) => {
    if (!editItemName.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onRenameItem(itemId, editItemName.trim());
      setEditingItemId(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleItem = async (itemId: string, complete: boolean) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onToggleItemComplete(itemId, complete);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteChecklist = async (checklistId: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onDeleteChecklist(checklistId);
      setMenuOpenId(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onDeleteItem(itemId);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProgress = (checklist: TaskChecklist) => {
    const total = checklist.items.length;
    const complete = checklist.items.filter((i) => i.complete).length;
    const percent = total > 0 ? Math.round((complete / total) * 100) : 0;
    return { total, complete, percent };
  };

  const startAddingItem = (checklistId: string) => {
    setAddingItemId(checklistId);
    setNewItemName("");
  };

  const startEditingChecklist = (checklist: TaskChecklist) => {
    setEditingChecklistId(checklist.id);
    setEditChecklistName(checklist.name);
    setMenuOpenId(null);
  };

  const startEditingItem = (item: TaskChecklistItem) => {
    setEditingItemId(item.id);
    setEditItemName(item.name);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-2"
          style={{ color: theme.textSecondary }}
        >
          <Check size={18} />
          <span className="font-medium">Checklists</span>
        </div>
        {!isAddingChecklist && (
          <button
            onClick={() => setIsAddingChecklist(true)}
            className="flex items-center gap-1 text-sm transition-colors hover:opacity-80"
            style={{ color: theme.terracotta }}
          >
            <Plus size={16} />
            Add checklist
          </button>
        )}
      </div>

      {isAddingChecklist && (
        <div
          className="p-3 rounded space-y-2"
          style={{ backgroundColor: theme.surface2 }}
        >
          <input
            type="text"
            value={newChecklistName}
            onChange={(e) => setNewChecklistName(e.target.value)}
            placeholder="Checklist name..."
            className="w-full p-2 rounded text-sm"
            style={{
              backgroundColor: theme.surface1,
              color: theme.textPrimary,
              border: `1px solid ${theme.border}`,
            }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateChecklist();
              if (e.key === "Escape") {
                setIsAddingChecklist(false);
                setNewChecklistName("");
              }
            }}
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreateChecklist}
              disabled={!newChecklistName.trim() || loading || isSubmitting}
              className="px-3 py-1 text-xs rounded disabled:opacity-40"
              style={{
                backgroundColor: theme.terracotta,
                color: theme.textPrimary,
              }}
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingChecklist(false);
                setNewChecklistName("");
              }}
              className="px-3 py-1 text-xs rounded"
              style={{
                backgroundColor: theme.surface3,
                color: theme.textSecondary,
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {checklists?.map((checklist) => {
        const progress = getProgress(checklist);
        const isEditing = editingChecklistId === checklist.id;
        const isMenuOpen = menuOpenId === checklist.id;
        const isAddingItem = addingItemId === checklist.id;

        return (
          <div key={checklist.id} className="space-y-3">
            <div className="flex items-center justify-between">
              {isEditing ? (
                <input
                  type="text"
                  value={editChecklistName}
                  onChange={(e) => setEditChecklistName(e.target.value)}
                  className="flex-1 p-1 rounded text-sm font-medium"
                  style={{
                    backgroundColor: theme.surface2,
                    color: theme.textPrimary,
                    border: `1px solid ${theme.terracotta}`,
                  }}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRenameChecklist(checklist.id);
                    if (e.key === "Escape") setEditingChecklistId(null);
                  }}
                  onBlur={() => {
                    if (
                      editChecklistName.trim() &&
                      editChecklistName !== checklist.name
                    ) {
                      handleRenameChecklist(checklist.id);
                    } else {
                      setEditingChecklistId(null);
                    }
                  }}
                />
              ) : (
                <h4
                  className="font-medium cursor-pointer"
                  style={{ color: theme.textPrimary }}
                  onClick={() => startEditingChecklist(checklist)}
                >
                  {checklist.name}
                </h4>
              )}
              <div className="relative">
                <button
                  onClick={() =>
                    setMenuOpenId(isMenuOpen ? null : checklist.id)
                  }
                  className="p-1 rounded hover:bg-[color-mix(in srgb, var(--color-text-primary) 10%, transparent)]"
                  style={{ color: theme.textSecondary }}
                >
                  <MoreHorizontal size={16} />
                </button>
                {isMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-1 py-1 rounded shadow-lg z-10 min-w-[100px]"
                    style={{
                      backgroundColor: theme.surface2,
                      border: `1px solid ${theme.border}`,
                    }}
                  >
                    <button
                      onClick={() => startEditingChecklist(checklist)}
                      className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-[rgba(255,235,210,0.05)]"
                      style={{ color: theme.textPrimary }}
                    >
                      <Edit2 size={14} />
                      Rename
                    </button>
                    <button
                      onClick={() => handleDeleteChecklist(checklist.id)}
                      className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-[rgba(255,235,210,0.05)] text-red-400"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: theme.textSecondary }}
            >
              <span>
                {progress.complete}/{progress.total}
              </span>
              <div
                className="flex-1 h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: theme.surface3 }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    backgroundColor:
                      progress.percent === 100
                        ? theme.success
                        : theme.terracotta,
                    width: `${progress.percent}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-1">
              {checklist.items.map((item) => {
                const isEditingItem = editingItemId === item.id;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 rounded hover:bg-[rgba(255,235,210,0.03)] group"
                  >
                    <button
                      onClick={() => handleToggleItem(item.id, !item.complete)}
                      disabled={loading || isSubmitting}
                      className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0",
                        item.complete
                          ? "bg-[var(--color-success)] border-[var(--color-success)]"
                          : "border-[color-mix(in srgb, var(--color-text-primary) 30%, transparent)] hover:border-[var(--color-terracotta)]",
                      )}
                    >
                      {item.complete && (
                        <Check size={12} className="text-white" />
                      )}
                    </button>
                    {isEditingItem ? (
                      <input
                        type="text"
                        value={editItemName}
                        onChange={(e) => setEditItemName(e.target.value)}
                        className="flex-1 p-1 rounded text-sm"
                        style={{
                          backgroundColor: theme.surface2,
                          color: theme.textPrimary,
                          border: `1px solid ${theme.terracotta}`,
                        }}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRenameItem(item.id);
                          if (e.key === "Escape") setEditingItemId(null);
                        }}
                        onBlur={() => {
                          if (
                            editItemName.trim() &&
                            editItemName !== item.name
                          ) {
                            handleRenameItem(item.id);
                          } else {
                            setEditingItemId(null);
                          }
                        }}
                      />
                    ) : (
                      <>
                        <span
                          className={cn(
                            "flex-1 text-sm cursor-pointer",
                            item.complete && "line-through",
                          )}
                          style={{
                            color: item.complete
                              ? theme.textSecondary
                              : theme.textPrimary,
                          }}
                          onClick={() => startEditingItem(item)}
                        >
                          {item.name}
                        </span>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-[color-mix(in srgb, var(--color-text-primary) 10%, transparent)]"
                          style={{ color: theme.textSecondary }}
                        >
                          <X size={14} />
                        </button>
                      </>
                    )}
                  </div>
                );
              })}

              {isAddingItem && (
                <div className="flex items-center gap-3 p-2">
                  <div
                    className="w-5 h-5 rounded border-2 flex-shrink-0"
                    style={{ borderColor: "rgba(245,238,230,0.3)" }}
                  />
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Add item..."
                    className="flex-1 p-1 rounded text-sm"
                    style={{
                      backgroundColor: theme.surface2,
                      color: theme.textPrimary,
                      border: `1px solid ${theme.border}`,
                    }}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleCreateItem(checklist.id);
                      if (e.key === "Escape") setAddingItemId(null);
                    }}
                  />
                </div>
              )}

              {!isAddingItem && (
                <button
                  onClick={() => startAddingItem(checklist.id)}
                  className="flex items-center gap-2 p-2 text-sm transition-colors hover:bg-[rgba(255,235,210,0.03)]"
                  style={{ color: theme.textSecondary }}
                >
                  <Plus size={16} />
                  Add item
                </button>
              )}
            </div>
          </div>
        );
      })}

      {(!checklists || checklists.length === 0) && !isAddingChecklist && (
        <p className="text-sm" style={{ color: theme.textSecondary }}>
          No checklists yet. Add a checklist to track progress.
        </p>
      )}
    </div>
  );
}
