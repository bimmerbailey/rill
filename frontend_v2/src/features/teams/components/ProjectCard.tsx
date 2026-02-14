import { Link } from "react-router-dom";
import type { TeamProject } from "../types";

interface ProjectCardProps {
  project: TeamProject;
  colorIndex: number;
}

export function ProjectCard({ project, colorIndex }: ProjectCardProps) {
  const terracotta = "#c9805e";
  const sage = "#7fa67f";
  const slate = "#7992b0";
  const ochre = "#bfa26e";

  const accentColors = [terracotta, sage, slate, ochre];
  const bgColor = accentColors[colorIndex % accentColors.length];

  return (
    <Link
      to={`/projects/${project.id}`}
      className="block transition-all duration-300"
      style={{
        minHeight: "96px",
        background: bgColor,
        borderRadius: "20px",
        padding: "1rem",
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        const overlay = e.currentTarget.querySelector(
          ".project-overlay",
        ) as HTMLElement;
        if (overlay) {
          overlay.style.background = "rgba(0,0,0,0.25)";
        }
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        const overlay = e.currentTarget.querySelector(
          ".project-overlay",
        ) as HTMLElement;
        if (overlay) {
          overlay.style.background = "rgba(0,0,0,0.15)";
        }
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="project-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.15)",
          transition: "background 0.3s ease",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "64px",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.95rem",
            color: "#fff",
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          {project.name}
        </div>
      </div>
    </Link>
  );
}
