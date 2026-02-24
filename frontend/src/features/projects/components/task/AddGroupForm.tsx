import { useState } from "react";
import { Button } from "@/components/common";

interface AddGroupFormProps {
  onCreate: (name: string) => Promise<void>;
  loading?: boolean;
}

export function AddGroupForm({ onCreate, loading = false }: AddGroupFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const surface0 = "var(--color-surface-0)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const textPrimary = "var(--color-text-primary)";
  const terracotta = "var(--color-terracotta)";
  const fontBody = "var(--font-body)";

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Group name is required.");
      return;
    }
    setError(null);
    try {
      await onCreate(name.trim());
      setName("");
    } catch {
      setError("Unable to create group. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="New group name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="px-3 py-1.5 rounded-lg text-sm"
          style={{
            background: surface3,
            border: `1px solid ${border}`,
            color: textPrimary,
            fontFamily: fontBody,
            width: "180px",
          }}
        />
        <Button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: terracotta,
            color: surface0,
            borderRadius: "8px",
            padding: "6px 12px",
            fontSize: "0.8rem",
          }}
        >
          <span style={{ fontFamily: fontBody, fontWeight: 500 }}>
            {loading ? "Adding..." : "Add Group"}
          </span>
        </Button>
      </div>
      {error && (
        <span
          style={{
            fontFamily: fontBody,
            fontSize: "0.75rem",
            color: terracotta,
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
