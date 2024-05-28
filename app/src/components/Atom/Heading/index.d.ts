export type Variant =
  | "h1Light"
  | "h1Regular"
  | "h1Medium"
  | "h1SemiBold"
  | "h1Bold"
  // h2
  | "h2Light"
  | "h2Regular"
  | "h2Medium"
  | "h2SemiBold"
  | "h2Bold"
  // h3
  | "h3SemiBold"
  | "h3Bold"
  // h4
  | "h4Light"
  | "h4Regular"
  | "h4Medium"
  | "h4SemiBold"
  | "h4Bold"
  // h5
  | "h5Light"
  | "h5Regular"
  | "h5Medium"
  | "h5SemiBold"
  | "h5Bold"
  // h6
  | "h6Light"
  | "h6Regular"
  | "h6Medium"
  | "h6SemiBold"
  | "h6Bold";

export type Tag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface Props {
  variant?: Variant;
  tag?: Tag;
}
