import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ALL_SEARCHABLE } from "@/data/services";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  defaultService?: string;
  onClose: () => void;
}

const ALL_SERVICE_NAMES = [...new Set(ALL_SEARCHABLE.map((s) => s.name))];

export default function BookingModal({ open, defaultService, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService ?? "");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setService(defaultService ?? "");
    setDate("");
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent data-ocid="booking.dialog" className="max-w-md">
        {submitted ? (
          <div data-ocid="booking.success_state" className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-700 mb-2">
              Booking Confirmed!
            </h3>
            <p className="text-muted-foreground mb-1">
              Thank you, <strong>{name}</strong>!
            </p>
            <p className="text-muted-foreground mb-4">
              We'll contact you at <strong>{phone}</strong> to confirm your
              appointment for <strong>{service}</strong>.
            </p>
            <p className="text-sm text-green-700 font-medium">
              📞 Vinay Gautam: 8384821357
            </p>
            <Button
              onClick={handleClose}
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-green-700">
                📋 Book Appointment
              </DialogTitle>
              <DialogDescription>
                Fill in your details and we'll get it done!
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-1">
                <Label htmlFor="book-name">Full Name *</Label>
                <Input
                  id="book-name"
                  data-ocid="booking.input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="book-phone">Mobile Number *</Label>
                <Input
                  id="book-phone"
                  data-ocid="booking.input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label>Service Required *</Label>
                <Select value={service} onValueChange={setService} required>
                  <SelectTrigger data-ocid="booking.select">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {ALL_SERVICE_NAMES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="book-date">Preferred Date</Label>
                <Input
                  id="book-date"
                  data-ocid="booking.input"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="book-message">Additional Message</Label>
                <Textarea
                  id="book-message"
                  data-ocid="booking.textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Any specific requirements..."
                  rows={3}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  data-ocid="booking.submit_button"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!name || !phone || !service}
                >
                  Book Appointment
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  data-ocid="booking.cancel_button"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
