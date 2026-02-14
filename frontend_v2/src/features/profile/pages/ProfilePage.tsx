import { ProfileSettings } from "../components/ProfileSettings";

export function ProfilePage() {
  // Dark palette — warm charcoal tones
  const base = "#141211";
  const surface0 = "#1c1917";
  const textPrimary = "rgba(245,238,230,0.87)";
  const terracotta = "#c9805e";

  return (
    <div
      className="min-h-screen p-10"
      style={{
        background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
        fontFamily: "'Libre Baskerville', Georgia, serif",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{
              fontFamily: "'DM Sans', sans-serif",
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
