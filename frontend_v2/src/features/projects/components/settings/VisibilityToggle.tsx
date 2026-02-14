import { useState } from "react";
import { Globe, Lock, AlertTriangle } from "lucide-react";

interface VisibilityToggleProps {
  isPublic: boolean;
  onToggle: (isPublic: boolean) => Promise<boolean>;
  loading?: boolean;
}

export function VisibilityToggle({
  isPublic,
  onToggle,
  loading,
}: VisibilityToggleProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [toggling, setToggling] = useState(false);

  const surface0 = "var(--color-surface-base)";
  const surface1 = "var(--color-surface-0)";
  const surface2 = "var(--color-surface-1)";
  const surface3 = "var(--color-surface-2)";
  const border = "var(--color-border-strong)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const terracotta = "var(--color-terracotta)";
  const sage = "var(--color-sage)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  const handleToggle = async () => {
    if (!isPublic) {
      setShowConfirm(true);
      return;
    }

    setToggling(true);
    await onToggle(false);
    setToggling(false);
  };

  const handleConfirmMakePublic = async () => {
    setToggling(true);
    const success = await onToggle(true);
    setToggling(false);
    if (success) {
      setShowConfirm(false);
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-between p-4 rounded-lg"
        style={{
          background: surface2,
          border: `1px solid ${border}`,
        }}
      >
        <div className="flex items-center gap-3">
          {isPublic ? (
            <Globe size={20} style={{ color: sage }} />
          ) : (
            <Lock size={20} style={{ color: terracotta }} />
          )}
          <div>
            <div
              style={{
                fontFamily: fontBody,
                fontSize: "0.95rem",
                color: textPrimary,
              }}
            >
              {isPublic ? "Public" : "Private"}
            </div>
            <div
              style={{
                fontFamily: fontBody,
                fontSize: "0.8rem",
                color: textSecondary,
              }}
            >
              {isPublic
                ? "Anyone with the link can view"
                : "Only members can view"}
            </div>
          </div>
        </div>
        <button
          onClick={handleToggle}
          disabled={toggling || loading}
          className="px-4 py-2 rounded-lg transition-colors"
          style={{
            background: isPublic ? surface3 : terracotta,
            color: isPublic ? textPrimary : surface0,
            fontFamily: fontBody,
            fontWeight: 500,
            opacity: toggling ? 0.5 : 1,
          }}
        >
          {toggling ? "Updating..." : isPublic ? "Make Private" : "Make Public"}
        </button>
      </div>

      {showConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="rounded-xl w-full max-w-sm mx-4 shadow-2xl p-4"
            style={{
              background: surface1,
              border: `1px solid ${border}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-full"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-terracotta) 15%, transparent)",
                }}
              >
                <AlertTriangle size={20} style={{ color: terracotta }} />
              </div>
              <h3
                style={{
                  fontFamily: fontHeading,
                  color: textPrimary,
                }}
              >
                Make Public?
              </h3>
            </div>
            <p
              style={{
                fontFamily: fontBody,
                color: textSecondary,
                marginBottom: "1.5rem",
              }}
            >
              Public projects can be accessed by anyone with a link to the
              project.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg"
                style={{
                  color: textSecondary,
                  fontFamily: fontBody,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmMakePublic}
                disabled={toggling}
                className="px-4 py-2 rounded-lg"
                style={{
                  background: terracotta,
                  color: surface0,
                  fontFamily: fontBody,
                  fontWeight: 500,
                }}
              >
                {toggling ? "Making Public..." : "Make Public"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
