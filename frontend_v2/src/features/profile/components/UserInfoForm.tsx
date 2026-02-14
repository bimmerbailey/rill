import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { userInfoSchema, type UserInfoFormData } from "../utils/validation";

interface UserInfoFormProps {
  user: {
    fullName: string;
    username: string;
    email: string;
    bio: string;
    profileIcon: {
      initials?: string | null;
    };
  };
  onSubmit: (data: UserInfoFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function UserInfoForm({
  user,
  onSubmit,
  isSubmitting,
}: UserInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: user.fullName,
      initials: user.profileIcon?.initials || "",
      email: user.email,
      bio: user.bio || "",
    },
  });

  // Dark palette
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const terracotta = "var(--color-terracotta)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  const handleFormSubmit = async (data: UserInfoFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <Input
        type="text"
        label="Full Name"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register("name")}
        style={{
          background: surface3,
          borderColor: border,
          color: textPrimary,
        }}
      />

      <div>
        <Input
          type="text"
          label="Initials"
          placeholder="JD"
          error={errors.initials?.message}
          maxLength={3}
          {...register("initials")}
          style={{
            background: surface3,
            borderColor: border,
            color: textPrimary,
            textTransform: "uppercase",
          }}
        />
        <p
          className="mt-2 text-xs uppercase tracking-wider"
          style={{
            fontFamily: fontBody,
            color: textSecondary,
          }}
        >
          2-3 letters for your avatar
        </p>
      </div>

      <div>
        <Input
          type="text"
          label="Username"
          value={user.username}
          disabled
          style={{
            background: surface3,
            borderColor: border,
            color: textSecondary,
            opacity: 0.5,
            cursor: "not-allowed",
          }}
        />
        <p
          className="mt-2 text-xs uppercase tracking-wider"
          style={{
            fontFamily: fontBody,
            color: textSecondary,
          }}
        >
          Username cannot be changed
        </p>
      </div>

      <Input
        type="email"
        label="Email"
        placeholder="john@example.com"
        error={errors.email?.message}
        {...register("email")}
        style={{
          background: surface3,
          borderColor: border,
          color: textPrimary,
        }}
      />

      <div>
        <label
          htmlFor="bio"
          className="font-mono text-xs uppercase tracking-widest mb-2 block"
          style={{ color: textSecondary }}
        >
          Bio
        </label>
        <textarea
          id="bio"
          {...register("bio")}
          rows={4}
          placeholder="Tell us about yourself..."
          className="w-full px-0 py-4 text-lg bg-transparent border-0 border-b-2 transition-all duration-300 ease-out focus:outline-none resize-none placeholder:font-light"
          style={{
            background: surface3,
            borderColor: border,
            color: textPrimary,
            fontFamily: fontHeading,
          }}
        />
        <p
          className="mt-2 text-xs uppercase tracking-wider"
          style={{
            fontFamily: fontBody,
            color: textSecondary,
          }}
        >
          Optional, max 500 characters
        </p>
        {errors.bio && (
          <span
            className="font-mono text-xs mt-1 block"
            style={{ color: terracotta }}
          >
            {errors.bio.message}
          </span>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting} variant="primary">
          {isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </form>
  );
}
