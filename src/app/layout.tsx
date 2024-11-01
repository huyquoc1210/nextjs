import AppProvider from "@/app/app-provider";
import { baseOpenGraph } from "@/app/shared-metadata";
import Header from "@/components/header";
import SlideSession from "@/components/slide-session";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AccountResType } from "@/schemaValidations/account.schema";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Web bán hàng",
    default: "Web bán hàng",
  },
  description: "Được tạo bởi Huy Dev",
  openGraph: baseOpenGraph,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: AccountResType["data"] | null = null;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider user={user}>
            <Header user={user} />
            {children}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
