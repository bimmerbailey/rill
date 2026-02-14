import {
  useDashboardData,
  useMyTasks,
} from "@/features/dashboard/hooks/useDashboard";
import { MyTasksSort, MyTasksStatus } from "@/graphql/generated/graphql";
import { Link } from "react-router-dom";

export function DashboardPage() {
  const { user, projects, teams, loading, error } = useDashboardData();
  const { tasks, loading: tasksLoading } = useMyTasks(
    MyTasksStatus.All,
    MyTasksSort.DueDate,
  );

  const incompleteTasks = tasks.filter((t) => !t.complete);
  const completedCount = tasks.length - incompleteTasks.length;
  const totalCount = tasks.length;
  const completionPct =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Dark palette — warm charcoal tones, not cold
  const base = "var(--color-surface-base)"; // deepest background
  const surface0 = "var(--color-surface-0)"; // canvas
  const surface1 = "var(--color-surface-1)"; // raised card
  const surface2 = "var(--color-surface-2)"; // hover / elevated
  const surface3 = "var(--color-surface-3)"; // active / input bg
  const border = "var(--color-border)";
  const textPrimary = "var(--color-text-primary)"; // ~87% white-warm
  const textSecondary = "var(--color-text-secondary)";
  const textTertiary = "var(--color-text-tertiary)";

  // Accents — slightly desaturated from light mode
  const terracotta = "var(--color-terracotta)";
  const sage = "var(--color-sage)";
  const slate = "var(--color-slate)";
  const ochre = "var(--color-ochre)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  if (loading) {
    return (
      <div
        className="min-h-screen p-10"
        style={{
          background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
          fontFamily: fontHeading,
        }}
      >
        <div className="max-w-6xl mx-auto space-y-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse"
              style={{
                height: "180px",
                borderRadius: "24px",
                background: surface1,
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
        className="min-h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
        }}
      >
        <div
          style={{
            background: surface1,
            borderRadius: "24px",
            padding: "2.5rem",
            maxWidth: "400px",
            border: `1px solid ${border}`,
          }}
        >
          <h2
            style={{
              fontFamily: fontHeading,
              color: terracotta,
              fontSize: "1.3rem",
              marginBottom: "0.5rem",
            }}
          >
            Something went wrong
          </h2>
          <p
            style={{
              fontFamily: fontBody,
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

      <div className="relative max-w-6xl mx-auto px-8 py-10">
        {/* Welcome */}
        <header
          className="mb-10"
          style={{ animation: "d2dFadeUp 0.7s ease-out" }}
        >
          <p
            style={{
              fontFamily: fontBody,
              fontSize: "0.8rem",
              color: textTertiary,
              fontWeight: 500,
              marginBottom: "0.5rem",
              letterSpacing: "0.05em",
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <h1
            style={{
              fontFamily: fontHeading,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 400,
              lineHeight: 1.2,
              color: textPrimary,
            }}
          >
            Hello,{" "}
            <em style={{ fontStyle: "italic", color: terracotta }}>
              {user?.fullName || user?.username}
            </em>
          </h1>
        </header>

        {/* Overview Cards Row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          style={{ animation: "d2dFadeUp 0.7s ease-out 0.15s both" }}
        >
          {[
            { label: "Projects", value: projects.length, bg: terracotta },
            { label: "Open Tasks", value: incompleteTasks.length, bg: sage },
            { label: "Completed", value: completedCount, bg: slate },
            { label: "Teams", value: teams.length, bg: ochre },
          ].map((card) => (
            <div
              key={card.label}
              style={{
                background: surface1,
                borderRadius: "20px",
                padding: "1.5rem",
                border: `1px solid ${border}`,
                transition: "transform 0.3s ease, background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.background = surface2;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = surface1;
              }}
            >
              <div
                className="inline-block mb-3"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: card.bg,
                  boxShadow: `0 0 8px ${card.bg}40`,
                }}
              />
              <div
                style={{
                  fontFamily: fontHeading,
                  fontSize: "2rem",
                  fontWeight: 400,
                  lineHeight: 1,
                  color: textPrimary,
                  marginBottom: "0.3rem",
                }}
              >
                {card.value}
              </div>
              <div
                style={{
                  fontFamily: fontBody,
                  fontSize: "0.75rem",
                  color: textTertiary,
                  fontWeight: 500,
                }}
              >
                {card.label}
              </div>
            </div>
          ))}
        </div>

        {/* Completion Bar */}
        <div
          className="mb-8"
          style={{
            background: surface1,
            borderRadius: "20px",
            padding: "1.5rem 2rem",
            border: `1px solid ${border}`,
            animation: "d2dFadeUp 0.7s ease-out 0.25s both",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              style={{
                fontFamily: fontBody,
                fontSize: "0.8rem",
                color: textSecondary,
                fontWeight: 500,
              }}
            >
              Overall Task Progress
            </span>
            <span
              style={{
                fontFamily: fontHeading,
                fontSize: "0.9rem",
                color: terracotta,
              }}
            >
              {completionPct}%
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "8px",
              borderRadius: "4px",
              background: surface3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${completionPct}%`,
                height: "100%",
                borderRadius: "4px",
                background: `linear-gradient(90deg, ${terracotta}, #d4a07a)`,
                boxShadow: `0 0 12px ${terracotta}30`,
                transition: "width 1s ease-out",
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Projects */}
          <div
            className="col-span-12 lg:col-span-7"
            style={{ animation: "d2dFadeUp 0.7s ease-out 0.35s both" }}
          >
            <div
              style={{
                background: surface1,
                borderRadius: "24px",
                padding: "2rem",
                border: `1px solid ${border}`,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  style={{
                    fontFamily: fontHeading,
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    color: textPrimary,
                  }}
                >
                  Your Projects
                </h2>
                <Link
                  to="/projects"
                  className="no-underline"
                  style={{
                    fontFamily: fontBody,
                    fontSize: "0.78rem",
                    color: terracotta,
                    fontWeight: 500,
                    transition: "opacity 0.2s",
                  }}
                >
                  See all &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.slice(0, 6).map((project, i) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.shortId}`}
                    className="no-underline"
                    style={{
                      display: "block",
                      padding: "1.1rem 1.2rem",
                      borderRadius: "16px",
                      background:
                        i % 2 === 0
                          ? `linear-gradient(135deg, ${surface2}, ${surface3})`
                          : `linear-gradient(135deg, rgba(127,166,127,0.06), rgba(127,166,127,0.03))`,
                      border: `1px solid ${border}`,
                      transition:
                        "transform 0.25s ease, border-color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,235,210,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = border;
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          background: [
                            terracotta,
                            sage,
                            slate,
                            ochre,
                            "#9a7ab8",
                            "#5a9ac4",
                          ][i % 6],
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontFamily: fontBody,
                          fontWeight: 600,
                          fontSize: "0.8rem",
                        }}
                      >
                        {project.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p
                          className="truncate"
                          style={{
                            fontFamily: fontBody,
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            color: textPrimary,
                          }}
                        >
                          {project.name}
                        </p>
                        {project.team && (
                          <p
                            style={{
                              fontFamily: fontBody,
                              fontSize: "0.7rem",
                              color: textTertiary,
                              marginTop: "2px",
                            }}
                          >
                            {project.team.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {projects.length === 0 && (
                <p
                  className="text-center py-8"
                  style={{
                    fontFamily: fontBody,
                    color: textTertiary,
                    fontSize: "0.9rem",
                  }}
                >
                  No projects yet. Create one to get started.
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div
            className="col-span-12 lg:col-span-5 space-y-6"
            style={{ animation: "d2dFadeUp 0.7s ease-out 0.45s both" }}
          >
            {/* Tasks */}
            <div
              style={{
                background: surface1,
                borderRadius: "24px",
                padding: "2rem",
                border: `1px solid ${border}`,
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2
                  style={{
                    fontFamily: fontHeading,
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    color: textPrimary,
                  }}
                >
                  Open Tasks
                </h2>
                <Link
                  to="/my-tasks"
                  className="no-underline"
                  style={{
                    fontFamily: fontBody,
                    fontSize: "0.78rem",
                    color: terracotta,
                    fontWeight: 500,
                  }}
                >
                  All tasks &rarr;
                </Link>
              </div>
              {tasksLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse"
                      style={{
                        height: "52px",
                        borderRadius: "12px",
                        background: surface2,
                      }}
                    />
                  ))}
                </div>
              ) : incompleteTasks.length > 0 ? (
                <div className="space-y-2">
                  {incompleteTasks.slice(0, 5).map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3"
                      style={{
                        padding: "0.8rem 1rem",
                        borderRadius: "14px",
                        background: surface2,
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = surface3;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = surface2;
                      }}
                    >
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "6px",
                          border: `2px solid ${textTertiary}`,
                          flexShrink: 0,
                        }}
                      />
                      <div className="min-w-0">
                        <p
                          className="truncate"
                          style={{
                            fontFamily: fontBody,
                            fontSize: "0.85rem",
                            color: textPrimary,
                          }}
                        >
                          {task.name}
                        </p>
                        {task.taskGroup && (
                          <p
                            style={{
                              fontFamily: fontBody,
                              fontSize: "0.65rem",
                              color: textTertiary,
                              marginTop: "2px",
                            }}
                          >
                            {task.taskGroup.name}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, rgba(127,166,127,0.2), rgba(127,166,127,0.1))`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 0.75rem",
                      fontSize: "1.3rem",
                      color: sage,
                    }}
                  >
                    &#10003;
                  </div>
                  <p
                    style={{
                      fontFamily: fontBody,
                      color: textTertiary,
                      fontSize: "0.85rem",
                    }}
                  >
                    You&apos;re all caught up!
                  </p>
                </div>
              )}
            </div>

            {/* Teams */}
            <div
              style={{
                background: surface1,
                borderRadius: "24px",
                padding: "1.5rem 2rem",
                border: `1px solid ${border}`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  style={{
                    fontFamily: fontHeading,
                    fontSize: "1.05rem",
                    fontWeight: 400,
                    color: textPrimary,
                  }}
                >
                  Teams
                </h2>
                <Link
                  to="/teams"
                  className="no-underline"
                  style={{
                    fontFamily: fontBody,
                    fontSize: "0.78rem",
                    color: terracotta,
                    fontWeight: 500,
                  }}
                >
                  Manage &rarr;
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {teams.map((team, i) => (
                  <Link
                    key={team.id}
                    to="/teams"
                    className="no-underline flex items-center gap-2"
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "100px",
                      background: [
                        "rgba(201,128,94,0.1)",
                        "rgba(127,166,127,0.1)",
                        "rgba(121,146,176,0.1)",
                        "rgba(191,162,110,0.1)",
                      ][i % 4],
                      border: `1px solid ${
                        [
                          "rgba(201,128,94,0.15)",
                          "rgba(127,166,127,0.15)",
                          "rgba(121,146,176,0.15)",
                          "rgba(191,162,110,0.15)",
                        ][i % 4]
                      }`,
                      fontFamily: fontBody,
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: textSecondary,
                      transition: "transform 0.2s ease, background 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: [terracotta, sage, slate, ochre][i % 4],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                      }}
                    >
                      {team.name.charAt(0)}
                    </div>
                    {team.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div
              style={{
                borderRadius: "24px",
                padding: "2rem",
                background: `linear-gradient(135deg, ${terracotta}, #d4946e)`,
                boxShadow: `0 8px 30px rgba(201,128,94,0.15)`,
              }}
            >
              <h3
                style={{
                  fontFamily: fontHeading,
                  fontSize: "1.05rem",
                  fontWeight: 400,
                  color: "#fff",
                  marginBottom: "1rem",
                }}
              >
                Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Browse Projects", to: "/projects" },
                  { label: "View My Tasks", to: "/my-tasks" },
                  { label: "Manage Teams", to: "/teams" },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center justify-between no-underline"
                    style={{
                      padding: "0.7rem 1rem",
                      borderRadius: "12px",
                      background: "rgba(0,0,0,0.15)",
                      fontFamily: fontBody,
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: "#fff",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(0,0,0,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(0,0,0,0.15)";
                    }}
                  >
                    {item.label}
                    <span>&rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes d2dFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
