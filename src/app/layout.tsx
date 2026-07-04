import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "山田 太郎 | ポートフォリオ",
  description: "個人ポートフォリオサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-3xl px-6 py-4">
            <Link href="/" className="font-semibold">
              山田 太郎
            </Link>
          </div>
        </header>
        <main className="flex-1 mx-auto w-full max-w-3xl px-6 py-10">
          {children}
        </main>
        <footer className="border-t border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-3xl px-6 py-6 text-sm text-black/60 dark:text-white/60">
            © {new Date().getFullYear()} Taro Yamada
          </div>
        </footer>
      </body>
    </html>
  );
}
