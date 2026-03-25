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
  if (s === "approved") return "bg-green-100 text-green-700";
  if (s === "rejected") return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
}

export default function ReferralWalletSection() {
  const { identity, login, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const { actor, isFetching } = useActor();
  const qc = useQueryClient();

  const principal = identity?.getPrincipal().toString() ?? "";
  // Derive a short referral code from principal
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

  // Wallet query
  const walletQuery = useQuery({
    queryKey: ["wallet", principal],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getWallet();
    },
    enabled: isLoggedIn && !!actor && !isFetching,
  });

  // My withdrawal requests
  const withdrawalsQuery = useQuery({
    queryKey: ["myWithdrawals", principal],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyWithdrawalRequests();
    },
    enabled: isLoggedIn && !!actor && !isFetching,
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
      if (Number.isNaN(amountRs) || amountRs < 100)
        throw new Error("Minimum ₹100");
      const amountPaise = BigInt(Math.round(amountRs * 100));
      return actor.submitWithdrawalRequest(
        amountPaise,
        withdraw.account,
        withdraw.ifsc,
        withdraw.name,
      );
    },
    onSuccess: () => {
      toast.success("Withdrawal request submitted! We'll process it soon.");
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

  const wallet = walletQuery.data;

  return (
    <section id="wallet" className="py-10 px-4 bg-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="border-4 border-blue-400 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-6 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
              👛 My Wallet & Referral Program
            </h2>
            <p className="text-blue-700 text-sm md:text-base">
              Refer friends, earn cashback, and withdraw anytime to your bank
              account.
            </p>
          </div>

          {!isLoggedIn ? (
            <div
              data-ocid="wallet.panel"
              className="text-center bg-white rounded-xl p-8 border border-blue-200 shadow-sm"
            >
              <div className="text-5xl mb-4">🔐</div>
              <p className="text-gray-700 font-medium mb-4">
                Login to access your wallet and referral code
              </p>
              <Button
                data-ocid="wallet.primary_button"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                {isLoggingIn ? "Logging in..." : "Login to Wallet"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Wallet balance cards */}
              {walletQuery.isLoading ? (
                <div
                  data-ocid="wallet.loading_state"
                  className="text-center py-8 text-blue-600"
                >
                  Loading wallet...
                </div>
              ) : wallet ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Balance",
                      value: `₹${paise2rupees(wallet.balance)}`,
                      color: "text-blue-700",
                    },
                    {
                      label: "Total Earned",
                      value: `₹${paise2rupees(wallet.totalEarned)}`,
                      color: "text-green-700",
                    },
                    {
                      label: "Withdrawn",
                      value: `₹${paise2rupees(wallet.totalWithdrawn)}`,
                      color: "text-purple-700",
                    },
                    {
                      label: "Referrals",
                      value: String(wallet.referralCount),
                      color: "text-orange-700",
                    },
                  ].map((card, i) => (
                    <div
                      key={card.label}
                      data-ocid={`wallet.card.${i + 1}`}
                      className="bg-white rounded-xl p-4 text-center border border-blue-200 shadow-sm"
                    >
                      <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                      <p className={`text-xl font-bold ${card.color}`}>
                        {card.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Referral code */}
              <div className="bg-white rounded-xl p-4 border border-blue-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  🎁 Your Referral Code
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="flex-1 min-w-0 bg-blue-50 border border-blue-300 rounded-lg px-4 py-2">
                    <span className="font-mono font-bold text-blue-700 text-lg tracking-widest">
                      {referralCode}
                    </span>
                  </div>
                  <Button
                    data-ocid="wallet.secondary_button"
                    variant="outline"
                    onClick={copyCode}
                    className="border-blue-400 text-blue-700"
                  >
                    {copied ? "Copied!" : "Copy Code"}
                  </Button>
                  <Button
                    data-ocid="wallet.toggle"
                    onClick={shareLink}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Share Link
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Friends who use your code get cashback — you earn commission!
                </p>
              </div>

              {/* Apply referral code */}
              <div className="bg-white rounded-xl p-4 border border-blue-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">
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
              <div className="bg-white rounded-xl p-4 border border-blue-200 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">
                    💸 Withdraw to Bank
                  </p>
                  <p className="text-xs text-gray-500">
                    Minimum ₹100 · Processed within 2-3 working days
                  </p>
                </div>
                <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
                  <DialogTrigger asChild>
                    <Button
                      data-ocid="wallet.open_modal_button"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
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
                        <Label>Amount (₹) — Minimum ₹100</Label>
                        <Input
                          type="number"
                          value={withdraw.amount}
                          onChange={(e) =>
                            setWithdraw((p) => ({
                              ...p,
                              amount: e.target.value,
                            }))
                          }
                          placeholder="100"
                          min="100"
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
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
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
              <div className="bg-white rounded-xl p-4 border border-blue-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  📋 My Withdrawal Requests
                </p>
                {withdrawalsQuery.isLoading ? (
                  <div
                    data-ocid="wallet.loading_state"
                    className="text-sm text-gray-400"
                  >
                    Loading...
                  </div>
                ) : !withdrawalsQuery.data?.length ? (
                  <div
                    data-ocid="wallet.empty_state"
                    className="text-sm text-gray-400 text-center py-4"
                  >
                    No withdrawal requests yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {withdrawalsQuery.data.map((req, i) => (
                      <div
                        key={String(req.id)}
                        data-ocid={`wallet.item.${i + 1}`}
                        className="flex items-center justify-between text-sm border border-gray-100 rounded-lg p-3"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            ₹{paise2rupees(req.amount)}
                          </p>
                          <p className="text-xs text-gray-500">
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
          )}
        </div>
      </div>
    </section>
  );
}
