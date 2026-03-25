import { useQuery } from "@tanstack/react-query";
import type { CustomerReview } from "../backend.d";
import { useActor } from "../hooks/useActor";

const FALLBACK_REVIEWS = [
  {
    authorName: "Ramesh Kumar",
    rating: BigInt(5),
    reviewText:
      "Bahut acchi service! Aadhaar card bahut jaldi ban gaya. Thank you Vinay ji!",
  },
  {
    authorName: "Priya Sharma",
    rating: BigInt(5),
    reviewText: "Quick and helpful! Pan card bana diya sirf ek ghante mein.",
  },
  {
    authorName: "Suresh Yadav",
    rating: BigInt(5),
    reviewText:
      "Best cyber cafe in Bilaspur! Sabhi government kaam yahan hote hain.",
  },
  {
    authorName: "Meena Devi",
    rating: BigInt(4),
    reviewText: "Very good service. Voter card ka kaam badi asaani se ho gaya.",
  },
  {
    authorName: "Anil Gupta",
    rating: BigInt(5),
    reviewText:
      "Excellent! Driving licence aur passport dono kaam yahan se karwaye. Highly recommended!",
  },
];

function StarRating({ rating }: { rating: bigint }) {
  const stars = Number(rating);
  return (
    <span className="text-yellow-300">
      {Array.from({ length: 5 }, (_, i) => (i < stars ? "★" : "☆")).join("")}
    </span>
  );
}

type TickerItem = {
  authorName: string;
  rating: bigint;
  reviewText: string;
  key: string;
};

export default function NotificationTickerBar() {
  const { actor, isFetching } = useActor();

  const { data: reviews } = useQuery<CustomerReview[]>({
    queryKey: ["approvedReviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApprovedReviews();
    },
    enabled: !!actor && !isFetching,
  });

  const displayReviews =
    reviews && reviews.length > 0 ? reviews : FALLBACK_REVIEWS;

  // Duplicate for seamless loop, use stable keys
  const tickerItems: TickerItem[] = [
    ...displayReviews.map((r, i) => ({ ...r, key: `a-${i}` })),
    ...displayReviews.map((r, i) => ({ ...r, key: `b-${i}` })),
  ];

  return (
    <div
      data-ocid="notification.panel"
      className="bg-amber-500 text-white overflow-hidden py-2"
      style={{ borderBottom: "2px solid #d97706" }}
    >
      <div className="flex items-center gap-3 px-3">
        <span className="shrink-0 bg-white text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
          📣 Reviews
        </span>
        <div className="overflow-hidden flex-1">
          <div className="flex gap-10 animate-ticker whitespace-nowrap">
            {tickerItems.map((review) => (
              <span
                key={review.key}
                className="inline-flex items-center gap-2 text-sm shrink-0"
              >
                <StarRating rating={review.rating} />
                <span className="font-semibold">{review.authorName}:</span>
                <span className="opacity-90">{review.reviewText}</span>
                <span className="text-amber-200 mx-2">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
