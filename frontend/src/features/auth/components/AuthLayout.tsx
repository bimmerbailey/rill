// Layout component for auth pages
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  // Pages now handle their own full layout
  return <Outlet />;
}
