import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function App() {
  const [view, setView] = useState<"home" | "admin">("home");
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  const showBanner = !!installPrompt && !dismissed;

  return (
    <>
      <Toaster position="top-right" richColors />
      {view === "home" ? (
        <HomePage onGoAdmin={() => setView("admin")} />
      ) : (
        <AdminPage onBack={() => setView("home")} />
      )}

      {showBanner && (
        <div
          data-ocid="pwa.panel"
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-3 bg-blue-700 px-4 py-3 shadow-lg"
        >
          <div className="flex items-center gap-2 text-white">
            <Download className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">
              Install <strong>justdovinay</strong> App on your phone
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              data-ocid="pwa.primary_button"
              size="sm"
              onClick={handleInstall}
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold"
            >
              Install
            </Button>
            <button
              type="button"
              data-ocid="pwa.close_button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss install banner"
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
