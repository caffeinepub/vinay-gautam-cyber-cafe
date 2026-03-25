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
            Manage withdrawals, commissions, and more.
          </p>
        </div>

        <Tabs defaultValue="withdrawals" data-ocid="admin.tab">
          <TabsList className="mb-6">
            <TabsTrigger value="withdrawals" data-ocid="admin.tab">
              Withdrawals
            </TabsTrigger>
            <TabsTrigger value="commissions" data-ocid="admin.tab">
              Commissions
            </TabsTrigger>
          </TabsList>

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
              {/* Total commission card */}
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

              {/* Log commission form */}
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

              {/* Commission logs */}
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
        </Tabs>
      </div>
    </div>
  );
}
