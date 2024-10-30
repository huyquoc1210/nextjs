import AppProvider from "@/app/app-provider";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import SlideSession from "@/components/slide-session";
import accountApiRequest from "@/apiRequest/account";
import { AccountResType } from "@/schemaValidations/account.schema";

const inter = Inter({
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Web bán hàng",
    default: "Web bán hàng",
  },
  description: "Được tạo bởi Huy Dev",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  let user: AccountResType["data"] | null = null;

  try {
    if (sessionToken.value) {
      const data = await accountApiRequest.me(sessionToken.value);
      user = data.payload.data;
    }
  } catch (error) {
    console.log(error);
  }
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
          <AppProvider initialSessionToken={sessionToken?.value} user={user}>
            <Header user={user} />
            {children}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
