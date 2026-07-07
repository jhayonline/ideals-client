import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, VolumeX, X, Maximize2 } from "lucide-react";
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
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-20 sm:py-28">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-primary bg-primary/5 px-4 py-1.5 rounded-full mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          In action
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900">
          See iDeals in action.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-lg mx-auto leading-relaxed">
          Real phones, real handovers in Accra. Pay a deposit, spread the rest,
          and walk away with your phone today.
        </p>
      </div>

      <div className="flex justify-center">
        <motion.button
          onClick={() => setExpanded(true)}
          className="group relative w-full max-w-[340px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="h-14 w-14 rounded-full bg-white shadow-lg flex items-center justify-center">
                <Play
                  size={24}
                  className="ml-1 text-primary"
                  fill="currentColor"
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-[11px] text-white/80 flex items-center gap-1.5 drop-shadow-lg bg-black/20 backdrop-blur px-3 py-1.5 rounded-full">
              <VolumeX size={12} /> Tap to watch with sound
            </span>
            <span className="text-[11px] text-white/60 drop-shadow-lg bg-black/20 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Maximize2 size={12} />
            </span>
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setExpanded(false)}
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
                src={demoVideo}
                loop
                playsInline
                controls
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => setExpanded(false)}
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
