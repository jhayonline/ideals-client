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
  gradient?: string;
};

const clips: ClipMeta[] = [
  {
    id: "1",
    src: installmentClip,
    aspect: "aspect-[9/16]",
    caption: "iPhone 14 Pro Max installment",
    gradient: "from-purple-500/20 to-blue-500/20",
  },
  {
    id: "2",
    src: pinkFlexClip,
    aspect: "aspect-[3/4]",
    caption: "iPhone 16 Pink · 40% down",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: "3",
    src: buyNowPayLaterClip,
    aspect: "aspect-square",
    caption: "Buy now, pay later",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: "4",
    src: buyNowPayLaterClip,
    aspect: "aspect-square",
    caption: "Buy now, pay later",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: "5",
    src: whiteFlexClip,
    aspect: "aspect-[3/4]",
    caption: "iPhone 11 Green · 40% down",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "6",
    src: handoverShowcase,
    aspect: "aspect-[9/16]",
    caption: "Same-day handover",
    gradient: "from-orange-500/20 to-amber-500/20",
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onExpand}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative w-full ${clip.aspect} rounded-2xl overflow-hidden shadow-lg mb-5 break-inside-avoid block bg-gradient-to-br ${clip.gradient}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-white/90 backdrop-blur grid place-items-center text-gray-900 shadow-lg"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <Play size={14} className="ml-0.5" fill="currentColor" />
      </motion.div>

      <span className="absolute bottom-3 left-3 text-[10px] text-white/90 flex items-center gap-1.5 drop-shadow-lg bg-black/20 backdrop-blur px-3 py-1.5 rounded-full">
        <VolumeX size={12} /> {clip.caption}
      </span>
    </motion.button>
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
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-28">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-primary bg-primary/5 px-4 py-1.5 rounded-full mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          From the shop floor
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900">
          More moments.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-lg mx-auto leading-relaxed">
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
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setActiveClip(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md aspect-[9/16] rounded-3xl overflow-hidden bg-black shadow-2xl"
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
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white backdrop-blur transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
