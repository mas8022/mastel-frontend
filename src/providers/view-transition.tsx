"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export default function ViewTransitionProvider({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 30,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            scale: 1.03,
            y: -25,
            filter: "blur(12px)",
          }}
          transition={{
            duration: 0.32,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
