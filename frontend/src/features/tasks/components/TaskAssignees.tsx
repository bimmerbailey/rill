import { useState, useRef, useEffect } from "react";
import { User, Plus, X, Check } from "lucide-react";
import { cn } from "@/utils";
import { ProfileAvatar } from "@/features/profile/components/ProfileAvatar";
import type {
  FindTaskQuery,
  FindProjectQuery,
} from "@/graphql/generated/graphql";

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

type ProjectMember = NonNullable<FindProjectQuery["findProject"]>["members"][0];

interface TaskAssigneesProps {
  assignees: NonNullable<FindTaskQuery["findTask"]>["assigned"];
  projectMembers: ProjectMember[];
  onAssign: (userID: string) => Promise<void>;
  onUnassign: (userID: string) => Promise<void>;
  loading?: boolean;
}

export function TaskAssignees({
  assignees,
  projectMembers,
  onAssign,
  onUnassign,
  loading = false,
}: TaskAssigneesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isAssigned = (userId: string): boolean => {
    return assignees?.some((a) => a.id === userId) ?? false;
  };

  const handleToggle = async (userId: string) => {
    if (loading || isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (isAssigned(userId)) {
        await onUnassign(userId);
      } else {
        await onAssign(userId);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMembers = projectMembers.filter((member) => {
    const query = searchQuery.toLowerCase();
    return (
      member.fullName.toLowerCase().includes(query) ||
      member.username.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div
        className="flex items-center gap-2 mb-2 text-sm font-medium"
        style={{ color: theme.textSecondary }}
      >
        <User size={16} />
        Assignees
      </div>

      <div ref={dropdownRef} className="relative">
        <div
          className="p-2 rounded cursor-pointer"
          style={{ backgroundColor: theme.surface2 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {assignees && assignees.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {assignees.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-2 px-2 py-1 rounded"
                  style={{ backgroundColor: theme.surface3 }}
                >
                  <ProfileAvatar
                    profileIcon={user.profileIcon}
                    fullName={user.fullName}
                    size="xs"
                  />
                  <span
                    className="text-sm"
                    style={{ color: theme.textPrimary }}
                  >
                    {user.fullName}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(user.id);
                    }}
                    disabled={isSubmitting}
                    className="p-0.5 rounded hover:bg-[color-mix(in srgb, var(--color-text-primary) 10%, transparent)]"
                    style={{ color: theme.textSecondary }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <button
                className="flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors hover:bg-[color-mix(in srgb, var(--color-text-primary) 10%, transparent)]"
                style={{ color: theme.textSecondary }}
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <span className="text-sm" style={{ color: theme.textSecondary }}>
              Add assignees...
            </span>
          )}
        </div>

        {isOpen && (
          <div
            className="absolute top-full left-0 mt-1 rounded shadow-lg z-20 w-64"
            style={{
              backgroundColor: theme.surface2,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div className="p-2 border-b" style={{ borderColor: theme.border }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search members..."
                className="w-full p-2 rounded text-sm"
                style={{
                  backgroundColor: theme.surface1,
                  color: theme.textPrimary,
                  border: `1px solid ${theme.border}`,
                }}
                autoFocus
              />
            </div>

            <div className="max-h-48 overflow-y-auto py-1">
              {filteredMembers.length === 0 ? (
                <div
                  className="px-3 py-2 text-sm"
                  style={{ color: theme.textSecondary }}
                >
                  No members found
                </div>
              ) : (
                filteredMembers.map((member) => {
                  const assigned = isAssigned(member.id);
                  return (
                    <button
                      key={member.id}
                      onClick={() => handleToggle(member.id)}
                      disabled={isSubmitting}
                      className={cn(
                        "w-full px-3 py-2 flex items-center gap-2 transition-colors",
                        "hover:bg-[rgba(255,235,210,0.05)] disabled:opacity-50",
                      )}
                    >
                      <ProfileAvatar
                        profileIcon={member.profileIcon}
                        fullName={member.fullName}
                        size="sm"
                      />
                      <div className="flex-1 text-left">
                        <div
                          className="text-sm"
                          style={{ color: theme.textPrimary }}
                        >
                          {member.fullName}
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: theme.textSecondary }}
                        >
                          @{member.username}
                        </div>
                      </div>
                      {assigned && (
                        <Check size={14} style={{ color: theme.success }} />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
