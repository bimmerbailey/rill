import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { authApi } from "@/features/auth/services/authApi";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";

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
    <div className="min-h-screen w-full flex">
      {/* Left Side - Visual */}
      <div
        className="
          hidden lg:flex lg:w-1/2 relative overflow-hidden
          bg-[#1a1a1a] items-center justify-center
          animate-[slideInLeft_1s_ease-out_forwards]
        "
      >
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-10">
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
                  stroke="#f7f3ef"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 border-4 border-[#d4754e] opacity-60 rotate-12" />
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-[#d4754e] opacity-40 -rotate-6" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-[#f7f3ef] opacity-20 rotate-45" />

        {/* Content */}
        <div
          className="
            relative z-10 text-center px-12
            animate-[fadeSlideUp_1s_ease-out_0.3s_both]
          "
        >
          <div className="font-mono text-[#d4754e] text-sm tracking-[0.3em] uppercase mb-6">
            Welcome to
          </div>
          <h1 className="font-display text-[#f7f3ef] text-6xl xl:text-7xl leading-none mb-8">
            <span className="italic">Rill</span>
            <br />
            <span className="text-[#d4754e]">Platform</span>
          </h1>
          <p className="font-mono text-[#f7f3ef]/60 text-sm max-w-sm mx-auto leading-relaxed">
            Where structure meets creativity. Build, organize, and scale your
            vision with confidence.
          </p>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#d4754e]" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div
          className="
            w-full max-w-md
            animate-[fadeSlideUp_1s_ease-out_0.2s_both]
          "
        >
          {/* Mobile Header */}
          <div className="lg:hidden mb-12">
            <div className="font-mono text-[#d4754e] text-xs tracking-[0.3em] uppercase mb-3">
              Rill Platform
            </div>
            <h1 className="font-display text-[#1a1a1a] text-4xl leading-none">
              Welcome
              <br />
              <span className="italic">Back</span>
            </h1>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-12">
            <div className="font-mono text-[#d4754e] text-xs tracking-[0.3em] uppercase mb-3">
              Authentication
            </div>
            <h2 className="font-display text-[#1a1a1a] text-5xl leading-tight">
              Sign <span className="italic">In</span>
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div
              className="
                animate-[fadeSlideUp_0.7s_ease-out_0.4s_both]
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
              />
            </div>

            <div
              className="
                animate-[fadeSlideUp_0.7s_ease-out_0.5s_both]
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
              />
            </div>

            {errorMessage ? (
              <div className="font-mono text-xs text-red-600 uppercase tracking-wider">
                {errorMessage}
              </div>
            ) : null}

            {/* Options Row */}
            <div
              className="
                flex items-center justify-between
                animate-[fadeSlideUp_0.7s_ease-out_0.6s_both]
              "
            >
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-2 border-[#1a1a1a] rounded-none accent-[#d4754e] cursor-pointer"
                />
                <span className="font-mono text-xs text-[#1a1a1a]/60 uppercase tracking-wider group-hover:text-[#1a1a1a] transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="font-mono text-xs text-[#d4754e] uppercase tracking-wider hover:underline underline-offset-4 transition-all"
              >
                Forgot?
              </Link>
            </div>

            {/* Submit Button */}
            <div
              className="
                pt-4
                animate-[fadeSlideUp_0.7s_ease-out_0.7s_both]
              "
            >
              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
                className="flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#f7f3ef]/30 border-t-[#f7f3ef] rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div
            className="
              my-10 flex items-center gap-4
              animate-[fadeSlideUp_0.7s_ease-out_0.8s_both]
            "
          >
            <div className="flex-1 h-px bg-[#1a1a1a]/15" />
            <span className="font-mono text-xs text-[#1a1a1a]/40 uppercase tracking-widest">
              Or
            </span>
            <div className="flex-1 h-px bg-[#1a1a1a]/15" />
          </div>

          {/* Social Login */}
          <div
            className="
              space-y-3
              animate-[fadeSlideUp_0.7s_ease-out_0.9s_both]
            "
          >
            <Button
              variant="secondary"
              fullWidth
              className="flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </Button>
          </div>

          {/* Sign Up Link */}
          <p
            className="
              mt-12 text-center
              animate-[fadeSlideUp_0.7s_ease-out_1.0s_both]
            "
          >
            <span className="font-mono text-sm text-[#1a1a1a]/60">
              Don't have an account?{" "}
            </span>
            {showRegistration ? (
              <Link
                to="/register"
                className="font-mono text-sm text-[#1a1a1a] font-medium hover:text-[#d4754e] underline underline-offset-4 transition-all"
              >
                Create one
              </Link>
            ) : (
              <span className="font-mono text-sm text-[#1a1a1a]/50">
                Contact your admin
              </span>
            )}
          </p>

          {/* Footer */}
          <div
            className="
              mt-16 pt-8 border-t border-[#1a1a1a]/10
              animate-[fadeSlideUp_0.7s_ease-out_1.1s_both]
            "
          >
            <p className="font-mono text-xs text-center text-[#1a1a1a]/40 uppercase tracking-wider">
              Protected by reCAPTCHA and subject to our
              <br />
              <Link
                to="/privacy"
                className="hover:text-[#d4754e] transition-colors"
              >
                Privacy Policy
              </Link>
              {" & "}
              <Link
                to="/terms"
                className="hover:text-[#d4754e] transition-colors"
              >
                Terms
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Accent */}
      <div className="fixed bottom-0 left-0 right-0 h-1.5 bg-[#d4754e] lg:hidden" />
    </div>
  );
}
