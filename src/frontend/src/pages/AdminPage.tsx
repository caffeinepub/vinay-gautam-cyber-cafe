import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import type {
  CustomerMessage,
  CustomerReview,
  LeadSubmission,
  WithdrawalStatus,
} from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

function paise2rupees(paise: bigint): string {
  const r = Number(paise) / 100;
  return r.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function truncate(s: string, n = 14): string {
  return s.length > n ? `${s.slice(0, n)}...` : s;
}

function statusBadge(status: WithdrawalStatus) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[status] ?? ""}`}
    >
      {status.toUpperCase()}
    </span>
  );
}

function StarDisplay({ rating }: { rating: bigint }) {
  const n = Number(rating);
  return (
    <span className="text-yellow-500">
      {Array.from({ length: 5 }, (_, i) => (i < n ? "★" : "☆")).join("")}
    </span>
  );
}

function formatDate(ts: bigint): string {
  try {
    return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN");
  } catch {
    return "-";
  }
}

function MessageCard({
  msg,
  onReply,
}: {
  msg: CustomerMessage;
  onReply: (id: bigint, text: string) => Promise<void>;
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setReplying(true);
    try {
      await onReply(msg.id, replyText.trim());
      setReplyOpen(false);
      setReplyText("");
    } finally {
      setReplying(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-gray-800">{msg.senderName}</p>
          <p className="text-xs text-gray-400">
            {msg.phone} {msg.email ? `• ${msg.email}` : ""} •{" "}
            {formatDate(msg.createdAt)}
          </p>
        </div>
        {msg.reply ? (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium shrink-0">
            Replied
          </span>
        ) : (
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium shrink-0">
            Pending
          </span>
        )}
      </div>
      <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
        {msg.message}
      </p>
      {msg.reply && (
        <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400">
          <p className="text-xs font-semibold text-blue-600 mb-1">
            Aapka Reply:
          </p>
          <p className="text-sm text-blue-800">{msg.reply}</p>
        </div>
      )}
      {!msg.reply &&
        (replyOpen ? (
          <div className="space-y-2">
            <Textarea
              data-ocid="admin.textarea"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Reply likhein..."
              rows={3}
            />
            <div className="flex gap-2">
              <Button
                data-ocid="admin.confirm_button"
                size="sm"
                onClick={handleReply}
                disabled={replying || !replyText.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
              >
                {replying ? "Bhej rahe..." : "Reply Bhejein"}
              </Button>
              <Button
                data-ocid="admin.cancel_button"
                size="sm"
                variant="ghost"
                onClick={() => setReplyOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            data-ocid="admin.secondary_button"
            size="sm"
            variant="outline"
            onClick={() => setReplyOpen(true)}
            className="text-xs"
          >
            💬 Reply Karein
          </Button>
        ))}
    </div>
  );
}

export default function AdminPage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const { actor, isFetching } = useActor();
  const qc = useQueryClient();

  // Commission form state
  const [commSource, setCommSource] = useState("");
  const [commAmount, setCommAmount] = useState("");
  const [commDesc, setCommDesc] = useState("");

  // Queries
  const withdrawalsQuery = useQuery({
    queryKey: ["allWithdrawals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWithdrawalRequests();
    },
    enabled: isLoggedIn && !!actor && !isFetching,
  });

  const commLogsQuery = useQuery({
    queryKey: ["commissionLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCommissionLogs();
    },
    enabled: isLoggedIn && !!actor && !isFetching,
  });

  const totalCommQuery = useQuery({
    queryKey: ["totalCommission"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getTotalCommission();
    },
    enabled: isLoggedIn && !!actor && !isFetching,
  });

  const leadsQuery = useQuery<LeadSubmission[]>({
    queryKey: ["allLeads"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLeadSubmissions();
    },
    enabled: isLoggedIn && !!actor && !isFetching,
  });

  const messagesQuery = useQuery<CustomerMessage[]>({
    queryKey: ["allMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMessages();
    },
    enabled: isLoggedIn && !!actor && !isFetching,
  });

  const reviewsQuery = useQuery<CustomerReview[]>({
    queryKey: ["allReviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReviews();
    },
    enabled: isLoggedIn && !!actor && !isFetching,
  });

  const walletQuery = useQuery({
    queryKey: ["adminWallet"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getWallet();
    },
    enabled: isLoggedIn && !!actor && !isFetching,
  });

  // Mutations
  const updateWithdrawalMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: bigint; status: WithdrawalStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateWithdrawalRequest(id, status);
    },
    onSuccess: () => {
      toast.success("Withdrawal status updated.");
      qc.invalidateQueries({ queryKey: ["allWithdrawals"] });
    },
    onError: () => toast.error("Failed to update withdrawal."),
  });

  const logCommissionMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const amountRs = Number.parseFloat(commAmount);
      if (Number.isNaN(amountRs) || amountRs <= 0)
        throw new Error("Invalid amount");
      const amountPaise = BigInt(Math.round(amountRs * 100));
      return actor.logCommission(amountPaise, commSource, commDesc);
    },
    onSuccess: () => {
      toast.success("Commission logged successfully!");
      setCommSource("");
      setCommAmount("");
      setCommDesc("");
      qc.invalidateQueries({ queryKey: ["commissionLogs"] });
      qc.invalidateQueries({ queryKey: ["totalCommission"] });
    },
    onError: (e: Error) =>
      toast.error(e.message || "Failed to log commission."),
  });

  const approveReviewMutation = useMutation({
    mutationFn: async (reviewId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.approveReview(reviewId);
    },
    onSuccess: () => {
      toast.success("Review approved!");
      qc.invalidateQueries({ queryKey: ["allReviews"] });
      qc.invalidateQueries({ queryKey: ["approvedReviews"] });
    },
    onError: () => toast.error("Failed to approve review."),
  });

  const replyMutation = useMutation({
    mutationFn: async ({ id, text }: { id: bigint; text: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.replyToMessage(id, text);
    },
    onSuccess: () => {
      toast.success("Reply bhej diya gaya!");
      qc.invalidateQueries({ queryKey: ["allMessages"] });
    },
    onError: () => toast.error("Reply bhejne mein error."),
  });

  const handleReply = async (id: bigint, text: string) => {
    await replyMutation.mutateAsync({ id, text });
  };

  const markLeadMutation = useMutation({
    mutationFn: async (leadId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.markLeadRewarded(leadId);
    },
    onSuccess: () => {
      toast.success("Lead rewarded!");
      qc.invalidateQueries({ queryKey: ["allLeads"] });
    },
    onError: () => toast.error("Failed to mark lead."),
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-10 shadow-lg border border-gray-200 max-w-sm w-full">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Admin Panel</h2>
          <p className="text-gray-500 text-sm mb-6">
            Login to access the admin dashboard.
          </p>
          <Button
            data-ocid="admin.primary_button"
            onClick={login}
            disabled={isLoggingIn}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full"
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            🛠️ Admin Dashboard — justdovinay.com
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage withdrawals, commissions, leads, messages, reviews, and
            wallet.
          </p>
        </div>

        <Tabs defaultValue="wallet" data-ocid="admin.tab">
          <TabsList className="mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger value="wallet" data-ocid="admin.tab">
              💰 Wallet
            </TabsTrigger>
            <TabsTrigger value="withdrawals" data-ocid="admin.tab">
              Withdrawals
            </TabsTrigger>
            <TabsTrigger value="commissions" data-ocid="admin.tab">
              Commissions
            </TabsTrigger>
            <TabsTrigger value="leads" data-ocid="admin.tab">
              Leads
            </TabsTrigger>
            <TabsTrigger value="messages" data-ocid="admin.tab">
              Messages
            </TabsTrigger>
            <TabsTrigger value="reviews" data-ocid="admin.tab">
              Reviews
            </TabsTrigger>
          </TabsList>

          {/* ── Wallet Tab ── */}
          <TabsContent value="wallet">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
                <p className="text-sm font-medium opacity-80">
                  Aapka Wallet Balance (Vinay Gautam)
                </p>
                <p className="text-5xl font-bold mt-1">
                  ₹
                  {walletQuery.data
                    ? paise2rupees(walletQuery.data.balance)
                    : "—"}
                </p>
                <p className="text-xs opacity-70 mt-2">
                  Service click par ₹10 · Lead form par ₹25 automatically credit
                  hota hai
                </p>
              </div>

              {walletQuery.isLoading ? (
                <div
                  data-ocid="admin.loading_state"
                  className="p-8 text-center text-gray-400"
                >
                  Loading wallet...
                </div>
              ) : walletQuery.data ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "💰 Balance",
                      value: `₹${paise2rupees(walletQuery.data.balance)}`,
                      bg: "bg-green-50 border-green-200",
                      text: "text-green-700",
                    },
                    {
                      label: "📈 Total Earned",
                      value: `₹${paise2rupees(walletQuery.data.totalEarned)}`,
                      bg: "bg-blue-50 border-blue-200",
                      text: "text-blue-700",
                    },
                    {
                      label: "🏦 Withdrawn",
                      value: `₹${paise2rupees(walletQuery.data.totalWithdrawn)}`,
                      bg: "bg-purple-50 border-purple-200",
                      text: "text-purple-700",
                    },
                    {
                      label: "👥 Referrals",
                      value: String(walletQuery.data.referralCount),
                      bg: "bg-amber-50 border-amber-200",
                      text: "text-amber-700",
                    },
                  ].map((card, i) => (
                    <div
                      key={card.label}
                      data-ocid={`admin.card.${i + 1}`}
                      className={`rounded-xl p-5 text-center border ${card.bg} shadow-sm`}
                    >
                      <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                      <p className={`text-2xl font-bold ${card.text}`}>
                        {card.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  data-ocid="admin.error_state"
                  className="p-8 text-center text-gray-400 bg-white rounded-2xl border border-gray-200"
                >
                  Wallet data load nahi ho saka. Please refresh karein.
                </div>
              )}

              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">
                  ℹ️ Wallet Info
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    ✅ <strong>Service click:</strong> Jab bhi koi visitor koi
                    bhi service link click kare — ₹10 automatically aapke wallet
                    mein credit hota hai
                  </li>
                  <li>
                    ✅ <strong>Lead form:</strong> Jab bhi koi lead generation
                    form bhare — ₹25 aapke wallet mein credit hota hai
                  </li>
                  <li>
                    ✅ <strong>Referral:</strong> Jab koi aapke referral code se
                    join kare — cashback aapke wallet mein aata hai
                  </li>
                  <li>
                    💡 Withdrawal ke liye Home page par Wallet section mein
                    jaayein ya Admin &gt; Withdrawals tab check karein
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* ── Withdrawals Tab ── */}
          <TabsContent value="withdrawals">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">
                  💸 Withdrawal Requests
                </h2>
              </div>
              {withdrawalsQuery.isLoading ? (
                <div
                  data-ocid="admin.loading_state"
                  className="p-8 text-center text-gray-400"
                >
                  Loading...
                </div>
              ) : !withdrawalsQuery.data?.length ? (
                <div
                  data-ocid="admin.empty_state"
                  className="p-8 text-center text-gray-400"
                >
                  No withdrawal requests yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table data-ocid="admin.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Account No.</TableHead>
                        <TableHead>IFSC</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {withdrawalsQuery.data.map((req, i) => (
                        <TableRow
                          key={String(req.id)}
                          data-ocid={`admin.row.${i + 1}`}
                        >
                          <TableCell className="font-mono text-xs">
                            {truncate(req.user.toString())}
                          </TableCell>
                          <TableCell>{req.accountHolderName}</TableCell>
                          <TableCell className="font-mono text-xs">
                            {req.bankAccountNumber}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {req.ifscCode}
                          </TableCell>
                          <TableCell className="font-semibold">
                            ₹{paise2rupees(req.amount)}
                          </TableCell>
                          <TableCell>{statusBadge(req.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {req.status === "pending" && (
                                <>
                                  <Button
                                    data-ocid={`admin.confirm_button.${i + 1}`}
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 text-white text-xs h-7"
                                    onClick={() =>
                                      updateWithdrawalMutation.mutate({
                                        id: req.id,
                                        status: "approved" as WithdrawalStatus,
                                      })
                                    }
                                    disabled={
                                      updateWithdrawalMutation.isPending
                                    }
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    data-ocid={`admin.delete_button.${i + 1}`}
                                    size="sm"
                                    variant="destructive"
                                    className="text-xs h-7"
                                    onClick={() =>
                                      updateWithdrawalMutation.mutate({
                                        id: req.id,
                                        status: "rejected" as WithdrawalStatus,
                                      })
                                    }
                                    disabled={
                                      updateWithdrawalMutation.isPending
                                    }
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ── Commissions Tab ── */}
          <TabsContent value="commissions">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl p-6 text-white shadow-lg">
                <p className="text-sm font-medium opacity-80">
                  Total Commission Earned
                </p>
                <p className="text-4xl font-bold mt-1">
                  ₹
                  {totalCommQuery.data != null
                    ? paise2rupees(totalCommQuery.data)
                    : "—"}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-base font-semibold text-gray-800 mb-4">
                  📝 Log New Commission
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Source / Company Name</Label>
                    <Input
                      data-ocid="admin.input"
                      value={commSource}
                      onChange={(e) => setCommSource(e.target.value)}
                      placeholder="Amazon Associates"
                    />
                  </div>
                  <div>
                    <Label>Amount (₹)</Label>
                    <Input
                      type="number"
                      value={commAmount}
                      onChange={(e) => setCommAmount(e.target.value)}
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      value={commDesc}
                      onChange={(e) => setCommDesc(e.target.value)}
                      placeholder="e.g. Monthly payout Jan 2026"
                    />
                  </div>
                </div>
                <Button
                  data-ocid="admin.submit_button"
                  className="mt-4 bg-amber-500 hover:bg-amber-600 text-white"
                  onClick={() => logCommissionMutation.mutate()}
                  disabled={
                    !commSource ||
                    !commAmount ||
                    logCommissionMutation.isPending
                  }
                >
                  {logCommissionMutation.isPending
                    ? "Logging..."
                    : "Log Commission"}
                </Button>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-base font-semibold text-gray-800">
                    📊 Commission Logs
                  </h3>
                </div>
                {commLogsQuery.isLoading ? (
                  <div
                    data-ocid="admin.loading_state"
                    className="p-8 text-center text-gray-400"
                  >
                    Loading...
                  </div>
                ) : !commLogsQuery.data?.length ? (
                  <div
                    data-ocid="admin.empty_state"
                    className="p-8 text-center text-gray-400"
                  >
                    No commissions logged yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>#</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {commLogsQuery.data.map((log, i) => (
                          <TableRow
                            key={String(log.id)}
                            data-ocid={`admin.row.${i + 1}`}
                          >
                            <TableCell className="text-gray-400 text-xs">
                              {String(log.id)}
                            </TableCell>
                            <TableCell className="font-medium">
                              {log.source}
                            </TableCell>
                            <TableCell className="font-semibold text-green-700">
                              ₹{paise2rupees(log.amount)}
                            </TableCell>
                            <TableCell className="text-gray-500 text-xs">
                              {log.description}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* ── Leads Tab ── */}
          <TabsContent value="leads">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  📋 Lead Submissions
                </h2>
                {leadsQuery.data && (
                  <Badge variant="secondary">
                    {leadsQuery.data.length} total
                  </Badge>
                )}
              </div>
              {leadsQuery.isLoading ? (
                <div
                  data-ocid="admin.loading_state"
                  className="p-8 text-center text-gray-400"
                >
                  Loading...
                </div>
              ) : !leadsQuery.data?.length ? (
                <div
                  data-ocid="admin.empty_state"
                  className="p-8 text-center text-gray-400"
                >
                  No lead submissions yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table data-ocid="admin.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Rewarded</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leadsQuery.data.map((lead, i) => (
                        <TableRow
                          key={String(lead.id)}
                          data-ocid={`admin.row.${i + 1}`}
                        >
                          <TableCell className="font-medium">
                            {lead.name}
                          </TableCell>
                          <TableCell>{lead.phone}</TableCell>
                          <TableCell className="text-xs text-gray-500">
                            {lead.email || "-"}
                          </TableCell>
                          <TableCell>
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                              {lead.serviceInterest}
                            </span>
                          </TableCell>
                          <TableCell className="text-xs text-gray-500 max-w-32 truncate">
                            {lead.message || "-"}
                          </TableCell>
                          <TableCell className="text-xs">
                            {formatDate(lead.createdAt)}
                          </TableCell>
                          <TableCell>
                            {lead.rewardCredited ? (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                ✅ Yes
                              </span>
                            ) : (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                                ❌ No
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {!lead.rewardCredited && (
                              <Button
                                data-ocid={`admin.confirm_button.${i + 1}`}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white text-xs h-7"
                                onClick={() => markLeadMutation.mutate(lead.id)}
                                disabled={markLeadMutation.isPending}
                              >
                                Mark Rewarded
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ── Messages Tab ── */}
          <TabsContent value="messages">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  💬 Customer Messages
                </h2>
                {messagesQuery.data && (
                  <Badge variant="secondary">
                    {messagesQuery.data.length} total
                  </Badge>
                )}
              </div>
              {messagesQuery.isLoading ? (
                <div
                  data-ocid="admin.loading_state"
                  className="p-8 text-center text-gray-400"
                >
                  Loading...
                </div>
              ) : !messagesQuery.data?.length ? (
                <div
                  data-ocid="admin.empty_state"
                  className="p-8 text-center text-gray-400 bg-white rounded-2xl border border-gray-200"
                >
                  No messages yet.
                </div>
              ) : (
                <div className="space-y-3" data-ocid="admin.list">
                  {messagesQuery.data.map((msg) => (
                    <MessageCard
                      key={String(msg.id)}
                      msg={msg}
                      onReply={handleReply}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* ── Reviews Tab ── */}
          <TabsContent value="reviews">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  ⭐ Customer Reviews
                </h2>
                {reviewsQuery.data && (
                  <Badge variant="secondary">
                    {reviewsQuery.data.length} total
                  </Badge>
                )}
              </div>
              {reviewsQuery.isLoading ? (
                <div
                  data-ocid="admin.loading_state"
                  className="p-8 text-center text-gray-400"
                >
                  Loading...
                </div>
              ) : !reviewsQuery.data?.length ? (
                <div
                  data-ocid="admin.empty_state"
                  className="p-8 text-center text-gray-400"
                >
                  No reviews yet.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {reviewsQuery.data.map((review, i) => (
                    <div
                      key={String(review.id)}
                      data-ocid={`admin.row.${i + 1}`}
                      className="px-6 py-4 flex items-start justify-between gap-4"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">
                            {review.authorName}
                          </span>
                          <StarDisplay rating={review.rating} />
                          <span className="text-xs text-gray-400">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {review.reviewText}
                        </p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        {review.approved ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                            ✅ Approved
                          </span>
                        ) : (
                          <>
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                              Pending
                            </span>
                            <Button
                              data-ocid={`admin.confirm_button.${i + 1}`}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white text-xs h-7"
                              onClick={() =>
                                approveReviewMutation.mutate(review.id)
                              }
                              disabled={approveReviewMutation.isPending}
                            >
                              Approve
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
