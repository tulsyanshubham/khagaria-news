import { atom } from "jotai";

export type ThemeMode = "light" | "dark" | "system";

export const themeAtom = atom<ThemeMode>("system");
