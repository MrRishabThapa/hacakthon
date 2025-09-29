import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Navbar from "./Navbar";
import Footer from "./footer";

export default function Layout() {
  const { mode } = useSelector((state: RootState) => state.theme);

  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
