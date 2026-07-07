import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, VolumeX, X } from "lucide-react";
import demoVideo from "@/assets/Videos/handover-showcase.mov";

export default function VideoShowcase() {
  const [expanded, setExpanded] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (expanded) {
      previewRef.current?.pause();
      if (modalRef.current) {
        modalRef.current.currentTime = previewRef.current?.currentTime ?? 0;
        modalRef.current.muted = false;
        modalRef.current.play().catch(() => {});
      }
    } else {
      previewRef.current?.play().catch(() => {});
    }
  }, [expanded]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setExpanded(false);
    if (expanded) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
      <div className="rounded-3xl overflow-hidden">
        <div className="text-center pt-16 pb-10 px-6">
          <p className="text-[11px] uppercase tracking-wider text-primary font-medium">
            In action
          </p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight">
            See iDeals in action.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-lg mx-auto">
            Real phones, real handovers in Accra. Pay a deposit, spread the
            rest, and walk away with your phone today.
          </p>
        </div>

        <div className="flex justify-center pb-16 px-6">
          <button
            onClick={() => setExpanded(true)}
            className="group relative w-full max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden ring-1 ring-white/10"
          >
            <video
              ref={previewRef}
              src={demoVideo}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <span className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/90 grid place-items-center text-gray-900 group-hover:scale-105 transition-transform">
              <Play size={16} className="ml-0.5" fill="currentColor" />
            </span>
            <span className="absolute bottom-4 left-4 text-[11px] text-white/70 flex items-center gap-1">
              <VolumeX size={12} /> Tap to watch with sound
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setExpanded(false)}
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
                src={demoVideo}
                loop
                playsInline
                controls
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => setExpanded(false)}
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
