import { MainHeader } from "@repo/ui/components/layout/main-header";
import { CookiesProvider } from "@repo/ui/components/cookies-provider";
import { cn } from "@repo/ui/lib/utils";
import { Suspense } from "react";

export const MainLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <CookiesProvider>
      <div className={cn("grid min-h-svh lg:grid-cols-1")}>
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <MainHeader />
          <div className={cn("w-full", className)}>{children}</div>
        </div>
      </div>
    </CookiesProvider>
  );
};
