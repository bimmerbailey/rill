import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Edit2, Trash2 } from "lucide-react";
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
};

interface TaskCommentsProps {
  comments: NonNullable<FindTaskQuery["findTask"]>["comments"];
  currentUserId: string | undefined;
  onCreateComment: (message: string) => Promise<void>;
  onUpdateComment: (commentID: string, message: string) => Promise<void>;
  onDeleteComment: (commentID: string) => Promise<void>;
  loading?: boolean;
}

export function TaskComments({
  comments,
  currentUserId,
  onCreateComment,
  onUpdateComment,
  onDeleteComment,
  loading = false,
}: TaskCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async () => {
    if (!newComment.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onCreateComment(newComment.trim());
      setNewComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const startEditing = (commentId: string, message: string) => {
    setEditingId(commentId);
    setEditText(message);
    setMenuOpenId(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = async () => {
    if (!editingId || !editText.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onUpdateComment(editingId, editText.trim());
      setEditingId(null);
      setEditText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onDeleteComment(commentId);
      setMenuOpenId(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      <div
        className="flex items-center gap-2"
        style={{ color: theme.textSecondary }}
      >
        <span className="font-medium">Comments</span>
        {comments && comments.length > 0 && (
          <span className="text-sm">({comments.length})</span>
        )}
      </div>

      <div className="space-y-4">
        {comments?.map((comment) => {
          const isOwner = comment.createdBy.id === currentUserId;
          const isEditing = editingId === comment.id;
          const isMenuOpen = menuOpenId === comment.id;

          return (
            <div key={comment.id} className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
                style={{
                  backgroundColor:
                    comment.createdBy.profileIcon?.bgColor || theme.surface3,
                  color: theme.textPrimary,
                }}
              >
                {comment.createdBy.profileIcon?.initials ||
                  comment.createdBy.fullName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-medium text-sm"
                      style={{ color: theme.textPrimary }}
                    >
                      {comment.createdBy.fullName}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: theme.textSecondary }}
                    >
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  {isOwner && !isEditing && (
                    <div ref={menuRef} className="relative">
                      <button
                        onClick={() =>
                          setMenuOpenId(isMenuOpen ? null : comment.id)
                        }
                        className="p-1 rounded hover:bg-[color-mix(in srgb, var(--color-text-primary) 10%, transparent)]"
                        style={{ color: theme.textSecondary }}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      {isMenuOpen && (
                        <div
                          className="absolute right-0 top-full mt-1 py-1 rounded shadow-lg z-10 min-w-[120px]"
                          style={{
                            backgroundColor: theme.surface2,
                            border: `1px solid ${theme.border}`,
                          }}
                        >
                          <button
                            onClick={() =>
                              startEditing(comment.id, comment.message)
                            }
                            className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-[rgba(255,235,210,0.05)]"
                            style={{ color: theme.textPrimary }}
                          >
                            <Edit2 size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(comment.id)}
                            className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-[rgba(255,235,210,0.05)] text-red-400"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2 rounded text-sm resize-none"
                      style={{
                        backgroundColor: theme.surface2,
                        color: theme.textPrimary,
                        border: `1px solid ${theme.terracotta}`,
                      }}
                      rows={2}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        disabled={isSubmitting}
                        className="px-3 py-1 text-xs rounded"
                        style={{
                          backgroundColor: theme.terracotta,
                          color: theme.textPrimary,
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
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
                ) : (
                  <p
                    className="text-sm whitespace-pre-wrap"
                    style={{ color: theme.textPrimary }}
                  >
                    {comment.message}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t" style={{ borderColor: theme.border }}>
        <textarea
          ref={inputRef}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a comment..."
          disabled={loading || isSubmitting}
          className="w-full p-3 rounded text-sm resize-none"
          style={{
            backgroundColor: theme.surface2,
            color: theme.textPrimary,
            border: `1px solid ${theme.border}`,
          }}
          rows={2}
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSubmit}
            disabled={!newComment.trim() || loading || isSubmitting}
            className={cn(
              "px-4 py-2 text-sm rounded transition-colors",
              "disabled:opacity-40 disabled:cursor-not-allowed",
            )}
            style={{
              backgroundColor: theme.terracotta,
              color: theme.textPrimary,
            }}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </div>
    </div>
  );
}
