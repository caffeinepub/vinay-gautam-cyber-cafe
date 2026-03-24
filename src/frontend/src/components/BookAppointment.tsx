import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarCheck, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { AppointmentStatus } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAllServices, useBookAppointment } from "../hooks/useQueries";

const SERVICE_NAMES = [
  "Aadhaar Enrollment",
  "Aadhaar Update",
  "PAN Card New",
  "PAN Card Correction",
  "ITR Filing",
  "Voter ID",
  "Passport Application",
  "Driving Licence",
  "Caste Certificate",
  "Birth Certificate",
  "MSME/Udyam Certificate",
  "Bank Account Opening",
  "PM Kisan Registration",
  "PM Awas Yojana",
  "Ayushman Bharat Card",
  "PMKVY Registration",
  "E-Shram Card",
  "GST Registration",
  "DigiLocker Help",
  "Print / Scan / Lamination",
  "Digital Signature",
  "Other",
];

export default function BookAppointment() {
  const { data: services } = useAllServices();
  const { identity } = useInternetIdentity();
  const bookMutation = useBookAppointment();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions =
    services && services.length > 0
      ? services.map((s) => s.title)
      : SERVICE_NAMES;

  const update = (k: keyof typeof form, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service || !form.date) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const principal = identity?.getPrincipal();
    if (!principal) {
      toast.error("Please log in to book an appointment.");
      return;
    }

    const serviceId =
      services?.find((s) => s.title === form.service)?.id ?? BigInt(0);
    const preferredDate =
      BigInt(new Date(form.date).getTime()) * BigInt(1_000_000);

    try {
      await bookMutation.mutateAsync({
        id: BigInt(0),
        name: form.name,
        phone: form.phone,
        email: form.email,
        serviceId,
        preferredDate,
        status: AppointmentStatus.pending,
        bookedBy: principal,
        createdAt: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setSubmitted(true);
      toast.success("Appointment booked successfully!");
    } catch {
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  return (
    <section id="book" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-3"
            >
              Book an Appointment
            </motion.h2>
            <p className="text-white/70 text-base">
              Fill in the form below and we'll confirm your slot within 2 hours.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 border border-white/20 rounded-2xl p-12 text-center"
              data-ocid="book.success_state"
            >
              <CheckCircle
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: "oklch(0.52 0.14 145)" }}
              />
              <h3 className="text-2xl font-bold text-white mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-white/70 mb-6">
                We'll contact you at {form.phone} to confirm your appointment.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    phone: "",
                    email: "",
                    service: "",
                    date: "",
                    message: "",
                  });
                }}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Book Another
              </Button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 space-y-5"
              data-ocid="book.modal"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="book-name"
                    className="text-white/90 font-medium"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="book-name"
                    placeholder="Ramesh Kumar"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-accent"
                    data-ocid="book.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="book-phone"
                    className="text-white/90 font-medium"
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="book-phone"
                    placeholder="+91 83848 21357"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-accent"
                    data-ocid="book.input"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="book-email"
                  className="text-white/90 font-medium"
                >
                  Email Address
                </Label>
                <Input
                  id="book-email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-accent"
                  data-ocid="book.input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-white/90 font-medium">
                    Service Required *
                  </Label>
                  <Select onValueChange={(v) => update("service", v)}>
                    <SelectTrigger
                      className="bg-white/10 border-white/30 text-white focus:border-accent"
                      data-ocid="book.select"
                    >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceOptions.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="book-date"
                    className="text-white/90 font-medium"
                  >
                    Preferred Date *
                  </Label>
                  <Input
                    id="book-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-white/10 border-white/30 text-white focus:border-accent"
                    data-ocid="book.input"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="book-msg" className="text-white/90 font-medium">
                  Message / Notes
                </Label>
                <Textarea
                  id="book-msg"
                  placeholder="Any additional information..."
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={3}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-accent resize-none"
                  data-ocid="book.textarea"
                />
              </div>

              {!identity && (
                <p className="text-yellow-300 text-xs">
                  ⚠️ You must log in (Internet Identity) to submit a booking.
                </p>
              )}

              <Button
                type="submit"
                disabled={bookMutation.isPending || !identity}
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 text-base"
                data-ocid="book.submit_button"
              >
                {bookMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Booking...
                  </>
                ) : (
                  <>
                    <CalendarCheck className="w-4 h-4 mr-2" /> Confirm
                    Appointment
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
