import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : "justdovinay.com";
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-4 text-xs px-4">
      <p>
        © {year} justdovinay.com — All Rights Reserved | Bilaspur, Greater Noida
      </p>
      <p className="mt-1 flex items-center justify-center gap-1">
        Built with <Heart className="h-3 w-3 text-red-400 fill-red-400" /> using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white underline"
        >
          caffeine.ai
        </a>
      </p>
    </footer>
  );
}
