import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useAuth } from "@/features/auth/hooks/useAuth";

/**
 * Register Page with "Soft Canvas — Evening" dark theme
 */
export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registered, setRegistered] = useState(false);

  // Dark palette — warm charcoal tones
  const base = "var(--color-surface-base)";
  const surface0 = "var(--color-surface-0)";
  const surface1 = "var(--color-surface-1)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const terracotta = "var(--color-terracotta)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      await register(username, email, password);
      setRegistered(true);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (error: unknown) {
      const status = (error as { response?: { status?: number } })?.response
        ?.status;
      if (status === 400) {
        setErrorMessage("Unable to register with those details.");
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6 relative"
      style={{
        background: `linear-gradient(160deg, ${base} 0%, ${surface0} 50%, ${base} 100%)`,
        color: textPrimary,
        fontFamily: fontHeading,
      }}
    >
      {/* Soft ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,128,94,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(127,166,127,0.04) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div
        className="w-full max-w-md animate-[d2dFadeUp_0.8s_ease-out_both]"
        style={{
          background: surface1,
          border: `1px solid ${border}`,
          borderRadius: "24px",
          padding: "2.5rem",
        }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{
              fontFamily: fontBody,
              color: terracotta,
              fontWeight: 500,
            }}
          >
            Create Account
          </div>
          <h1 className="text-4xl leading-tight" style={{ color: textPrimary }}>
            {registered ? (
              <span style={{ color: terracotta }}>Success!</span>
            ) : (
              <>
                Join <span className="italic">Rill</span>
              </>
            )}
          </h1>
          {registered && (
            <p
              className="mt-4"
              style={{
                fontFamily: fontBody,
                color: textSecondary,
                fontSize: "0.9rem",
              }}
            >
              Check your inbox for a confirmation email.
            </p>
          )}
        </div>

        {!registered && (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="animate-[d2dFadeUp_0.7s_ease-out_0.1s_both]">
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrorMessage("");
                  }}
                  required
                  style={{
                    background: surface3,
                    borderColor: border,
                    color: textPrimary,
                  }}
                />
              </div>

              <div className="animate-[d2dFadeUp_0.7s_ease-out_0.2s_both]">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage("");
                  }}
                  required
                  style={{
                    background: surface3,
                    borderColor: border,
                    color: textPrimary,
                  }}
                />
              </div>

              <div className="animate-[d2dFadeUp_0.7s_ease-out_0.3s_both]">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage("");
                  }}
                  required
                  style={{
                    background: surface3,
                    borderColor: border,
                    color: textPrimary,
                  }}
                />
              </div>

              {errorMessage ? (
                <div
                  className="text-sm animate-[d2dFadeUp_0.5s_ease-out_both]"
                  style={{
                    fontFamily: fontBody,
                    color: terracotta,
                    fontWeight: 500,
                  }}
                >
                  {errorMessage}
                </div>
              ) : null}

              <div className="pt-2 animate-[d2dFadeUp_0.7s_ease-out_0.4s_both]">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isLoading}
                  style={{
                    background: terracotta,
                    color: surface0,
                    borderRadius: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: fontBody,
                      fontWeight: 500,
                    }}
                  >
                    {isLoading ? "Creating..." : "Sign Up"}
                  </span>
                </Button>
              </div>
            </form>

            {/* Sign In Link */}
            <p className="mt-8 text-center animate-[d2dFadeUp_0.7s_ease-out_0.5s_both]">
              <span
                style={{
                  fontFamily: fontBody,
                  color: textSecondary,
                  fontSize: "0.9rem",
                }}
              >
                Already have an account?{" "}
              </span>
              <Link
                to="/login"
                style={{
                  fontFamily: fontBody,
                  color: textPrimary,
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
                className="hover:opacity-80 transition-all"
              >
                Sign in
              </Link>
            </p>
          </>
        )}

        {/* Back to Login Link for success state */}
        {registered && (
          <div className="text-center mt-6 animate-[d2dFadeUp_0.7s_ease-out_0.6s_both]">
            <Link
              to="/login"
              style={{
                fontFamily: fontBody,
                color: terracotta,
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
              className="hover:opacity-80 transition-all"
            >
              Go to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
