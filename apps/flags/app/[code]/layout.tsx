import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@repo/ui/globals.css";
import { MainLayout } from "@repo/ui/components/layout/main-layout";
import {
  darkModeFlag,
  flagDefinitions,
  precomputedFlags,
} from "@repo/ui/lib/flags";
import { cn } from "@repo/ui/lib/utils";
import {
  encryptFlagDefinitions,
  encryptFlagValues,
  FlagDefinitionsType,
} from "flags";
import { FlagDefinitions, FlagValues } from "flags/react";
import { Suspense } from "react";
import { VercelToolbar } from "@vercel/toolbar/next";
import { AppContext } from "@repo/ui/lib/types";
import { FlagValue } from "@repo/ui/components/flag-value";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

async function ConfidentialFlagDefinitions({
  definitions,
}: {
  definitions: FlagDefinitionsType;
}) {
  const encryptedFlagDefinitions = await encryptFlagDefinitions(definitions);
  return <FlagDefinitions definitions={encryptedFlagDefinitions} />;
}

async function ConfidentialFlagValues({ flagCode }: { flagCode: string }) {
  const darkMode = await darkModeFlag(flagCode, precomputedFlags);
  const encryptedFlagValues = await encryptFlagValues({
    "dark-mode-flag": darkMode,
  });
  return <FlagValues values={encryptedFlagValues} />;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    code: string;
  }>;
}>) {
  const { code } = await params;
  const urlDecoded = decodeURIComponent(code);
  const appContextJson = Buffer.from(urlDecoded, "base64").toString("utf-8");
  const appContext = JSON.parse(appContextJson) as AppContext;
  const darkMode = await darkModeFlag(appContext.flagCode, precomputedFlags);
  const shouldInjectToolbar = process.env.NODE_ENV === "development";
  return (
    <html lang="en">
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          darkMode && "dark"
        )}
      >
        <MainLayout className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
          <FlagValue flag="darkModeFlag" value={darkMode} />
          {children}
        </MainLayout>
        <Suspense>
          <ConfidentialFlagDefinitions definitions={flagDefinitions} />
          <ConfidentialFlagValues flagCode={appContext.flagCode} />
        </Suspense>
        {shouldInjectToolbar && <VercelToolbar />}
      </body>
    </html>
  );
}
