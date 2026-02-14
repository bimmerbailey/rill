import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { authApi } from "@/features/auth/services/authApi";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";

/**
 * Login Page with "Soft Canvas — Evening" dark theme
 */
export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);
  const navigate = useNavigate();
  const location = useLocation() as { state?: { redirect?: string } };
  const { login } = useAuth();
  const { isAuthenticated } = useAuthStore();

  // Dark palette — warm charcoal tones
  const base = "var(--color-surface-base)";
  const surface0 = "var(--color-surface-0)";
  const surface1 = "var(--color-surface-1)";
  const surface3 = "var(--color-surface-3)";
  const border = "var(--color-border)";
  const textPrimary = "var(--color-text-primary)";
  const textSecondary = "var(--color-text-secondary)";
  const textTertiary = "var(--color-text-tertiary)";
  const terracotta = "var(--color-terracotta)";
  const fontHeading = "var(--font-heading)";
  const fontBody = "var(--font-body)";

  useEffect(() => {
    let isMounted = true;
    authApi
      .settings()
      .then((response) => {
        if (!isMounted) return;
        if (!response.isConfigured) {
          navigate("/register", { replace: true });
          return;
        }
        setShowRegistration(response.allowPublicRegistration);
      })
      .catch(() => {
        if (!isMounted) return;
        setShowRegistration(true);
      });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const redirectTo = location.state?.redirect || "/projects";
    navigate(redirectTo, { replace: true });
  }, [isAuthenticated, location.state, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      await login(username, password);
      const redirectTo = location.state?.redirect || "/projects";
      navigate(redirectTo, { replace: true });
    } catch (error: unknown) {
      const status = (error as { response?: { status?: number } })?.response
        ?.status;
      if (status === 401) {
        setErrorMessage("Invalid username or password.");
      } else {
        setErrorMessage("Unable to sign in right now.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex"
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

      {/* Left Side - Visual */}
      <div
        className="
          hidden lg:flex lg:w-1/2 relative overflow-hidden
          items-center justify-center
          animate-[d2dFadeUp_1s_ease-out_both]
        "
      >
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke={textPrimary}
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Decorative Elements */}
        <div
          className="absolute top-20 left-20 w-32 h-32 border-4 opacity-40 rotate-12"
          style={{ borderColor: terracotta }}
        />
        <div
          className="absolute bottom-32 right-20 w-24 h-24 opacity-20 -rotate-6"
          style={{ backgroundColor: terracotta }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-16 h-16 border-2 opacity-10 rotate-45"
          style={{ borderColor: textPrimary }}
        />

        {/* Content */}
        <div
          className="
            relative z-10 text-center px-12
            animate-[d2dFadeUp_1s_ease-out_0.3s_both]
          "
        >
          <div
            className="text-sm tracking-[0.3em] uppercase mb-6"
            style={{
              fontFamily: fontBody,
              color: textTertiary,
              fontWeight: 500,
            }}
          >
            Welcome to
          </div>
          <h1
            className="text-6xl xl:text-7xl leading-none mb-8"
            style={{ color: textPrimary }}
          >
            <span className="italic" style={{ color: terracotta }}>
              Rill
            </span>
            <br />
            <span>Platform</span>
          </h1>
          <p
            className="text-sm max-w-sm mx-auto leading-relaxed"
            style={{
              fontFamily: fontBody,
              color: textSecondary,
            }}
          >
            Where structure meets creativity. Build, organize, and scale your
            vision with confidence.
          </p>
        </div>

        {/* Bottom Accent Line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: terracotta, opacity: 0.6 }}
        />
      </div>

      {/* Right Side - Form */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative z-10"
        style={{ backgroundColor: surface0 }}
      >
        <div
          className="
            w-full max-w-md
            animate-[d2dFadeUp_1s_ease-out_0.2s_both]
          "
        >
          {/* Mobile Header */}
          <div className="lg:hidden mb-12">
            <div
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{
                fontFamily: fontBody,
                color: terracotta,
                fontWeight: 500,
              }}
            >
              Rill Platform
            </div>
            <h1
              className="text-4xl leading-none"
              style={{ color: textPrimary }}
            >
              Welcome
              <br />
              <span className="italic">Back</span>
            </h1>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-12">
            <div
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{
                fontFamily: fontBody,
                color: terracotta,
                fontWeight: 500,
              }}
            >
              Authentication
            </div>
            <h2
              className="text-5xl leading-tight"
              style={{ color: textPrimary }}
            >
              Sign <span className="italic">In</span>
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div
              className="
                animate-[d2dFadeUp_0.7s_ease-out_0.4s_both]
              "
            >
              <Input
                type="text"
                label="Username"
                placeholder="your.username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrorMessage("");
                }}
                required
                autoComplete="username"
                style={{
                  background: surface3,
                  borderColor: border,
                  color: textPrimary,
                }}
              />
            </div>

            <div
              className="
                animate-[d2dFadeUp_0.7s_ease-out_0.5s_both]
              "
            >
              <Input
                type="password"
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
                required
                autoComplete="current-password"
                style={{
                  background: surface3,
                  borderColor: border,
                  color: textPrimary,
                }}
              />
            </div>

            {errorMessage ? (
              <div
                className="text-xs uppercase tracking-wider"
                style={{
                  fontFamily: fontBody,
                  color: terracotta,
                  fontWeight: 500,
                }}
              >
                {errorMessage}
              </div>
            ) : null}

            {/* Options Row */}
            <div
              className="
                flex items-center justify-between
                animate-[d2dFadeUp_0.7s_ease-out_0.6s_both]
              "
            >
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                  style={{
                    background: surface3,
                    border: `1px solid ${border}`,
                    accentColor: terracotta,
                  }}
                />
                <span
                  className="text-xs uppercase tracking-wider transition-colors"
                  style={{
                    fontFamily: fontBody,
                    color: textSecondary,
                    fontWeight: 500,
                  }}
                >
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-xs uppercase tracking-wider hover:opacity-80 transition-all"
                style={{
                  fontFamily: fontBody,
                  color: terracotta,
                  fontWeight: 500,
                }}
              >
                Forgot?
              </Link>
            </div>

            {/* Submit Button */}
            <div
              className="
                pt-4
                animate-[d2dFadeUp_0.7s_ease-out_0.7s_both]
              "
            >
              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
                className="flex items-center justify-center gap-3"
                style={{
                  background: terracotta,
                  color: surface0,
                  borderRadius: "8px",
                }}
              >
                {isLoading ? (
                  <>
                    <span
                      className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{
                        borderColor: `${textSecondary}`,
                        borderTopColor: textPrimary,
                      }}
                    />
                    <span style={{ fontFamily: fontBody }}>
                      Authenticating...
                    </span>
                  </>
                ) : (
                  <span
                    style={{
                      fontFamily: fontBody,
                      fontWeight: 500,
                    }}
                  >
                    Continue
                  </span>
                )}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div
            className="
              my-10 flex items-center gap-4
              animate-[d2dFadeUp_0.7s_ease-out_0.8s_both]
            "
          >
            <div className="flex-1 h-px" style={{ backgroundColor: border }} />
            <span
              className="text-xs uppercase tracking-widest"
              style={{
                fontFamily: fontBody,
                color: textTertiary,
                fontWeight: 500,
              }}
            >
              Or
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: border }} />
          </div>

          {/* Social Login */}
          <div
            className="
              space-y-3
              animate-[d2dFadeUp_0.7s_ease-out_0.9s_both]
            "
          >
            <Button
              variant="secondary"
              fullWidth
              className="flex items-center justify-center gap-3"
              style={{
                background: surface1,
                border: `1px solid ${border}`,
                color: textPrimary,
                borderRadius: "8px",
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span style={{ fontFamily: fontBody, fontWeight: 500 }}>
                Continue with Google
              </span>
            </Button>
          </div>

          {/* Sign Up Link */}
          <p
            className="
              mt-12 text-center
              animate-[d2dFadeUp_0.7s_ease-out_1.0s_both]
            "
          >
            <span
              style={{
                fontFamily: fontBody,
                color: textSecondary,
                fontSize: "0.9rem",
              }}
            >
              Don't have an account?{" "}
            </span>
            {showRegistration ? (
              <Link
                to="/register"
                className="hover:opacity-80 transition-all"
                style={{
                  fontFamily: fontBody,
                  color: textPrimary,
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Create one
              </Link>
            ) : (
              <span
                style={{
                  fontFamily: fontBody,
                  color: textTertiary,
                  fontSize: "0.9rem",
                }}
              >
                Contact your admin
              </span>
            )}
          </p>

          {/* Footer */}
          <div
            className="
              mt-16 pt-8
              animate-[d2dFadeUp_0.7s_ease-out_1.1s_both]
            "
            style={{ borderTop: `1px solid ${border}` }}
          >
            <p
              className="text-xs text-center uppercase tracking-wider"
              style={{
                fontFamily: fontBody,
                color: textTertiary,
                fontWeight: 500,
              }}
            >
              Protected by reCAPTCHA and subject to our
              <br />
              <Link
                to="/privacy"
                className="hover:opacity-80 transition-colors"
                style={{ color: terracotta }}
              >
                Privacy Policy
              </Link>
              {" & "}
              <Link
                to="/terms"
                className="hover:opacity-80 transition-colors"
                style={{ color: terracotta }}
              >
                Terms
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
