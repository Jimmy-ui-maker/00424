import "bootstrap/dist/css/bootstrap.min.css";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BootstrapClient from "@/components/BootstrapClient";
import SettingsWidget from "@/components/SettingsWidget";
import { TranslationProvider } from "@/context/TranslationContext";
export const metadata = {
  title: "Jimi Yaks — Developer Portfolio",
  description:
    "Personal portfolio website for Jimi Yaks. Projects, services, and contact.",
  keywords: ["Portfolio", "Developer", "Next.js", "Bootstrap", "Jimi Yaks"],
  authors: [{ name: "Jimi Yaks" }],
  openGraph: {
    title: "Jimi Yaks — Developer Portfolio",
    description: "Projects, services, and contact",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-body">
        <TranslationProvider>
          <BootstrapClient />
          <Navbar />
          <main className="container py-4">{children}</main>
          <Footer />

          {/* Settings Widget controls audio */}
          <SettingsWidget />
        </TranslationProvider>
      </body>
    </html>
  );
}
