import { NotificationFilter } from "@/graphql/generated/graphql";

interface NotificationTabsProps {
  activeFilter: NotificationFilter;
  onChangeFilter: (filter: NotificationFilter) => void;
}

const TABS = [
  { label: "All", filter: NotificationFilter.All },
  { label: "Unread", filter: NotificationFilter.Unread },
  { label: "Mentioned", filter: NotificationFilter.Mentioned },
  { label: "Assigned", filter: NotificationFilter.Assigned },
] as const;

export function NotificationTabs({
  activeFilter,
  onChangeFilter,
}: NotificationTabsProps) {
  const border = "rgba(255,235,210,0.1)";
  const textSecondary = "rgba(245,238,230,0.5)";
  const accent = "#c9805e";

  return (
    <div
      className="flex gap-1 px-2 py-1"
      style={{ borderBottom: `1px solid ${border}` }}
    >
      {TABS.map((tab) => {
        const isActive = activeFilter === tab.filter;
        return (
          <button
            key={tab.filter}
            onClick={() => onChangeFilter(tab.filter)}
            className="px-3 py-1.5 text-sm transition-colors"
            style={{
              color: isActive ? accent : textSecondary,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: isActive ? 500 : 400,
              borderBottom: isActive
                ? `2px solid ${accent}`
                : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
