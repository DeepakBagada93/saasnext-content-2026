import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Content Brain | The Digital Sanctuary for Thought",
  description: "Transform scattered research into a permanent knowledge system that continuously improves every piece of content you create.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Hanken+Grotesk:ital,wght@0,300..900;1,300..900&family=Caveat:wght@400..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-body antialiased bg-background text-on-background">
        {children}
      </body>
    </html>
  );
}
