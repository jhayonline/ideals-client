import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, VolumeX, X } from "lucide-react";

import handoverShowcase from "@/assets/Videos/handover-showcase.mov";
import installmentClip from "@/assets/Videos/iphone-14-pro-max-installment.mp4";
import buyNowPayLaterClip from "@/assets/Videos/buy-now-pay-later.mp4";
import pinkFlexClip from "@/assets/Videos/iphone-16-pink-flex.mp4";
import whiteFlexClip from "@/assets/Videos/bnpl.mp4";

type ClipMeta = {
  id: string;
  src: string;
  aspect: string;
  caption: string;
};

const clips: ClipMeta[] = [
  {
    id: "1",
    src: installmentClip,
    aspect: "aspect-[9/16]",
    caption: "iPhone 14 Pro Max installment",
  },
  {
    id: "2",
    src: pinkFlexClip,
    aspect: "aspect-[3/4]",
    caption: "iPhone 16 Pink · 40% down",
  },
  {
    id: "3",
    src: buyNowPayLaterClip,
    aspect: "aspect-square",
    caption: "Buy now, pay later",
  },
  {
    id: "4",
    src: buyNowPayLaterClip,
    aspect: "aspect-square",
    caption: "Buy now, pay later",
  },
  {
    id: "5",
    src: whiteFlexClip,
    aspect: "aspect-[3/4]",
    caption: "iPhone 11 Green · 40% down",
  },
  {
    id: "6",
    src: handoverShowcase,
    aspect: "aspect-[9/16]",
    caption: "Same-day handover",
  },
];

function VideoCard({
  clip,
  onExpand,
}: {
  clip: ClipMeta;
  onExpand: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <button
      onClick={onExpand}
      className={`group relative w-full ${clip.aspect} rounded-3xl overflow-hidden ring-1 ring-gray-100 shadow-lg mb-5 break-inside-avoid block`}
    >
      <video
        ref={ref}
        src={clip.src}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      <span className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-white/90 grid place-items-center text-gray-900 group-hover:scale-105 transition-transform">
        <Play size={14} className="ml-0.5" fill="currentColor" />
      </span>
      <span className="absolute bottom-3 left-3 text-[11px] text-white/90 flex items-center gap-1 drop-shadow">
        <VolumeX size={12} /> {clip.caption}
      </span>
    </button>
  );
}

export default function VideoMasonryGrid() {
  const [activeClip, setActiveClip] = useState<ClipMeta | null>(null);
  const modalRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (activeClip && modalRef.current) {
      modalRef.current.currentTime = 0;
      modalRef.current.muted = false;
      modalRef.current.play().catch(() => {});
    }
  }, [activeClip]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setActiveClip(null);
    if (activeClip) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeClip]);

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
      <div className="text-center mb-10">
        <p className="text-[11px] uppercase tracking-wider text-primary font-medium">
          From the shop floor
        </p>
        <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight">
          More moments.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
          Handovers, unboxings and deals — straight from Accra.
        </p>
      </div>

      <div className="columns-2 sm:columns-3 lg:columns-4 gap-5">
        {clips.map((clip) => (
          <VideoCard
            key={clip.id}
            clip={clip}
            onExpand={() => setActiveClip(clip)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeClip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setActiveClip(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md aspect-[9/16] rounded-3xl overflow-hidden bg-black"
            >
              <video
                ref={modalRef}
                src={activeClip.src}
                loop
                playsInline
                controls
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => setActiveClip(null)}
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white backdrop-blur"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
