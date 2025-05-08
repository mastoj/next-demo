import { flag } from "flags/next";

export const randomFlag = flag({
  key: "random-flag",
  decide() {
    return Math.random() > 0.5;
  },
});

export const darkModeFlag = flag({
  key: "dark-mode-flag",
  decide() {
    return true;
  },
});

export const precomputedFlags = [darkModeFlag] as const;
