/**
 * M3 Typography Tokens
 * Source: tokens/typography.json (figmaFileKey: BKaf9LsdANwjG8GrpKreQK)
 *
 * Tailwind utilities: text-display-lg, text-headline-md, text-body-sm, etc.
 * fontWeight: font-normal(400), font-medium(500), font-semibold(600)
 */

export type TypographyValue = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: 400 | 500 | 600;
  letterSpacing: number;
};

export const typography = {
  typeface: "Roboto",

  typescale: {
    display: {
      large:           { fontFamily: "Roboto", fontSize: 57, lineHeight: 64, fontWeight: 400, letterSpacing: -0.25 } as TypographyValue,
      largeEmphasized: { fontFamily: "Roboto", fontSize: 57, lineHeight: 64, fontWeight: 500, letterSpacing: -0.25 } as TypographyValue,
      medium:          { fontFamily: "Roboto", fontSize: 45, lineHeight: 52, fontWeight: 400, letterSpacing: 0 } as TypographyValue,
      mediumEmphasized:{ fontFamily: "Roboto", fontSize: 45, lineHeight: 52, fontWeight: 500, letterSpacing: 0 } as TypographyValue,
      small:           { fontFamily: "Roboto", fontSize: 36, lineHeight: 44, fontWeight: 400, letterSpacing: 0 } as TypographyValue,
      smallEmphasized: { fontFamily: "Roboto", fontSize: 36, lineHeight: 44, fontWeight: 500, letterSpacing: 0 } as TypographyValue,
    },
    headline: {
      large:           { fontFamily: "Roboto", fontSize: 32, lineHeight: 40, fontWeight: 400, letterSpacing: 0 } as TypographyValue,
      largeEmphasized: { fontFamily: "Roboto", fontSize: 32, lineHeight: 40, fontWeight: 500, letterSpacing: 0 } as TypographyValue,
      medium:          { fontFamily: "Roboto", fontSize: 28, lineHeight: 36, fontWeight: 400, letterSpacing: 0 } as TypographyValue,
      mediumEmphasized:{ fontFamily: "Roboto", fontSize: 28, lineHeight: 36, fontWeight: 500, letterSpacing: 0 } as TypographyValue,
      small:           { fontFamily: "Roboto", fontSize: 24, lineHeight: 32, fontWeight: 400, letterSpacing: 0 } as TypographyValue,
      smallEmphasized: { fontFamily: "Roboto", fontSize: 24, lineHeight: 32, fontWeight: 500, letterSpacing: 0 } as TypographyValue,
    },
    title: {
      large:           { fontFamily: "Roboto", fontSize: 22, lineHeight: 28, fontWeight: 400, letterSpacing: 0 } as TypographyValue,
      largeEmphasized: { fontFamily: "Roboto", fontSize: 22, lineHeight: 28, fontWeight: 500, letterSpacing: 0 } as TypographyValue,
      medium:          { fontFamily: "Roboto", fontSize: 16, lineHeight: 24, fontWeight: 500, letterSpacing: 0.15 } as TypographyValue,
      mediumEmphasized:{ fontFamily: "Roboto", fontSize: 16, lineHeight: 24, fontWeight: 600, letterSpacing: 0.15 } as TypographyValue,
      small:           { fontFamily: "Roboto", fontSize: 14, lineHeight: 20, fontWeight: 500, letterSpacing: 0.1 } as TypographyValue,
      smallEmphasized: { fontFamily: "Roboto", fontSize: 14, lineHeight: 20, fontWeight: 600, letterSpacing: 0.1 } as TypographyValue,
    },
    label: {
      large:           { fontFamily: "Roboto", fontSize: 14, lineHeight: 20, fontWeight: 500, letterSpacing: 0.1 } as TypographyValue,
      largeEmphasized: { fontFamily: "Roboto", fontSize: 14, lineHeight: 20, fontWeight: 600, letterSpacing: 0.1 } as TypographyValue,
      medium:          { fontFamily: "Roboto", fontSize: 12, lineHeight: 16, fontWeight: 500, letterSpacing: 0.5 } as TypographyValue,
      mediumEmphasized:{ fontFamily: "Roboto", fontSize: 12, lineHeight: 16, fontWeight: 600, letterSpacing: 0.5 } as TypographyValue,
      small:           { fontFamily: "Roboto", fontSize: 11, lineHeight: 16, fontWeight: 500, letterSpacing: 0.5 } as TypographyValue,
      smallEmphasized: { fontFamily: "Roboto", fontSize: 11, lineHeight: 16, fontWeight: 600, letterSpacing: 0.5 } as TypographyValue,
    },
    body: {
      large:           { fontFamily: "Roboto", fontSize: 16, lineHeight: 24, fontWeight: 400, letterSpacing: 0.5 } as TypographyValue,
      largeEmphasized: { fontFamily: "Roboto", fontSize: 16, lineHeight: 24, fontWeight: 500, letterSpacing: 0.5 } as TypographyValue,
      medium:          { fontFamily: "Roboto", fontSize: 14, lineHeight: 20, fontWeight: 400, letterSpacing: 0.25 } as TypographyValue,
      mediumEmphasized:{ fontFamily: "Roboto", fontSize: 14, lineHeight: 20, fontWeight: 500, letterSpacing: 0.25 } as TypographyValue,
      small:           { fontFamily: "Roboto", fontSize: 12, lineHeight: 16, fontWeight: 400, letterSpacing: 0.4 } as TypographyValue,
      smallEmphasized: { fontFamily: "Roboto", fontSize: 12, lineHeight: 16, fontWeight: 500, letterSpacing: 0.4 } as TypographyValue,
    },
  },
} as const;

/** Tailwind 클래스명으로 빠르게 조회하는 헬퍼 */
export const typescaleClass = {
  "display-lg":   "text-display-lg font-normal",
  "display-md":   "text-display-md font-normal",
  "display-sm":   "text-display-sm font-normal",
  "headline-lg":  "text-headline-lg font-normal",
  "headline-md":  "text-headline-md font-normal",
  "headline-sm":  "text-headline-sm font-normal",
  "title-lg":     "text-title-lg font-normal",
  "title-md":     "text-title-md font-medium",
  "title-sm":     "text-title-sm font-medium",
  "label-lg":     "text-label-lg font-medium",
  "label-md":     "text-label-md font-medium",
  "label-sm":     "text-label-sm font-medium",
  "body-lg":      "text-body-lg font-normal",
  "body-md":      "text-body-md font-normal",
  "body-sm":      "text-body-sm font-normal",
} as const;

export type TypescaleKey = keyof typeof typescaleClass;
