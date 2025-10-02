export const allowInt = (s: string, allowNeg: boolean) =>
  (allowNeg ? /^-?\d*$/ : /^\d*$/).test(s);

export const allowDec = (s: string, allowNeg: boolean) =>
  (allowNeg ? /^-?\d*(?:\.\d*)?$/ : /^\d*(?:\.\d*)?$/).test(s);

export const clamp = (n: number, min?: number, max?: number) =>
  min !== undefined && n < min ? min : max !== undefined && n > max ? max : n;
