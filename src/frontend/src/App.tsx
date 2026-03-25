import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";

import AadhaarPanSection from "./components/AadhaarPanSection";
import BookingModal from "./components/BookingModal";
import ContactSection from "./components/ContactSection";
import DocumentApplyEarnSection from "./components/DocumentApplyEarnSection";
import DownloadDocumentsSection from "./components/DownloadDocumentsSection";
import ESathiSection from "./components/ESathiSection";
import FinanceBankSection from "./components/FinanceBankSection";
import Footer from "./components/Footer";
import GovtSchemesSection from "./components/GovtSchemesSection";
import HeroSection from "./components/HeroSection";
import MessagesSection from "./components/MessagesSection";
import Navbar from "./components/Navbar";
import NotificationTickerBar from "./components/NotificationTickerBar";
import SearchBar from "./components/SearchBar";
import ServicesAidBar from "./components/ServicesAidBar";
import SloganBanner from "./components/SloganBanner";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function App() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState("");

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
    if (outcome === "accepted") setInstallPrompt(null);
  };

  const openBooking = (service: string) => {
    setBookingService(service);
    setBookingOpen(true);
  };

  const showInstallBanner = !!installPrompt && !bannerDismissed;

  return (
    <>
      <Toaster position="top-right" richColors />

      {/* Page layout */}
      <div className="min-h-screen flex flex-col">
        <NotificationTickerBar />
        <SloganBanner />
        <SearchBar />
        <Navbar />
        <ServicesAidBar />

        <main className="flex-1">
          <HeroSection />
          <DownloadDocumentsSection />
          <GovtSchemesSection />
          <DocumentApplyEarnSection />
          <AadhaarPanSection onBook={openBooking} />
          <FinanceBankSection />
          <ESathiSection onBook={openBooking} />
          <MessagesSection />
          <ContactSection
            onInstall={handleInstall}
            canInstall={!!installPrompt}
          />
        </main>

        <Footer />
      </div>

      {/* Booking modal */}
      <BookingModal
        open={bookingOpen}
        defaultService={bookingService}
        onClose={() => setBookingOpen(false)}
      />

      {/* PWA install banner */}
      {showInstallBanner && (
        <div
          data-ocid="pwa.panel"
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-3 bg-green-700 px-4 py-3 shadow-lg"
        >
          <div className="flex items-center gap-2 text-white">
            <Download className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">
              Install <strong>justdovinay</strong> App on your phone for quick
              access!
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              data-ocid="pwa.primary_button"
              size="sm"
              onClick={handleInstall}
              className="bg-white text-green-700 hover:bg-green-50 font-semibold"
            >
              Install
            </Button>
            <button
              type="button"
              data-ocid="pwa.close_button"
              onClick={() => setBannerDismissed(true)}
              aria-label="Dismiss"
              className="text-white/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
