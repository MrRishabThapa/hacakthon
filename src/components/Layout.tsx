import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Navbar from "./Navbar";

export default function Layout() {
  const { mode } = useSelector((state: RootState) => state.theme);

  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
