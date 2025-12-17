import "./globals.css";
import localFont from "next/font/local";
import QueryProvider from "@/providers/query";
import RefreshTokenProvider from "@/providers/refresh-token";
import { ThemeProvider } from "@/providers/theme";
import Toaster from "@/components/shared/toaster";

const font = localFont({
  src: "../fonts/BYekan+.ttf",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${font.className} glass-layout hidden-scrollbar`}>
        <RefreshTokenProvider>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
          <Toaster />
        </ThemeProvider>
        </RefreshTokenProvider>
      </body>
    </html>
  );
}
