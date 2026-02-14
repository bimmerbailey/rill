import type { LabelColor } from "@/features/projects/types";

interface ColorPickerProps {
  colors: LabelColor[];
  selectedColorId: string;
  onColorSelect: (colorId: string) => void;
  excludeNoColor?: boolean;
}

export function ColorPicker({
  colors,
  selectedColorId,
  onColorSelect,
  excludeNoColor = true,
}: ColorPickerProps) {
  const textSecondary = "rgba(245,238,230,0.6)";

  const displayColors = excludeNoColor
    ? colors.filter((c) => c.name.toLowerCase() !== "no_color")
    : colors;

  const sortedColors = [...displayColors].sort(
    (a, b) => a.position - b.position,
  );

  return (
    <div>
      <label
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.8rem",
          color: textSecondary,
          marginBottom: "0.5rem",
          display: "block",
        }}
      >
        Color
      </label>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(5, 1fr)",
        }}
      >
        {sortedColors.map((color) => {
          const isSelected = color.id === selectedColorId;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onColorSelect(color.id)}
              className="w-8 h-8 rounded-lg transition-all relative"
              style={{
                background: color.colorHex,
                border: isSelected
                  ? "2px solid rgba(245,238,230,0.87)"
                  : "2px solid transparent",
                transform: isSelected ? "scale(1.1)" : "scale(1)",
              }}
              title={color.name}
            >
              {isSelected && (
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: isLightColor(color.colorHex) ? "#000" : "#fff",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}
