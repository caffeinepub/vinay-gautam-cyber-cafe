import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import type { WithdrawalStatus } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

function paise2rupees(paise: bigint): string {
  const r = Number(paise) / 100;
  return r.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function statusColor(s: WithdrawalStatus): string {
  if (s === "approved") return "bg-green-900/60 text-green-400";
  if (s === "rejected") return "bg-red-900/60 text-red-400";
  return "bg-yellow-900/60 text-yellow-400";
}

export default function ReferralWalletSection() {
  const { identity } = useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const { actor, isFetching } = useActor();
  const qc = useQueryClient();

  const principal = identity?.getPrincipal().toString() ?? "";
  const referralCode = principal ? principal.slice(0, 8).toUpperCase() : "";
  const referralLink = `${window.location.origin}?ref=${referralCode}`;

  const [copied, setCopied] = useState(false);
  const [refCodeInput, setRefCodeInput] = useState("");
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdraw, setWithdraw] = useState({
    name: "",
    account: "",
    ifsc: "",
    amount: "",
  });

  // Check if caller is admin using isCallerAdmin (returns boolean, no throw for unregistered users)
  const roleQuery = useQuery({
    queryKey: ["isCallerAdmin", principal],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: isLoggedIn && !!actor && !isFetching,
  });

  const isAdmin = roleQuery.data === true;

  // Wallet query
  const walletQuery = useQuery({
    queryKey: ["wallet", principal],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getWallet();
    },
    enabled: isAdmin && !!actor && !isFetching,
  });

  // My withdrawal requests
  const withdrawalsQuery = useQuery({
    queryKey: ["myWithdrawals", principal],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyWithdrawalRequests();
    },
    enabled: isAdmin && !!actor && !isFetching,
  });

  // Register referral code mutation
  const registerRefMutation = useMutation({
    mutationFn: async (code: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerWithReferralCode(code);
    },
    onSuccess: () => {
      toast.success("Referral code applied! Cashback added to your wallet.");
      qc.invalidateQueries({ queryKey: ["wallet"] });
      setRefCodeInput("");
    },
    onError: () => toast.error("Invalid or already-used referral code."),
  });

  // Withdrawal mutation
  const withdrawMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const amountRs = Number.parseFloat(withdraw.amount);
      if (Number.isNaN(amountRs) || amountRs <= 0)
        throw new Error("Koi bhi amount enter karein");
      const amountPaise = BigInt(Math.round(amountRs * 100));
      return actor.submitWithdrawalRequest(
        amountPaise,
        withdraw.account,
        withdraw.ifsc,
        withdraw.name,
      );
    },
    onSuccess: () => {
      toast.success(
        "Withdrawal request submit ho gaya! 1 minute mein bank account mein credit ho jaega.",
      );
      setWithdrawOpen(false);
      setWithdraw({ name: "", account: "", ifsc: "", amount: "" });
      qc.invalidateQueries({ queryKey: ["myWithdrawals"] });
      qc.invalidateQueries({ queryKey: ["wallet"] });
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to submit request."),
  });

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({ title: "Join justdovinay", url: referralLink });
    } else {
      navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied!");
    }
  };

  // Only show to logged-in admin users
  if (!isLoggedIn) return null;
  if (roleQuery.isLoading) return null;
  if (!isAdmin) return null;

  const wallet = walletQuery.data;

  return (
    <section id="wallet" className="py-10 px-4 bg-muted">
      <div className="max-w-4xl mx-auto">
        <div className="border-4 border-primary rounded-2xl bg-card p-6 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              👛 Owner Wallet & Referral Program
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Admin only — view wallet balance, referral code, and manage
              withdrawals.
            </p>
          </div>

          <div className="space-y-6">
            {/* Wallet balance cards */}
            {walletQuery.isLoading ? (
              <div
                data-ocid="wallet.loading_state"
                className="text-center py-8 text-primary"
              >
                Loading wallet...
              </div>
            ) : wallet ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Balance",
                    value: `₹${paise2rupees(wallet.balance)}`,
                    color: "text-primary",
                  },
                  {
                    label: "Total Earned",
                    value: `₹${paise2rupees(wallet.totalEarned)}`,
                    color: "text-green-400",
                  },
                  {
                    label: "Withdrawn",
                    value: `₹${paise2rupees(wallet.totalWithdrawn)}`,
                    color: "text-purple-400",
                  },
                  {
                    label: "Referrals",
                    value: String(wallet.referralCount),
                    color: "text-amber-400",
                  },
                ].map((card, i) => (
                  <div
                    key={card.label}
                    data-ocid={`wallet.card.${i + 1}`}
                    className="bg-muted rounded-xl p-4 text-center border border-border shadow-sm"
                  >
                    <p className="text-xs text-muted-foreground mb-1">
                      {card.label}
                    </p>
                    <p className={`text-xl font-bold ${card.color}`}>
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Referral code */}
            <div className="bg-muted rounded-xl p-4 border border-border">
              <p className="text-sm font-semibold text-foreground mb-3">
                🎁 Your Referral Code
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex-1 min-w-0 bg-background border border-border rounded-lg px-4 py-2">
                  <span className="font-mono font-bold text-primary text-lg tracking-widest">
                    {referralCode}
                  </span>
                </div>
                <Button
                  data-ocid="wallet.secondary_button"
                  variant="outline"
                  onClick={copyCode}
                  className="border-border text-foreground"
                >
                  {copied ? "Copied!" : "Copy Code"}
                </Button>
                <Button
                  data-ocid="wallet.toggle"
                  onClick={shareLink}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Share Link
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Friends who use your code get cashback — you earn commission!
              </p>
            </div>

            {/* Apply referral code */}
            <div className="bg-muted rounded-xl p-4 border border-border">
              <p className="text-sm font-semibold text-foreground mb-3">
                🏷️ Apply a Referral Code
              </p>
              <div className="flex gap-3">
                <Input
                  data-ocid="wallet.input"
                  placeholder="Enter referral code"
                  value={refCodeInput}
                  onChange={(e) => setRefCodeInput(e.target.value)}
                  className="flex-1"
                />
                <Button
                  data-ocid="wallet.submit_button"
                  onClick={() => registerRefMutation.mutate(refCodeInput)}
                  disabled={!refCodeInput || registerRefMutation.isPending}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {registerRefMutation.isPending ? "Applying..." : "Apply"}
                </Button>
              </div>
            </div>

            {/* Withdraw */}
            <div className="bg-muted rounded-xl p-4 border border-border flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">
                  💸 Withdraw to Bank
                </p>
                <p className="text-xs text-muted-foreground">
                  Koi bhi amount · 1 minute mein bank account mein credit
                </p>
              </div>
              <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
                <DialogTrigger asChild>
                  <Button
                    data-ocid="wallet.open_modal_button"
                    className="bg-purple-700 hover:bg-purple-600 text-white"
                  >
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent data-ocid="wallet.dialog">
                  <DialogHeader>
                    <DialogTitle>Withdraw to Bank Account</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 pt-2">
                    <div>
                      <Label>Account Holder Name</Label>
                      <Input
                        data-ocid="wallet.textarea"
                        value={withdraw.name}
                        onChange={(e) =>
                          setWithdraw((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="As per bank records"
                      />
                    </div>
                    <div>
                      <Label>Bank Account Number</Label>
                      <Input
                        value={withdraw.account}
                        onChange={(e) =>
                          setWithdraw((p) => ({
                            ...p,
                            account: e.target.value,
                          }))
                        }
                        placeholder="Account number"
                      />
                    </div>
                    <div>
                      <Label>IFSC Code</Label>
                      <Input
                        value={withdraw.ifsc}
                        onChange={(e) =>
                          setWithdraw((p) => ({
                            ...p,
                            ifsc: e.target.value.toUpperCase(),
                          }))
                        }
                        placeholder="e.g. SBIN0001234"
                      />
                    </div>
                    <div>
                      <Label>Amount (₹) — Koi bhi amount</Label>
                      <Input
                        type="number"
                        value={withdraw.amount}
                        onChange={(e) =>
                          setWithdraw((p) => ({
                            ...p,
                            amount: e.target.value,
                          }))
                        }
                        placeholder="Koi bhi amount"
                        min="1"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button
                        data-ocid="wallet.cancel_button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setWithdrawOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        data-ocid="wallet.confirm_button"
                        className="flex-1 bg-purple-700 hover:bg-purple-600 text-white"
                        onClick={() => withdrawMutation.mutate()}
                        disabled={withdrawMutation.isPending}
                      >
                        {withdrawMutation.isPending
                          ? "Submitting..."
                          : "Submit Request"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* My withdrawal requests */}
            <div className="bg-muted rounded-xl p-4 border border-border">
              <p className="text-sm font-semibold text-foreground mb-3">
                📋 My Withdrawal Requests
              </p>
              {withdrawalsQuery.isLoading ? (
                <div
                  data-ocid="wallet.loading_state"
                  className="text-sm text-muted-foreground"
                >
                  Loading...
                </div>
              ) : !withdrawalsQuery.data?.length ? (
                <div
                  data-ocid="wallet.empty_state"
                  className="text-sm text-muted-foreground text-center py-4"
                >
                  No withdrawal requests yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {withdrawalsQuery.data.map((req, i) => (
                    <div
                      key={String(req.id)}
                      data-ocid={`wallet.item.${i + 1}`}
                      className="flex items-center justify-between text-sm border border-border rounded-lg p-3"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          ₹{paise2rupees(req.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {req.accountHolderName} ·{" "}
                          {req.bankAccountNumber
                            .slice(-4)
                            .padStart(req.bankAccountNumber.length, "*")}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor(req.status)}`}
                      >
                        {req.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
