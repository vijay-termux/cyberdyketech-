import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "CYBERDYKE TECH | AI Cybersecurity, Audits, Consulting, Risk Management",
  description: "CYBERDYKE TECH provides global AI-powered cybersecurity solutions in India. Expert AI-driven threat detection, vulnerability scanning, cloud security, and compliance audits for enterprises.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
