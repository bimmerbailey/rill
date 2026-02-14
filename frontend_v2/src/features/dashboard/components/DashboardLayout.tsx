import { Outlet } from "react-router-dom";
import { TopNavbar } from "./TopNavbar";

/**
 * Dashboard Layout with "Soft Canvas — Evening" dark theme
 * Warm charcoal tones with brown undertones
 */
export function DashboardLayout() {
  // Dark palette — warm charcoal tones, not cold
  const base = "#141211";
  const surface0 = "#1c1917";
  const textPrimary = "rgba(245,238,230,0.87)";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
        color: textPrimary,
        fontFamily: "'Libre Baskerville', Georgia, serif",
      }}
    >
      {/* Soft ambient blobs — warmer, dimmer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,128,94,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(127,166,127,0.04) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <TopNavbar />
      <main className="flex-1 p-6 relative z-10 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
