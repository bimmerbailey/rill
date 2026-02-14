import { useState, useRef, useEffect } from "react";
import { Settings, Tag, Users, Cog } from "lucide-react";

interface ProjectSettingsMenuProps {
  onOpenLabels: () => void;
  onOpenMembers: () => void;
  onOpenSettings: () => void;
}

export function ProjectSettingsMenu({
  onOpenLabels,
  onOpenMembers,
  onOpenSettings,
}: ProjectSettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const surface1 = "var(--color-surface-0)";
  const surface2 = "var(--color-surface-1)";
  const border = "var(--color-border-strong)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const terracotta = "var(--color-terracotta)";
  const fontBody = "var(--font-body)";

  const menuItems = [
    { icon: Tag, label: "Labels", onClick: onOpenLabels },
    { icon: Users, label: "Members", onClick: onOpenMembers },
    { icon: Cog, label: "Project Settings", onClick: onOpenSettings },
  ];

  const handleItemClick = (onClick: () => void) => {
    onClick();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg transition-colors"
        style={{
          background: isOpen ? surface2 : "transparent",
          border: `1px solid ${isOpen ? border : "transparent"}`,
        }}
        title="Project settings"
      >
        <Settings
          size={20}
          style={{
            color: isOpen ? terracotta : textSecondary,
          }}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg z-50"
          style={{
            background: surface1,
            border: `1px solid ${border}`,
          }}
        >
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => handleItemClick(item.onClick)}
              className="w-full flex items-center gap-3 px-4 py-3 transition-colors"
              style={{
                borderBottom:
                  index < menuItems.length - 1 ? `1px solid ${border}` : "none",
                color: textPrimary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = surface2;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <item.icon size={18} style={{ color: terracotta }} />
              <span
                style={{
                  fontFamily: fontBody,
                  fontSize: "0.9rem",
                }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
