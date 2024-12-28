import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/components/Providers";


export const metadata: Metadata = {
  title: "Pokédex Lite",
  description: "A modern Pokédex app built to replace the old Pokédex.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="transition-colors duration-200"
      suppressHydrationWarning
    >
      <body
        className="font-sans bg-gray-100 dark:bg-gray-900 transition-colors"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
