import { useRef } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { ProfileAvatar } from "./ProfileAvatar";
import type { ProfileIcon } from "@/graphql/generated/graphql";

interface AvatarUploadProps {
  profileIcon: ProfileIcon;
  fullName: string;
  onUpload: (file: File) => Promise<void>;
  onRemove: () => Promise<void>;
  isUploading: boolean;
  isRemoving: boolean;
}

export function AvatarUpload({
  profileIcon,
  fullName,
  onUpload,
  onRemove,
  isUploading,
  isRemoving,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await onUpload(file);

    // Clear the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveClick = async () => {
    await onRemove();
  };

  const hasAvatar = !!profileIcon.url;
  const isLoading = isUploading || isRemoving;

  // Dark palette
  const textSecondary = "var(--color-text-secondary)";
  const textTertiary = "var(--color-text-tertiary)";
  const terracotta = "var(--color-terracotta)";
  const fontBody = "var(--font-body)";

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Avatar Display */}
      <div className="relative">
        <ProfileAvatar
          profileIcon={profileIcon}
          fullName={fullName}
          size="2xl"
          className={isLoading ? "opacity-50" : ""}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-8 h-8 border-4 rounded-full animate-spin"
              style={{
                borderColor: textTertiary,
                borderTopColor: terracotta,
              }}
            />
          </div>
        )}
      </div>

      {/* Upload/Remove Buttons */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex gap-3">
          <Button
            type="button"
            onClick={handleUploadClick}
            disabled={isLoading}
            variant="primary"
            className="flex items-center justify-center gap-2"
          >
            <Upload size={16} />
            <span>{isUploading ? "Uploading..." : "Upload Photo"}</span>
          </Button>

          {hasAvatar && (
            <Button
              type="button"
              onClick={handleRemoveClick}
              disabled={isLoading}
              variant="secondary"
              className="flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              <span>{isRemoving ? "Removing..." : "Remove"}</span>
            </Button>
          )}
        </div>

        <p
          className="text-xs uppercase tracking-wider text-center"
          style={{
            fontFamily: fontBody,
            color: textSecondary,
          }}
        >
          Allowed JPG, GIF or PNG. Max size of 800KB
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
