import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";

interface DueDateManagerProps {
  currentDueDate?: string | null;
  hasTime?: boolean;
  onSave: (dueDate: string | null, hasTime: boolean) => void;
  onClose: () => void;
  /** If provided, the popup anchors to this element's position */
  anchorRef?: React.RefObject<HTMLElement | null>;
}

export function DueDateManager({
  currentDueDate,
  hasTime: initialHasTime = false,
  onSave,
  onClose,
  anchorRef,
}: DueDateManagerProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  const initDate = currentDueDate ? dayjs(currentDueDate) : dayjs();
  const [selectedDate, setSelectedDate] = useState(
    initDate.format("YYYY-MM-DD"),
  );
  const [selectedTime, setSelectedTime] = useState(
    currentDueDate && initialHasTime ? initDate.format("HH:mm") : "09:00",
  );
  const [includeTime, setIncludeTime] = useState(initialHasTime);
  const [viewMonth, setViewMonth] = useState(initDate.startOf("month"));

  // Position popup relative to anchor
  const [pos, setPos] = useState({ top: 0, left: 0 });
  useEffect(() => {
    if (anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 6, left: rect.left });
    }
  }, [anchorRef]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        (!anchorRef?.current || !anchorRef.current.contains(e.target as Node))
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, anchorRef]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSave = () => {
    if (!selectedDate) {
      onSave(null, false);
    } else {
      const isoDate = includeTime
        ? `${selectedDate}T${selectedTime}:00`
        : `${selectedDate}T00:00:00`;
      onSave(isoDate, includeTime);
    }
    onClose();
  };

  const handleRemove = () => {
    onSave(null, false);
    onClose();
  };

  // Calendar helpers
  const startOfMonth = viewMonth.startOf("month");
  const daysInMonth = viewMonth.daysInMonth();
  const firstDayOfWeek = startOfMonth.day(); // 0 = Sun
  const today = dayjs().format("YYYY-MM-DD");

  const calendarDays: (dayjs.Dayjs | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) =>
      startOfMonth.add(i, "day"),
    ),
  ];

  const surface0 = "var(--color-surface-0)";
  const surface1 = "var(--color-surface-1)";
  const surface2 = "var(--color-surface-2)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const borderStrong = "var(--color-border-strong)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const textTertiary = "var(--color-text-tertiary)";
  const terracotta = "var(--color-terracotta)";
  const sage = "var(--color-sage)";
  const fontBody = "var(--font-body)";

  const isFixed = !!anchorRef;

  return (
    <div
      ref={popupRef}
      style={{
        position: isFixed ? "fixed" : "absolute",
        top: isFixed ? pos.top : "calc(100% + 6px)",
        left: isFixed ? pos.left : 0,
        zIndex: 200,
        width: "280px",
        background: surface1,
        border: `1px solid ${borderStrong}`,
        borderRadius: "14px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: `1px solid ${border}` }}
      >
        <span
          style={{
            fontFamily: fontBody,
            fontSize: "0.8rem",
            fontWeight: 600,
            color: textSecondary,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Due Date
        </span>
        <button
          onClick={onClose}
          style={{ color: textTertiary, fontSize: "1rem", lineHeight: 1 }}
        >
          ×
        </button>
      </div>

      {/* Month nav */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: `1px solid ${border}` }}
      >
        <button
          onClick={() => setViewMonth((m) => m.subtract(1, "month"))}
          style={{ color: textSecondary }}
        >
          ‹
        </button>
        <span
          style={{
            fontFamily: fontBody,
            fontSize: "0.85rem",
            fontWeight: 600,
            color: textPrimary,
          }}
        >
          {viewMonth.format("MMMM YYYY")}
        </span>
        <button
          onClick={() => setViewMonth((m) => m.add(1, "month"))}
          style={{ color: textSecondary }}
        >
          ›
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 px-3 pt-2 pb-1" style={{ gap: "2px" }}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            className="text-center"
            style={{
              fontFamily: fontBody,
              fontSize: "0.65rem",
              color: textTertiary,
              paddingBottom: "4px",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 px-3 pb-3" style={{ gap: "2px" }}>
        {calendarDays.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const iso = day.format("YYYY-MM-DD");
          const isSelected = iso === selectedDate;
          const isToday = iso === today;
          return (
            <button
              key={iso}
              onClick={() => setSelectedDate(iso)}
              style={{
                fontFamily: fontBody,
                fontSize: "0.8rem",
                borderRadius: "8px",
                padding: "5px 2px",
                background: isSelected
                  ? terracotta
                  : isToday
                    ? surface3
                    : "transparent",
                color: isSelected
                  ? surface0
                  : isToday
                    ? terracotta
                    : textPrimary,
                border:
                  isToday && !isSelected ? `1px solid ${terracotta}` : "none",
                fontWeight: isSelected || isToday ? 600 : 400,
              }}
            >
              {day.date()}
            </button>
          );
        })}
      </div>

      {/* Time toggle + input */}
      <div className="px-4 py-3" style={{ borderTop: `1px solid ${border}` }}>
        <label
          className="flex items-center gap-2 cursor-pointer mb-2"
          style={{
            fontFamily: fontBody,
            fontSize: "0.85rem",
            color: textSecondary,
          }}
        >
          <input
            type="checkbox"
            checked={includeTime}
            onChange={(e) => setIncludeTime(e.target.checked)}
            style={{ accentColor: terracotta }}
          />
          Include time
        </label>
        {includeTime && (
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg text-sm"
            style={{
              background: surface2,
              border: `1px solid ${border}`,
              color: textPrimary,
              fontFamily: fontBody,
              colorScheme: "dark",
            }}
          />
        )}
      </div>

      {/* Actions */}
      <div
        className="flex gap-2 px-4 pb-4"
        style={{ borderTop: `1px solid ${border}`, paddingTop: "12px" }}
      >
        <button
          onClick={handleSave}
          className="flex-1 py-1.5 rounded-lg text-sm font-medium"
          style={{
            background: terracotta,
            color: surface0,
            fontFamily: fontBody,
          }}
        >
          Save
        </button>
        {currentDueDate && (
          <button
            onClick={handleRemove}
            className="flex-1 py-1.5 rounded-lg text-sm"
            style={{
              background: surface2,
              color: textSecondary,
              fontFamily: fontBody,
              border: `1px solid ${border}`,
            }}
          >
            Remove
          </button>
        )}
        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded-lg text-sm"
          style={{
            background: surface2,
            color: textSecondary,
            fontFamily: fontBody,
            border: `1px solid ${border}`,
          }}
        >
          Cancel
        </button>
      </div>

      {/* Quick shortcuts */}
      <div
        className="px-4 pb-4 flex flex-wrap gap-1"
        style={{ borderTop: `1px solid ${border}`, paddingTop: "10px" }}
      >
        {[
          { label: "Today", days: 0 },
          { label: "Tomorrow", days: 1 },
          { label: "Next week", days: 7 },
          { label: "In 2 weeks", days: 14 },
        ].map(({ label, days }) => (
          <button
            key={label}
            onClick={() =>
              setSelectedDate(dayjs().add(days, "day").format("YYYY-MM-DD"))
            }
            className="px-2 py-1 rounded-md text-xs"
            style={{
              background: surface2,
              color: textSecondary,
              fontFamily: fontBody,
              border: `1px solid ${border}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = surface3;
              e.currentTarget.style.color = sage;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = surface2;
              e.currentTarget.style.color = textSecondary;
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
