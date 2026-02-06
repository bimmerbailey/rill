import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registered, setRegistered] = useState(false);

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
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        {registered ? "Thanks for registering" : "Create Account"}
      </h1>
      {registered ? (
        <p className="text-gray-500">
          Check your inbox for a confirmation email.
        </p>
      ) : null}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage("");
          }}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage("");
          }}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
          required
        />
        {errorMessage ? (
          <p className="text-sm text-red-600">{errorMessage}</p>
        ) : null}
        <Button type="submit" variant="primary" fullWidth>
          {isLoading ? "Creating..." : "Sign Up"}
        </Button>
      </form>
      <p className="mt-6 text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500 no-underline hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
