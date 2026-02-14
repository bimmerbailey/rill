import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useProjectsData } from "@/features/projects/hooks/useProjects";

export function TeamsPage() {
  const { teams, projectTeams, loading, error } = useProjectsData();

  // Dark palette — warm charcoal tones
  const base = "#141211";
  const surface0 = "#1c1917";
  const surface1 = "#231f1c";
  const surface2 = "#2c2724";
  const surface3 = "#36302c";
  const border = "rgba(255,235,210,0.06)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const textSecondary = "rgba(245,238,230,0.5)";
  const textTertiary = "rgba(245,238,230,0.32)";
  const terracotta = "#c9805e";
  const sage = "#7fa67f";
  const slate = "#7992b0";
  const ochre = "#bfa26e";

  const accentColors = [terracotta, sage, slate, ochre];

  const totalProjects = useMemo(
    () => projectTeams.reduce((count, team) => count + team.projects.length, 0),
    [projectTeams],
  );

  if (loading) {
    return (
      <div
        className="max-w-6xl mx-auto p-8"
        style={{
          background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
          minHeight: "100vh",
          color: textPrimary,
        }}
      >
        <div className="space-y-6 animate-pulse">
          <div
            style={{
              background: surface2,
              height: "32px",
              width: "220px",
              borderRadius: "10px",
            }}
          />
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              style={{
                background: surface1,
                height: "160px",
                borderRadius: "20px",
                border: `1px solid ${border}`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="max-w-6xl mx-auto p-8"
        style={{
          background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
          minHeight: "100vh",
          color: textPrimary,
        }}
      >
        <div
          style={{
            background: surface1,
            borderRadius: "20px",
            border: `1px solid ${border}`,
            padding: "2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Libre Baskerville', serif",
              color: terracotta,
              fontSize: "1.2rem",
              marginBottom: "0.5rem",
            }}
          >
            Unable to load teams
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: textSecondary,
              fontSize: "0.9rem",
            }}
          >
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
        color: textPrimary,
      }}
    >
      <div className="relative max-w-6xl mx-auto px-8 py-10">
        <header
          className="mb-10"
          style={{ animation: "d2dFadeUp 0.7s ease-out" }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              color: textTertiary,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            People and projects
          </p>
          <h1
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 400,
              lineHeight: 1.2,
              color: textPrimary,
            }}
          >
            My Teams
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: textSecondary,
              marginTop: "0.5rem",
            }}
          >
            {teams.length} teams · {totalProjects} projects
          </p>
        </header>

        {teams.length === 0 ? (
          <div
            style={{
              background: surface1,
              borderRadius: "20px",
              border: `1px solid ${border}`,
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: textSecondary,
                fontSize: "0.95rem",
              }}
            >
              You are not part of any teams yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {projectTeams.map((team, index) => (
              <section
                key={team.id}
                style={{
                  background: surface1,
                  borderRadius: "20px",
                  border: `1px solid ${border}`,
                  padding: "1.5rem",
                  animation: `d2dFadeUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: accentColors[index % accentColors.length],
                        boxShadow: `0 0 8px ${
                          accentColors[index % accentColors.length]
                        }40`,
                      }}
                    />
                    <h2
                      style={{
                        fontFamily: "'Libre Baskerville', Georgia, serif",
                        fontSize: "1.2rem",
                        fontWeight: 400,
                        color: textPrimary,
                      }}
                    >
                      {team.name}
                    </h2>
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: textTertiary,
                    }}
                  >
                    {team.projects.length} projects
                  </span>
                </div>

                {team.projects.length === 0 ? (
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: textSecondary,
                    }}
                  >
                    No projects in this team yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {team.projects.map((project) => (
                      <Link
                        key={project.id}
                        to={`/projects/${project.id}`}
                        className="transition-all duration-300"
                        style={{
                          background: surface2,
                          borderRadius: "16px",
                          border: `1px solid ${border}`,
                          padding: "1rem",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = surface3;
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = surface2;
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.95rem",
                            color: textPrimary,
                            fontWeight: 600,
                          }}
                        >
                          {project.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.75rem",
                            color: textTertiary,
                            marginTop: "0.35rem",
                          }}
                        >
                          Open board →
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
