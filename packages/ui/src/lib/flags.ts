import { FlagDefinitionsType } from "flags";
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
    return false;
  },
});

export const flagDefinitions: FlagDefinitionsType = {
  "dark-mode-flag": {
    options: [{ value: false }, { value: true }],
    description: "Flag to toggle dark mode on and off.",
  },
  "random-flag": {
    options: [{ value: false }, { value: true }],
    description: "Flag to toggle dark mode on and off.",
  },
};

export const precomputedFlags = [darkModeFlag] as const;
