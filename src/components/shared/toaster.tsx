"use client";

import { Toaster as HotToast } from "react-hot-toast";
import { useTheme } from "next-themes";

export default function Toaster() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <HotToast
      position="top-center"
      toastOptions={{
        style: {
          background: isDark ? "#0f1115" : "#ffffff",
          color: isDark ? "#f5f5f5" : "#111111",
          borderRadius: "14px",
          padding: "10px 14px",
          border: isDark ? "1px solid #2b2f36" : "1px solid #e6e6e6",
          boxShadow: isDark
            ? "0 6px 18px rgba(0,0,0,0.5)"
            : "0 6px 18px rgba(0,0,0,0.08)",
          backdropFilter: "blur(12px)",
          transition: "all 0.25s ease",
          fontSize: "14px",
          fontWeight: 400,
        },
        success: {
          iconTheme: {
            primary: isDark ? "#4ade80" : "#22c55e",
            secondary: isDark ? "#0f1115" : "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: isDark ? "#f87171" : "#ef4444",
            secondary: isDark ? "#0f1115" : "#ffffff",
          },
        },
      }}
    />
  );
}
