import { MainHeader } from "@repo/ui/components/layout/main-header";
import { CookiesProvider } from "@repo/ui/components/cookies-provider";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesProvider>
      <div className="grid min-h-svh lg:grid-cols-1">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <MainHeader />
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </CookiesProvider>
  );
};
