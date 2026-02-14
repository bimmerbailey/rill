import type { ProfileIcon } from "@/graphql/generated/graphql";

interface ProfileAvatarProps {
  profileIcon: ProfileIcon;
  fullName: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
  "2xl": "w-24 h-24 text-2xl",
};

export function ProfileAvatar({
  profileIcon,
  fullName,
  size = "md",
  className = "",
}: ProfileAvatarProps) {
  const sizeClass = sizeClasses[size];

  // Use avatar image if available, otherwise show initials
  if (profileIcon.url) {
    return (
      <div
        className={`${sizeClass} rounded-full overflow-hidden flex items-center justify-center ${className}`}
      >
        <img
          src={profileIcon.url}
          alt={fullName}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Show initials with background color
  const bgColor = profileIcon.bgColor || "#9ca3af"; // Default to gray-400 if no color
  const initials = profileIcon.initials || fullName.charAt(0).toUpperCase();

  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center font-semibold text-white ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {initials}
    </div>
  );
}
