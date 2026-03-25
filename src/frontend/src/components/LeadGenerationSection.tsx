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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const SERVICE_OPTIONS = [
  "Aadhaar",
  "PAN Card",
  "Voter ID",
  "Passport",
  "Driving Licence",
  "Caste Certificate",
  "Birth Certificate",
  "Income Certificate",
  "Bank Account",
  "Loan Services",
  "Insurance",
  "Other",
];

export default function LeadGenerationSection() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceInterest, setServiceInterest] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !serviceInterest) {
      toast.error("Kripya naam, phone aur service interest zaroor bharen.");
      return;
    }
    if (phone.trim().length < 10) {
      toast.error("Sahi phone number dalein (10 digits).");
      return;
    }
    if (!actor) {
      toast.error(
        "Backend se connect nahi ho paya. Thodi der baad try karein.",
      );
      return;
    }
    setIsSubmitting(true);
    try {
      await actor.submitLead(
        name.trim(),
        phone.trim(),
        email.trim(),
        serviceInterest,
        message.trim(),
      );
      toast.success(
        "Aapka form successfully submit ho gaya! Hum aapse jald hi sampark karenge. 🎉",
      );
      setName("");
      setPhone("");
      setEmail("");
      setServiceInterest("");
      setMessage("");
    } catch {
      toast.error("Form submit nahi hua. Dobara try karein.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="earn-lead" className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header banner */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-1 shadow-xl">
          <div className="bg-white rounded-xl overflow-hidden">
            {/* Top banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-center">
              <div className="text-4xl mb-2">📋</div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow">
                Service Ke Liye Enquiry Karein
              </h2>
              <p className="text-white/90 mt-2 text-sm md:text-base">
                Aapko kisi bhi sarkari ya banking service ki zaroorat hai?
                Neeche form bharen — hum aapse{" "}
                <span className="font-bold text-yellow-200">jald sampark</span>{" "}
                karenge!
              </p>
              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/40">
                  ✅ 100% Free Enquiry
                </span>
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/40">
                  ⚡ Quick Response
                </span>
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/40">
                  🔒 Secure
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="lead-name"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Aapka Naam <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lead-name"
                    data-ocid="lead.input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="जैसे: Ramesh Kumar"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lead-phone"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lead-phone"
                    type="tel"
                    data-ocid="lead.input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10 digit mobile number"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="lead-email"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Email (Optional)
                  </Label>
                  <Input
                    id="lead-email"
                    type="email"
                    data-ocid="lead.input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aapka@email.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700">
                    Service Interest <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={serviceInterest}
                    onValueChange={setServiceInterest}
                  >
                    <SelectTrigger data-ocid="lead.select" className="mt-1">
                      <SelectValue placeholder="Kaunsi service chahiye?" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="lead-message"
                  className="text-sm font-semibold text-gray-700"
                >
                  Message / Query (Optional)
                </Label>
                <Textarea
                  id="lead-message"
                  data-ocid="lead.textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Koi bhi sawaal ya zaroorat yahan likhein..."
                  rows={3}
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                data-ocid="lead.submit_button"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base py-3 h-auto shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submit ho
                    raha hai...
                  </>
                ) : (
                  "📨 Enquiry Submit Karein"
                )}
              </Button>

              <p className="text-center text-xs text-gray-400">
                * Form submit hone ke baad hum aapko call ya message karenge aur
                aapki zaroorat ki service mein poori madad karenge.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
