import { getProviderData, createFlagsDiscoveryEndpoint } from "flags/next";
import { darkModeFlag, randomFlag } from "@repo/ui/lib/flags";
export const GET = createFlagsDiscoveryEndpoint(() =>
  getProviderData({
    [darkModeFlag.key]: darkModeFlag,
    [randomFlag.key]: randomFlag,
  })
);
