import { ProfileSettings } from "../components/ProfileSettings";

export function ProfilePage() {
  // Dark palette — warm charcoal tones
  const base = "var(--color-surface-base)";
  const surface0 = "var(--color-surface-0)";
  const textPrimary = "var(--color-text-primary)";
  const terracotta = "var(--color-terracotta)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  return (
    <div
      className="min-h-screen p-10"
      style={{
        background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
        fontFamily: fontHeading,
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{
              fontFamily: fontBody,
              color: terracotta,
              fontWeight: 500,
            }}
          >
            Account Settings
          </div>
          <h1 className="text-5xl leading-tight" style={{ color: textPrimary }}>
            Your <span className="italic">Profile</span>
          </h1>
        </div>

        <ProfileSettings />
      </div>
    </div>
  );
}
