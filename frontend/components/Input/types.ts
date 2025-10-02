export type Variant = "outline" | "filled";
export type Size = "sm" | "md" | "lg";
export type NumericKind = "integer" | "decimal";

export type InputRef = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
};
