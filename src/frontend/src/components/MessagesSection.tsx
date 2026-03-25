import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MessageSquare, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

function StarSelector({
  value,
  onChange,
}: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          data-ocid={`review.toggle.${star}`}
          onClick={() => onChange(star)}
          className={`transition-colors ${
            star <= value ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          <Star
            className="h-7 w-7"
            fill={star <= value ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

export default function MessagesSection() {
  const { actor } = useActor();

  // Message form
  const [msgName, setMsgName] = useState("");
  const [msgPhone, setMsgPhone] = useState("");
  const [msgEmail, setMsgEmail] = useState("");
  const [msgText, setMsgText] = useState("");
  const [msgSubmitting, setMsgSubmitting] = useState(false);

  // Review form
  const [revName, setRevName] = useState("");
  const [revRating, setRevRating] = useState(5);
  const [revText, setRevText] = useState("");
  const [revSubmitting, setRevSubmitting] = useState(false);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgName.trim() || !msgPhone.trim() || !msgText.trim()) {
      toast.error("Kripya naam, phone aur message zaroor bharen.");
      return;
    }
    if (!actor) {
      toast.error("Backend se connect nahi ho paya.");
      return;
    }
    setMsgSubmitting(true);
    try {
      await actor.submitMessage(
        msgName.trim(),
        msgPhone.trim(),
        msgEmail.trim(),
        msgText.trim(),
      );
      toast.success(
        "Aapka message bhej diya gaya! Hum jald hi contact karenge. 📨",
      );
      setMsgName("");
      setMsgPhone("");
      setMsgEmail("");
      setMsgText("");
    } catch {
      toast.error("Message nahi bhej paaye. Dobara try karein.");
    } finally {
      setMsgSubmitting(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revText.trim()) {
      toast.error("Kripya naam aur review zaroor likhein.");
      return;
    }
    if (!actor) {
      toast.error("Backend se connect nahi ho paya.");
      return;
    }
    setRevSubmitting(true);
    try {
      await actor.submitReview(
        revName.trim(),
        BigInt(revRating),
        revText.trim(),
      );
      toast.success(
        "Review submit ho gaya! Admin approval ke baad dikhai dega. ⭐",
      );
      setRevName("");
      setRevRating(5);
      setRevText("");
    } catch {
      toast.error("Review submit nahi hua. Dobara try karein.");
    } finally {
      setRevSubmitting(false);
    }
  };

  return (
    <section id="contact-us" className="py-12 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
            💬 Hamse Baat Karo
          </h2>
          <p className="text-gray-500 mt-2">
            Koi sawaal hai? Message bhejein — hum jald reply karenge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Message Form */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-blue-600 px-5 py-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-white" />
              <h3 className="font-bold text-white">Message / Query Bhejein</h3>
            </div>
            <form onSubmit={handleMessageSubmit} className="p-5 space-y-4">
              <div>
                <Label htmlFor="msg-name" className="text-sm font-semibold">
                  Aapka Naam <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="msg-name"
                  data-ocid="message.input"
                  value={msgName}
                  onChange={(e) => setMsgName(e.target.value)}
                  placeholder="Apna naam likhein"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="msg-phone" className="text-sm font-semibold">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="msg-phone"
                  type="tel"
                  data-ocid="message.input"
                  value={msgPhone}
                  onChange={(e) => setMsgPhone(e.target.value)}
                  placeholder="Mobile number"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="msg-email" className="text-sm font-semibold">
                  Email (Optional)
                </Label>
                <Input
                  id="msg-email"
                  type="email"
                  data-ocid="message.input"
                  value={msgEmail}
                  onChange={(e) => setMsgEmail(e.target.value)}
                  placeholder="aapka@email.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="msg-text" className="text-sm font-semibold">
                  Aapka Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="msg-text"
                  data-ocid="message.textarea"
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  placeholder="Apna sawaal ya zaroorat yahan likhein..."
                  rows={4}
                  className="mt-1"
                  required
                />
              </div>
              <Button
                type="submit"
                data-ocid="message.submit_button"
                disabled={msgSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {msgSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Bhej rahe
                    hain...
                  </>
                ) : (
                  "📤 Message Bhejein"
                )}
              </Button>
            </form>
          </div>

          {/* Review Form */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-yellow-500 px-5 py-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-white" fill="white" />
              <h3 className="font-bold text-white">Review Dijiye</h3>
            </div>
            <form onSubmit={handleReviewSubmit} className="p-5 space-y-4">
              <div>
                <Label htmlFor="rev-name" className="text-sm font-semibold">
                  Aapka Naam <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="rev-name"
                  data-ocid="review.input"
                  value={revName}
                  onChange={(e) => setRevName(e.target.value)}
                  placeholder="Apna naam likhein"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label className="text-sm font-semibold">Rating Dijiye</Label>
                <div className="mt-2">
                  <StarSelector value={revRating} onChange={setRevRating} />
                  <p className="text-xs text-gray-400 mt-1">
                    {revRating}/5 stars selected
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="rev-text" className="text-sm font-semibold">
                  Aapka Review <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="rev-text"
                  data-ocid="review.textarea"
                  value={revText}
                  onChange={(e) => setRevText(e.target.value)}
                  placeholder="Hamari service kaisi lagi? Yahan likhein..."
                  rows={4}
                  className="mt-1"
                  required
                />
              </div>
              <div className="bg-yellow-50 rounded-lg p-3 text-xs text-yellow-800 border border-yellow-200">
                ℹ️ Review submit karne ke baad admin approve karega, phir website
                par dikhega.
              </div>
              <Button
                type="submit"
                data-ocid="review.submit_button"
                disabled={revSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
              >
                {revSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submit ho
                    raha hai...
                  </>
                ) : (
                  "⭐ Review Submit Karein"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
