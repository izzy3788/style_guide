import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";

const pretendard = localFont({
  src: [
    { path: "../public/fonts/Pretendard-Thin.woff2", weight: "100" },
    { path: "../public/fonts/Pretendard-ExtraLight.woff2", weight: "200" },
    { path: "../public/fonts/Pretendard-Light.woff2", weight: "300" },
    { path: "../public/fonts/Pretendard-Regular.woff2", weight: "400" },
    { path: "../public/fonts/Pretendard-Medium.woff2", weight: "500" },
    { path: "../public/fonts/Pretendard-SemiBold.woff2", weight: "600" },
    { path: "../public/fonts/Pretendard-Bold.woff2", weight: "700" },
    { path: "../public/fonts/Pretendard-ExtraBold.woff2", weight: "800" },
    { path: "../public/fonts/Pretendard-Black.woff2", weight: "900" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "sans-serif",
  ],
});

export const metadata = {
  title: "Design System Docs",
  description: "Documentation for the design system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
