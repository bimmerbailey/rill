import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { passwordSchema, type PasswordFormData } from "../utils/validation";

interface PasswordFormProps {
  onSubmit: (password: string) => Promise<void>;
  isSubmitting: boolean;
}

export function PasswordForm({ onSubmit, isSubmitting }: PasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Dark palette
  const surface2 = "#2c2724";
  const surface3 = "#36302c";
  const border = "rgba(255,235,210,0.06)";
  const textPrimary = "rgba(245,238,230,0.87)";
  const textSecondary = "rgba(245,238,230,0.5)";
  const terracotta = "#c9805e";

  const onFormSubmit = async (data: PasswordFormData) => {
    await onSubmit(data.password);
    reset(); // Clear form after successful password change
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      {/* Security Notice */}
      <div
        className="rounded-lg p-6"
        style={{
          background: surface2,
          border: `1px solid ${border}`,
        }}
      >
        <p
          className="text-sm leading-relaxed"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: textSecondary,
          }}
        >
          For security reasons, we recommend using a strong password that
          includes a mix of letters, numbers, and special characters.
        </p>
      </div>

      {/* New Password */}
      <div>
        <label
          htmlFor="password"
          className="font-mono text-xs uppercase tracking-widest mb-2 block"
          style={{ color: textSecondary }}
        >
          New Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="••••••••"
            className="w-full px-0 py-4 pr-10 text-lg bg-transparent border-0 border-b-2 transition-all duration-300 ease-out focus:outline-none placeholder:font-light"
            style={{
              background: surface3,
              borderColor: errors.password ? terracotta : border,
              color: textPrimary,
              fontFamily: "'Libre Baskerville', Georgia, serif",
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: textSecondary }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <p
          className="mt-2 text-xs uppercase tracking-wider"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            color: textSecondary,
          }}
        >
          Minimum 8 characters
        </p>
        {errors.password && (
          <span
            className="font-mono text-xs mt-1 block"
            style={{ color: terracotta }}
          >
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="font-mono text-xs uppercase tracking-widest mb-2 block"
          style={{ color: textSecondary }}
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="••••••••"
            className="w-full px-0 py-4 pr-10 text-lg bg-transparent border-0 border-b-2 transition-all duration-300 ease-out focus:outline-none placeholder:font-light"
            style={{
              background: surface3,
              borderColor: errors.confirmPassword ? terracotta : border,
              color: textPrimary,
              fontFamily: "'Libre Baskerville', Georgia, serif",
            }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: textSecondary }}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <span
            className="font-mono text-xs mt-1 block"
            style={{ color: terracotta }}
          >
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting} variant="primary">
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
}
