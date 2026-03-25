import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import type { CustomerMessage, CustomerReview } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

function formatDate(ts: bigint): string {
  try {
    return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN");
  } catch {
    return "-";
  }
}

function StarDisplay({ rating }: { rating: bigint }) {
  const n = Number(rating);
  return (
    <span className="text-yellow-500">
      {Array.from({ length: 5 }, (_, i) => (i < n ? "★" : "☆")).join("")}
    </span>
  );
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
            Manage customer messages and reviews.
          </p>
        </div>

        <Tabs defaultValue="messages" data-ocid="admin.tab">
          <TabsList className="mb-6 flex-wrap h-auto gap-1">
            <TabsTrigger value="messages" data-ocid="admin.tab">
              Messages
            </TabsTrigger>
            <TabsTrigger value="reviews" data-ocid="admin.tab">
              Reviews
            </TabsTrigger>
          </TabsList>

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
