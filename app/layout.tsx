import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from 'next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Powered Social Media Post Generator – Create Engaging Posts Instantly",
  description: "Boost your social media presence with AI-generated posts. Create engaging content for Instagram, Facebook, Twitter, and more in seconds with our smart AI-powered post generator!",
  keywords: [
    "AI social media generator",
    "post creator",
    "AI content generator",
    "social media automation",
    "viral content maker",
    "AI-powered posts",
    "marketing automation",
    "digital marketing AI"
  ],
  openGraph: {
    title: "AI-Powered Social Media Post Generator – Create Engaging Posts Instantly",
    description: "Boost your social media presence with AI-generated posts. Create engaging content for Instagram, Facebook, Twitter, and more in seconds with our smart AI-powered post generator!",
    type: "website",
    locale: "en_US",
    siteName: "ThreadCraftAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Social Media Post Generator – Create Engaging Posts Instantly",
    description: "Boost your social media presence with AI-generated posts. Create engaging content for Instagram, Facebook, Twitter, and more in seconds!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} bg-black text-white antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
