import { Outlet } from "react-router-dom";
import { TopNavbar } from "./TopNavbar";

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
