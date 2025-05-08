import { flag } from "flags/next";

export const randomFlag = flag({
  key: "random-flag",
  decide() {
    return Math.random() > 0.5;
  },
});

export const fixedFlag = flag({
  key: "fixed-flag",
  decide() {
    return true;
  },
});

export const precomputedFlags = [fixedFlag] as const;
