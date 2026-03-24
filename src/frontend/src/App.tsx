import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

export default function App() {
  const [view, setView] = useState<"home" | "admin">("home");

  return (
    <>
      <Toaster position="top-right" richColors />
      {view === "home" ? (
        <HomePage onGoAdmin={() => setView("admin")} />
      ) : (
        <AdminPage onBack={() => setView("home")} />
      )}
    </>
  );
}
