import AadhaarPanSection from "../components/AadhaarPanSection";
import ApplyOnlineSection from "../components/ApplyOnlineSection";
import BookAppointment from "../components/BookAppointment";
import ContactSection from "../components/ContactSection";
import DownloadsSection from "../components/DownloadsSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import SchemesSection from "../components/SchemesSection";
import ScrollToTop from "../components/ScrollToTop";
import ServicesSection from "../components/ServicesSection";
import UpdatesSection from "../components/UpdatesSection";
import WhyChooseUs from "../components/WhyChooseUs";

interface Props {
  onGoAdmin: () => void;
}

export default function HomePage({ onGoAdmin }: Props) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onGoAdmin={onGoAdmin} onScrollTo={scrollTo} />
      <main>
        <HeroSection onScrollTo={scrollTo} />
        <ServicesSection />
        <DownloadsSection />
        <ApplyOnlineSection />
        <AadhaarPanSection />
        <SchemesSection />
        <WhyChooseUs />
        <UpdatesSection />
        <BookAppointment />
        <ContactSection />
      </main>
      <Footer onScrollTo={scrollTo} />
      <ScrollToTop />
    </div>
  );
}
